# LaunchGood Applied AI Engineer Prototype

## Project

**Name:** Amanah — AI Campaign Review Copilot

**Goal:** Build a polished, deployed prototype demonstrating how AI could help LaunchGood's Trust & Safety / Operations team review fundraising campaigns faster without removing human judgment.

This is an application prototype for the LaunchGood Applied AI Engineer hiring challenge.

The prototype must be functional, interactive, and deployed.

Do **not** build a marketing landing page pretending to be an AI system.

The application itself must demonstrate meaningful AI work.

---

# 1. Product Concept

Build an internal LaunchGood-style review workspace.

A Trust & Safety reviewer receives a newly submitted fundraising campaign.

Today, reviewing a campaign can require examining:

- Campaign story
- Campaign creator
- Beneficiary information
- Location
- Requested fundraising amount
- Payment/bank information
- Identity documents
- Organization documents
- Supporting evidence
- Previous campaigns
- Potential sanctions/compliance concerns
- Donor activity
- Complaints/reports
- Communication with the campaign creator

LaunchGood publicly describes campaign review processes involving documentation checks, sanctions screening, enhanced due diligence, manual review, and fraud screening.

The prototype should demonstrate how AI can turn this fragmented information into an actionable review package.

---

# 2. Core User Story

The primary user is:

> A LaunchGood Trust & Safety reviewer handling dozens of campaign reviews.

The reviewer opens a campaign.

Instead of manually reading everything, the system automatically produces:

### Campaign Summary

What is this campaign?

Who is raising money?

Who benefits?

Where will the money go?

How much is being requested?

What evidence was provided?

### Verification Status

Show a structured checklist:

- Identity verified
- Beneficiary relationship established
- Bank information present
- Organization documentation present
- Location consistency
- Funding purpose explained
- Supporting evidence available
- Sanctions screening
- Previous campaign history
- Risk indicators

### AI Risk Assessment

Produce:

**Overall Risk: Medium**

with a score such as:

`62 / 100`

But do NOT make the score meaningless.

Every risk score must have evidence.

Example:

> **Medium Risk**
>
> The campaign claims to raise funds for medical treatment in Country X, but the beneficiary relationship is not clearly established and the submitted medical invoice contains a different beneficiary name.

Then expose:

**Why?**

- Beneficiary mismatch
- Supporting document mismatch
- High-risk geographic jurisdiction
- New account with no previous campaign history

Each finding must link back to the underlying source.

---

# 3. Most Important Feature: Evidence-Based AI

The AI must not simply say:

> "This campaign looks suspicious."

Instead it should produce evidence-backed findings.

Example:

### Finding

**Beneficiary identity mismatch**

**Severity:** High

**AI reasoning:**

Campaign:

> "I am raising money for my cousin Ahmed Khan."

Uploaded document:

> Patient: Muhammad Khan

Creator relationship:

> Cousin

The names do not match.

**Evidence**

`campaign_story.txt`
→ paragraph 4

`medical_invoice.pdf`
→ patient field

**Recommended action**

> Request clarification and documentation establishing the beneficiary relationship before approval.

Buttons:

`Request Information`

`Escalate`

`Dismiss`

---

# 4. Human / AI Boundary

This is extremely important.

The AI must **never directly approve, reject, freeze, refund, or remove a campaign.**

AI can:

- Extract information
- Compare information
- Detect inconsistencies
- Classify potential risk
- Summarize evidence
- Recommend questions
- Recommend escalation
- Prioritize cases
- Detect patterns

Human owns:

- Final approval
- Final rejection
- Compliance decisions
- Account restrictions
- Financial actions
- Campaign removal
- Communication that materially affects the fundraiser

The UI should make this distinction obvious.

Show:

> AI Recommendation

and separately:

> Human Decision

with buttons:

`Approve`

`Request More Information`

`Escalate to Senior Review`

`Reject`

The prototype should log the human decision.

---

# 5. Prototype Scenario

Use realistic mocked data.

Do NOT use real LaunchGood private data.

