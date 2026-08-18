import { campaigns } from '~/data/campaigns'
import { searchPolicies } from '~/data/policies'
import type { Campaign, Finding } from '~/types/amanah'

export function useCampaigns() {
  const getCampaign = (id: string) => campaigns.find(campaign => campaign.id === id)
  const extractProfile = (campaign: Campaign) => ({ campaignId: campaign.id, creator: { name: campaign.creator, country: campaign.creatorCountry, accountAgeDays: campaign.accountAgeDays }, beneficiary: { name: campaign.beneficiary, relationship: campaign.relationship, country: campaign.beneficiaryCountry }, campaign: { category: campaign.category, goalAmount: campaign.goal, purpose: campaign.description, countries: [campaign.creatorCountry, campaign.beneficiaryCountry] }, documents: campaign.documents.map(document => ({ type: document.type, status: document.status })) })
  const checkConsistency = (campaign: Campaign): Finding[] => campaign.findings
  const retrievePolicies = (findings: Finding[]) => [...new Map(findings.flatMap(finding => searchPolicies(`${finding.title} ${finding.explanation}`)).map(policy => [policy.id, policy])).values()]
  return { campaigns, getCampaign, extractProfile, checkConsistency, retrievePolicies }
}
