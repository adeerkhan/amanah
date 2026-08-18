# Amanah

Amanah is an AI-assisted campaign review workspace for human-led Trust & Safety decisions. This repository currently implements Phases 0-10 of the product plan with fictional local data.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Current scope

- Operations dashboard and searchable campaign queue
- Fictional multi-source campaign dossiers and evidence viewer
- Structured campaign profile extraction from seeded data
- Cross-source consistency findings with evidence and confidence
- Fictional policy knowledge base and keyword retrieval
- One-click AI review output with risk scoring and recommendations
- Human decision panel with reviewer feedback and notes
- Event-based audit trail
- Upload and re-review flow that can resolve the demo beneficiary finding
- AI priority queue for operational triage
- Responsive Nuxt 4 + TypeScript + Nuxt UI shell

The current analysis is deterministic demo logic over a dummy database. External model calls, Supabase persistence, authentication, and a larger evaluation dataset are deliberately deferred to later phases.

## AI responsibility

Amanah surfaces evidence, uncertainty, and recommended next steps. It does not approve, reject, freeze, refund, or move funds.

## Data safety

All people, organizations, documents, and metrics in the demo are fictional. Do not add private campaign data to this repository.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
