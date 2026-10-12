#!/usr/bin/env node

const DEFAULT_POST_LIMIT = 25;
const DEFAULT_COMMENT_LIMIT = 500;
const DEFAULT_COMMENT_SORT = "top";
const DEFAULT_MIN_SCORE = 1;
const CSV_HEADERS = [
  "query",
  "subreddit",
  "post_id",
  "post_title",
  "post_url",
  "post_author",
  "post_score",
  "post_created_utc",
  "post_num_comments",
  "comment_id",
  "comment_parent_id",
  "comment_author",
  "comment_score",
  "comment_depth",
  "comment_created_utc",
  "comment_url",
  "matched_terms",
  "relevance_score",
  "comment_body",
];

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[index + 1];

    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    index += 1;
  }

  return args;
}

function printUsage() {
  console.log(`
Create a CSV dataset of Reddit comments for a topic query.

Required environment variables:
  REDDIT_CLIENT_ID
  REDDIT_CLIENT_SECRET
  REDDIT_USER_AGENT

Usage:
  npm run reddit:dataset -- --query "male pattern balding travel abroad hair transplant"

Options:
  --query           Natural-language topic query to search for. Required.
  --keywords        Comma-separated must-look-for terms in comments.
  --subreddits      Comma-separated subreddit names to restrict search.
  --post-limit      Max posts to scan. Default: ${DEFAULT_POST_LIMIT}
  --comment-limit   Comment listing limit per post request. Default: ${DEFAULT_COMMENT_LIMIT}
  --comment-sort    top | new | best | controversial | old. Default: ${DEFAULT_COMMENT_SORT}
  --min-score       Minimum relevance score to keep. Default: ${DEFAULT_MIN_SCORE}
  --output          Output CSV path. Default: ./tmp/reddit-comments-<timestamp>.csv
  --verbose         Print progress while crawling.
  --help            Show this message.
`);
}

function readRequiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function splitCsvArg(value) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function tokenize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 3);
}

function unique(values) {
  return [...new Set(values)];
}

function buildSearchTerms(query, keywords) {
  const queryTokens = tokenize(query);
  const keywordTokens = keywords.flatMap((keyword) => tokenize(keyword));

  return unique([...queryTokens, ...keywordTokens]);
}

function computeRelevance({ commentBody, postTitle, postBody, searchTerms, keywords }) {
  const haystack = [commentBody, postTitle, postBody].filter(Boolean).join("\n").toLowerCase();
  const matchedTerms = [];
  let score = 0;

  for (const keyword of keywords) {
    const normalizedKeyword = keyword.toLowerCase();

    if (normalizedKeyword && haystack.includes(normalizedKeyword)) {
      score += Math.max(2, tokenize(normalizedKeyword).length);
      matchedTerms.push(keyword);
    }
  }

  for (const term of searchTerms) {
    if (haystack.includes(term)) {
      score += 1;
      matchedTerms.push(term);
    }
  }

  return {
    score,
    matchedTerms: unique(matchedTerms),
  };
}

function csvEscape(value) {
  const stringValue = String(value ?? "");
  return `"${stringValue.replaceAll(`"`, `""`)}"`;
}

function toCsv(rows) {
  const headers = CSV_HEADERS;
  const lines = [headers.map(csvEscape).join(",")];

  for (const row of rows) {
    lines.push(headers.map((header) => csvEscape(row[header])).join(","));
  }

  return `${lines.join("\n")}\n`;
}

async function getAccessToken({ clientId, clientSecret, userAgent }) {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const body = new URLSearchParams({ grant_type: "client_credentials" });

  const response = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": userAgent,
    },
    body,
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Failed to get Reddit access token (${response.status}): ${responseText}`);
  }

  const json = await response.json();

  if (!json.access_token) {
    throw new Error("Reddit token response did not include access_token");
  }

  return json.access_token;
}

