# Graph Report - amanah  (2026-08-18)

## Corpus Check
- 25 files · ~11,190 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 358 nodes · 338 edges · 46 communities (39 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0ec64d8c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LaunchGood Applied AI Engineer — AI Campaign Trust & Safety Review Copilot.md
- Amanah — Phased Product Development Plan.md
- package.json
- [id].vue
- Phase 3 — Structured AI Extraction
- Failure scenarios
- dependencies
- 46. Priority Order
- amanah.ts
- Final review
- Phase 1 — Operations Dashboard
- Improve
- 41. Five-Minute Demo Flow
- 35. Agent Instructions
- renovate.json
- Agent Delegation Strategy
- Phase 2 — Evidence Workspace
- Phase 4 — Entity Resolution & Consistency Checking
- Phase 0 — Project Initialization
- 9. Campaign Review Workspace
- Amanah
- Phase 6 — AI Review Engine
- Phase 5 — Policy Knowledge Base
- Phase 7 — Human-in-the-Loop Workflow
- Phase 12 — Evaluation Framework
- Phase 9 — Re-review Workflow
- 5. Prototype Scenario
- Phase 14 — Security & Privacy
- index.vue
- 2. Core User Story
- campaigns.ts
- policies.ts
- knowledge.vue
- tsconfig.json
- AppShell.vue
- activity.vue
- evidence.vue
- evals.vue
- index.vue

## God Nodes (most connected - your core abstractions)
1. `46. Priority Order` - 10 edges
2. `35. Agent Instructions` - 8 edges
3. `41. Five-Minute Demo Flow` - 8 edges
4. `scripts` - 7 edges
5. `Phase 0 — Project Initialization` - 7 edges
6. `Phase 2 — Evidence Workspace` - 7 edges
7. `Phase 3 — Structured AI Extraction` - 7 edges
8. `Phase 4 — Entity Resolution & Consistency Checking` - 7 edges
9. `Failure scenarios` - 7 edges
10. `Agent Delegation Strategy` - 7 edges

## Surprising Connections (you probably didn't know these)
- `useReviewWorkflow()` --references--> `RecommendedAction`  [EXTRACTED]
  app/composables/useReviewWorkflow.ts → app/types/amanah.ts

## Import Cycles
- None detected.

## Communities (46 total, 7 thin omitted)

### Community 0 - "LaunchGood Applied AI Engineer — AI Campaign Trust & Safety Review Copilot.md"
Cohesion: 0.04
Nodes (48): 10. Evidence Viewer, 11. AI Pipeline, 12. Structured Extraction, 13. Entity Resolution, 14. Policy Retrieval, 15. Agent Architecture, 16. Tool Interfaces, 17. Real AI Responsibility (+40 more)

### Community 1 - "Amanah — Phased Product Development Plan.md"
Cohesion: 0.06
Nodes (35): Amanah — Phased Product Development Plan, Build, Critical Product Principle, Dataset, Definition of Done, Definition of Done, Definition of Done, Definition of Done (+27 more)

### Community 2 - "package.json"
Cohesion: 0.10
Nodes (20): eslint, @nuxt/eslint, devDependencies, eslint, @nuxt/eslint, typescript, vue-tsc, name (+12 more)

### Community 3 - "[id].vue"
Cohesion: 0.14
Nodes (10): actionLabel, { getCampaign, retrievePolicies }, output, policies, route, { runReview, decide, setNote, setFeedback, uploadEvidence, rereview, openFinding, getWorkflow }, selectedDocument, selectedFinding (+2 more)

### Community 4 - "Phase 3 — Structured AI Extraction"
Cohesion: 0.18
Nodes (11): Beneficiary, Campaign, Creator, Definition of Done, Documents, Extract, Objective, Phase 3 — Structured AI Extraction (+3 more)

### Community 5 - "Failure scenarios"
Cohesion: 0.18
Nodes (11): Conflicting evidence, Corrupted document, Definition of Done, Failure scenarios, Invalid model output, LLM failure, Low-confidence reasoning, Missing document (+3 more)

### Community 6 - "dependencies"
Cohesion: 0.18
Nodes (11): @iconify-json/lucide, @iconify-json/simple-icons, nuxt, @nuxt/ui, dependencies, @iconify-json/lucide, @iconify-json/simple-icons, nuxt (+3 more)

### Community 7 - "46. Priority Order"
Cohesion: 0.20
Nodes (10): 46. Priority Order, P0, P0, P0, P0, P1, P1, P1 (+2 more)

### Community 8 - "amanah.ts"
Cohesion: 0.13
Nodes (17): event(), getState(), stamp(), state, useReviewWorkflow(), Campaign, CampaignDocument, CampaignStatus (+9 more)

### Community 9 - "Final review"
Cohesion: 0.25
Nodes (8): AI, Engineering, Final review, Human/AI boundary, Objective, Phase 18 — Final Application Polish, Product, UX

### Community 10 - "Phase 1 — Operations Dashboard"
Cohesion: 0.25
Nodes (8): Build, Campaign page, Campaign queue, Dashboard, Definition of Done, Objective, Phase 1 — Operations Dashboard, Status model

### Community 11 - "Improve"
Cohesion: 0.25
Nodes (8): Caching, Definition of Done, Improve, Loading, Objective, Phase 15 — Performance & UX Polish, Streaming, UI

### Community 12 - "41. Five-Minute Demo Flow"
Cohesion: 0.25
Nodes (8): 0:00–0:30, 0:30–1:00, 1:00–2:30, 2:30–3:15, 3:15–4:00, 41. Five-Minute Demo Flow, 4:00–4:30, 4:30–5:00

### Community 13 - "35. Agent Instructions"
Cohesion: 0.25
Nodes (8): 35. Agent Instructions, Agent 1 — Foundation, Agent 2 — Operations UI, Agent 3 — AI Extraction, Agent 4 — AI Review, Agent 5 — Human Review, Agent 6 — Evaluation, Agent 7 — Polish

### Community 14 - "renovate.json"
Cohesion: 0.25
Nodes (7): github>nuxt/renovate-config-nuxt, pnpmDedupe, extends, lockFileMaintenance, enabled, packageRules, postUpdateOptions

### Community 15 - "Agent Delegation Strategy"
Cohesion: 0.29
Nodes (7): Agent Delegation Strategy, Agent Group 1 — Product Foundation, Agent Group 2 — AI Core, Agent Group 3 — Workflow, Agent Group 4 — Intelligence, Agent Group 5 — Production, Agent Group 6 — Demo

### Community 16 - "Phase 2 — Evidence Workspace"
Cohesion: 0.29
Nodes (7): Build, Definition of Done, Document viewer, Evidence metadata, Objective, Phase 2 — Evidence Workspace, Side-by-side comparison

### Community 17 - "Phase 4 — Entity Resolution & Consistency Checking"
Cohesion: 0.29
Nodes (7): Build, Critical requirement, Definition of Done, Example, Finding structure, Objective, Phase 4 — Entity Resolution & Consistency Checking

### Community 18 - "Phase 0 — Project Initialization"
Cohesion: 0.29
Nodes (7): Data strategy, Definition of Done, Deliverables, Initial components, Initial routes, Objective, Phase 0 — Project Initialization

### Community 19 - "9. Campaign Review Workspace"
Cohesion: 0.29
Nodes (7): 9. Campaign Review Workspace, AI Recommendation, Center, Executive Summary, Key Findings, Left, Right

### Community 20 - "Amanah"
Cohesion: 0.29
Nodes (6): AI responsibility, Amanah, Checks, Current scope, Data safety, Run locally

### Community 21 - "Phase 6 — AI Review Engine"
Cohesion: 0.33
Nodes (6): Architecture, Definition of Done, Objective, Phase 6 — AI Review Engine, Recommended actions, Review output

### Community 22 - "Phase 5 — Policy Knowledge Base"
Cohesion: 0.33
Nodes (6): Build, Definition of Done, Objective, Phase 5 — Policy Knowledge Base, Retrieval pipeline, UI

### Community 23 - "Phase 7 — Human-in-the-Loop Workflow"
Cohesion: 0.33
Nodes (6): Build, Dashboard, Definition of Done, Important, Objective, Phase 10 — Review Queue Intelligence

### Community 24 - "Phase 12 — Evaluation Framework"
Cohesion: 0.40
Nodes (5): Architecture, Definition of Done, Deployment checklist, Environment variables, Phase 16 — Production Deployment

### Community 25 - "Phase 9 — Re-review Workflow"
Cohesion: 0.33
Nodes (6): Definition of Done, Example, Objective, Phase 9 — Re-review Workflow, UI, Workflow

### Community 26 - "5. Prototype Scenario"
Cohesion: 0.33
Nodes (6): 5. Prototype Scenario, Campaign A — Low Risk, Campaign B — Medium Risk, Campaign C — High Risk, Campaign D — Organization, Campaign E — False Positive

### Community 27 - "Phase 14 — Security & Privacy"
Cohesion: 0.40
Nodes (5): Definition of Done, Demo data, Implement, Objective, Phase 14 — Security & Privacy

### Community 28 - "index.vue"
Cohesion: 0.40
Nodes (4): filtered, risk, search, status

### Community 29 - "2. Core User Story"
Cohesion: 0.50
Nodes (4): 2. Core User Story, AI Risk Assessment, Campaign Summary, Verification Status

### Community 36 - "activity.vue"
Cohesion: 0.29
Nodes (6): baseline, events, { getCampaign }, { getWorkflow }, route, workflow

### Community 39 - "index.vue"
Cohesion: 0.50
Nodes (3): { priority }, queue, stats

## Knowledge Gaps
- **268 isolated node(s):** `nav`, `state`, `campaigns`, `policies`, `route` (+263 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Phase 3 — Structured AI Extraction` connect `Phase 3 — Structured AI Extraction` to `Amanah — Phased Product Development Plan.md`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `Phase 13 — Failure & Reliability Engineering` connect `Failure scenarios` to `Amanah — Phased Product Development Plan.md`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `Phase 1 — Operations Dashboard` connect `Phase 1 — Operations Dashboard` to `Amanah — Phased Product Development Plan.md`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `nav`, `state`, `campaigns` to the rest of the system?**
  _268 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LaunchGood Applied AI Engineer — AI Campaign Trust & Safety Review Copilot.md` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Should `Amanah — Phased Product Development Plan.md` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._