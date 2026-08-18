<script setup lang="ts">
const route = useRoute()
const { getCampaign, extractProfile, checkConsistency, retrievePolicies } = useCampaigns()
const foundCampaign = getCampaign(route.params.id as string)
if (!foundCampaign) throw createError({ statusCode: 404, statusMessage: 'Campaign not found' })
const campaign = foundCampaign
const activeDocument = ref(campaign.documents[0]!)
const analyzed = ref(false)
const selectedFinding = ref(campaign.findings[0])
const profile = computed(() => extractProfile(campaign))
const findings = computed(() => checkConsistency(campaign))
const relevantPolicies = computed(() => retrievePolicies(findings.value))

function analyze() {
  analyzed.value = true
}

function showFinding(finding: typeof campaign.findings[number]) {
  selectedFinding.value = finding
  const source = campaign.documents.find(document => document.name === finding.evidence[0]?.source)
  if (source) activeDocument.value = source
}
</script>

<template>
  <div
    v-if="campaign"
    class="mx-auto max-w-[1500px]"
  >
    <NuxtLink
      to="/campaigns"
      class="text-sm font-semibold text-[#1e7c50]"
    >← Back to queue</NuxtLink><div class="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <div class="flex flex-wrap items-center gap-3">
          <span
            class="pill"
            :class="`risk-${campaign.risk}`"
          >{{ campaign.risk }} risk</span><span class="eyebrow">{{ campaign.category }} · {{ campaign.status.replace('_', ' ') }}</span>
        </div><h1 class="mt-3 max-w-3xl text-3xl font-semibold tracking-tight">
          {{ campaign.title }}
        </h1><p class="mt-2 max-w-2xl muted">
          {{ campaign.description }}
        </p>
      </div><button
        class="rounded-lg bg-[#1e7c50] px-4 py-2.5 text-sm font-semibold text-white"
        @click="analyze"
      >
        {{ analyzed ? 'Analysis complete' : 'Analyze campaign' }}
      </button>
    </div><div class="mt-8 grid gap-5 xl:grid-cols-[270px_minmax(0,1fr)_340px]">
      <aside class="space-y-5">
        <section class="panel p-5">
          <p class="eyebrow">
            Campaign profile
          </p><dl class="mt-4 space-y-4 text-sm">
            <div>
              <dt class="muted">
                Creator
              </dt><dd class="mt-1 font-medium">
                {{ campaign.creator }} <span class="muted">· {{ campaign.creatorCountry }}</span>
              </dd>
            </div><div>
              <dt class="muted">
                Beneficiary
              </dt><dd class="mt-1 font-medium">
                {{ campaign.beneficiary }} <span class="muted">· {{ campaign.relationship }}</span>
              </dd>
            </div><div>
              <dt class="muted">
                Goal / raised
              </dt><dd class="mt-1 font-medium">
                ${{ campaign.goal.toLocaleString() }} <span class="muted">/ ${{ campaign.raised.toLocaleString() }}</span>
              </dd>
            </div><div>
              <dt class="muted">
                Account age
              </dt><dd class="mt-1 font-medium">
                {{ campaign.accountAgeDays }} days
              </dd>
            </div>
          </dl>
        </section><section class="panel p-5">
          <p class="eyebrow">
            Sources
          </p><div class="mt-4 space-y-2">
            <button
              v-for="document in campaign.documents"
              :key="document.id"
              class="flex w-full items-center justify-between rounded-lg p-2 text-left text-sm hover:bg-[#f3f7f3]"
              :class="activeDocument.id === document.id ? 'bg-[#eaf5ed]' : ''"
              @click="activeDocument = document"
            >
              <span>{{ document.name }}</span><span
                class="size-2 rounded-full"
                :class="document.status === 'verified' ? 'bg-[#31a66b]' : document.status === 'unclear' ? 'bg-[#e5a82f]' : 'bg-[#d25d4c]'"
              />
            </button>
          </div>
        </section>
      </aside><main class="space-y-5">
        <section class="panel p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="eyebrow">
                Evidence workspace
              </p><h2 class="mt-2 text-xl font-semibold">
                {{ activeDocument.name }}
              </h2>
            </div><span
              class="pill"
              :class="activeDocument.status === 'verified' ? 'risk-low' : activeDocument.status === 'unclear' ? 'risk-medium' : 'risk-high'"
            >{{ activeDocument.status }}</span>
          </div><pre class="mt-5 whitespace-pre-wrap rounded-xl bg-[#f6f8f5] p-5 text-sm leading-7 text-[#39473d]">{{ activeDocument.content }}</pre><div class="mt-5 grid gap-3 md:grid-cols-2">
            <div class="rounded-lg border border-[#dfe6df] p-4">
              <p class="eyebrow">
                Campaign information
              </p><p class="mt-2 font-medium">
                Beneficiary: {{ campaign.beneficiary }}
              </p>
            </div><div class="rounded-lg border border-[#dfe6df] p-4">
              <p class="eyebrow">
                Selected evidence
              </p><p class="mt-2 font-medium">
                {{ selectedFinding?.evidence[0]?.quote || 'No contradiction selected' }}
              </p>
            </div>
          </div>
        </section><section class="panel p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="eyebrow">
                Phase 3 + 4
              </p><h2 class="mt-2 text-xl font-semibold">
                Structured AI analysis
              </h2>
            </div><span
              v-if="analyzed"
              class="text-sm font-semibold text-[#1e7c50]"
            >Profile validated</span>
          </div><div
            v-if="!analyzed"
            class="mt-5 rounded-xl border border-dashed border-[#cbd8cc] p-6 text-sm muted"
          >
            Analyze the dossier to extract structured entities and compare sources.
          </div><pre
            v-else
            class="mt-5 overflow-auto rounded-xl bg-[#17211b] p-5 text-xs leading-6 text-[#d9eee0]"
          >{{ JSON.stringify(profile, null, 2) }}</pre>
        </section><section class="panel p-5">
          <p class="eyebrow">
            Cross-source findings
          </p><h2 class="mt-2 text-xl font-semibold">
            Evidence-backed inconsistencies
          </h2><div
            v-if="analyzed"
            class="mt-5 space-y-3"
          >
            <button
              v-for="finding in findings"
              :key="finding.id"
              class="w-full rounded-xl border border-[#dfe6df] p-4 text-left hover:border-[#8bc59d]"
              @click="showFinding(finding)"
            >
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="font-semibold">{{ finding.title }}</span><span
                  class="pill"
                  :class="`risk-${finding.severity}`"
                >{{ finding.severity }} · {{ Math.round(finding.confidence * 100) }}% confidence</span>
              </div><p class="mt-2 text-sm leading-6 muted">
                {{ finding.explanation }}
              </p><p class="mt-3 text-xs font-medium text-[#1e7c50]">
                Evidence: {{ finding.evidence.map(e => e.source).join(' + ') }}
              </p>
            </button>
          </div><p
            v-else
            class="mt-5 text-sm muted"
          >
            Findings appear after structured analysis.
          </p>
        </section>
      </main><aside class="space-y-5">
        <section class="panel border-l-4 border-l-[#1e7c50] p-5">
          <p class="eyebrow">
            Relevant policy · Phase 5
          </p><div
            v-if="analyzed && relevantPolicies.length"
            class="mt-4 space-y-4"
          >
            <article
              v-for="policy in relevantPolicies"
              :key="policy.id"
            >
              <h2 class="font-semibold">
                {{ policy.title }}
              </h2><p class="mt-1 text-xs font-semibold text-[#1e7c50]">
                {{ policy.section }}
              </p><p class="mt-2 text-sm leading-6 muted">
                {{ policy.summary }}
              </p><details class="mt-3 text-sm">
                <summary class="cursor-pointer font-semibold">
                  View guidance
                </summary><ul class="mt-2 space-y-2 pl-4 text-sm muted">
                  <li
                    v-for="item in policy.guidance"
                    :key="item"
                  >
                    {{ item }}
                  </li>
                </ul>
              </details>
            </article>
          </div><p
            v-else
            class="mt-4 text-sm muted"
          >
            Run analysis to retrieve the operational policy relevant to each finding.
          </p>
        </section><section class="panel p-5">
          <p class="eyebrow">
            AI boundary
          </p><p class="mt-3 text-sm leading-6 muted">
            Amanah recommends next steps; it never approves, rejects, freezes, or moves funds.
          </p><div
            v-if="selectedFinding"
            class="mt-4 rounded-lg bg-[#fff8e8] p-4 text-sm"
          >
            <strong>Suggested next step</strong><p class="mt-1 muted">
              {{ selectedFinding.recommendation }}
            </p>
          </div>
        </section>
      </aside>
    </div>
  </div>
</template>
