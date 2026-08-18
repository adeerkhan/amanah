# Amanah — Phased Product Development Plan

## Purpose

Build **Amanah**, an AI Campaign Review Copilot, as a production-style prototype for the LaunchGood Applied AI Engineer application.

The development strategy is deliberately incremental:

> **Working workflow first → real AI second → human oversight third → evaluation and robustness last → deployment and polish throughout.**

Do not attempt to build the entire system at once.

Each phase must leave the repository in a runnable state.

---

# Phase 0 — Project Initialization

## Objective

Establish a clean Nuxt application and development foundation.

## Deliverables

- Nuxt 4 application
- TypeScript
- Tailwind CSS
- Nuxt UI
- ESLint / formatting
- Environment configuration
- Git repository
- Supabase project configuration
- Basic application shell
- Development seed script

## Initial routes

```text
/
 /campaigns
 /campaigns/[id]
 /knowledge
 /evals
```

## Initial components

```text
AppShell
Sidebar
TopBar
PageHeader
StatCard
DataTable
Badge
Button
Modal
Drawer
EmptyState
LoadingState
ErrorState
```

## Data strategy

Start with local mock data.

Do not introduce AI or database complexity yet.

Create:

```text
/data
  campaigns.ts
  creators.ts
  documents.ts
  policies.ts
```

## Definition of Done

- Application starts locally.
- Navigation works.
- All primary routes render.
- Mock campaign data can be displayed.
- No major UI is hard-coded into individual pages.

---

# Phase 1 — Operations Dashboard

## Objective

Build the internal Trust & Safety workspace before adding AI.

The application should already feel useful as a manual review tool.

## Build

### Dashboard

Show:

```text
Pending Reviews
High Risk
Needs Information
Completed Today
Median Review Time
```

### Campaign queue

Columns:

```text
Campaign
Creator
Category
Goal
Risk
Status
Age
Assigned Reviewer
```

Support:

- Sorting
- Filtering
- Search
- Risk filtering
- Status filtering

### Campaign page

Display:

- Campaign title
- Campaign description
- Creator
- Beneficiary
- Location
- Goal
- Amount raised
- Campaign category
- Campaign status
- Documents
- Previous campaigns

## Status model

```ts
type CampaignStatus =
  | "pending"
  | "in_review"
  | "needs_information"
  | "escalated"
  | "approved"
  | "rejected"
```

## Definition of Done

A reviewer can manually open a campaign and understand everything required to begin a review.

---

# Phase 2 — Evidence Workspace

## Objective

Make the prototype capable of presenting multiple sources of information together.

This is where the product begins to resemble a serious operational system.

## Build

Create an evidence panel with:

```text
Campaign Story
Creator Profile
Beneficiary Information
Identity Documents
Medical / Supporting Documents
Organization Documents
Previous Campaigns
Internal Reports
```

## Document viewer

Support:

- PDF
- Markdown
- JSON
- Plain text

For the prototype, documents can be seeded fictional files.

## Evidence metadata

Every document should expose:

```text
Document type
Uploaded date
Source
Verification status
```

## Side-by-side comparison

Allow the reviewer to compare:

```text
Campaign Information
        ↕
Supporting Evidence
```

Example:

```text
Campaign beneficiary:
Ahmed Khan

Medical document:
Muhammad Khan
```

## Definition of Done

A reviewer can manually identify inconsistencies without leaving the campaign workspace.

---

# Phase 3 — Structured AI Extraction

## Objective

Introduce the first meaningful AI capability.

The AI should convert unstructured campaign information into structured data.

## Pipeline

```text
Campaign
   ↓
Document ingestion
   ↓
LLM extraction
   ↓
Structured JSON
   ↓
Validation
   ↓
Campaign profile
```

## Extract

### Creator

```text
name
country
account age
organization
```

### Beneficiary

```text
name
relationship
country
```

### Campaign

```text
category
purpose
goal amount
location
```

### Documents

```text
document type
entities
dates
amounts
verification signals
```

## Technical implementation

Use:

```text
LLM
+
structured outputs
+
Zod
+
server-side API route
```

