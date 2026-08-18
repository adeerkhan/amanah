import { campaigns } from '~/data/campaigns'
import type { Campaign, Finding, FindingState, RecommendedAction, ReviewEvent, ReviewOutput } from '~/types/amanah'

const state = reactive<Record<string, { output?: ReviewOutput, decision?: RecommendedAction, note: string, feedback?: string, events: ReviewEvent[], uploaded: boolean, findingStates: Record<string, FindingState> }>>({})

function getState(id: string) {
  state[id] ||= { note: '', events: [], uploaded: false, findingStates: {} }
  return state[id]
}

const stamp = () => new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' }).format(new Date())
const event = (label: string, detail: string, tone: ReviewEvent['tone']): ReviewEvent => ({ id: crypto.randomUUID(), label, detail, tone, timestamp: stamp() })

export function useReviewWorkflow() {
  const review = (campaign: Campaign): ReviewOutput => {
    const current = getState(campaign.id)
    const findings = campaign.findings.map(finding => ({ ...finding }))
    if (current.uploaded && campaign.id === 'urgent-medical') {
      const mismatch = findings.find(finding => finding.id === 'f-001')
      if (mismatch) current.findingStates[mismatch.id] = 'resolved'
    }
    const openFindings = findings.filter(finding => current.findingStates[finding.id] !== 'resolved')
    const riskScore = current.uploaded && campaign.id === 'urgent-medical' ? 48 : Math.min(96, 24 + openFindings.reduce((sum, finding) => sum + (finding.severity === 'high' ? 34 : finding.severity === 'medium' ? 20 : 8), 0))
    const riskLevel = riskScore >= 70 ? 'high' : riskScore >= 45 ? 'medium' : 'low'
    const output: ReviewOutput = { riskLevel, riskScore, summary: openFindings.length ? `The dossier contains ${openFindings.length} evidence-backed concern${openFindings.length === 1 ? '' : 's'} requiring reviewer attention. Amanah found inconsistencies across supplied sources and linked each to operating guidance.` : 'The supplied dossier is consistent across the available sources. No open evidence conflicts were identified.', findings, missingInformation: campaign.documents.filter(document => document.status === 'missing').map(document => document.name), recommendedAction: riskLevel === 'high' ? 'escalate' : openFindings.length ? 'request_information' : 'approve', completedAt: `${stamp()} · 8.4s` }
    current.output = output
    current.events.unshift(event('AI review completed', `${output.findings.length} findings · ${output.riskScore}/100 risk score`, 'ai'))
    return output
  }
  const runReview = (campaign: Campaign) => review(campaign)
  const decide = (campaign: Campaign, action: RecommendedAction) => { const current = getState(campaign.id); if (!current.output) return; current.decision = action; current.events.unshift(event(`Reviewer selected ${action.replace('_', ' ')}`, 'Human decision recorded in demo history', 'human')) }
  const setNote = (campaign: Campaign, note: string) => { getState(campaign.id).note = note }
  const setFeedback = (campaign: Campaign, feedback: string) => { getState(campaign.id).feedback = feedback; getState(campaign.id).events.unshift(event('Reviewer feedback added', feedback, 'human')) }
  const uploadEvidence = (campaign: Campaign) => { const current = getState(campaign.id); current.uploaded = true; current.events.unshift(event('New evidence uploaded', 'beneficiary_relationship_letter.pdf', 'evidence')) }
  const rereview = (campaign: Campaign) => { const current = getState(campaign.id); current.events.unshift(event('AI re-review completed', 'Previous beneficiary mismatch reassessed', 'ai')); return review(campaign) }
  const openFinding = (campaign: Campaign, finding: Finding) => getState(campaign.id).events.unshift(event('Reviewer opened finding', finding.title, 'human'))
  const getWorkflow = (id: string) => getState(id)
  const priority = computed(() => [...campaigns].sort((a, b) => (b.findings.length * 10 + (b.risk === 'high' ? 30 : b.risk === 'medium' ? 15 : 0)) - (a.findings.length * 10 + (a.risk === 'high' ? 30 : a.risk === 'medium' ? 15 : 0))))
  return { runReview, decide, setNote, setFeedback, uploadEvidence, rereview, openFinding, getWorkflow, priority }
}
