import React, { useMemo, useState } from 'react';

const seedEntries = [
  {
    id: 'wf-001',
    title: 'Meeting Brief Builder',
    useCase: 'Prepare a concise pre-meeting brief before a customer, partner, or internal decision call.',
    role: 'Leadership',
    workflowType: 'Meeting Prep',
    reusability: 'Team',
    status: 'Approved',
    contributor: 'Ankur',
    requiredContext: 'Meeting goal, participants, latest notes, open risks, decisions needed.',
    promptText:
      'Given the meeting goal, participants, and recent notes, produce a short pre-meeting brief with objective, context, likely objections, decision points, and recommended questions.',
    exampleInput:
      'Renewal call next Tuesday. Customer is concerned about pricing and implementation speed. Include top risks and likely objections.',
    exampleOutput:
      'Objective: preserve renewal momentum. Risks: pricing sensitivity, unclear implementation scope. Questions: confirm success criteria, timing constraints, and expansion blockers.',
    usageNotes:
      'Best when recent notes are attached. Use for high-stakes calls, not routine status meetings.',
    limitations:
      'Can sound overconfident if notes are incomplete or contradictory.',
    failureModes: 'Thin notes, stale source material, missing participant context.',
    lastUpdated: 'Mar 19, 2026',
    views: 28,
    copies: 11,
  },
  {
    id: 'wf-002',
    title: 'Debug Context Pack',
    useCase: 'Structure debugging requests so the model sees enough context to give useful technical help.',
    role: 'Engineering',
    workflowType: 'Debugging',
    reusability: 'Cross-company',
    status: 'Approved',
    contributor: 'Engineering seed contributor',
    requiredContext:
      'Expected behavior, actual behavior, relevant file or snippet, environment, logs, attempted fixes, constraints.',
    promptText:
      'Analyze the bug using the provided expected behavior, actual behavior, logs, relevant files, and attempted fixes. Return ranked hypotheses, next checks, and the safest first action.',
    exampleInput:
      'API returns 500 after auth refactor. Expected 200 with valid token. Logs show timeout after middleware update.',
    exampleOutput:
      'Most likely causes: middleware order, stale env var, token parsing regression. First checks: compare middleware chain, validate token decode path, review timeout config.',
    usageNotes:
      'This works better as a template than a raw prompt. Fill every context field before use.',
    limitations:
      'Weak when architecture context is missing. Can invent system behavior if the code excerpt is too small.',
    failureModes: 'Incomplete logs, unclear expected behavior, omitted constraints.',
    lastUpdated: 'Mar 20, 2026',
    views: 34,
    copies: 17,
  },
  {
    id: 'wf-003',
    title: 'Research Synthesis Draft',
    useCase: 'Convert scattered notes into a clean first synthesis for a memo, working session, or recommendation.',
    role: 'Product',
    workflowType: 'Research',
    reusability: 'Team',
    status: 'Approved',
    contributor: 'Follow-up interview participant',
    requiredContext: 'Raw notes, audience, objective, preferred length, decision to support.',
    promptText:
      'Group the notes by theme, separate signal from opinion, identify tensions, and produce a concise synthesis with implications and unanswered questions.',
    exampleInput:
      '14 survey responses on AI usage. Need a first synthesis for internal discussion with patterns and tensions.',
    exampleOutput:
      'Pattern 1: adoption is already broad. Pattern 2: quality depends on context discipline. Pattern 3: workflows stay personal instead of compounding.',
    usageNotes:
      'Good for first-pass synthesis. A human should still tighten the final wording before circulation.',
    limitations:
      'Can flatten nuance when notes vary a lot in detail or credibility.',
    failureModes: 'Mixed-quality notes, vague objective, overly broad scope.',
    lastUpdated: 'Mar 18, 2026',
    views: 23,
    copies: 9,
  },
  {
    id: 'wf-004',
    title: 'Content Repurposing Workflow',
    useCase: 'Turn one source asset into multiple downstream formats for social, email, and internal sharing.',
    role: 'Cross-functional',
    workflowType: 'Content',
    reusability: 'Personal',
    status: 'In review',
    contributor: 'Caitlin',
    requiredContext: 'Source asset, audience, channels, tone, CTA, forbidden claims.',
    promptText:
      'Repurpose the source asset into channel-specific outputs with clear audience fit, CTA, and format differences.',
    exampleInput:
      'Use webinar notes to create one LinkedIn post, one short email, and one internal Slack summary.',
    exampleOutput:
      'Three versions tailored by channel, each with distinct structure and CTA.',
    usageNotes:
      'Very effective when tone and channel constraints are clear.',
    limitations:
      'Can produce repetitive outputs if the source material is thin.',
    failureModes: 'Weak source material, vague audience, no channel rules.',
    lastUpdated: 'Mar 21, 2026',
    views: 15,
    copies: 4,
  },
];