Do not let the client directly call the LLM.

## Validation

Every AI response must pass schema validation.

Invalid output:

```text
→ reject
→ retry / repair
→ surface failure if necessary
```

## Definition of Done

Clicking:

**Analyze Campaign**

produces a structured campaign profile derived from the supplied data.

---

# Phase 4 — Entity Resolution & Consistency Checking

## Objective

Make AI reason across multiple sources rather than merely summarizing them.

This is the first major differentiating capability.

## Build

Create comparison tools for:

```text
Names
Locations
Relationships
Dates
Amounts
Organizations
Beneficiaries
```

## Example

Campaign:

```text
Ahmed Khan
```

Document:

```text
Muhammad Khan
```

System:

```text
Potential entity mismatch
Confidence: 0.91
```

Another example:

Campaign:

```text
Treatment required: $8,000
```

Medical invoice:

```text
Total: $2,100
```

System:

```text
Funding amount substantially exceeds supplied treatment cost.
```

## Finding structure

```ts
interface Finding {
  id: string
  severity: "low" | "medium" | "high"
  confidence: number
  title: string
  explanation: string
  evidence: EvidenceReference[]
  recommendation: string
}
```

## Critical requirement

Every finding must contain evidence.

Never produce:

```text
"This campaign looks suspicious."
```

without explaining why.

## Definition of Done

The AI can identify contradictions across at least three different source types.

---

# Phase 5 — Policy Knowledge Base

## Objective

Give the AI access to operational rules rather than relying solely on model knowledge.

## Build

Create a small policy corpus:

```text
campaign-review-policy.md
identity-verification.md
beneficiary-verification.md
organization-verification.md
payout-requirements.md
complaints-escalation.md
zakat-verification.md
```

These should be concise, fictionalized operational summaries derived from publicly available concepts.

Do not scrape or reproduce private LaunchGood policies.

## Retrieval pipeline

```text
Finding
   ↓
Policy query
   ↓
Relevant policy chunks
   ↓
LLM reasoning
   ↓
Recommendation
```

## UI

For each finding show:

```text
Relevant Policy

Beneficiary Verification
Section 2.3
```

Allow the reviewer to expand the policy evidence.

## Definition of Done

The AI can explain:

1. What it found.
2. Why it matters.
3. Which policy is relevant.
4. What action it recommends.

---

# Phase 6 — AI Review Engine

## Objective

Combine extraction, consistency analysis, evidence and policy retrieval into one review workflow.

## Architecture

```text
                 Campaign
                    │
                    ▼
              Review Engine
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
  Extraction   Consistency    History
       │            │            │
       └────────────┼────────────┘
                    ▼
               Policy RAG
                    │
                    ▼
              Risk Analysis
                    │
                    ▼
           Evidence-backed Findings
                    │
                    ▼
             Recommendation
```

## Review output

```json
{
  "riskLevel": "medium",
  "riskScore": 62,
  "summary": "...",
  "findings": [],
  "missingInformation": [],
  "recommendedAction": "request_information"
}
```

## Recommended actions

Only:

```text
approve
request_information
escalate
reject
```

But these remain **recommendations**.

The AI must never execute them autonomously.

## Definition of Done

One click:

`Run AI Review`

produces a complete evidence-backed review.

---

# Phase 7 — Human-in-the-Loop Workflow

## Objective

Make the human/AI boundary explicit.

This phase is essential for the hiring challenge.

## Build

Create the reviewer decision panel.

```text
AI Recommendation
      ↓
Human Decision
```

Actions:

```text
Approve
Request Information
Escalate
Reject
```

## Reviewer feedback

After deciding:

```text
AI was useful
AI was too cautious
AI was too aggressive
AI missed something
Incorrect evidence
Incorrect recommendation
```

Allow free-text notes.

## Important behavior

The AI cannot execute:

```text
approve
reject
freeze
refund
```

It can only recommend.

## Definition of Done

A complete campaign review can move from:

```text
AI analysis
→
human decision
→
stored outcome
```

---

# Phase 8 — Audit Trail

