import type { Metadata } from "next";
import PolicyPage, { type PolicySection } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Jurny Platform Privacy Policy",
  description:
    "Learn how Jurny AI, Inc. handles information when business customers and their authorized users use the Jurny platform.",
  alternates: { canonical: "/privacy" },
};

const privacyEmail = (
  <a
    className="font-medium text-primary underline-offset-4 hover:underline"
    href="mailto:privacy@usejurny.com"
  >
    privacy@usejurny.com
  </a>
);

const sections: PolicySection[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <p>
          We receive information you submit when using the Services or communicating with us for
          account administration and support.
        </p>
        <p>
          Customers provide anonymized data for the custom models and simulations they request.
          Depending on the engagement, this may include anonymized behavioral data, survey
          responses, customer research, session replay, and previous A/B tests. We also process the
          inputs, configurations, and outputs associated with those Services. Customers should
          provide only information they are authorized to share and ensure that data described as
          anonymized cannot reasonably identify an individual.
        </p>
        <p>
          When you access the platform, we may collect standard technical and usage information,
          such as your IP address, browser and device type, operating system, pages or features
          accessed, time spent using the Services, access dates and times, and diagnostic logs.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How we use information",
    content: (
      <>
        <p>
          We use information to operate the platform, manage accounts, provide customer support,
          develop and run customer-specific models and simulations, and deliver results. We also use
          relevant account and operational information to troubleshoot problems, maintain security,
          prevent misuse, communicate about the Services, and satisfy legal obligations.
        </p>
        <p>
          Our use of customer provided training data is limited to providing the Services agreed
          with that customer. Uses of account and operational information do not expand the training
          permissions described below.
        </p>
      </>
    ),
  },
  {
    id: "customer-data-and-model-training",
    title: "Customer data and model training",
    content: (
      <>
        <p>
          We use customer provided training data to create and support that customer’s custom model
          and agreed simulations. We do not use this data to train or improve Jurny’s general or
          shared models, or models for other customers.
        </p>
        <p>
          When we process personal information on a customer’s behalf, we act under that customer’s
          instructions and the applicable customer agreement, including any data processing
          agreement. The customer is responsible for the collection of that information and any
          required notices or permissions. The customer’s own privacy notice governs its
          relationship with the individuals concerned.
        </p>
      </>
    ),
  },
  {
    id: "retention-and-delivery",
    title: "Retention and delivery of models",
    content: (
      <>
        <p>
          We retain customer provided data and the customer’s custom model during the customer
          relationship to provide the agreed Services. When the customer relationship ends, we
          delete the customer provided data and our copies of the custom model from our systems in
          accordance with the customer agreement and applicable law. We provide the customer with
          the resulting model in accordance with the customer agreement.
        </p>
        <p>
          Deletion includes associated training copies and intermediate model files under our
          control. Residual copies in backups are removed through the applicable backup retention
          cycle and are not used to continue providing Services after termination. We arrange for
          relevant service providers to delete customer data held on our behalf. Information that
          must be retained by law is kept only for that purpose. We retain account, support,
          billing, and security records as reasonably necessary to meet legal obligations, maintain
          security, and resolve disputes.
        </p>
      </>
    ),
  },
  {
    id: "disclosure",
    title: "Disclosure of information",
    content: (
      <>
        <p>
          We may disclose information to providers of cloud hosting and storage, authentication, AI
          processing, communications, customer support, analytics, and payment processing, as needed
          to operate the Services and perform the functions for which they are engaged. We may also
          disclose information to professional advisers supporting our business.
        </p>
        <p>
          Jurny does not sell personal information, share it for cross-context behavioral
          advertising, or use it for targeted advertising.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    content: (
      <p>
        We take reasonable measures to protect information against unauthorized access, use,
        alteration, and disclosure. Customers and authorized users should protect account
        credentials and use appropriate channels when providing data to Jurny.
      </p>
    ),
  },
  {
    id: "privacy-requests",
    title: "Privacy requests",
    content: (
      <>
        <p>
          Depending on the laws that apply, you may have rights to access, correct, delete, or
          obtain a copy of personal information. To make a request, contact us at the email address
          below.
        </p>
        <p>
          If your request concerns information a business customer supplied to Jurny, contact that
          customer directly. We assist the customer with relevant requests as required by our
          agreement and applicable law. Where applicable, you may appeal our response by contacting
          us or raise a complaint with your privacy regulator.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    content: (
      <p>
        The Services are intended for adults acting on behalf of business customers and are not
        intended for anyone under 18. We do not knowingly collect personal information from
        children. If we learn that a child has provided personal information, we will take steps to
        delete it. Please contact us if you believe this has occurred.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this policy as our Services or practices change. We will make the updated
        policy available with a revised date and provide additional notice where required by law.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <p>
        For questions about this policy or requests concerning personal information, contact Jurny
        AI, Inc. at {privacyEmail}.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title="Jurny Platform Privacy Policy"
      description="Jurny AI, Inc. (“Jurny,” “we,” “us,” or “our”) provides a platform for customer simulation, custom model training, and related analysis (the “Services”). This Privacy Policy explains how we handle information when business customers and their authorized users use the Services, including data customers provide for training and simulation."
      updated="October 2, 2026"
      sections={sections}
    />
  );
}