const reviewQueue = [
  {
    id: 'rq-201',
    title: 'Competitive Account Research Template',
    contributor: 'Tim',
    role: 'Leadership',
    completeness: 86,
    issue: 'Needs clearer example output and limitation note.',
    submittedAt: 'Mar 22, 2026',
  },
  {
    id: 'rq-202',
    title: 'Sales Call Objection Drill',
    contributor: 'Seed interview #2',
    role: 'Cross-functional',
    completeness: 72,
    issue: 'Required context is too thin. Workflow steps need to be separated.',
    submittedAt: 'Mar 23, 2026',
  },
  {
    id: 'rq-203',
    title: 'Bug Triage Starter',
    contributor: 'Engineering',
    role: 'Engineering',
    completeness: 91,
    issue: 'Ready after minor formatting cleanup.',
    submittedAt: 'Mar 24, 2026',
  },
];

const seedTargets = [
  { label: 'Seed goal', value: '10–15', note: 'high-quality entries for launch' },
  { label: 'Usable v1 range', value: '15–25', note: 'reusable workflows total' },
  { label: 'Review time', value: '5–10 min', note: 'maximum target per submission' },
  { label: 'Read time', value: '<2 min', note: 'per entry for the user' },
];

export default function InternalAIWorkflowPromptPortalPrototype() {
  const [tab, setTab] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All roles');
  const [typeFilter, setTypeFilter] = useState('All workflows');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [selectedId, setSelectedId] = useState(seedEntries[0].id);

  const [form, setForm] = useState({
    title: 'Win/Loss Interview Synthesis',
    problem: 'Turn raw interview notes into a clean, decision-oriented synthesis for the GTM team.',
    prompt:
      'Analyze the interview notes, separate repeated signal from isolated comments, identify top purchase drivers, blockers, and implications for messaging.',
    example: 'Input: 6 interview transcripts. Output: top themes, tensions, quotes to verify, and messaging implications.',
    worksWell: 'Works best when each interview has clear labels and quotes.',
    fails: 'Breaks down when notes are incomplete or when the objective is too broad.',
    who: 'Product, GTM, leadership',
    reusability: 'Team reusable',
  });

  const roles = ['All roles', 'Leadership', 'Engineering', 'Product', 'Cross-functional'];
  const workflowTypes = ['All workflows', 'Meeting Prep', 'Debugging', 'Research', 'Content'];
  const statusOptions = ['All status', 'Approved', 'In review'];

  const filteredEntries = useMemo(() => {
    return seedEntries.filter((entry) => {
      const q = search.trim().toLowerCase();
      const matchesQuery =
        !q ||
        entry.title.toLowerCase().includes(q) ||
        entry.useCase.toLowerCase().includes(q) ||
        entry.workflowType.toLowerCase().includes(q) ||
        entry.contributor.toLowerCase().includes(q);
      const matchesRole = roleFilter === 'All roles' || entry.role === roleFilter;
      const matchesType = typeFilter === 'All workflows' || entry.workflowType === typeFilter;
      const matchesStatus = statusFilter === 'All status' || entry.status === statusFilter;
      return matchesQuery && matchesRole && matchesType && matchesStatus;
    });
  }, [search, roleFilter, typeFilter, statusFilter]);

  const selectedEntry =
    filteredEntries.find((entry) => entry.id === selectedId) || filteredEntries[0] || seedEntries[0];

  const approvedCount = seedEntries.filter((entry) => entry.status === 'Approved').length;
  const inReviewCount = seedEntries.filter((entry) => entry.status === 'In review').length;
  const totalCopies = seedEntries.reduce((sum, entry) => sum + entry.copies, 0);

  return (
    <div style={styles.page}>
      <StyleTag />
      <div style={styles.appShell}>
        <aside style={styles.sidebar}>
          <div style={styles.brandBlock}>
            <div style={styles.badge}>Internal v1 prototype</div>
            <h1 style={styles.brandTitle}>AI Workflow and Prompt Portal</h1>
            <p style={styles.brandText}>
              A lightweight internal platform for capturing, reviewing, searching, and reusing proven AI workflows.
            </p>
          </div>

          <div style={styles.sideStatStack}>
            <MiniStat label="Approved" value={String(approvedCount)} />
            <MiniStat label="In review" value={String(inReviewCount)} />
            <MiniStat label="Total copies" value={String(totalCopies)} />
          </div>

          <nav style={styles.nav}>
            {[
              ['dashboard', 'Dashboard'],
              ['library', 'Library'],
              ['submit', 'Submit'],
              ['review', 'Review Queue'],
              ['analytics', 'Analytics'],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{ ...styles.navButton, ...(tab === key ? styles.navButtonActive : {}) }}
              >
                {label}
              </button>
            ))}
          </nav>

          <div style={styles.sidebarCard}>
            <div style={styles.sidebarCardLabel}>Design guardrails</div>
            <ul style={styles.bulletList}>
              <li>Not a raw prompt dump</li>
              <li>Every entry needs context and examples</li>
              <li>Submission must stay lightweight</li>
              <li>v1 stays small and searchable</li>
            </ul>
          </div>
        </aside>

        <main style={styles.main}>
          <header style={styles.topbar}>
            <div>
              <div style={styles.kicker}>March 2026 concept translated into platform form</div>
              <h2 style={styles.pageTitle}>
                {tab === 'dashboard' && 'Portal overview'}
                {tab === 'library' && 'Searchable workflow library'}
                {tab === 'submit' && 'Contribution intake'}
                {tab === 'review' && 'Review and publish queue'}
                {tab === 'analytics' && 'Usage and seed health'}
              </h2>
            </div>
            <div style={styles.topActions}>
              <button style={styles.ghostButton}>Share internally</button>
              <button style={styles.primaryButton}>Add new workflow</button>
            </div>
          </header>

          {tab === 'dashboard' && (
            <div style={styles.contentStack}>
              <section style={styles.heroPanel}>
                <div>
                  <div style={styles.heroEyebrow}>Why this exists</div>
                  <h3 style={styles.heroTitle}>The problem is fragmentation, not basic adoption</h3>
                  <p style={styles.heroText}>
                    The team already uses AI in real work. This portal is the shared layer that helps useful workflows compound instead of staying personal and hard to discover.
                  </p>
                </div>
                <div style={styles.heroGrid}>
                  {seedTargets.map((item) => (
                    <div key={item.label} style={styles.metricCard}>
                      <div style={styles.metricValue}>{item.value}</div>
                      <div style={styles.metricLabel}>{item.label}</div>
                      <div style={styles.metricNote}>{item.note}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section style={styles.gridTwo}>
                <div style={styles.panel}>
                  <div style={styles.panelHeader}>
                    <h4 style={styles.panelTitle}>Platform modules</h4>
                    <span style={styles.panelMeta}>v1 scope</span>
                  </div>
                  <div style={styles.moduleGrid}>
                    <ModuleCard title="Library" text="Search by role, workflow type, or keyword. Read an entry in under two minutes." />
                    <ModuleCard title="Entry Detail" text="Show prompt, context, examples, notes, limitations, and contributor." />
                    <ModuleCard title="Submit" text="A short intake flow designed to stay under five to ten minutes." />
                    <ModuleCard title="Review" text="Light editorial step before publishing into the shared portal." />
                  </div>
                </div>

                <div style={styles.panel}>
                  <div style={styles.panelHeader}>
                    <h4 style={styles.panelTitle}>What v1 does not try to solve</h4>
                    <span style={styles.panelMeta}>Guardrails</span>
                  </div>
                  <div style={styles.guardrailStack}>
                    <GuardrailCard title="No connected data layer" text="v1 does not solve broader data access, security, or system integration." />
                    <GuardrailCard title="No prompt optimizer" text="No prompt mixer, AI prompt builder, or auto-optimization engine in the first release." />
                    <GuardrailCard title="No company-wide standardization push" text="Success means a small, strong library, not standardizing every workflow at once." />
                  </div>
                </div>
              </section>

              <section style={styles.gridTwo}>
                <div style={styles.panel}>
                  <div style={styles.panelHeader}>
                    <h4 style={styles.panelTitle}>Early seed plan</h4>
                    <span style={styles.panelMeta}>Launch logic</span>
                  </div>
                  <ol style={styles.numberList}>
                    <li>Seed one or two structured workflows already used by Ankur.</li>
                    <li>Add one engineering contributor with repeatable technical workflows.</li>
                    <li>Use two to three follow-up interviews to surface reusable examples.</li>
                    <li>Launch with enough strong entries to teach the behavior by example.</li>
                  </ol>
                </div>

                <div style={styles.panel}>
                  <div style={styles.panelHeader}>
                    <h4 style={styles.panelTitle}>Open alignment questions</h4>
                    <span style={styles.panelMeta}>Still undecided</span>
                  </div>
                  <div style={styles.questionStack}>
                    <QuestionCard title="Hosting" text="Notion, Google Docs, Google Sites, or a lightweight custom portal?" />
                    <QuestionCard title="Engineering partner" text="Who supports collection, organization, and future consolidation?" />
                    <QuestionCard title="Review owner" text="Who lightly reviews entries before they become shared assets?" />
                    <QuestionCard title="Boundary with Harish" text="Stay at workflow layer only, or prepare for future connected data access?" />
                  </div>
                </div>
              </section>
            </div>
          )}

          {tab === 'library' && (
            <div style={styles.contentStack}>
              <section style={styles.toolbarPanel}>
                <div style={styles.searchWrap}>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search workflows, use cases, or contributors"
                    style={styles.searchInput}
                  />
                </div>
                <div style={styles.filterRow}>
                  <Select value={roleFilter} onChange={setRoleFilter} options={roles} />
                  <Select value={typeFilter} onChange={setTypeFilter} options={workflowTypes} />
                  <Select value={statusFilter} onChange={setStatusFilter} options={statusOptions} />
                </div>
              </section>

              <section style={styles.libraryLayout}>
                <div style={styles.libraryList}>
                  <div style={styles.libraryHeader}>
                    <div>
                      <h4 style={styles.panelTitle}>Workflow library</h4>
                      <div style={styles.panelMeta}>{filteredEntries.length} results</div>
                    </div>
                    <button style={styles.ghostButton}>Sort: most reused</button>
                  </div>

                  <div style={styles.cardStack}>
                    {filteredEntries.map((entry) => (
                      <button
                        key={entry.id}
                        onClick={() => setSelectedId(entry.id)}
                        style={{ ...styles.entryCard, ...(selectedEntry?.id === entry.id ? styles.entryCardActive : {}) }}
                      >
                        <div style={styles.entryCardTop}>
                          <div>
                            <div style={styles.entryTitle}>{entry.title}</div>
                            <div style={styles.entrySubtitle}>{entry.useCase}</div>
                          </div>
                          <StatusPill label={entry.status} />
                        </div>
                        <div style={styles.metaRow}>
                          <MetaPill label={entry.role} />
                          <MetaPill label={entry.workflowType} />
                          <MetaPill label={entry.reusability} />
                        </div>
                        <div style={styles.entryCardFooter}>
                          <span>{entry.contributor}</span>
                          <span>{entry.copies} copies</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={styles.detailPanel}>
                  {selectedEntry && (
                    <>
                      <div style={styles.detailHeader}>
                        <div>
                          <div style={styles.kickerSmall}>Entry detail</div>
                          <h4 style={styles.detailTitle}>{selectedEntry.title}</h4>
                        </div>
                        <div style={styles.metaRow}>
                          <StatusPill label={selectedEntry.status} />
                        </div>
                      </div>

                      <div style={styles.detailMetaGrid}>
                        <DetailMeta label="Role" value={selectedEntry.role} />
                        <DetailMeta label="Workflow type" value={selectedEntry.workflowType} />
                        <DetailMeta label="Contributor" value={selectedEntry.contributor} />
                        <DetailMeta label="Last updated" value={selectedEntry.lastUpdated} />
                      </div>

                      <DetailSection title="Use case" text={selectedEntry.useCase} />
                      <DetailSection title="Prompt or workflow" text={selectedEntry.promptText} />
                      <DetailSection title="Required context" text={selectedEntry.requiredContext} />

                      <div style={styles.exampleGrid}>
                        <ExampleBox title="Example input" text={selectedEntry.exampleInput} />
                        <ExampleBox title="Example output" text={selectedEntry.exampleOutput} />
                      </div>

                      <DetailSection title="Usage notes" text={selectedEntry.usageNotes} />
                      <DetailSection title="Known limitations" text={selectedEntry.limitations} />
                      <DetailSection title="Common failure modes" text={selectedEntry.failureModes} />

                      <div style={styles.detailActions}>
                        <button style={styles.primaryButton}>Copy workflow</button>
                        <button style={styles.ghostButton}>Adapt entry</button>
                      </div>
                    </>
                  )}
                </div>
              </section>
            </div>
          )}

          {tab === 'submit' && (
            <div style={styles.gridTwoWide}>
              <section style={styles.panel}>
                <div style={styles.panelHeader}>
                  <h4 style={styles.panelTitle}>Quick contribution form</h4>
                  <span style={styles.panelMeta}>Target: under 10 minutes</span>
                </div>

                <div style={styles.formGrid}>
                  <Field label="Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} />
                  <Field label="What problem does it solve?" value={form.problem} multiline onChange={(value) => setForm({ ...form, problem: value })} />
                  <Field label="Prompt or workflow" value={form.prompt} multiline onChange={(value) => setForm({ ...form, prompt: value })} />
                  <Field label="One example" value={form.example} multiline onChange={(value) => setForm({ ...form, example: value })} />
                  <Field label="What works well" value={form.worksWell} multiline onChange={(value) => setForm({ ...form, worksWell: value })} />
                  <Field label="What fails or needs correction" value={form.fails} multiline onChange={(value) => setForm({ ...form, fails: value })} />
                  <Field label="Who should use it" value={form.who} onChange={(value) => setForm({ ...form, who: value })} />
                  <Field label="Reusability level" value={form.reusability} onChange={(value) => setForm({ ...form, reusability: value })} />
                </div>

                <div style={styles.detailActions}>
                  <button style={styles.primaryButton}>Submit for review</button>
                  <button style={styles.ghostButton}>Save draft</button>
                </div>
              </section>

              <section style={styles.panel}>
                <div style={styles.panelHeader}>
                  <h4 style={styles.panelTitle}>What the reviewer will see</h4>
                  <span style={styles.panelMeta}>Submission preview</span>
                </div>

                <div style={styles.previewCard}>
                  <div style={styles.previewTop}>
                    <div>
                      <div style={styles.entryTitle}>{form.title}</div>
                      <div style={styles.entrySubtitle}>{form.problem}</div>
                    </div>
                    <StatusPill label="Draft" />
                  </div>
                  <PreviewSection title="Prompt or workflow" text={form.prompt} />
                  <PreviewSection title="Example" text={form.example} />
                  <PreviewSection title="What works well" text={form.worksWell} />
                  <PreviewSection title="What fails" text={form.fails} />
                  <PreviewSection title="Who should use it" text={form.who} />
                  <PreviewSection title="Reusability" text={form.reusability} />
                </div>

                <div style={styles.tipBox}>
                  <div style={styles.tipTitle}>Submission principle</div>
                  <p style={styles.tipText}>
                    A good entry should help someone else reuse the workflow without contacting the original contributor. Raw prompts alone are not enough.
                  </p>
                </div>
              </section>
            </div>
          )}

          {tab === 'review' && (
            <div style={styles.contentStack}>
              <section style={styles.panel}>
                <div style={styles.panelHeader}>
                  <h4 style={styles.panelTitle}>Review queue</h4>
                  <span style={styles.panelMeta}>Light editorial step before publish</span>
                </div>

                <div style={styles.queueStack}>
                  {reviewQueue.map((item) => (
                    <div key={item.id} style={styles.queueCard}>
                      <div style={styles.queueTop}>
                        <div>
                          <div style={styles.entryTitle}>{item.title}</div>
                          <div style={styles.entrySubtitle}>Submitted by {item.contributor} · {item.role}</div>
                        </div>
                        <div style={styles.completeness}>{item.completeness}% complete</div>
                      </div>
                      <div style={styles.queueIssue}>{item.issue}</div>
                      <div style={styles.queueFooter}>
                        <span>{item.submittedAt}</span>
                        <div style={styles.queueActions}>
                          <button style={styles.ghostButtonSmall}>Request edits</button>
                          <button style={styles.primaryButtonSmall}>Approve</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {tab === 'analytics' && (
            <div style={styles.gridTwo}>
              <section style={styles.panel}>
                <div style={styles.panelHeader}>
                  <h4 style={styles.panelTitle}>Usage snapshot</h4>
                  <span style={styles.panelMeta}>Mock v1 telemetry</span>
                </div>
                <div style={styles.analyticsGrid}>
                  <AnalyticsCard label="Most viewed type" value="Debugging" note="High repeat need and high value per use" />
                  <AnalyticsCard label="Most copied entry" value="Debug Context Pack" note="17 copies this month" />
                  <AnalyticsCard label="Underused category" value="Content" note="Needs better examples and stronger labeling" />
                  <AnalyticsCard label="Signal to watch" value="Adaptation rate" note="Shows whether workflows travel across users" />
                </div>
              </section>

              <section style={styles.panel}>
                <div style={styles.panelHeader}>
                  <h4 style={styles.panelTitle}>What the team should learn from v1</h4>
                  <span style={styles.panelMeta}>Decision signals</span>
                </div>
                <ul style={styles.bulletListLarge}>
                  <li>Which entries get reused versus merely viewed.</li>
                  <li>Which roles contribute the strongest repeatable workflows.</li>
                  <li>Where users still need better examples or context guidance.</li>
                  <li>Whether certain workflows should later connect to tools or data systems.</li>
                </ul>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div style={styles.miniStat}>
      <div style={styles.miniStatValue}>{value}</div>
      <div style={styles.miniStatLabel}>{label}</div>
    </div>
  );
}

function ModuleCard({ title, text }) {
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleTitle}>{title}</div>
      <div style={styles.moduleText}>{text}</div>
    </div>
  );
}

function GuardrailCard({ title, text }) {
  return (
    <div style={styles.guardrailCard}>
      <div style={styles.guardrailTitle}>{title}</div>
      <div style={styles.guardrailText}>{text}</div>
    </div>
  );
}

function QuestionCard({ title, text }) {
  return (
    <div style={styles.questionCard}>
      <div style={styles.questionTitle}>{title}</div>
      <div style={styles.questionText}>{text}</div>
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} style={styles.select}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function StatusPill({ label }) {
  const active = label === 'Approved';
  return <span style={{ ...styles.statusPill, ...(active ? styles.statusApproved : styles.statusMuted) }}>{label}</span>;
}

function MetaPill({ label }) {
  return <span style={styles.metaPill}>{label}</span>;
}

function DetailMeta({ label, value }) {
  return (
    <div style={styles.detailMetaCard}>
      <div style={styles.detailMetaLabel}>{label}</div>
      <div style={styles.detailMetaValue}>{value}</div>
    </div>
  );
}

function DetailSection({ title, text }) {
  return (
    <div style={styles.detailSection}>
      <div style={styles.detailSectionTitle}>{title}</div>
      <div style={styles.detailSectionText}>{text}</div>
    </div>
  );
}

function ExampleBox({ title, text }) {
  return (
    <div style={styles.exampleBox}>
      <div style={styles.exampleTitle}>{title}</div>
      <div style={styles.exampleText}>{text}</div>
    </div>
  );
}

function Field({ label, value, onChange, multiline = false }) {
  return (
    <label style={styles.fieldWrap}>
      <span style={styles.fieldLabel}>{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} style={styles.textarea} rows={4} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} style={styles.input} />
      )}
    </label>
  );
}

function PreviewSection({ title, text }) {
  return (
    <div style={styles.previewSection}>
      <div style={styles.previewSectionTitle}>{title}</div>
      <div style={styles.previewSectionText}>{text}</div>
    </div>
  );
}

function AnalyticsCard({ label, value, note }) {
  return (
    <div style={styles.analyticsCard}>
      <div style={styles.analyticsLabel}>{label}</div>
      <div style={styles.analyticsValue}>{value}</div>
      <div style={styles.analyticsNote}>{note}</div>
    </div>
  );
}

function StyleTag() {
  return (
    <style>{`
      * { box-sizing: border-box; }
      html, body, #root { margin: 0; padding: 0; }
      body {
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #f4f6fb;
        color: #0f172a;
      }
      button, input, textarea, select { font: inherit; }
      button { cursor: pointer; }
      @media (max-width: 1080px) {
        .portal-shell { grid-template-columns: 1fr !important; }
        .portal-sidebar { position: static !important; }
        .library-layout { grid-template-columns: 1fr !important; }
        .grid-two, .grid-two-wide { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 760px) {
        .topbar { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
        .hero-grid, .analytics-grid, .module-grid, .detail-meta-grid, .example-grid, .filter-row { grid-template-columns: 1fr !important; }
        .main-pane { padding: 20px !important; }
      }
    `}</style>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #f7f8fc 0%, #eef2ff 100%)',
    color: '#0f172a',
  },
  appShell: {
    display: 'grid',
    gridTemplateColumns: '280px minmax(0, 1fr)',
    gap: 20,
    maxWidth: 1480,
    margin: '0 auto',
    padding: 20,
  },
  sidebar: {
    position: 'sticky',
    top: 20,
    alignSelf: 'start',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    background: 'rgba(255,255,255,0.8)',
    border: '1px solid rgba(148,163,184,0.2)',
    borderRadius: 24,
    padding: 18,
    backdropFilter: 'blur(10px)',
    boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
  },
  brandBlock: { display: 'flex', flexDirection: 'column', gap: 10 },
  badge: {
    alignSelf: 'flex-start',
    background: '#e0e7ff',
    color: '#3730a3',
    fontSize: 12,
    fontWeight: 700,
    padding: '6px 10px',
    borderRadius: 999,
  },
  brandTitle: { margin: 0, fontSize: 24, lineHeight: 1.15, letterSpacing: '-0.03em' },
  brandText: { margin: 0, fontSize: 14, lineHeight: 1.6, color: '#475569' },
  sideStatStack: { display: 'grid', gridTemplateColumns: '1fr', gap: 10 },
  miniStat: {
    padding: 12,
    borderRadius: 16,
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
  },
  miniStatValue: { fontSize: 20, fontWeight: 800 },
  miniStatLabel: { fontSize: 12, color: '#64748b', marginTop: 4 },
  nav: { display: 'flex', flexDirection: 'column', gap: 8 },
  navButton: {
    textAlign: 'left',
    border: '1px solid transparent',
    background: 'transparent',
    color: '#334155',
    borderRadius: 14,
    padding: '12px 14px',
    fontWeight: 600,
  },
  navButtonActive: {
    background: '#0f172a',
    color: '#ffffff',
    boxShadow: '0 8px 20px rgba(15,23,42,0.16)',
  },
  sidebarCard: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 18,
    padding: 14,
  },
  sidebarCardLabel: { fontSize: 12, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 },
  bulletList: { margin: 0, paddingLeft: 18, display: 'grid', gap: 8, color: '#334155', fontSize: 14, lineHeight: 1.55 },
  bulletListLarge: { margin: 0, paddingLeft: 18, display: 'grid', gap: 12, color: '#334155', fontSize: 15, lineHeight: 1.65 },
  main: {
    background: 'rgba(255,255,255,0.82)',
    border: '1px solid rgba(148,163,184,0.2)',
    borderRadius: 28,
    padding: 22,
    boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
    backdropFilter: 'blur(10px)',
  },
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    marginBottom: 18,
  },
  kicker: { fontSize: 12, fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 },
  pageTitle: { margin: 0, fontSize: 30, lineHeight: 1.1, letterSpacing: '-0.03em' },
  topActions: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  primaryButton: {
    border: 'none',
    background: '#4f46e5',
    color: '#fff',
    borderRadius: 14,
    padding: '12px 16px',
    fontWeight: 700,
    boxShadow: '0 8px 20px rgba(79,70,229,0.24)',
  },
  ghostButton: {
    border: '1px solid #cbd5e1',
    background: '#ffffff',
    color: '#0f172a',
    borderRadius: 14,
    padding: '12px 16px',
    fontWeight: 700,
  },
  contentStack: { display: 'grid', gap: 18 },
  heroPanel: {
    background: 'linear-gradient(135deg, #111827 0%, #312e81 100%)',
    color: '#fff',
    borderRadius: 24,
    padding: 22,
    display: 'grid',
    gap: 18,
  },
  heroEyebrow: { fontSize: 12, fontWeight: 800, color: '#c7d2fe', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 },
  heroTitle: { margin: 0, fontSize: 30, lineHeight: 1.08, letterSpacing: '-0.03em' },
  heroText: { margin: '10px 0 0 0', maxWidth: 760, fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.82)' },
  heroGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 },
  metricCard: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 18,
    padding: 16,
  },
  metricValue: { fontSize: 24, fontWeight: 800 },
  metricLabel: { marginTop: 6, fontSize: 13, fontWeight: 700 },
  metricNote: { marginTop: 4, fontSize: 12, color: 'rgba(255,255,255,0.72)', lineHeight: 1.45 },
  gridTwo: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 18 },
  gridTwoWide: { display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(360px, 0.85fr)', gap: 18 },
  panel: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 22,
    padding: 18,
    minWidth: 0,
  },
  panelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 14, marginBottom: 16, flexWrap: 'wrap' },
  panelTitle: { margin: 0, fontSize: 20, lineHeight: 1.2, letterSpacing: '-0.02em' },
  panelMeta: { fontSize: 12, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' },
  moduleGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 },
  moduleCard: { padding: 16, borderRadius: 18, background: '#f8fafc', border: '1px solid #e2e8f0' },
  moduleTitle: { fontSize: 16, fontWeight: 800, marginBottom: 6 },
  moduleText: { fontSize: 14, lineHeight: 1.6, color: '#475569' },
  guardrailStack: { display: 'grid', gap: 12 },
  guardrailCard: { padding: 14, borderRadius: 18, background: '#fff7ed', border: '1px solid #fed7aa' },
  guardrailTitle: { fontSize: 15, fontWeight: 800, marginBottom: 4, color: '#9a3412' },
  guardrailText: { fontSize: 14, lineHeight: 1.6, color: '#7c2d12' },
  numberList: { margin: 0, paddingLeft: 18, display: 'grid', gap: 10, fontSize: 15, lineHeight: 1.65, color: '#334155' },
  questionStack: { display: 'grid', gap: 12 },
  questionCard: { padding: 14, borderRadius: 18, background: '#f8fafc', border: '1px solid #e2e8f0' },
  questionTitle: { fontSize: 15, fontWeight: 800, marginBottom: 4 },
  questionText: { fontSize: 14, lineHeight: 1.6, color: '#475569' },
  toolbarPanel: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 20,
    padding: 16,
    display: 'grid',
    gap: 12,
  },
  searchWrap: { width: '100%' },
  searchInput: {
    width: '100%',
    border: '1px solid #cbd5e1',
    borderRadius: 14,
    padding: '14px 16px',
    background: '#f8fafc',
    outline: 'none',
  },
  filterRow: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 },
  select: {
    width: '100%',
    border: '1px solid #cbd5e1',
    borderRadius: 14,
    padding: '12px 14px',
    background: '#ffffff',
  },
  libraryLayout: { display: 'grid', gridTemplateColumns: 'minmax(360px, 0.9fr) minmax(0, 1.1fr)', gap: 18 },
  libraryList: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 22,
    padding: 16,
    minWidth: 0,
  },
  libraryHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 14, flexWrap: 'wrap' },
  cardStack: { display: 'grid', gap: 12 },
  entryCard: {
    width: '100%',
    textAlign: 'left',
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    borderRadius: 18,
    padding: 14,
  },
  entryCardActive: { border: '1px solid #818cf8', boxShadow: '0 10px 24px rgba(99,102,241,0.12)', background: '#ffffff' },
  entryCardTop: { display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' },
  entryTitle: { fontSize: 16, fontWeight: 800, lineHeight: 1.3 },
  entrySubtitle: { marginTop: 4, fontSize: 13, lineHeight: 1.55, color: '#475569' },
  metaRow: { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 },
  metaPill: { fontSize: 12, fontWeight: 700, padding: '6px 10px', borderRadius: 999, background: '#eef2ff', color: '#4338ca' },
  entryCardFooter: { display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 12, fontSize: 12, color: '#64748b', fontWeight: 700 },
  detailPanel: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 22,
    padding: 18,
    minWidth: 0,
  },
  detailHeader: { display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' },
  kickerSmall: { fontSize: 12, fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 },
  detailTitle: { margin: 0, fontSize: 24, lineHeight: 1.15, letterSpacing: '-0.025em' },
  detailMetaGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10, marginTop: 16 },
  detailMetaCard: { padding: 12, borderRadius: 16, background: '#f8fafc', border: '1px solid #e2e8f0' },
  detailMetaLabel: { fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 },
  detailMetaValue: { fontSize: 14, fontWeight: 700, color: '#0f172a', lineHeight: 1.5 },
  detailSection: { marginTop: 18 },
  detailSectionTitle: { fontSize: 14, fontWeight: 800, marginBottom: 6 },
  detailSectionText: { fontSize: 14, lineHeight: 1.7, color: '#334155' },
  exampleGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12, marginTop: 18 },
  exampleBox: { padding: 14, borderRadius: 18, background: '#f8fafc', border: '1px solid #e2e8f0' },
  exampleTitle: { fontSize: 13, fontWeight: 800, marginBottom: 6, color: '#4338ca' },
  exampleText: { fontSize: 14, lineHeight: 1.65, color: '#334155' },
  detailActions: { display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 },
  statusPill: { display: 'inline-flex', alignItems: 'center', borderRadius: 999, padding: '6px 10px', fontSize: 12, fontWeight: 800 },
  statusApproved: { background: '#dcfce7', color: '#166534' },
  statusMuted: { background: '#ede9fe', color: '#5b21b6' },
  formGrid: { display: 'grid', gap: 14 },
  fieldWrap: { display: 'grid', gap: 8 },
  fieldLabel: { fontSize: 13, fontWeight: 800, color: '#334155' },
  input: { width: '100%', border: '1px solid #cbd5e1', borderRadius: 14, padding: '12px 14px', background: '#ffffff' },
  textarea: { width: '100%', border: '1px solid #cbd5e1', borderRadius: 14, padding: '12px 14px', resize: 'vertical', minHeight: 100, background: '#ffffff' },
  previewCard: { border: '1px solid #e2e8f0', borderRadius: 20, padding: 16, background: '#f8fafc' },
  previewTop: { display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', marginBottom: 12 },
  previewSection: { paddingTop: 10, marginTop: 10, borderTop: '1px solid #e2e8f0' },
  previewSectionTitle: { fontSize: 13, fontWeight: 800, marginBottom: 4 },
  previewSectionText: { fontSize: 14, lineHeight: 1.65, color: '#334155' },
  tipBox: { marginTop: 16, padding: 14, borderRadius: 18, background: '#eff6ff', border: '1px solid #bfdbfe' },
  tipTitle: { fontSize: 14, fontWeight: 800, marginBottom: 4, color: '#1d4ed8' },
  tipText: { margin: 0, fontSize: 14, lineHeight: 1.65, color: '#1e3a8a' },
  queueStack: { display: 'grid', gap: 12 },
  queueCard: { padding: 16, borderRadius: 18, border: '1px solid #e2e8f0', background: '#f8fafc' },
  queueTop: { display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' },
  completeness: { fontSize: 12, fontWeight: 800, color: '#4338ca', background: '#eef2ff', padding: '6px 10px', borderRadius: 999 },
  queueIssue: { marginTop: 10, fontSize: 14, lineHeight: 1.6, color: '#334155' },
  queueFooter: { marginTop: 12, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center', fontSize: 12, color: '#64748b', fontWeight: 700 },
  queueActions: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  ghostButtonSmall: { border: '1px solid #cbd5e1', background: '#ffffff', color: '#0f172a', borderRadius: 12, padding: '9px 12px', fontWeight: 700, fontSize: 13 },
  primaryButtonSmall: { border: 'none', background: '#4f46e5', color: '#fff', borderRadius: 12, padding: '9px 12px', fontWeight: 700, fontSize: 13 },
  analyticsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 },
  analyticsCard: { padding: 16, borderRadius: 18, background: '#f8fafc', border: '1px solid #e2e8f0' },
  analyticsLabel: { fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 },
  analyticsValue: { fontSize: 18, fontWeight: 800, marginBottom: 6 },
  analyticsNote: { fontSize: 14, lineHeight: 1.6, color: '#475569' },
};