## Objective

Make all consequential interactions traceable.

## Record

```text
AI review started
AI extraction completed
Finding generated
Reviewer opened finding
Reviewer viewed evidence
Reviewer requested information
Reviewer added note
Document uploaded
AI re-review completed
Reviewer approved
```

## UI

Build a timeline:

```text
10:42
AI review completed

10:43
Reviewer opened beneficiary mismatch

10:44
Additional evidence requested

10:47
New document uploaded

10:48
AI re-review completed

10:50
Campaign approved
```

## Definition of Done

A reviewer or manager can reconstruct what happened during a campaign review.

---

# Phase 9 — Re-review Workflow

## Objective

Demonstrate that AI can operate continuously as new evidence arrives.

This should become one of the strongest parts of the demo.

## Workflow

```text
AI identifies issue
      ↓
Human requests information
      ↓
New document arrives
      ↓
AI re-runs analysis
      ↓
Previous findings reassessed
      ↓
Resolved / unresolved
```

## Example

Before:

```text
HIGH

Beneficiary identity mismatch
```

After document upload:

```text
RESOLVED

Beneficiary identity verified
```

## UI

Show finding states:

```text
Open
Resolved
Still unresolved
Superseded
```

## Definition of Done

The system can demonstrate a visible before/after change following new evidence.

---

# Phase 10 — Review Queue Intelligence

## Objective

Move from individual campaign analysis to operational prioritization.

## Build

Allow AI to rank campaigns by review priority.

Example:

```text
Priority 1
High confidence identity inconsistency

Priority 2
Missing critical documentation

Priority 3
Unusual campaign pattern

Priority 4
Low-risk complete campaign
```

## Dashboard

Add:

```text
AI Priority Queue
```

Example:

```text
1. Emergency Medical Fund        HIGH
2. Flood Recovery                HIGH
3. Water Wells                   MEDIUM
4. Ramadan Food Drive             LOW
```

## Important

Do not equate:

```text
High priority = fraud
```

Priority means:

> Requires human attention sooner.

## Definition of Done

The dashboard can help a reviewer decide what to investigate first.

---

# Phase 11 — Portfolio Risk Radar

## Objective

Demonstrate systems thinking.

Instead of analyzing only one campaign, identify patterns across the dataset.

## Signals

Examples:

```text
7 campaigns missing documentation
3 campaigns with beneficiary inconsistencies
2 campaigns sharing unusual patterns
5 campaigns awaiting reviewer action
```

## Optional relationship graph

Visualize:

```text
Creator
 ├── Campaign A
 ├── Campaign B
 └── Campaign C
```

and:

```text
Beneficiary
 ├── Campaign A
 └── Campaign C
```

Use this carefully.

The graph should surface patterns for investigation, not accuse users.

## Definition of Done

The prototype can show value at both:

```text
case level
```

and:

```text
portfolio level
```

---

# Phase 12 — Evaluation Framework

## Objective

Demonstrate that the AI system is measurable rather than "seems good."

This is one of the most important engineering phases.

## Dataset

Create:

```text
20–30 fictional cases
```

Each case should contain:

```text
scenario
documents
knownIssues
expectedFindings
expectedRisk
expectedAction
```

Include:

- Clear low-risk cases
- Clear high-risk cases
- Ambiguous cases
- False-positive cases
- Missing-document cases
- Contradictory-document cases
- Edge cases

## Metrics

Measure:

```text
Finding precision
Finding recall
Recommendation agreement
Evidence grounding
Unsupported-claim rate
False-positive rate
```

## Example

```text
Cases evaluated: 30

Finding precision: 91%
Finding recall: 87%
Recommendation agreement: 90%
Evidence grounding: 96%
Unsupported claims: 3%
```

Only display numbers actually generated by the evaluator.

## Definition of Done

`/evals` executes an automated evaluation run and displays the resulting metrics.

---

# Phase 13 — Failure & Reliability Engineering

## Objective

Show how the system behaves when the world is messy.

## Failure scenarios

Test:

### Missing document

```text
Document unavailable.
```

