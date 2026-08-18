<script setup lang="ts">
import type { RecommendedAction } from '~/types/amanah'

const route = useRoute()
const { getCampaign, retrievePolicies } = useCampaigns()
const { runReview, decide, setNote, setFeedback, uploadEvidence, rereview, openFinding, getWorkflow } = useReviewWorkflow()
const { show: showToast } = useAppToast()
const { steps: loadingSteps, isRunning: isLoading, start: startLoading, advance } = useProgressiveLoading()
const { errors: appErrors, dismissError } = useErrorHandler()

const campaign = getCampaign(route.params.id as string)!
if (!campaign) throw createError({ statusCode: 404, statusMessage: 'Campaign not found' })

const workflow = getWorkflow(campaign.id)
const selectedDocument = ref(campaign.documents[0]!)
const selectedFindingId = ref(campaign.findings[0]?.id)
const output = computed(() => workflow.output)
const resolvedOutput = computed(() => output.value!)
const selectedFinding = computed(() =>
  output.value?.findings.find(f => f.id === selectedFindingId.value)
  || campaign.findings.find(f => f.id === selectedFindingId.value)
)
const policies = computed(() => retrievePolicies(output.value?.findings || []))

const actionLabel: Record<RecommendedAction, string> = {
  approve: 'Approve',
  request_information: 'Request information',
  escalate: 'Escalate',
  reject: 'Reject'
}

async function run() {
  startLoading(['Reading campaign…', 'Analyzing documents…', 'Comparing entities…', 'Checking policies…', 'Generating recommendation…'])
  for (let i = 0; i < 5; i++) {
    await advance()
  }
  runReview(campaign)
  showToast('AI review completed', 'success')
}

function selectFinding(id: string) {
  selectedFindingId.value = id
  const finding = output.value?.findings.find(f => f.id === id)
  if (finding) {
    openFinding(campaign, finding)
    const source = campaign.documents.find(d => d.name === finding.evidence[0]?.source)
    if (source) selectedDocument.value = source
  }
}

function makeDecision(action: RecommendedAction) {
  decide(campaign, action)
  showToast(`Decision recorded: ${actionLabel[action]}`, 'info')
}
</script>