Create 6-10 fictional campaigns.

At least four should represent different review situations.

## Campaign A — Low Risk

Example:

**Emergency Medical Treatment for Fatima**

- Verified identity
- Clear beneficiary relationship
- Hospital invoice
- Consistent names
- Reasonable campaign goal
- Clear use of funds

AI outcome:

**Low Risk**

Recommendation:

`Approve`

---

## Campaign B — Medium Risk

Example:

**Help My Family Rebuild After Flooding**

Potential issues:

- Beneficiary relationship unclear
- Fund destination differs from campaign location
- Supporting document partially incomplete

AI outcome:

**Medium Risk**

Recommendation:

`Request Information`

---

## Campaign C — High Risk

Example:

**Urgent Medical Fund**

Potential issues:

- Beneficiary name differs across documents
- Medical document appears inconsistent
- Creator recently created account
- Requested amount significantly exceeds stated treatment costs
- Missing identity evidence

AI outcome:

**High Risk**

Recommendation:

`Escalate`

---

## Campaign D — Organization

Example:

**Water Wells for Rural Communities**

Provide:

- Organization registration
- Bank information
- Beneficiary information
- Project description
- Budget
- Previous campaign history

AI should determine what is complete and what remains unclear.

---

## Campaign E — False Positive

This is critical.

Create a campaign that initially looks unusual but is legitimate.

For example:

- Fundraiser is raising funds on behalf of a relative
- Beneficiary uses a different surname
- Country is different from fundraiser's country
- Documentation is legitimate

AI should say:

> Potential concern detected, but available evidence does not establish wrongdoing.

Recommendation:

`Human Review`

This demonstrates that the system is not just a "fraud detector."

---

# 6. Application Layout

Build an internal operations dashboard.

Use Nuxt.

Recommended stack:

- Nuxt 4
- TypeScript
- Vue 3
- Tailwind CSS
- Nuxt UI
- Supabase
- PostgreSQL
- Server API routes
- OpenAI or Anthropic API
- Zod
- PDF parsing
- Structured LLM outputs

Keep the architecture simple.

Do not over-engineer.

---

# 7. Routes

Create:

```text
/
```

Dashboard.

```text
/campaigns
```

Campaign review queue.

```text
/campaigns/[id]
```

Campaign review workspace.

```text
/campaigns/[id]/evidence
```

Evidence/document viewer.

```text
/campaigns/[id]/activity
```

Review history and AI/human actions.

```text
/knowledge
```

Internal policy/knowledge base.

```text
/evals
```

AI evaluation dashboard.

---

# 8. Dashboard

The home dashboard should immediately communicate operational value.

Top metrics:

```text
Pending Reviews        27
High Risk              4
Needs Information      9
AI-Assisted Reviews    83%
Median Review Time     11m
```

Then:

## Review Queue

Columns:

| Campaign | Type | Amount | Risk | Missing | AI Status | Age |
|---|---|---:|---|---|---|---:|
| Emergency Medical Fund | Medical | $12,500 | High | 3 | Escalate | 2h |
| Flood Recovery | Emergency | $8,000 | Medium | 2 | Request Info | 5h |
| Water Wells | Charity | $25,000 | Low | 0 | Approve | 1h |

Use realistic relative numbers.

---

# 9. Campaign Review Workspace

This is the main screen of the demo.

Use a three-column layout.

## Left

Campaign information.

Show:

- Title
- Creator
- Beneficiary
- Country
- Category
- Goal
- Amount raised
- Campaign creation date
- Previous campaigns

## Center

AI review.

Sections:

### Executive Summary

One concise paragraph.

### Key Findings

Cards:

```text
HIGH
Beneficiary mismatch

MEDIUM
Supporting documentation incomplete

LOW
New account
```

Each card includes:

- Finding
- Evidence
- Confidence
- Recommendation

### AI Recommendation

Example:

> **Request additional beneficiary documentation before approval.**

Then:

`Show reasoning`

which expands the structured evidence.