### Corrupted document

```text
Document could not be parsed.
```

### Conflicting evidence

```text
Evidence conflict detected.
Human review required.
```

### LLM failure

```text
AI service unavailable.
Campaign remains in manual review.
```

### Invalid model output

```text
AI response failed validation.
Retrying...
```

### Low-confidence reasoning

```text
Insufficient evidence for reliable recommendation.
```

## Principle

Failure should degrade into:

> **more human involvement**

not:

> **more automation.**

## Definition of Done

All critical AI failures result in safe fallback behavior.

---

# Phase 14 — Security & Privacy

## Objective

Make the prototype production-minded.

## Implement

- Server-side API calls
- Environment variable secrets
- Authentication
- Authorization
- Input validation
- File validation
- File size limits
- Secure storage
- Audit logging
- No sensitive information in logs
- No public document URLs

## Demo data

All identities and documents must remain fictional.

## Definition of Done

No secrets are exposed client-side and no demo data contains real personal information.

---

# Phase 15 — Performance & UX Polish

## Objective

Make the application feel fast and credible.

## Improve

### Loading

Use progressive states:

```text
Reading campaign...
Analyzing documents...
Comparing entities...
Checking policies...
Generating recommendation...
```

### Streaming

Where appropriate, progressively display AI results.

### Caching

Cache:

- Policy retrieval
- Parsed documents
- Campaign extraction
- Completed evaluations

### UI

Add:

- Empty states
- Skeleton loaders
- Error messages
- Toasts
- Keyboard navigation
- Responsive layouts
- Accessibility

## Definition of Done

The system feels like an internal product rather than a hackathon demo.

---

# Phase 16 — Production Deployment

## Architecture

Use the simplest deployment architecture possible:

```text
Nuxt
   ↓
Vercel
   ↓
Supabase
   ↓
LLM API
```

## Environment variables

```text
SUPABASE_URL
SUPABASE_ANON_KEY
OPENAI_API_KEY
```

## Deployment checklist

```text
Build succeeds
Environment variables configured
Database migrated
Seed data loaded
AI endpoint works
Authentication works
No secrets exposed
Error handling works
```

## Definition of Done

A recruiter can open the public URL and use the prototype without instructions.

---

# Phase 17 — Demo Mode

## Objective

Remove all friction from the application walkthrough.

Add:

```text
Demo Environment
```

and buttons:

```text
Load Low-Risk Case
Load Medium-Risk Case
Load High-Risk Case
```

For the best demo, create one carefully designed high-risk scenario.

## Recommended sequence

```text
Dashboard
   ↓
High-risk campaign
   ↓
AI Review
   ↓
Beneficiary mismatch
   ↓
Evidence comparison
   ↓
Policy evidence
   ↓
Request information
   ↓
Upload document
   ↓
Re-review
   ↓
Finding resolved
   ↓
Human approval
   ↓
Audit trail
   ↓
Evaluation dashboard
```

This should require almost no setup during recording.

---

# Phase 18 — Final Application Polish

## Objective

Make the prototype presentation-quality.

## Final review

Check:

### Product

- Does the problem appear real?
- Does the workflow make sense?
- Is AI doing meaningful work?

### AI

- Are outputs structured?
- Are findings evidence-backed?
- Does the system handle uncertainty?
- Are hallucinations controlled?

### Human/AI boundary

- Can AI approve or reject automatically?
- If yes, fix it.
- Is the human decision visible?
- Is reviewer feedback captured?

### Engineering

- Are API calls server-side?
- Are failures handled?
- Is data validated?
- Are model outputs evaluated?

### UX

- Can a new user understand the system immediately?
- Does every important action have feedback?
- Does the interface feel operational?

---

# Development Order

The implementation should follow this sequence:

```text
Phase 0
Foundation
   ↓
Phase 1
Operations Dashboard
   ↓
Phase 2
Evidence Workspace
   ↓
Phase 3
AI Extraction
   ↓
Phase 4
Entity + Consistency Analysis
   ↓
Phase 5
Policy RAG
   ↓
Phase 6
AI Review Engine
   ↓
Phase 7
Human Review
   ↓
Phase 8
Audit Trail
   ↓
Phase 9
Re-review
   ↓
Phase 10
Queue Intelligence
   ↓
Phase 11
Portfolio Radar
   ↓
Phase 12
Evaluation
   ↓
Phase 13
Reliability
   ↓
Phase 14
Security
   ↓
Phase 15
UX / Performance
   ↓
Phase 16
Deployment
   ↓
Phase 17
Demo Mode
   ↓
Phase 18
Final Polish
```

---

# Agent Delegation Strategy

Do not give all phases to one coding agent in one instruction.

Use specialized implementation tasks.

## Agent Group 1 — Product Foundation

Own:

```text
Phase 0
Phase 1
Phase 2
```

Output:

> Fully functional manual review application.

---

## Agent Group 2 — AI Core

Own:

```text
Phase 3
Phase 4
Phase 5
Phase 6
```

Output:

> Working evidence-backed AI review engine.

---

## Agent Group 3 — Workflow

Own:

```text
Phase 7
Phase 8
Phase 9
```

Output:

> Human-in-the-loop review lifecycle.

---

## Agent Group 4 — Intelligence

Own:

```text
Phase 10
Phase 11
Phase 12
```

Output:

> Queue intelligence + evaluation system.

---

## Agent Group 5 — Production

Own:

```text
Phase 13
Phase 14
Phase 15
Phase 16
```

Output:

> Reliable, secure, deployed application.

---

## Agent Group 6 — Demo

Own:

```text
Phase 17
Phase 18
```

Output:

> Recruiter-ready demonstration.

---

# Git Strategy

Create one branch per phase.

Example:

```text
main

feature/phase-01-dashboard
feature/phase-02-evidence
feature/phase-03-ai-extraction
feature/phase-04-consistency
feature/phase-05-policy-rag
feature/phase-06-review-engine
feature/phase-07-human-review
feature/phase-08-audit
feature/phase-09-rereview
feature/phase-10-priority
feature/phase-11-portfolio
feature/phase-12-evals
feature/phase-13-reliability
feature/phase-14-security
feature/phase-15-polish
feature/phase-16-deployment
```

Every phase should be independently reviewable.

---

# Priority Model

Not every feature deserves equal engineering effort.

## P0 — Must Have

```text
Campaign review
Evidence viewer
AI extraction
Cross-source reasoning
Evidence-backed findings
Human decision
Re-review
```

## P1 — Strong Differentiators

```text
Policy RAG
Audit trail
Evaluation framework
Failure handling
Priority queue
```

## P2 — Nice to Have

```text
Portfolio radar
Relationship graph
Advanced analytics
More sophisticated UI
```

If time becomes constrained, stop expanding P2 and make P0 excellent.

---

# Critical Product Principle

The prototype should continuously communicate one idea:

```text
                    AI
             analyzes evidence
                    │
                    ▼
             recommends action
                    │
                    ▼
                 HUMAN
          makes consequential decision
                    │
                    ▼
                 SYSTEM
               records outcome
                    │
                    ▼
               AI LEARNS FROM
                 FEEDBACK
```

The goal is not autonomous moderation.

The goal is **human decision-making amplified by AI.**

---

# Final Definition of Done

Amanah is ready for submission when a recruiter can:

1. Open the deployed URL.
2. See a realistic review queue.
3. Open a campaign.
4. Run an actual AI review.
5. See meaningful findings.
6. Click a finding and inspect its evidence.
7. See the relevant policy.
8. Understand the AI's uncertainty.
9. Make a human decision.
10. Request additional evidence.
11. Upload new evidence.
12. Run a re-review.
13. See a finding become resolved.
14. Inspect the audit history.
15. Open the evaluation dashboard.
16. Understand how the system would fail safely.

At that point, this is no longer merely a frontend prototype.

It demonstrates the exact capabilities LaunchGood is asking for:

> **problem selection, applied AI, multi-source reasoning, human/AI boundary design, judgment under uncertainty, evaluation, and production-minded systems engineering.**