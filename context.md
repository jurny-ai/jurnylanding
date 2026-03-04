# Blog Post Instructions

This document describes how to add a new blog post to the jurny.ai landing site.

## Architecture

- **Framework**: Next.js App Router with static export (`output: "export"` in `next.config.mjs`)
- **Styling**: Tailwind CSS + shadcn/ui
- **Deployment**: Netlify (publish directory: `out/`)
- **Domain**: https://usejurny.com

## Key Files

| File | Purpose |
|---|---|
| `src/components/BlogLayout.tsx` | Shared layout for all blog posts (Header, Footer, author byline, back links, prose container) |
| `src/components/Header.tsx` | Site header — contains the "Articles" dropdown with links to each post |
| `public/sitemap.xml` | Sitemap submitted to Google Search Console |
| `src/app/layout.tsx` | Root layout with global SEO metadata, JSON-LD, analytics |

## Steps to Add a New Blog Post

### 1. Create the route

Create a new directory and `page.tsx` under `src/app/articles/`:

```
src/app/articles/<slug>/page.tsx
```

The slug becomes the URL path: `https://usejurny.com/articles/<slug>`

### 2. Write the page component

Use `BlogLayout` for the wrapper. The page file must export Next.js `Metadata` for SEO and a default component for rendering.

```tsx
import type { Metadata } from "next";
import BlogLayout from "@/components/BlogLayout";

export const metadata: Metadata = {
  title: "Post Title — jurny.ai",
  description: "A one- or two-sentence summary for search engines and social cards.",
  openGraph: {
    title: "Post Title",
    description: "Same summary as above.",
    type: "article",
  },
};

export default function MyNewPostPage() {
  return (
    <BlogLayout
      title="Post Title"
      subtitle="Optional one-liner shown below the title"  // omit prop if not needed
      author={{ name: "Author Name", photo: "/author-photo.png" }}
      date="Month Day, Year"
    >
      {/* Blog content goes here as JSX children */}
      <p className="text-foreground/90 leading-relaxed">
        Opening paragraph...
      </p>

      <section className="rounded-2xl bg-secondary/50 border border-border p-6 md:p-8">
        <h2 className="text-xl font-bold text-foreground mb-4">
          Section Title
        </h2>
        <p className="text-foreground/90 leading-relaxed mb-4">
          Section content...
        </p>
      </section>
    </BlogLayout>
  );
}
```

#### BlogLayout props

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | Yes | The h1 of the post |
| `subtitle` | `string` | No | Shown as muted text below the title |
| `author.name` | `string` | Yes | Author display name |
| `author.photo` | `string` | Yes | Path to author photo in `public/` (e.g. `/sidd-adatrao.png`) |
| `date` | `string` | Yes | Publication date (e.g. "March 4, 2026") |
| `children` | `ReactNode` | Yes | The blog post body content |

#### Author photos

Place the author's photo in `public/` (e.g. `public/author-name.png`). Use a square image; it renders at 48x48 in a circle.

### 3. Content patterns

Use these consistent class patterns inside blog content:

- **Paragraphs**: `<p className="text-foreground/90 leading-relaxed">` (add `mb-4` when followed by more content in the same section)
- **Sections**: `<section className="rounded-2xl bg-secondary/50 border border-border p-6 md:p-8">`
- **Section headings**: `<h2 className="text-xl font-bold text-foreground mb-4">`
- **Lists**: `<ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">`
- **Ordered lists**: `<ol className="list-decimal pl-6 space-y-2 text-foreground/90 mb-2">`
- **Code blocks**: `<pre className="bg-background rounded-xl border border-border p-4 overflow-x-auto text-sm text-foreground/80 mb-6"><code>{...}</code></pre>`
- **Inline code**: `<code className="bg-background px-1.5 py-0.5 rounded text-sm border border-border">`
- **Callout boxes** (green): `<div className="rounded-xl bg-primary/5 border border-primary/20 p-4">`
- **Warning boxes** (red): `<div className="rounded-xl bg-destructive/5 border border-destructive/20 p-4">`
- **Blockquotes**: `<blockquote className="border-l-4 border-primary/40 pl-4 py-2 bg-primary/5 rounded-r-xl text-foreground/80 italic text-sm leading-relaxed">`
- **Side-by-side cards**: Wrap two divs in `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">`
- **Tables**: See the CSR vs SSR post for the table pattern

### 4. Add to the Header navigation

In `src/components/Header.tsx`, add a new `<DropdownMenuItem>` inside the Articles dropdown:

```tsx
<DropdownMenuItem asChild>
  <Link href="/articles/<slug>" className="cursor-pointer">
    Post Title
  </Link>
</DropdownMenuItem>
```

### 5. Add to the sitemap

In `public/sitemap.xml`, add a new `<url>` entry:

```xml
<url>
  <loc>https://usejurny.com/articles/<slug></loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### 6. Build and verify

Run `npm run build` to ensure the static export succeeds. The new page should appear in the `out/articles/<slug>/` directory.

## Checklist

- [ ] Created `src/app/articles/<slug>/page.tsx` with `Metadata` export and `BlogLayout`
- [ ] Author photo added to `public/`
- [ ] Added link in `src/components/Header.tsx` Articles dropdown
- [ ] Added entry in `public/sitemap.xml`
- [ ] `npm run build` passes