## Right

Human decision panel.

```text
Risk Score
62 / 100

Recommended Action
REQUEST INFORMATION

Required Actions
☐ Confirm beneficiary relationship
☐ Upload supporting medical document
☐ Confirm intended use of funds

[Approve]
[Request Information]
[Escalate]
[Reject]
```

Do not let the AI buttons execute dangerous actions automatically.

---

# 10. Evidence Viewer

This is what makes the prototype feel real.

Allow the reviewer to inspect fictional documents.

Documents:

```text
campaign_story.md
government_id.pdf
medical_invoice.pdf
organization_registration.pdf
bank_statement.pdf
beneficiary_letter.pdf
previous_campaign_history.json
```

When AI identifies a problem, clicking the finding should open the relevant document and highlight the relevant text.

Example:

AI says:

> "Beneficiary name mismatch."

Clicking it opens:

```text
medical_invoice.pdf

Patient:
Muhammad Khan
```

and compares it with:

```text
Campaign:

Beneficiary:
Ahmed Khan
```

The reviewer immediately understands why the AI raised the issue.

---

# 11. AI Pipeline

Build the AI system as explicit stages.

Do not create one giant prompt.

Pipeline:

```text
Campaign
   ↓
Document ingestion
   ↓
Structured extraction
   ↓
Entity normalization
   ↓
Cross-document comparison
   ↓
Policy retrieval
   ↓
Risk analysis
   ↓
Evidence generation
   ↓
Recommended action
   ↓
Human review
```

---

# 12. Structured Extraction

Convert campaign information into a structured object.

Example:

```ts
interface CampaignProfile {
  campaignId: string

  creator: {
    name: string
    country: string
    accountAgeDays: number
  }

  beneficiary: {
    name: string
    relationship: string
    country: string
  }

  campaign: {
    category: string
    goalAmount: number
    purpose: string
    countries: string[]
  }

  documents: {
    type: string
    status: "verified" | "missing" | "unclear"
  }[]
}
```

---

# 13. Entity Resolution

The AI should normalize names.

Example:

```text
Muhammad Ahmed Khan
Mohammed A. Khan
M. Ahmed Khan
```

These may refer to the same entity.

But the model must express uncertainty rather than assuming identity.

Example:

```text
Likely same person
Confidence: 0.83
```

The system should distinguish:

```text
Verified
Likely
Unclear
Contradictory
```

---

# 14. Policy Retrieval

Create a small fictionalized internal policy knowledge base based on publicly documented LaunchGood processes.

Examples:

```text
Campaign verification requirements
Identity verification
Organization documents
Beneficiary relationships
Sanctions screening
Payout requirements
Refund/chargeback handling
Complaint escalation
Zakat campaign requirements
```

Do not copy large sections of LaunchGood documentation.

Summarize them into internal policy cards.

The AI retrieves the relevant policy before making a recommendation.

Example:

User asks:

> Why is this campaign being escalated?

AI response:

> The campaign requires additional verification because the beneficiary relationship is unclear and supporting documentation is incomplete.

Then:

**Relevant Policy**

`Beneficiary Verification — Section 2.3`

This makes the prototype a real internal copilot instead of a generic chatbot.

---

# 15. Agent Architecture

Create several small tools rather than one fake "agent."

Recommended architecture:

```text
Review Orchestrator
│
├── Campaign Extractor
│
├── Document Analyzer
│
├── Entity Resolver
│
├── Consistency Checker
│
├── Policy Retriever
│
├── Risk Analyzer
│
├── Evidence Builder
│
└── Recommendation Generator
```

The orchestrator should call tools based on the case.

---

# 16. Tool Interfaces

Implement tools such as:

```ts
getCampaign(campaignId)

getCampaignDocuments(campaignId)

extractDocument(documentId)

getCreatorHistory(creatorId)

getPreviousCampaigns(creatorId)

searchPolicies(query)

checkInternalRiskSignals(campaignId)

compareEntities(entityA, entityB)

generateReviewBrief(campaignId)
```

