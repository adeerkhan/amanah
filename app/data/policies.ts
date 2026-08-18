import type { Policy } from '~/types/amanah'

export const policies: Policy[] = [
  { id: 'beneficiary-verification', title: 'Beneficiary Verification', section: 'Section 2.3', summary: 'A fundraiser must establish who benefits and explain the relationship when raising on another person’s behalf.', keywords: ['beneficiary', 'relationship', 'name', 'mismatch'], guidance: ['Compare beneficiary names across the campaign and supporting documents.', 'Request a relationship document when the connection is unclear.', 'Do not infer wrongdoing from a surname or country difference alone.'] },
  { id: 'identity-verification', title: 'Identity Verification', section: 'Section 1.2', summary: 'Identity evidence should be present, legible, and consistent with the campaign creator.', keywords: ['identity', 'government', 'creator', 'missing'], guidance: ['Confirm the document is present and readable.', 'Escalate unresolved identity conflicts for senior review.'] },
  { id: 'organization-verification', title: 'Organization Verification', section: 'Section 3.1', summary: 'Organization campaigns should provide registration, authorized banking, project scope, and a beneficiary description.', keywords: ['organization', 'registration', 'bank', 'charity'], guidance: ['Check registration and bank ownership.', 'Compare the stated project budget with the requested goal.'] },
  { id: 'payout-requirements', title: 'Payout Requirements', section: 'Section 4.1', summary: 'Payout purpose, destination, and supporting costs should be sufficiently explained before release.', keywords: ['payout', 'amount', 'cost', 'funds'], guidance: ['Compare requested funds with supplied estimates.', 'Clarify material differences in destination or stated use.'] },
  { id: 'complaints-escalation', title: 'Complaints & Escalation', section: 'Section 5.2', summary: 'Conflicting evidence or credible complaints require human review and a documented rationale.', keywords: ['complaint', 'escalate', 'conflict', 'review'], guidance: ['Keep consequential decisions with an authorized reviewer.', 'Record the evidence and reasoning used for escalation.'] },
  { id: 'zakat-verification', title: 'Zakat Campaign Review', section: 'Section 6.1', summary: 'Zakat campaigns should explain eligibility, beneficiary purpose, and distribution controls.', keywords: ['zakat', 'eligibility', 'distribution'], guidance: ['Confirm the campaign explains intended eligible beneficiaries.', 'Request clarification when the distribution model is vague.'] }
]

export function searchPolicies(query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  return policies.map(policy => ({ policy, score: terms.reduce((score, term) => score + (policy.keywords.some(keyword => keyword.includes(term) || term.includes(keyword)) ? 1 : 0), 0) })).filter(result => result.score > 0).sort((a, b) => b.score - a.score).map(result => result.policy)
}
