# Amanah

Amanah is an AI-assisted campaign review workspace for human-led Trust & Safety decisions. This repository implements all 18 phases of the product plan with fictional local data.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Architecture

```
Nuxt 4 + TypeScript + Tailwind + Nuxt UI
├── app/
│   ├── pages/          # Routes: dashboard, queue, portfolio, knowledge, evals
│   ├── components/     # AppShell, ErrorBanner
│   ├── composables/    # Review workflow, portfolio radar, toasts, error handling
│   ├── data/           # Fictional campaigns, policies, evaluation dataset
│   └── types/          # TypeScript interfaces
└── nuxt.config.ts      # Runtime config, environment variables
```

## Features

### Core Workflow (Phases 0–10)
- Operations dashboard with AI priority queue
- Fictional multi-source campaign dossiers
- Structured campaign profile extraction
- Cross-source consistency findings with evidence and confidence
- Fictional policy knowledge base and keyword retrieval
- One-click AI review with risk scoring and recommendations
- Human decision panel with reviewer feedback
- Event-based audit trail
- Upload and re-review flow (finding resolution)
- AI priority queue for operational triage

### Intelligence (Phases 11–12)
- Portfolio risk radar with pattern detection across campaigns
- Automated evaluation framework with 12 seeded test cases
- Finding precision, recall, recommendation agreement, and evidence grounding metrics

### Reliability (Phases 13–15)
- Error handling with safe fallback states
- Progressive loading during AI review
- Toast notifications for user actions
- Failure modes: document unreadable, model unavailable, conflicting evidence, insufficient evidence

### Production (Phases 16–18)
- Environment variable configuration (`.env.example`)
- Runtime config for API keys
- Demo mode with sidebar quick-access
- Design token system with CSS custom properties
- Responsive layout (desktop-first, mobile-adaptive)

## AI responsibility

Amanah surfaces evidence, uncertainty, and recommended next steps. It does not approve, reject, freeze, refund, or move funds. All consequential decisions remain human-controlled.

## Data safety

All people, organizations, documents, and metrics in the demo are fictional. Do not add private campaign data to this repository.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

```bash
npm run build
# Deploy .output/ to Vercel, Netlify, or any Node.js host
```

Environment variables (optional for demo):

```
OPENAI_API_KEY=     # For production LLM calls
SUPABASE_URL=       # For database persistence
SUPABASE_ANON_KEY=  # For database persistence
```