These can operate on seeded Supabase/mock data.

---

# 17. Real AI Responsibility

The AI must perform actual inference.

It should:

1. Read multiple sources.
2. Extract structured information.
3. Compare entities.
4. Identify contradictions.
5. Retrieve relevant policies.
6. Determine which findings matter.
7. Produce evidence-backed recommendations.

Do not simply send one campaign description to an LLM and ask:

> "Is this suspicious?"

That would fail the hiring challenge.

---

# 18. AI Confidence

Every AI finding should have:

```text
Severity
Confidence
Evidence
Reason
Recommendation
```

Example:

```text
Severity: HIGH
Confidence: 91%

Finding:
Beneficiary identity mismatch

Evidence:
Campaign states "Ahmed Khan".
Medical invoice states "Muhammad Khan".

Reason:
The beneficiary identity is inconsistent across supplied sources.

Recommendation:
Request clarification and supporting documentation.
```

---

# 19. False Positive Protection

The system must explicitly acknowledge uncertainty.

Avoid:

```text
FRAUD DETECTED
```

Prefer:

```text
Potential Risk Detected

The available evidence is inconsistent.
Human verification is recommended.
```

This is a Trust & Safety system.

Avoid creating automated accusations.

---

# 20. Human Feedback

After making a decision, the reviewer should optionally select:

```text
AI was useful
AI missed something
AI was too cautious
AI was too aggressive
Incorrect evidence
Incorrect recommendation
```

Then allow a short note.

Example:

> "Beneficiary surname differs because this is the mother's maiden name."

Store this feedback.

Show it in the review history.

This demonstrates an improvement loop.

---

# 21. Audit Trail

Every AI-generated recommendation must be logged.

Example:

```text
10:42
AI completed review

10:43
Reviewer opened beneficiary mismatch

10:44
Reviewer requested additional information

10:46
Campaign creator response received

10:47
AI re-analyzed campaign

10:49
Reviewer approved
```

Make it visually convincing.

---

# 22. Re-review

This is an important feature.

After the reviewer requests additional information:

```text
Campaign status:
WAITING FOR INFORMATION
```

Provide:

`Upload New Evidence`

When evidence is uploaded:

```text
Run AI Re-review
```

The AI should compare the new evidence against previous findings.

Example:

Before:

```text
HIGH
Beneficiary identity mismatch
```

After upload:

```text
RESOLVED
Beneficiary identity verified by submitted documentation.
```

This makes the workflow feel like a real operational system rather than a static dashboard.

---

# 23. Support the "Multiple Sources" Requirement

Create an internal campaign dossier containing:

```text
Campaign page
Creator profile
Documents
Previous campaigns
Donor signals
Complaint reports
Policy documents
```

The AI should synthesize all of these.

This directly demonstrates the type of multi-source operational system LaunchGood asks candidates to build.

---

# 24. Optional Second AI Feature

Add a lightweight "Portfolio Risk Radar."

This should appear on the dashboard.

Instead of only reviewing campaigns one-by-one, show:

```text
AI detected:

7 campaigns with missing documentation
3 campaigns with unusual beneficiary inconsistencies
2 campaigns requiring senior review
1 cluster of campaigns sharing suspicious similarities
```

Clicking a signal should open the relevant campaigns.

This demonstrates systems thinking.

Do not attempt sophisticated fraud detection.

Use clearly labeled fictional signals.

---

# 25. Evaluation Dashboard

Create:

```text
/evals
```

Show a small benchmark of fictional cases.

Example:

```text
Cases evaluated       30
Evidence accuracy     93%
False positive rate   8%
Recommendation match 90%
Missing-risk recall   87%
```

Important:

These numbers must come from the seeded evaluation dataset.

Do not hard-code fake performance claims.

Actually run the evaluator over the test cases.

---

# 26. Evaluation Cases

Create 20-30 structured test cases.

Each case contains:

```ts
{
  id,
  scenario,
  documents,
  knownIssues,
  expectedRisk,
  expectedFindings,
  expectedAction
}
```

