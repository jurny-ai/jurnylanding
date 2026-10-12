import type { Metadata } from "next";
import Link from "next/link";
import PolicyPage, { type PolicySection } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Jurny Terms of Use",
  description:
    "Terms governing the customer simulation, custom model training, and related analysis services provided by Jurny AI, Inc.",
  alternates: { canonical: "/terms" },
};

const sections: PolicySection[] = [
  {
    id: "using-the-services",
    title: "Using the Services",
    content: (
      <>
        <p>
          You may use the Services for your organization’s business purposes, subject to these Terms
          and your applicable agreement. You are responsible for protecting your account credentials
          and for activity by your authorized users.
        </p>
        <p>
          You must not use the Services unlawfully, infringe others’ rights, bypass security
          controls, introduce malicious code, or disrupt the Services. You may direct simulations
          only toward websites, applications, and environments you are authorized to test.
        </p>
      </>
    ),
  },
  {
    id: "customer-data",
    title: "Customer Data",
    content: (
      <>
        <p>
          You retain your rights in the data and materials you provide (“Customer Data”). You
          authorize Jurny to process Customer Data to provide and support the Services, including the
          training and simulations you request.
        </p>
        <p>
          You are responsible for having the rights and permissions necessary to provide Customer
          Data and authorize its use. Data submitted for training and simulation must be anonymized
          unless otherwise agreed in writing.
        </p>
        <p>
          These Terms do not authorize Jurny to use Customer Data to train models for other customers
          or general-purpose models. Our{" "}
          <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/privacy">
            Privacy Policy
          </Link>{" "}
          and any applicable data processing agreement explain how we handle information.
        </p>
      </>
    ),
  },
  {
    id: "ownership-and-outputs",
    title: "Ownership and Outputs",
    content: (
      <>
        <p>
          Jurny retains its rights in the platform, software, and underlying technology. You may use
          reports and simulation outputs delivered to you for your business purposes, subject to
          your applicable agreement.
        </p>
        <p>
          Rights to custom models, model weights, and other bespoke deliverables are governed by
          your written agreement. Access to the Services does not itself transfer ownership of
          Jurny’s technology or underlying models.
        </p>
      </>
    ),
  },
  {
    id: "simulation-results",
    title: "Simulation Results",
    content: (
      <>
        <p>
          The Services produce AI-generated simulations, estimates, and analysis that may be
          inaccurate or incomplete. Results may differ from actual customer behavior.
        </p>
        <p>
          You are responsible for evaluating outputs before relying on them. Jurny does not
          guarantee particular test outcomes, conversion improvements, revenue increases, or other
          business results.
        </p>
      </>
    ),
  },
  {
    id: "service-terms-and-suspension",
    title: "Service Terms and Suspension",
    content: (
      <>
        <p>
          Fees, service periods, and any support commitments are governed by your applicable order
          form or written agreement.
        </p>
        <p>
          We may suspend or terminate access for a material violation of these Terms, or suspend
          access where reasonably necessary to address a security threat or unlawful activity. Where
          practical, we will provide notice and an opportunity to resolve the issue.
        </p>
      </>
    ),
  },
  {
    id: "disclaimers-and-liability",
    title: "Disclaimers and Liability",
    content: (
      <>
        <p>
          Except as expressly provided in a separate written agreement, the Services are provided
          “as is” and “as available.” To the extent permitted by law, Jurny disclaims implied
          warranties of merchantability, fitness for a particular purpose, and noninfringement.
        </p>
        <p>
          To the extent permitted by law, Jurny will not be liable for indirect, incidental, special,
          consequential, or punitive damages, including lost profits or revenue. Jurny’s total
          liability arising from these Terms or the Services will not exceed the greater of $100 or
          the fees you paid Jurny for the Services during the twelve months preceding the event
          giving rise to the claim.
        </p>
        <p>
          These limitations do not apply to fraud, willful misconduct, or liability that cannot
          lawfully be limited.
        </p>
      </>
    ),
  },
  {
    id: "changes-and-governing-law",
    title: "Changes and Governing Law",
    content: (
      <>
        <p>
          We may update these Terms and will provide reasonable advance notice of material changes.
          Changes apply prospectively and do not amend a separate signed agreement except through
          that agreement’s amendment process.
        </p>
        <p>
          Unless your written agreement provides otherwise, Delaware law governs these Terms,
          excluding its conflict-of-law rules.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        Questions about these Terms may be sent to{" "}
        <a
          className="font-medium text-primary underline-offset-4 hover:underline"
          href="mailto:support@usejurny.com"
        >
          support@usejurny.com
        </a>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title="Jurny Terms of Use"
      description="These Terms govern your use of the customer simulation, custom model training, and related analysis services provided by Jurny AI, Inc. (“Jurny,” “we,” “us,” or “our”). By accepting these Terms, you agree to them on behalf of yourself or the organization you represent. You must have authority to act for that organization. If your organization has a separate written agreement with Jurny, that agreement controls wherever it conflicts with these Terms."
      updated="October 2, 2026"
      sections={sections}
    />
  );
}