<template>
  <div>
    <!-- Top bar -->
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
      <NuxtLink to="/campaigns" style="font-size:12px;color:var(--c-text-secondary);display:flex;align-items:center;gap:4px">
        <Icon name="lucide:arrow-left" :size="14" /> Queue
      </NuxtLink>
      <div style="display:flex;align-items:center;gap:12px">
        <NuxtLink :to="`/campaigns/${campaign.id}/activity`" class="btn btn-secondary" style="font-size:11px;padding:5px 10px">
          <Icon name="lucide:activity" :size="12" /> Activity
        </NuxtLink>
        <span style="font-size:10px;color:var(--c-text-tertiary);letter-spacing:.08em">CASE {{ campaign.id.toUpperCase() }}</span>
      </div>
    </div>

    <!-- Error banner -->
    <ErrorBanner :errors="appErrors" @dismiss="dismissError" />

    <!-- Heading -->
    <div style="display:flex;justify-content:space-between;align-items:end;gap:20px;padding-bottom:24px;border-bottom:1px solid var(--c-border);margin-bottom:24px">
      <div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <span class="pill" :class="`pill-${campaign.risk}`">{{ campaign.risk }} attention</span>
          <span style="font-size:11px;color:var(--c-text-tertiary)">{{ campaign.category }} · Submitted 2h ago</span>
        </div>
        <h1 style="margin:0;font-size:clamp(24px,3vw,32px);font-weight:600;letter-spacing:-.04em;line-height:1.15">
          {{ campaign.title }}
        </h1>
        <p style="margin:6px 0 0;color:var(--c-text-secondary);font-size:13px;max-width:600px">
          {{ campaign.description }}
        </p>
      </div>
      <div style="display:flex;align-items:center;gap:14px;flex-shrink:0">
        <span v-if="output" style="font-size:11px;color:var(--c-success);display:flex;align-items:center;gap:5px">
          <span class="topbar-dot" />
          Review completed {{ resolvedOutput.completedAt }}
        </span>
        <button class="btn btn-primary" :disabled="isLoading" @click="run">
          <span v-if="isLoading" style="width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:white;border-radius:50%;animation:spin .6s linear infinite" />
          <Icon v-else name="lucide:sparkles" :size="14" />
          {{ isLoading ? 'Analyzing…' : output ? 'Run again' : 'Run AI review' }}
        </button>
      </div>
    </div>

    <!-- Re-review banner -->
    <div v-if="workflow.uploaded" style="display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid var(--c-success-light);background:var(--c-success-light);border-radius:var(--radius-md);margin-bottom:20px">
      <span style="width:28px;height:28px;border-radius:50%;background:white;display:grid;place-items:center;color:var(--c-success);flex-shrink:0">
        <Icon name="lucide:refresh-cw" :size="14" />
      </span>
      <div style="flex:1">
        <strong style="font-size:12px;color:var(--c-success-dark)">{{ workflow.rereviews ? `Re-review ${workflow.rereviews} complete` : 'New evidence ready for re-review' }}</strong>
        <small style="display:block;color:var(--c-text-secondary);font-size:11px">beneficiary_relationship_letter.pdf uploaded</small>
      </div>
      <button v-if="!workflow.rereviews" class="btn btn-primary" @click="rereview(campaign)">
        <Icon name="lucide:refresh-cw" :size="12" /> Run re-review
      </button>
      <span v-else style="font-size:11px;color:var(--c-success);font-weight:600;display:flex;align-items:center;gap:4px">
        <Icon name="lucide:check-circle" :size="12" /> Finding resolved
      </span>
    </div>

    <!-- Main 3-column layout -->
    <div style="display:grid;grid-template-columns:210px minmax(0,1fr) 260px;gap:16px;align-items:start">
      <!-- LEFT: Case info -->
      <aside style="display:flex;flex-direction:column;gap:12px">
        <div class="panel" style="padding:16px">
          <p class="eyebrow" style="margin:0 0 12px">Case profile</p>
          <div style="display:flex;gap:10px;align-items:center;margin-bottom:14px">
            <span class="sidebar-avatar" style="width:32px;height:32px;font-size:10px">AR</span>
            <div>
              <strong style="display:block;font-size:12px">{{ campaign.creator }}</strong>
              <small style="color:var(--c-text-tertiary);font-size:11px">Creator · {{ campaign.creatorCountry }}</small>
            </div>
          </div>
          <dl style="margin:0;border-top:1px solid var(--c-border)">
            <div
              v-for="item in [
                ['Beneficiary', campaign.beneficiary],
                ['Relationship', campaign.relationship],
                ['Goal', `$${campaign.goal.toLocaleString()}`],
                ['Raised', `$${campaign.raised.toLocaleString()}`],
                ['Account age', `${campaign.accountAgeDays} days`]
              ]" :key="item[0]" style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--c-border)"
            >
              <dt style="margin:0;color:var(--c-text-tertiary);font-size:11px">{{ item[0] }}</dt>
              <dd style="margin:0;color:var(--c-text);font-size:11px;font-weight:600">{{ item[1] }}</dd>
            </div>
          </dl>
        </div>

        <div class="panel" style="padding:14px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <p class="eyebrow" style="margin:0">Evidence dossier</p>
            <span style="font-size:10px;color:var(--c-text-tertiary)">{{ campaign.documents.length }}</span>
          </div>
          <button
            v-for="doc in campaign.documents"
            :key="doc.id"
            style="display:flex;align-items:center;gap:8px;width:100%;padding:7px 6px;border:0;border-radius:var(--radius-sm);background:transparent;color:var(--c-text);text-align:left;cursor:pointer;transition:background .1s;font-size:11px"
            :style="selectedDocument.id === doc.id ? { background: 'var(--c-surface-alt)', fontWeight: '600' } : {}"
            @click="selectedDocument = doc"
          >
            <span
              style="width:6px;height:6px;border-radius:50%;flex-shrink:0"
              :style="{
                background: doc.status === 'verified' ? 'var(--c-success)' : doc.status === 'unclear' ? 'var(--c-warning)' : 'var(--c-danger)'
              }"
            />
            <span style="min-width:0">
              <strong style="display:block;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ doc.name }}</strong>
              <small style="color:var(--c-text-tertiary);font-size:10px">{{ doc.type }}</small>
            </span>
          </button>
          <label style="display:block;margin-top:10px;padding:7px;border:1px dashed var(--c-border);border-radius:var(--radius-sm);text-align:center;font-size:11px;color:var(--c-accent);font-weight:600;cursor:pointer;transition:border-color .12s">
            + Upload new evidence
            <input type="file" hidden @change="uploadEvidence(campaign)">
          </label>
        </div>
      </aside>

      <!-- CENTER: Analysis -->
      <main style="display:flex;flex-direction:column;gap:12px">
        <!-- AI intro -->
        <div class="panel" style="overflow:hidden">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:16px 18px;border-bottom:1px solid var(--c-border)">
            <div style="display:flex;gap:10px;align-items:center">
              <span style="width:28px;height:28px;border-radius:var(--radius-sm);background:var(--c-accent-light);color:var(--c-accent);display:grid;place-items:center">
                <Icon name="lucide:sparkles" :size="14" />
              </span>
              <div>
                <p class="eyebrow" style="margin:0 0 2px">Amanah analysis</p>
                <h2 style="margin:0;font-size:16px;font-weight:600">Evidence review</h2>
              </div>
            </div>
            <div style="display:flex;gap:4px">
              <span v-for="tag in ['Extraction', 'Comparison', 'Policy']" :key="tag" style="padding:4px 8px;background:var(--c-surface-alt);border-radius:4px;font-size:10px;color:var(--c-text-secondary)">
                {{ tag }}
              </span>
            </div>
          </div>

          <div v-if="!output && !isLoading" style="padding:48px 24px;text-align:center">
            <div style="width:44px;height:44px;border-radius:50%;background:var(--c-accent-light);color:var(--c-accent);display:grid;place-items:center;margin:0 auto 14px">
              <Icon name="lucide:sparkles" :size="20" />
            </div>
            <h3 style="margin:0;font-size:16px">Ready to inspect this dossier</h3>
            <p style="margin:8px 0 18px;color:var(--c-text-secondary);font-size:12px;max-width:340px;margin-left:auto;margin-right:auto">
              Run the review to extract entities, compare sources, and retrieve the relevant operating policy.
            </p>
            <button class="btn btn-primary" @click="run">
              <Icon name="lucide:play" :size="14" /> Analyze campaign
            </button>
          </div>

          <div v-if="isLoading" style="padding:32px 24px">
            <div
              v-for="step in loadingSteps" :key="step.label" style="display:flex;align-items:center;gap:8px;padding:5px 0;font-size:12px"
              :style="{ color: step.status === 'done' ? 'var(--c-success)' : step.status === 'running' ? 'var(--c-text)' : 'var(--c-text-tertiary)' }"
            >
              <span
                style="width:16px;height:16px;border-radius:50%;display:grid;place-items:center;font-size:9px;flex-shrink:0"
                :style="{
                  background: step.status === 'done' ? 'var(--c-success-light)' : step.status === 'running' ? 'var(--c-accent-light)' : 'var(--c-surface-alt)',
                  color: step.status === 'done' ? 'var(--c-success)' : step.status === 'running' ? 'var(--c-accent)' : 'var(--c-text-tertiary)'
                }"
              >{{ step.status === 'done' ? '✓' : step.status === 'running' ? '✦' : '' }}</span>
              {{ step.label }}
            </div>
          </div>

          <template v-else>
            <div style="padding:16px 18px">
              <p class="eyebrow" style="margin:0 0 6px">Executive summary</p>
              <p style="margin:0;color:var(--c-text-secondary);font-size:13px;line-height:1.6">{{ resolvedOutput.summary }}</p>
            </div>
            <div style="display:grid;grid-template-columns:80px 1fr 120px;gap:14px;align-items:center;padding:12px 18px;background:var(--c-surface-alt);border-top:1px solid var(--c-border);margin:0 18px 16px;border-radius:var(--radius-sm)">
              <div>
                <small style="display:block;color:var(--c-text-tertiary);font-size:10px;margin-bottom:3px">Overall risk</small>
                <strong :style="{ color: resolvedOutput.riskLevel === 'high' ? 'var(--c-danger)' : resolvedOutput.riskLevel === 'medium' ? 'var(--c-warning)' : 'var(--c-success)' }" style="font-size:13px;text-transform:capitalize">
                  {{ resolvedOutput.riskLevel }}
                  <span style="color:var(--c-text-tertiary);font-weight:400">· {{ resolvedOutput.riskScore }}/100</span>
                </strong>
              </div>
              <div style="height:4px;background:var(--c-border);border-radius:4px;overflow:hidden">
                <div
                  :style="{
                    width: `${resolvedOutput.riskScore}%`,
                    background: resolvedOutput.riskLevel === 'high' ? 'var(--c-danger)' : resolvedOutput.riskLevel === 'medium' ? 'var(--c-warning)' : 'var(--c-success)'
                  }" style="height:100%;border-radius:4px;transition:width .3s"
                />
              </div>
              <div>
                <small style="display:block;color:var(--c-text-tertiary);font-size:10px;margin-bottom:3px">Recommended action</small>
                <strong style="font-size:13px">{{ actionLabel[resolvedOutput.recommendedAction] }}</strong>
              </div>
            </div>
          </template>
        </div>

        <!-- Findings -->
        <div v-if="output" class="panel">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:16px 18px;border-bottom:1px solid var(--c-border)">
            <div>
              <p class="eyebrow" style="margin:0 0 4px">Cross-source reasoning</p>
              <h2 style="margin:0;font-size:16px;font-weight:600">Key findings <span style="color:var(--c-text-tertiary);font-weight:400">{{ resolvedOutput.findings.length }}</span></h2>
            </div>
            <span style="font-size:11px;color:var(--c-success);display:flex;align-items:center;gap:5px">
              <span class="topbar-dot" style="width:5px;height:5px" />
              All grounded
            </span>
          </div>

          <article
            v-for="finding in resolvedOutput.findings"
            :key="finding.id"
            style="display:flex;gap:12px;padding:14px 18px;border-bottom:1px solid var(--c-border);cursor:pointer;transition:background .1s"
            :style="selectedFindingId === finding.id ? { background: 'var(--c-surface-alt)' } : {}"
            @click="selectFinding(finding.id)"
          >
            <span
              style="width:24px;height:24px;border-radius:var(--radius-sm);display:grid;place-items:center;flex-shrink:0;font-size:11px;font-weight:700"
              :style="{
                background: finding.severity === 'high' ? 'var(--c-danger-light)' : finding.severity === 'medium' ? 'var(--c-warning-light)' : 'var(--c-success-light)',
                color: finding.severity === 'high' ? 'var(--c-danger)' : finding.severity === 'medium' ? 'var(--c-warning)' : 'var(--c-success)'
              }"
            >{{ finding.severity === 'high' ? '!' : finding.severity === 'medium' ? '·' : '✓' }}</span>
            <div style="flex:1;min-width:0">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:4px">
                <strong style="font-size:13px">{{ finding.title }}</strong>
                <span class="pill" :class="`pill-${finding.severity}`">{{ finding.severity }} · {{ Math.round(finding.confidence * 100) }}%</span>
              </div>
              <p style="margin:0 0 8px;color:var(--c-text-secondary);font-size:12px;line-height:1.55">{{ finding.explanation }}</p>
              <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:6px">
                <span v-for="e in finding.evidence" :key="e.source" style="padding:5px 8px;background:var(--c-surface-alt);border-radius:4px;font-size:10px;color:var(--c-text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:260px">
                  <strong style="color:var(--c-accent-dark)">{{ e.source }}</strong> "{{ e.quote }}"
                </span>
              </div>
              <small style="color:var(--c-success);font-size:10px;font-weight:500">Recommendation: {{ finding.recommendation }}</small>
            </div>
          </article>

          <div v-if="resolvedOutput.missingInformation.length" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:12px 18px;background:var(--c-warning-light);font-size:11px">
            <strong style="color:var(--c-warning-dark)">Missing information:</strong>
            <span v-for="item in resolvedOutput.missingInformation" :key="item" style="padding:2px 6px;background:white;border-radius:4px;color:var(--c-warning-dark)">{{ item }}</span>
          </div>
        </div>

        <!-- Source inspection -->
        <div v-if="output" class="panel">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid var(--c-border)">
            <div>
              <p class="eyebrow" style="margin:0 0 3px">Source inspection</p>
              <h2 style="margin:0;font-size:14px;font-weight:600">{{ selectedDocument.name }}</h2>
            </div>
            <span class="pill" :class="selectedDocument.status === 'verified' ? 'pill-low' : 'pill-medium'">{{ selectedDocument.status }}</span>
          </div>
          <pre style="margin:0;padding:14px 18px;white-space:pre-wrap;font:12px/1.6 monospace;color:var(--c-text-secondary);background:var(--c-surface-alt)">{{ selectedDocument.content }}</pre>
          <div v-if="selectedFinding" style="display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--c-border)">
            <div style="padding:10px 18px;border-right:1px solid var(--c-border)">
              <small style="display:block;color:var(--c-text-tertiary);font-size:10px;margin-bottom:3px">Finding selected</small>
              <strong style="font-size:11px">{{ selectedFinding.title }}</strong>
            </div>
            <div style="padding:10px 18px">
              <small style="display:block;color:var(--c-text-tertiary);font-size:10px;margin-bottom:3px">Source location</small>
              <strong style="font-size:11px">{{ selectedFinding.evidence[0]?.location }}</strong>
            </div>
          </div>
        </div>
      </main>

      <!-- RIGHT: Decision -->
      <aside style="display:flex;flex-direction:column;gap:12px">
        <div class="panel" style="padding:16px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
            <p class="eyebrow" style="margin:0">Human decision</p>
            <span style="font-size:9px;color:var(--c-text-tertiary)">Reviewr only</span>
          </div>

          <div style="padding-bottom:14px;border-bottom:1px solid var(--c-border);margin-bottom:14px">
            <small style="display:block;color:var(--c-text-tertiary);font-size:10px;margin-bottom:4px">AI risk score</small>
            <strong v-if="output" style="font-size:32px;letter-spacing:-.06em">
              {{ resolvedOutput.riskScore }}<span style="font-size:14px;color:var(--c-text-tertiary);font-weight:400">/100</span>
            </strong>
            <strong v-else style="font-size:32px;color:var(--c-text-tertiary)">—</strong>
          </div>

          <div v-if="output" style="padding:10px;background:var(--c-success-light);border-left:2px solid var(--c-success);border-radius:0 var(--radius-sm) var(--radius-sm) 0;margin-bottom:14px">
            <small style="display:block;color:var(--c-text-secondary);font-size:10px;margin-bottom:3px">AI recommendation</small>
            <strong style="display:block;color:var(--c-success-dark);font-size:12px;margin-bottom:3px">{{ actionLabel[resolvedOutput.recommendedAction] }}</strong>
            <p style="margin:0;color:var(--c-text-secondary);font-size:10px;line-height:1.5">Based on {{ resolvedOutput.findings.length }} findings and retrieved policy.</p>
          </div>

          <div style="display:flex;flex-direction:column;gap:6px">
            <button
              v-for="action in (['approve', 'request_information', 'escalate', 'reject'] as RecommendedAction[])"
              :key="action"
              style="display:flex;align-items:center;justify-content:space-between;padding:9px 10px;border:1px solid var(--c-border);border-radius:var(--radius-sm);background:white;color:var(--c-text);font-size:11px;cursor:pointer;transition:all .12s"
              :style="{
                borderColor: action === output?.recommendedAction ? 'var(--c-accent)' : action === workflow.decision ? 'var(--c-success)' : undefined,
                background: action === workflow.decision ? 'var(--c-success-light)' : undefined,
                color: action === workflow.decision ? 'var(--c-success-dark)' : undefined
              }"
              @click="makeDecision(action)"
            >
              {{ actionLabel[action] }}
              <span v-if="action === output?.recommendedAction" style="color:var(--c-accent);font-size:9px">Recommended</span>
              <span v-else-if="action === workflow.decision" style="font-size:9px">Selected</span>
            </button>
          </div>

          <div v-if="workflow.decision" style="margin-top:10px;padding:8px;background:var(--c-success-light);border-radius:var(--radius-sm);font-size:11px;color:var(--c-success-dark)">
            ✓ Decision recorded: <strong>{{ actionLabel[workflow.decision] }}</strong>
          </div>
        </div>

        <!-- Feedback -->
        <div class="panel" style="padding:14px">
          <p class="eyebrow" style="margin:0 0 10px">Reviewer feedback</p>
          <select
            :value="workflow.feedback"
            aria-label="Feedback"
            style="width:100%;padding:7px 8px;border:1px solid var(--c-border);border-radius:var(--radius-sm);font-size:11px;color:var(--c-text);background:white;margin-bottom:8px"
            @change="setFeedback(campaign, ($event.target as HTMLSelectElement).value)"
          >
            <option value="">How was the AI review?</option>
            <option>AI was useful</option>
            <option>AI was too cautious</option>
            <option>AI was too aggressive</option>
            <option>AI missed something</option>
            <option>Incorrect evidence</option>
            <option>Incorrect recommendation</option>
          </select>
          <textarea
            :value="workflow.note"
            placeholder="Add a note…"
            style="width:100%;min-height:60px;padding:7px 8px;border:1px solid var(--c-border);border-radius:var(--radius-sm);font-size:11px;resize:vertical;color:var(--c-text)"
            @input="setNote(campaign, ($event.target as HTMLTextAreaElement).value)"
          />
          <p style="margin:6px 0 0;color:var(--c-text-tertiary);font-size:10px">Your feedback improves future review quality.</p>
        </div>

        <!-- Policy -->
        <div v-if="policies.length" class="panel" style="padding:14px;border-top:2px solid var(--c-accent)">
          <p class="eyebrow" style="margin:0 0 8px">Retrieved policy</p>
          <div v-for="policy in policies.slice(0, 1)" :key="policy.id">
            <h3 style="margin:0 0 2px;font-size:13px">{{ policy.title }}</h3>
            <span style="color:var(--c-accent);font-size:10px;font-weight:600">{{ policy.section }}</span>
            <p style="margin:8px 0;color:var(--c-text-secondary);font-size:11px;line-height:1.5">{{ policy.summary }}</p>
            <details>
              <summary style="color:var(--c-accent);font-size:10px;font-weight:600;cursor:pointer">View guidance</summary>
              <ul style="margin:6px 0 0;padding-left:14px;color:var(--c-text-secondary);font-size:10px;line-height:1.6">
                <li v-for="g in policy.guidance" :key="g">{{ g }}</li>
              </ul>
            </details>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