Run the AI against them.

Calculate:

- Finding precision
- Finding recall
- Recommendation agreement
- Unsupported-claim rate
- Evidence-grounding rate

This is one of the strongest ways to differentiate the prototype.

---

# 27. AI Safety Rules

The model must never:

- Declare someone a criminal
- Claim fraud without evidence
- Automatically reject a campaign
- Automatically suspend an account
- Automatically issue refunds
- Automatically move funds
- Invent evidence
- Invent policy
- Cite evidence that does not exist

Every material claim must have a source.

---

# 28. Demo Data

Use fictional people and organizations.

Example:

```text
Ahmed Rahman
Fatima Noor
Omar Hassan
Maryam Ali
Helping Hands Foundation
Global Relief Initiative
```

Use fictional PDFs and documents generated specifically for the demo.

Mark the application internally:

```text
DEMO DATA
```

Do not use private or scraped personal data.

---

# 29. Visual Design

The application should feel like a serious internal operations product.

Design principles:

- Clean
- Calm
- High information density
- Excellent typography
- Minimal decorative AI gimmicks
- Clear severity hierarchy
- Strong evidence presentation
- Responsive
- Desktop-first

Use LaunchGood as product inspiration, not something to clone.

LaunchGood positions itself around:

- global Muslim crowdfunding
- community support
- trusted giving
- fundraising
- organizations
- challenges
- specialized giving such as Zakat

Its public product includes community pages and fundraising campaigns, while its support ecosystem covers payments, tax, marketing, trust/safety, compliance and special events.

The prototype should therefore feel like an internal system supporting a large global giving operation.

---

# 30. Nuxt Architecture

Use:

```text
app/
├── pages/
│   ├── index.vue
│   ├── campaigns/
│   │   ├── index.vue
│   │   └── [id].vue
│   ├── knowledge.vue
│   └── evals.vue
│
├── components/
│   ├── dashboard/
│   ├── campaigns/
│   ├── review/
│   ├── evidence/
│   ├── ai/
│   └── ui/
│
├── composables/
│   ├── useCampaigns.ts
│   ├── useReview.ts
│   ├── useEvidence.ts
│   └── useAIReview.ts
│
├── server/
│   ├── api/
│   │   ├── campaigns/
│   │   ├── review/
│   │   ├── documents/
│   │   └── evaluations/
│   └── services/
│       ├── ai/
│       ├── retrieval/
│       └── analysis/
│
├── types/
└── utils/
```

Use server-side API routes for model calls.

Never expose API keys in client-side code.

---

# 31. Database Schema

Create Supabase tables:

```text
campaigns
campaign_documents
creators
beneficiaries
campaign_findings
review_sessions
review_actions
policies
policy_chunks
ai_runs
evaluation_cases
evaluation_results
```

Minimal relationships:

```text
Creator
  ↓
Campaign
  ↓
Documents
  ↓
AI Review
  ↓
Findings
  ↓
Human Review
```

---

# 32. API Endpoints

Implement:

```text
GET /api/campaigns

GET /api/campaigns/:id

GET /api/campaigns/:id/documents

POST /api/campaigns/:id/review

POST /api/campaigns/:id/rereview

POST /api/campaigns/:id/actions

GET /api/campaigns/:id/history

POST /api/evals/run
```

---

# 33. Review API Output

Use structured JSON.

Example:

```json
{
  "riskLevel": "medium",
  "riskScore": 62,
  "summary": "...",
  "findings": [
    {
      "id": "f-001",
      "severity": "high",
      "confidence": 0.91,
      "title": "Beneficiary identity mismatch",
      "reason": "...",
      "evidence": [
        {
          "source": "campaign_story",
          "quote": "..."
        },
        {
          "source": "medical_invoice",
          "quote": "..."
        }
      ],
      "recommendation": "Request additional beneficiary documentation"
    }
  ],
  "recommendedAction": "request_information",
  "missingInformation": [
    "Beneficiary relationship evidence"
  ]
}
```

