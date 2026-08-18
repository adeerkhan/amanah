import { campaigns } from '~/data/campaigns'

export interface PortfolioSignal {
  id: string
  label: string
  count: number
  severity: 'info' | 'warning' | 'critical'
  campaignIds: string[]
  detail: string
}

export function usePortfolioRadar() {
  const signals = computed<PortfolioSignal[]>(() => {
    const missingDocs = campaigns.filter(c => c.documents.some(d => d.status === 'missing'))
    const unclearDocs = campaigns.filter(c => c.documents.some(d => d.status === 'unclear'))
    const highRisk = campaigns.filter(c => c.risk === 'high')
    const needsInfo = campaigns.filter(c => c.status === 'needs_information')
    const beneficiaryIssues = campaigns.filter(c => c.findings.some(f => f.title.toLowerCase().includes('beneficiary')))
    const newAccounts = campaigns.filter(c => c.accountAgeDays < 60)

    return [
      {
        id: 'missing-docs',
        label: 'Missing documentation',
        count: missingDocs.length,
        severity: missingDocs.length >= 3 ? 'critical' : 'warning',
        campaignIds: missingDocs.map(c => c.id),
        detail: `${missingDocs.length} campaign${missingDocs.length === 1 ? '' : 's'} have documents marked as missing.`
      },
      {
        id: 'unclear-docs',
        label: 'Unclear evidence',
        count: unclearDocs.length,
        severity: 'warning',
        campaignIds: unclearDocs.map(c => c.id),
        detail: `${unclearDocs.length} campaign${unclearDocs.length === 1 ? '' : 's'} have evidence that could not be verified automatically.`
      },
      {
        id: 'high-risk',
        label: 'High attention cases',
        count: highRisk.length,
        severity: 'critical',
        campaignIds: highRisk.map(c => c.id),
        detail: `${highRisk.length} campaign${highRisk.length === 1 ? '' : 's'} flagged as high attention by the review engine.`
      },
      {
        id: 'needs-info',
        label: 'Awaiting reviewer action',
        count: needsInfo.length,
        severity: 'info',
        campaignIds: needsInfo.map(c => c.id),
        detail: `${needsInfo.length} campaign${needsInfo.length === 1 ? '' : 's'} waiting for information or decision.`
      },
      {
        id: 'beneficiary-issues',
        label: 'Beneficiary inconsistencies',
        count: beneficiaryIssues.length,
        severity: 'critical',
        campaignIds: beneficiaryIssues.map(c => c.id),
        detail: `${beneficiaryIssues.length} campaign${beneficiaryIssues.length === 1 ? '' : 's'} have findings related to beneficiary verification.`
      },
      {
        id: 'new-accounts',
        label: 'Recently created accounts',
        count: newAccounts.length,
        severity: 'warning',
        campaignIds: newAccounts.map(c => c.id),
        detail: `${newAccounts.length} campaign${newAccounts.length === 1 ? '' : 's'} from accounts created less than 60 days ago.`
      }
    ]
  })

  const portfolioStats = computed(() => ({
    total: campaigns.length,
    high: campaigns.filter(c => c.risk === 'high').length,
    medium: campaigns.filter(c => c.risk === 'medium').length,
    low: campaigns.filter(c => c.risk === 'low').length,
    totalFindings: campaigns.reduce((sum, c) => sum + c.findings.length, 0),
    totalDocuments: campaigns.reduce((sum, c) => sum + c.documents.length, 0)
  }))

  return { signals, portfolioStats }
}
