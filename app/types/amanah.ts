export type Risk = 'low' | 'medium' | 'high'
export type CampaignStatus = 'pending' | 'in_review' | 'needs_information' | 'escalated' | 'approved' | 'rejected'
export type DocumentStatus = 'verified' | 'missing' | 'unclear'

export interface EvidenceReference { source: string, quote: string, location: string }
export interface Finding {
  id: string
  severity: Risk
  confidence: number
  title: string
  explanation: string
  evidence: EvidenceReference[]
  recommendation: string
  policyId?: string
}
export interface CampaignDocument { id: string, name: string, type: string, uploadedAt: string, source: string, status: DocumentStatus, content: string }
export interface Campaign {
  id: string
  title: string
  creator: string
  creatorCountry: string
  beneficiary: string
  beneficiaryCountry: string
  relationship: string
  category: string
  goal: number
  raised: number
  status: CampaignStatus
  risk: Risk
  age: string
  reviewer: string
  description: string
  accountAgeDays: number
  documents: CampaignDocument[]
  previousCampaigns: string[]
  findings: Finding[]
}
export interface Policy { id: string, title: string, section: string, summary: string, keywords: string[], guidance: string[] }