Use Zod validation.

Reject malformed model output.

---

# 34. Knowledge Base

Create a small policy corpus from public LaunchGood concepts.

For example:

```text
campaign-review-policy.md
identity-verification.md
organization-verification.md
beneficiary-verification.md
payout-requirements.md
complaints-and-escalation.md
zakat-verification.md
refund-policy.md
```

Use RAG.

Do not hallucinate policies.

If the system cannot find a relevant policy, explicitly say:

> No relevant internal policy was found.

---

# 35. Agent Instructions

Agents building this project should work in this order:

## Agent 1 — Foundation

Create:

- Nuxt project
- TypeScript
- Tailwind
- Nuxt UI
- Supabase configuration
- Routing
- Layout
- Seed data

Do not implement AI yet.

---

## Agent 2 — Operations UI

Implement:

- Dashboard
- Campaign queue
- Campaign detail
- Risk cards
- Review panel
- Evidence viewer
- Audit timeline

Use realistic seeded data.

Make the application usable without AI first.

---

## Agent 3 — AI Extraction

Implement:

- Structured extraction
- Document parsing
- Entity normalization
- JSON schema validation

---

## Agent 4 — AI Review

Implement:

- Policy retrieval
- Cross-document comparison
- Risk analysis
- Evidence grounding
- Recommendations

---

## Agent 5 — Human Review

Implement:

- Approve
- Request information
- Escalate
- Reject
- Reviewer notes
- Feedback
- Audit trail

---

## Agent 6 — Evaluation

Implement:

- Evaluation dataset
- Automated evaluation
- Metrics
- `/evals`

---

## Agent 7 — Polish

Perform:

- Loading states
- Error states
- Empty states
- Mobile responsiveness
- Accessibility
- Performance
- Authentication
- Security review
- Deployment

---

# 36. UX Requirements

Do not make the reviewer wait unnecessarily.

Use:

```text
Analyzing campaign...
Extracting documents...
Checking consistency...
Searching policies...
Building review...
```

Then progressively render completed sections.

Show model latency.

Example:

```text
AI Review completed in 8.4s
```

Show which models/tools were used.

Example:

```text
LLM
Policy RAG
Document Extraction
Entity Matching
```

---

# 37. Failure Handling

Demonstrate what happens when AI fails.

Examples:

### Document unreadable

```text
Could not reliably extract information.

Human verification required.
```

### Model unavailable

```text
AI review temporarily unavailable.

Campaign remains in human review queue.
```

### Conflicting evidence

```text
Conflicting evidence detected.

AI recommendation suppressed.

Senior review recommended.
```

This is important for demonstrating engineering judgment.

---

# 38. Security

Implement:

- Server-side API keys
- Basic authentication
- Input validation
- File type validation
- File size limits
- No sensitive documents in public URLs
- Audit logging
- No PII in application logs

The demo dataset must be fictional.

---

# 39. Landing Page

The root page should NOT be a conventional startup landing page.

Instead make it the operations dashboard.

Header:

```text
AMANAH
Campaign Review Copilot

Trust & Safety Operations
```

Small subtitle:

> AI-assisted review for human-led decisions.

Then immediately show the queue.

The recruiter should understand the product within 10 seconds.

---

# 40. Demo Mode

Add a visible:

```text
Demo Environment
```

badge.

Create a button:

```text
Load High-Risk Demo
```

and:

```text
Load Low-Risk Demo
```

This makes the 5-minute walkthrough extremely easy.

---

# 41. Five-Minute Demo Flow

The video should follow exactly this workflow.

## 0:00–0:30

Explain:

> "I built Amanah, an AI campaign review copilot for LaunchGood-style Trust & Safety operations. The goal isn't to replace reviewers. It compresses the work required to investigate a campaign and makes every AI recommendation evidence-backed."

---

## 0:30–1:00

Show dashboard.

Point out:

```text
27 pending
4 high risk
9 awaiting information
```