async function redditGet({ accessToken, userAgent, path, params = {} }) {
  const url = new URL(path, "https://oauth.reddit.com");

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  url.searchParams.set("raw_json", "1");

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "User-Agent": userAgent,
    },
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Reddit request failed (${response.status}) for ${url.pathname}: ${responseText}`);
  }

  return response.json();
}

async function searchPosts({
  accessToken,
  userAgent,
  query,
  subreddits,
  postLimit,
  verbose,
}) {
  const posts = [];
  let after = null;

  while (posts.length < postLimit) {
    const remaining = postLimit - posts.length;
    const limit = Math.min(100, remaining);
    const path = subreddits.length ? `/r/${subreddits.join("+")}/search` : "/search";

    if (verbose) {
      console.log(`Searching Reddit posts: fetched ${posts.length}/${postLimit}`);
    }

    const json = await redditGet({
      accessToken,
      userAgent,
      path,
      params: {
        q: query,
        sort: "relevance",
        t: "all",
        limit,
        after,
        type: "link",
        restrict_sr: subreddits.length ? "on" : undefined,
      },
    });

    const children = json?.data?.children ?? [];

    for (const child of children) {
      if (child.kind === "t3") {
        posts.push(child.data);
      }
    }

    after = json?.data?.after;

    if (!after || children.length === 0) {
      break;
    }
  }

  return posts.slice(0, postLimit);
}

function flattenComments(children, depth = 0, collected = []) {
  for (const child of children ?? []) {
    if (child.kind !== "t1") {
      continue;
    }

    const comment = child.data;
    collected.push({
      id: comment.id,
      parentId: comment.parent_id,
      author: comment.author,
      body: comment.body,
      score: comment.score,
      createdUtc: comment.created_utc,
      permalink: comment.permalink,
      depth,
    });

    const replies = comment.replies?.data?.children;

    if (Array.isArray(replies) && replies.length > 0) {
      flattenComments(replies, depth + 1, collected);
    }
  }

  return collected;
}

async function fetchCommentsForPost({
  accessToken,
  userAgent,
  permalink,
  commentLimit,
  commentSort,
}) {
  const listing = await redditGet({
    accessToken,
    userAgent,
    path: `${permalink}.json`,
    params: {
      limit: commentLimit,
      sort: commentSort,
      depth: 10,
    },
  });

  const commentsListing = Array.isArray(listing) ? listing[1] : null;
  return flattenComments(commentsListing?.data?.children ?? []);
}

function buildDefaultOutputPath(query) {
  const safeQuery = query
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `${process.cwd()}/tmp/reddit-comments-${safeQuery || "query"}-${timestamp}.csv`;
}

async function writeCsv(outputPath, rows) {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, toCsv(rows), "utf8");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help || !args.query) {
    printUsage();
    process.exit(args.help ? 0 : 1);
  }

  const clientId = readRequiredEnv("REDDIT_CLIENT_ID");
  const clientSecret = readRequiredEnv("REDDIT_CLIENT_SECRET");
  const userAgent = readRequiredEnv("REDDIT_USER_AGENT");

  const query = args.query.trim();
  const keywords = splitCsvArg(args.keywords);
  const subreddits = splitCsvArg(args.subreddits);
  const postLimit = Number(args["post-limit"] || DEFAULT_POST_LIMIT);
  const commentLimit = Number(args["comment-limit"] || DEFAULT_COMMENT_LIMIT);
  const commentSort = args["comment-sort"] || DEFAULT_COMMENT_SORT;
  const minScore = Number(args["min-score"] || DEFAULT_MIN_SCORE);
  const verbose = Boolean(args.verbose);
  const path = await import("node:path");
  const outputPath = args.output ? path.resolve(process.cwd(), args.output) : buildDefaultOutputPath(query);
  const searchTerms = buildSearchTerms(query, keywords);

  const accessToken = await getAccessToken({ clientId, clientSecret, userAgent });
  const posts = await searchPosts({
    accessToken,
    userAgent,
    query,
    subreddits,
    postLimit,
    verbose,
  });

  const rows = [];

  for (const [index, post] of posts.entries()) {
    if (verbose) {
      console.log(`Fetching comments for post ${index + 1}/${posts.length}: ${post.title}`);
    }

    const comments = await fetchCommentsForPost({
      accessToken,
      userAgent,
      permalink: post.permalink,
      commentLimit,
      commentSort,
    });

    for (const comment of comments) {
      const relevance = computeRelevance({
        commentBody: comment.body,
        postTitle: post.title,
        postBody: post.selftext,
        searchTerms,
        keywords,
      });

      if (relevance.score < minScore) {
        continue;
      }

      rows.push({
        query,
        subreddit: post.subreddit,
        post_id: post.id,
        post_title: post.title,
        post_url: `https://www.reddit.com${post.permalink}`,
        post_author: post.author,
        post_score: post.score,
        post_created_utc: post.created_utc,
        post_num_comments: post.num_comments,
        comment_id: comment.id,
        comment_parent_id: comment.parentId,
        comment_author: comment.author,
        comment_score: comment.score,
        comment_depth: comment.depth,
        comment_created_utc: comment.createdUtc,
        comment_url: `https://www.reddit.com${comment.permalink}`,
        matched_terms: relevance.matchedTerms.join(" | "),
        relevance_score: relevance.score,
        comment_body: comment.body,
      });
    }
  }

  await writeCsv(outputPath, rows);

  console.log(`Posts scanned: ${posts.length}`);
  console.log(`Rows written: ${rows.length}`);
  console.log(`CSV saved to: ${outputPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