Explain that AI prioritizes the review queue.

---

## 1:00–2:30

Open the high-risk campaign.

Show:

- campaign
- beneficiary
- documents
- AI findings

Click:

**Beneficiary mismatch**

Show both sources side-by-side.

Explain:

> "The model didn't simply classify this campaign as risky. It found a contradiction between two sources and cites the exact evidence."

---

## 2:30–3:15

Open:

**Policy Evidence**

Show retrieved policy.

Explain:

> "The recommendation is grounded in a policy retrieved from the internal knowledge base."

---

## 3:15–4:00

Human reviewer chooses:

**Request More Information**

Show that AI does NOT take the action automatically.

Add a reviewer note.

Show audit trail.

---

## 4:00–4:30

Upload the missing fictional document.

Click:

**Re-review**

AI updates:

```text
Previously:
HIGH

Now:
MEDIUM

Finding resolved:
Beneficiary verification
```

This demonstrates iterative AI assistance.

---

## 4:30–5:00

Open `/evals`.

Show:

- benchmark cases
- evidence-grounding score
- recommendation accuracy
- false-positive cases

End with:

> "The important design choice is that AI owns analysis, not authority. The system makes reviewers faster while keeping consequential decisions human-controlled."

---

# 42. What NOT to Build

Do NOT build:

- Generic ChatGPT clone
- AI campaign copywriter
- Generic fundraising chatbot
- Simple PDF summarizer
- Generic RAG chatbot
- Fake "fraud detection" number
- Marketing analytics dashboard with an LLM attached
- Autonomous campaign approval system
- Autonomous campaign rejection system

The recruiter should be able to ask:

> "What work did the AI actually do?"

and the answer should be:

> "It ingested multiple sources, extracted structured entities, cross-checked evidence, retrieved policy, identified contradictions, prioritized risk, generated an evidence-backed recommendation, and re-evaluated the case when new evidence arrived."

---

# 43. Definition of Done

The project is complete only when all of the following work:

- [ ] Publicly deployed application
- [ ] Dashboard loads
- [ ] Campaign queue works
- [ ] Campaign detail works
- [ ] Documents can be inspected
- [ ] AI review actually runs
- [ ] Findings include evidence
- [ ] Policy retrieval works
- [ ] Risk recommendation works
- [ ] Human decision works
- [ ] Audit trail works
- [ ] Re-review works
- [ ] Evaluation suite runs
- [ ] Error states work
- [ ] Demo data is fictional
- [ ] No API keys are exposed
- [ ] Application works without manual code intervention
- [ ] 5-minute walkthrough can be recorded cleanly

---

# 44. Deployment

Preferred:

```text
Nuxt
↓
Vercel
↓
Supabase
↓
LLM API
```

Use environment variables:

```text
SUPABASE_URL
SUPABASE_ANON_KEY
OPENAI_API_KEY
```

Never commit secrets.

Create:

```text
README.md
```

with:

- Architecture
- AI responsibility
- Human/AI boundary
- Evaluation methodology
- Known limitations
- Deployment instructions

---

# 45. Final Product Positioning

The product should communicate:

> **AI doesn't decide whether a campaign deserves trust. It helps the people responsible for that decision see the evidence faster.**

That should be the core design philosophy throughout the application.

---

# 46. Priority Order

When time is limited, prioritize in this exact order:

### P0

Campaign review workflow.

### P0

Evidence-backed AI findings.

### P0

Human-in-the-loop decision.

### P0

Re-review after new evidence.

### P1

Policy RAG.

### P1

Audit trail.

### P1

Evaluation suite.

### P2

Portfolio risk radar.

### P2

Advanced analytics.

Do not sacrifice the core workflow to build secondary features.

---

# 47. Success Criterion

A LaunchGood engineer watching the demo should think:

> "This person understood the operational problem."

Not:

> "This person made a pretty AI dashboard."

The prototype should demonstrate:

**Problem judgment + AI responsibility + human oversight + systems thinking + evaluation + production-minded engineering.**