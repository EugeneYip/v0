import React, { useMemo, useState } from 'react';

const ICON_PATHS = {
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  search: 'M11 4a7 7 0 105.2 11.7l3.05 3.05 1.4-1.4-3.05-3.05A7 7 0 0011 4zm0 2a5 5 0 110 10 5 5 0 010-10z',
  plus: 'M12 5v14M5 12h14',
  upload: 'M12 16V6m0 0l-4 4m4-4l4 4M5 18h14',
  check: 'M5 12l4 4L19 6',
  warning: 'M12 3l9 16H3l9-16zm0 5v4m0 4h.01',
  layers: 'M12 3l9 5-9 5-9-5 9-5zm-9 9l9 5 9-5m-18 4l9 5 9-5',
  spark: 'M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z',
  clock: 'M12 7v5l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z',
  users: 'M16 14a4 4 0 10-3.9-4.8M8 14a4 4 0 103.9-4.8M3.5 20a6 6 0 0110 0m1 0a6 6 0 016 0',
  filter: 'M4 6h16M7 12h10M10 18h4',
  copy: 'M9 9h10v11H9zM5 5h10v2H7v8H5z',
  file: 'M7 3h7l5 5v13H7zM14 3v5h5',
  arrowRight: 'M5 12h12m-4-4l4 4-4 4',
  database: 'M12 5c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zm-8 7v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4m-16 0c0 1.7 3.6 3 8 3s8-1.3 8-3',
  lock: 'M8 11V8a4 4 0 118 0v3m-7 4h6',
  eye: 'M2.5 12S6.5 6.5 12 6.5 21.5 12 21.5 12 17.5 17.5 12 17.5 2.5 12 2.5 12zm9.5-3a3 3 0 100 6 3 3 0 000-6z',
  chartBar: 'M5 19V9m7 10V5m7 14v-7M4 19h16',
  route: 'M5 19h3v-3H5v3zm11-11h3V5h-3v3zM8 17h3v-3H8v3zm3-1h3a3 3 0 003-3V8',
  bolt: 'M13 2L4 14h6l-1 8 9-12h-6l1-8z',
  help: 'M12 17h.01M9.1 9.5a2.9 2.9 0 115.3 1.5c-.5 1-1.4 1.4-2.1 1.9-.8.5-1.3 1-1.3 2.1',
  phone: 'M8 3h8a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2zm4 15h.01',
  tablet: 'M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z',
  desktop: 'M4 5h16a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2zm5 14h6m-5 0l-1 2m7-2l1 2',
};

function Icon({ name, size = 18, stroke = 1.8, color = 'currentColor', style }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

const navItems = [
  { id: 'home', label: 'Home', icon: 'grid' },
  { id: 'library', label: 'Library', icon: 'search' },
  { id: 'contribute', label: 'Contribute', icon: 'plus' },
  { id: 'review', label: 'Review', icon: 'check' },
  { id: 'adoption', label: 'Adoption', icon: 'chartBar' },
];

const metrics = [
  { label: 'Responses analyzed', value: '14', detail: 'baseline input across roles' },
  { label: 'Saving at least 10 min', value: '13/14', detail: 'per most common AI task' },
  { label: 'Saving 30+ min', value: '50%', detail: 'stronger time leverage signal' },
  { label: 'v1 success range', value: '15–25', detail: 'high-quality reusable entries' },
];

const problemCards = [
  {
    title: 'Hard to find what already works',
    body: 'Someone may have already solved the prompting problem you are still solving alone. Today there is no dependable way to discover that quickly.',
    icon: 'search',
  },
  {
    title: 'Quality depends too much on individual habits',
    body: 'Context gaps, re-prompt loops, and inaccurate output usually come from weak prompting structure, not only model quality.',
    icon: 'warning',
  },
  {
    title: 'Strong workflows stay personal',
    body: 'Useful patterns do not become shared capability unless they are captured with examples, guidance, and clear limits.',
    icon: 'layers',
  },
];

const entryFields = [
  ['Title', 'A short, searchable name.'],
  ['Use case', 'The job this entry is meant to do.'],
  ['Role or workflow tag', 'Who should use it and in what setting.'],
  ['Prompt text or workflow summary', 'The actual prompt, or the steps if it is multi-step.'],
  ['Required context', 'What the AI needs before this works well.'],
  ['Example input and output', 'A concrete example of what goes in and what comes out.'],
  ['Usage notes', 'How to get the best result, what to avoid, and when not to use it.'],
  ['Known limitations', 'Where it tends to break down or become unreliable.'],
  ['Contributor', 'Who submitted it for follow-up and improvement.'],
];

const workflowLevels = [
  {
    level: 'Personal',
    desc: 'Useful to one person, not ready for broad reuse yet.',
    color: '#6d6f7d',
  },
  {
    level: 'Team',
    desc: 'Reusable within one team with light adaptation.',
    color: '#2355d8',
  },
  {
    level: 'Cross-company',
    desc: 'Broadly reusable with stable context and clear examples.',
    color: '#0f8f68',
  },
];

const libraryEntries = [
  {
    id: 'wf-001',
    title: 'Meeting Brief Builder',
    useCase: 'Prepare a concise pre-meeting brief before a customer, partner, or internal decision call.',
    role: 'Leadership',
    type: 'Meeting Prep',
    reusability: 'Team',
    status: 'Approved',
    contributor: 'Ankur',
    requiredContext: 'Meeting goal, participants, latest notes, open risks, and decisions needed.',
    prompt: 'Given the meeting goal, participants, and recent notes, produce a short pre-meeting brief with objective, context, likely objections, decision points, and recommended questions.',
    input: 'Renewal call next Tuesday. Customer is concerned about pricing and implementation speed. Include top risks and likely objections.',
    output: 'Objective: preserve renewal momentum. Risks: pricing sensitivity, unclear implementation scope. Questions: confirm success criteria, timing constraints, and expansion blockers.',
    notes: 'Best when recent notes are attached. Use for high-stakes calls, not routine status meetings.',
    limitations: 'Can sound too certain if the notes are stale, thin, or contradictory.',
    failures: 'Thin notes, missing stakeholder context, and unclear meeting goal.',
    readTime: '90 sec',
    views: 28,
    copies: 11,
    updated: 'Mar 19, 2026',
  },
  {
    id: 'wf-002',
    title: 'Debug Context Pack',
    useCase: 'Structure debugging requests so the model sees enough context to give useful technical help.',
    role: 'Engineering',
    type: 'Debugging',
    reusability: 'Cross-company',
    status: 'Approved',
    contributor: 'Engineering seed contributor',
    requiredContext: 'Expected behavior, actual behavior, relevant file or snippet, environment, logs, attempted fixes, and constraints.',
    prompt: 'Analyze the bug using the provided expected behavior, actual behavior, logs, relevant files, and attempted fixes. Return ranked hypotheses, next checks, and the safest first action.',
    input: 'API returns 500 after auth refactor. Expected 200 with valid token. Logs show timeout after middleware update.',
    output: 'Most likely causes: middleware order, stale env var, token parsing regression. First checks: compare middleware chain, validate token decode path, review timeout config.',
    notes: 'This works better as a template than a raw prompt. Fill every context field before use.',
    limitations: 'Weak when architecture context is missing. Can invent system behavior if the excerpt is too small.',
    failures: 'Incomplete logs, unclear expected behavior, omitted constraints.',
    readTime: '2 min',
    views: 34,
    copies: 17,
    updated: 'Mar 20, 2026',
  },
  {
    id: 'wf-003',
    title: 'Research Synthesis Draft',
    useCase: 'Convert scattered notes into a clean first synthesis for a memo, working session, or recommendation.',
    role: 'Product',
    type: 'Research',
    reusability: 'Team',
    status: 'Approved',
    contributor: 'Follow-up interview participant',
    requiredContext: 'Raw notes, audience, objective, preferred length, and the decision this should support.',
    prompt: 'Group the notes by theme, separate signal from opinion, identify tensions, and produce a concise synthesis with implications and unanswered questions.',
    input: '14 survey responses on AI usage. Need a first synthesis for internal discussion with patterns and tensions.',
    output: 'Pattern 1: adoption is already broad. Pattern 2: quality depends on context discipline. Pattern 3: workflows stay personal instead of compounding.',
    notes: 'Good for first-pass synthesis. A human should still tighten final wording before circulation.',
    limitations: 'Can flatten nuance when notes vary in detail or credibility.',
    failures: 'Mixed-quality notes, vague objective, and overly broad scope.',
    readTime: '100 sec',
    views: 23,
    copies: 9,
    updated: 'Mar 18, 2026',
  },
  {
    id: 'wf-004',
    title: 'Content Repurposing Workflow',
    useCase: 'Turn one source asset into multiple downstream formats for social, email, and internal sharing.',
    role: 'Cross-functional',
    type: 'Content',
    reusability: 'Personal',
    status: 'In Review',
    contributor: 'Caitlin',
    requiredContext: 'Source asset, audience, channels, tone, CTA, and forbidden claims.',
    prompt: 'Repurpose the source asset into channel-specific outputs with clear audience fit, CTA, and format differences.',
    input: 'Use webinar notes to create one LinkedIn post, one short email, and one internal Slack summary.',
    output: 'Three versions tailored by channel, each with distinct structure and CTA.',
    notes: 'Effective when tone and channel constraints are clear.',
    limitations: 'Can become repetitive when the source asset is thin.',
    failures: 'Weak source material, vague audience, and no channel rules.',
    readTime: '80 sec',
    views: 15,
    copies: 4,
    updated: 'Mar 21, 2026',
  },
  {
    id: 'wf-005',
    title: 'Objection Pattern Extractor',
    useCase: 'Pull recurring objections from call notes and group them into usable categories.',
    role: 'Cross-functional',
    type: 'Sales Insight',
    reusability: 'Team',
    status: 'Draft',
    contributor: 'Seed interview candidate',
    requiredContext: 'Call notes, segment, deal stage, and whether the source is internal or customer-facing.',
    prompt: 'Identify recurring objections, cluster them by type, and note what evidence is strong, weak, or anecdotal.',
    input: 'Eight notes from discovery and renewal calls across three accounts.',
    output: 'Recurring themes: integration speed, proof of ROI, uncertainty on rollout ownership.',
    notes: 'Useful for fast pattern recognition before writing a memo.',
    limitations: 'Should not be treated as a formal market study without validation.',
    failures: 'Too few calls, low-quality notes, and unclear segment labels.',
    readTime: '85 sec',
    views: 9,
    copies: 1,
    updated: 'Mar 24, 2026',
  },
];

const reviewQueue = [
  {
    title: 'Competitive Account Research Template',
    contributor: 'Tim',
    role: 'Leadership',
    completeness: 86,
    issue: 'Needs a clearer example output and a sharper limitation note.',
    state: 'Needs edits',
  },
  {
    title: 'Sales Call Objection Drill',
    contributor: 'Seed interview #2',
    role: 'Cross-functional',
    completeness: 72,
    issue: 'Required context is too thin. Workflow steps need to be separated.',
    state: 'Needs edits',
  },
  {
    title: 'Bug Triage Starter',
    contributor: 'Engineering',
    role: 'Engineering',
    completeness: 91,
    issue: 'Ready after minor cleanup.',
    state: 'Ready to publish',
  },
];

const seedPlan = [
  {
    title: 'Structured workflows already used by Ankur',
    body: 'Start with one or two workflows that already have repeatable structure and clear business value.',
    icon: 'spark',
  },
  {
    title: 'One engineering-side contributor',
    body: 'Add technically useful prompts and workflows that can show what strong context discipline looks like.',
    icon: 'bolt',
  },
  {
    title: 'Two or three follow-up interviews',
    body: 'Use focused interviews to surface real workflow depth, not just raw prompts.',
    icon: 'users',
  },
];

const boundaries = [
  {
    include: 'Capture, organize, search, and reuse proven prompts and workflows.',
    avoid: 'Trying to solve connected data access or security in v1.',
  },
  {
    include: 'Descriptions, usage guidance, examples, and searchability.',
    avoid: 'Building a prompt mixer, optimizer, or AI-generated prompt builder first.',
  },
  {
    include: '15 to 25 high-quality reusable entries.',
    avoid: 'Trying to standardize every workflow at once.',
  },
  {
    include: 'A buildable concept with enough workflow depth for implementation.',
    avoid: 'A full infrastructure rollout during the current semester window.',
  },
];

const openQuestions = [
  {
    q: 'Where should v1 live?',
    a: 'Notion, Google Docs, Google Sites, or a lightweight portal each changes searchability and contribution friction.',
  },
  {
    q: 'Who is the engineering-side partner?',
    a: 'Prompt collection, organization, and possible consolidation need a named partner on the engineering side.',
  },
  {
    q: 'Who owns review?',
    a: 'This does not need to be formal, but there does need to be a clear owner before entries go live.',
  },
  {
    q: 'How strict is the boundary with Harish?',
    a: 'v1 can stay at the workflow and prompt layer, or start preparing for future connected data access.',
  },
];

const nextSteps = [
  'Confirm the v1 concept direction.',
  'Confirm the engineering-side partner.',
  'Run two to three follow-up interviews focused on workflow depth and reusability.',
  'Seed the library with 10 to 15 high-quality entries from early contributors.',
  'Choose a hosting format and make v1 available internally.',
];

const roleOptions = ['All roles', 'Leadership', 'Engineering', 'Product', 'Cross-functional'];
const typeOptions = ['All types', 'Meeting Prep', 'Debugging', 'Research', 'Content', 'Sales Insight'];
const statusOptions = ['All status', 'Approved', 'In Review', 'Draft'];

function Badge({ children, tone = 'slate' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function StatCard({ label, value, detail, icon }) {
  return (
    <div className="stat-card card">
      <div className="stat-icon-wrap"><Icon name={icon} size={18} /></div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        <div className="stat-detail">{detail}</div>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, body, action }) {
  return (
    <div className="section-title-row">
      <div>
        {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
        <h2 className="section-title">{title}</h2>
        {body ? <p className="section-body">{body}</p> : null}
      </div>
      {action ? <div className="section-action">{action}</div> : null}
    </div>
  );
}

function FlowDiagram() {
  const steps = [
    ['Capture', 'Document the workflow with enough context to reuse it well.'],
    ['Review', 'Check completeness, examples, guidance, and limitation notes.'],
    ['Publish', 'Make the entry searchable by role, workflow type, and keyword.'],
    ['Reuse', 'Let someone else copy, adapt, and learn without starting from zero.'],
    ['Improve', 'Track what gets reused, changed, ignored, or corrected.'],
  ];
  return (
    <div className="flow-wrap card">
      {steps.map((step, index) => (
        <React.Fragment key={step[0]}>
          <div className="flow-step">
            <div className="flow-step-number">0{index + 1}</div>
            <div className="flow-step-title">{step[0]}</div>
            <div className="flow-step-body">{step[1]}</div>
          </div>
          {index < steps.length - 1 ? <Icon name="arrowRight" size={18} style={{ color: '#7c8193' }} /> : null}
        </React.Fragment>
      ))}
    </div>
  );
}

function EntryAnatomy() {
  return (
    <div className="card anatomy-card">
      <div className="anatomy-left">
        <div className="mini-window">
          <div className="mini-window-top">
            <span />
            <span />
            <span />
          </div>
          <div className="anatomy-list">
            {entryFields.map(([field, desc]) => (
              <div className="anatomy-item" key={field}>
                <div className="anatomy-item-title">{field}</div>
                <div className="anatomy-item-body">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="anatomy-right">
        <div className="eyebrow">Entry design</div>
        <h3>Every entry needs more than a raw prompt.</h3>
        <p>
          A reusable internal asset needs workflow context. It should tell the user when to use it, what good output looks like, what usually goes wrong, and whether it is personal, team-level, or reusable across the company.
        </p>
        <div className="level-grid">
          {workflowLevels.map((item) => (
            <div className="level-card" key={item.level} style={{ borderColor: `${item.color}35` }}>
              <div className="level-dot" style={{ background: item.color }} />
              <div>
                <div className="level-title">{item.level}</div>
                <div className="level-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SubmissionFlow() {
  const items = [
    ['Title', 'What should this entry be called?'],
    ['Problem solved', 'What job does it do?'],
    ['Prompt or workflow', 'What should the user actually run?'],
    ['One example', 'Show one concrete input and output.'],
    ['What works well', 'When does this perform best?'],
    ['What fails', 'Where does it usually need correction?'],
    ['Who should use it', 'Role, team, or workflow type.'],
    ['Reusability level', 'Personal, team, or cross-company.'],
  ];
  return (
    <div className="card submit-flow-card">
      <div className="submit-flow-header">
        <div>
          <div className="eyebrow">Contribution design</div>
          <h3>Keep contribution light.</h3>
          <p>If submission takes more than five to ten minutes, participation drops. The form should stay practical, short, and easy to finish in one pass.</p>
        </div>
        <Badge tone="blue">Target: 5–10 min</Badge>
      </div>
      <div className="submit-form-mock">
        {items.map(([label, placeholder], idx) => (
          <div className={`mock-row ${idx > 1 ? 'mock-row-half' : ''}`} key={label}>
            <label>{label}</label>
            <div className="mock-input">{placeholder}</div>
          </div>
        ))}
      </div>
      <div className="review-strip">
        <div className="review-strip-pill"><Icon name="check" size={14} /> Review for completeness</div>
        <div className="review-strip-pill"><Icon name="layers" size={14} /> Organize and tag</div>
        <div className="review-strip-pill"><Icon name="search" size={14} /> Publish to shared portal</div>
      </div>
    </div>
  );
}

function DevicePreview() {
  return (
    <div className="card device-card">
      <SectionTitle
        eyebrow="Responsive behavior"
        title="Designed to work naturally on desktop, tablet, and mobile"
        body="Navigation collapses, cards stack cleanly, filters wrap without breaking, and long prompt content moves into a readable detail panel instead of overflowing the screen."
      />
      <div className="device-grid">
        <div className="device device-desktop">
          <div className="device-label"><Icon name="desktop" size={16} /> Desktop</div>
          <div className="device-screen desktop-screen">
            <div className="ds-sidebar" />
            <div className="ds-main">
              <div className="ds-header" />
              <div className="ds-rows">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
        <div className="device device-tablet">
          <div className="device-label"><Icon name="tablet" size={16} /> Tablet</div>
          <div className="device-screen tablet-screen">
            <div className="ts-bar" />
            <div className="ts-card" />
            <div className="ts-card short" />
          </div>
        </div>
        <div className="device device-phone">
          <div className="device-label"><Icon name="phone" size={16} /> Mobile</div>
          <div className="device-screen phone-screen">
            <div className="ps-bar" />
            <div className="ps-chip-row">
              <span />
              <span />
            </div>
            <div className="ps-card" />
            <div className="ps-card short" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BoundaryTable() {
  return (
    <div className="card boundary-card">
      <SectionTitle
        eyebrow="Scope boundary"
        title="What v1 should do, and what it should not try to do yet"
        body="v1 should stay intentionally small. It succeeds if it makes strong workflows easy to find and easy to reuse."
      />
      <div className="boundary-table">
        <div className="boundary-head">Do now</div>
        <div className="boundary-head">Do later</div>
        {boundaries.map((row, i) => (
          <React.Fragment key={i}>
            <div className="boundary-cell boundary-yes"><Icon name="check" size={16} /> {row.include}</div>
            <div className="boundary-cell boundary-no"><Icon name="warning" size={16} /> {row.avoid}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function AdoptionBoard() {
  return (
    <div className="adoption-grid">
      <div className="card chart-card">
        <SectionTitle
          eyebrow="Why this, why now"
          title="The issue is not adoption. It is compounding."
          body="AI is already part of real work, especially in research, synthesis, writing, and coding. The gap is that usage is still fragmented, personal, and only lightly connected to shared systems."
        />
        <div className="baseline-bars">
          <div className="baseline-row">
            <div>Already using AI in real work</div>
            <div className="bar-wrap"><span className="bar-fill full" /></div>
            <strong>High</strong>
          </div>
          <div className="baseline-row">
            <div>Shared discoverability</div>
            <div className="bar-wrap"><span className="bar-fill low" /></div>
            <strong>Low</strong>
          </div>
          <div className="baseline-row">
            <div>Prompt quality consistency</div>
            <div className="bar-wrap"><span className="bar-fill mid" /></div>
            <strong>Uneven</strong>
          </div>
          <div className="baseline-row">
            <div>Reusable team capability</div>
            <div className="bar-wrap"><span className="bar-fill low2" /></div>
            <strong>Weak</strong>
          </div>
        </div>
      </div>
      <div className="card chart-card">
        <SectionTitle
          eyebrow="What to watch"
          title="Usage data should tell the team what is actually working."
          body="Over time, the portal should show what gets reused, what gets modified, and what gets ignored."
        />
        <div className="signal-stack">
          <div className="signal-row"><span>Searches leading to copies</span><strong>Healthy</strong></div>
          <div className="signal-row"><span>Entries reused across roles</span><strong>Growing</strong></div>
          <div className="signal-row"><span>Drafts stuck in review</span><strong>Risk</strong></div>
          <div className="signal-row"><span>Low-completeness submissions</span><strong>Training signal</strong></div>
          <div className="signal-row"><span>Entries ignored after publish</span><strong>Cleanup candidate</strong></div>
        </div>
      </div>
    </div>
  );
}

export default function InternalAIWorkflowPromptPortalPrototypeV2() {
  const [activeTab, setActiveTab] = useState('home');
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('All roles');
  const [type, setType] = useState('All types');
  const [status, setStatus] = useState('All status');
  const [selected, setSelected] = useState('wf-001');
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedId, setCopiedId] = useState('');

  const filteredEntries = useMemo(() => {
    const q = search.trim().toLowerCase();
    return libraryEntries.filter((entry) => {
      const queryHit = !q || [entry.title, entry.useCase, entry.type, entry.role, entry.contributor].some((v) => v.toLowerCase().includes(q));
      const roleHit = role === 'All roles' || entry.role === role;
      const typeHit = type === 'All types' || entry.type === type;
      const statusHit = status === 'All status' || entry.status === status;
      return queryHit && roleHit && typeHit && statusHit;
    });
  }, [search, role, type, status]);

  const selectedEntry = filteredEntries.find((item) => item.id === selected) || filteredEntries[0] || libraryEntries[0];

  function handleCopy(text, id) {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(''), 1200);
    } catch {
      setCopiedId(id);
      setTimeout(() => setCopiedId(''), 1200);
    }
  }

  return (
    <div className="portal-root">
      <style>{styles}</style>
      <div className="top-banner">
        <div className="top-banner-left">
          <Badge tone="green">v1 concept translated into platform form</Badge>
          <span>A searchable internal system for capturing, organizing, reviewing, and reusing proven AI workflows.</span>
        </div>
        <div className="top-banner-right">
          <span><Icon name="clock" size={14} /> Reader target: under 2 min per entry</span>
          <span><Icon name="upload" size={14} /> Contribution target: 5–10 min</span>
        </div>
      </div>

      <div className="portal-shell">
        <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
          <div className="brand-block">
            <div className="brand-mark"><Icon name="route" size={20} /></div>
            <div>
              <div className="brand-kicker">Internal AI Workflow and Prompt Portal</div>
              <div className="brand-title">v1 Prototype</div>
            </div>
          </div>

          <div className="nav-stack">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-btn ${activeTab === item.id ? 'nav-btn-active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMenuOpen(false);
                }}
              >
                <Icon name={item.icon} size={17} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="sidebar-card card">
            <div className="sidebar-card-title">Design guardrails</div>
            <ul className="compact-list">
              <li>Not a dump of raw prompts</li>
              <li>Every entry needs guidance and examples</li>
              <li>Submission must stay light</li>
              <li>v1 stays small and searchable</li>
            </ul>
          </div>

          <div className="sidebar-card card">
            <div className="sidebar-card-title">Key numbers</div>
            <div className="sidebar-mini-metrics">
              {metrics.slice(0, 3).map((item) => (
                <div key={item.label} className="mini-metric">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="main-shell">
          <header className="hero-header card">
            <div className="hero-copy">
              <div className="hero-eyebrow">March 2026</div>
              <h1>Make strong AI workflows easier to find, use, and improve.</h1>
              <p>
                This prototype turns the v1 concept into a user-facing internal platform. It is built to help people discover proven workflows quickly, understand when they work, and contribute better examples without creating heavy process.
              </p>
              <div className="hero-actions">
                <button className="primary-btn" onClick={() => setActiveTab('library')}><Icon name="search" size={16} /> Browse library</button>
                <button className="secondary-btn" onClick={() => setActiveTab('contribute')}><Icon name="plus" size={16} /> Contribute workflow</button>
              </div>
            </div>
            <div className="hero-panel">
              <div className="hero-panel-grid">
                {metrics.map((item, index) => (
                  <StatCard key={item.label} label={item.label} value={item.value} detail={item.detail} icon={['database','clock','bolt','layers'][index]} />
                ))}
              </div>
            </div>
          </header>

          <div className="mobile-nav-toggle-row">
            <button className="secondary-btn mobile-only" onClick={() => setMenuOpen((v) => !v)}>
              <Icon name="grid" size={16} /> {menuOpen ? 'Hide sections' : 'Show sections'}
            </button>
          </div>

          {activeTab === 'home' && (
            <div className="page-stack">
              <section className="card">
                <SectionTitle
                  eyebrow="Problem statement"
                  title="Useful AI workflows already exist inside the company, but they do not compound well."
                  body="The goal of v1 is not to prove that AI matters. It is to give the team a shared system for capturing, organizing, searching, and reusing strong prompts and workflows with enough context to be useful to someone else."
                />
                <div className="problem-grid">
                  {problemCards.map((card) => (
                    <div className="problem-card" key={card.title}>
                      <div className="problem-icon"><Icon name={card.icon} size={18} /></div>
                      <h3>{card.title}</h3>
                      <p>{card.body}</p>
                    </div>
                  ))}
                </div>
              </section>

              <FlowDiagram />
              <EntryAnatomy />
              <SubmissionFlow />

              <section className="card">
                <SectionTitle
                  eyebrow="How v1 should be seeded"
                  title="Do not launch an empty portal."
                  body="An empty library does not teach anyone how to use the system. Seed v1 with a small number of strong examples from people already using AI in a repeatable way."
                />
                <div className="seed-grid">
                  {seedPlan.map((item) => (
                    <div className="seed-card" key={item.title}>
                      <div className="seed-icon"><Icon name={item.icon} size={18} /></div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </div>
              </section>

              <BoundaryTable />

              <section className="card">
                <SectionTitle
                  eyebrow="Open questions for alignment"
                  title="The concept is usable, but a few choices still shape the release."
                  body="These decisions affect searchability, contribution friction, and ownership."
                />
                <div className="question-grid">
                  {openQuestions.map((item) => (
                    <div className="question-card" key={item.q}>
                      <div className="question-title"><Icon name="help" size={16} /> {item.q}</div>
                      <p>{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="card">
                <SectionTitle
                  eyebrow="Next steps"
                  title="What should happen after concept alignment"
                  body="Given the remaining semester time, the right deliverable is a clear concept and enough workflow depth to make it buildable."
                />
                <ol className="step-list">
                  {nextSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>

              <DevicePreview />
            </div>
          )}

          {activeTab === 'library' && (
            <div className="page-stack">
              <section className="card">
                <SectionTitle
                  eyebrow="Library"
                  title="Find a relevant workflow in under two minutes"
                  body="A user should be able to search by role, workflow type, or keyword, then understand what the workflow does, what context it needs, and how to adapt it without contacting the original contributor."
                />
                <div className="filter-bar">
                  <div className="search-box">
                    <Icon name="search" size={16} />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title, use case, workflow type, or contributor" />
                  </div>
                  <div className="filter-group">
                    <Select value={role} onChange={setRole} options={roleOptions} />
                    <Select value={type} onChange={setType} options={typeOptions} />
                    <Select value={status} onChange={setStatus} options={statusOptions} />
                  </div>
                </div>
              </section>

              <div className="library-layout">
                <div className="library-list card">
                  <div className="list-top-row">
                    <div className="list-count">{filteredEntries.length} results</div>
                    <Badge tone="slate"><Icon name="clock" size={14} /> under 2 min each</Badge>
                  </div>
                  <div className="entry-list">
                    {filteredEntries.map((entry) => (
                      <button key={entry.id} className={`entry-card ${selectedEntry?.id === entry.id ? 'entry-card-active' : ''}`} onClick={() => setSelected(entry.id)}>
                        <div className="entry-card-top">
                          <div>
                            <div className="entry-title">{entry.title}</div>
                            <div className="entry-sub">{entry.useCase}</div>
                          </div>
                          <Badge tone={entry.status === 'Approved' ? 'green' : entry.status === 'In Review' ? 'amber' : 'slate'}>{entry.status}</Badge>
                        </div>
                        <div className="entry-meta-row">
                          <span><Icon name="users" size={14} /> {entry.role}</span>
                          <span><Icon name="layers" size={14} /> {entry.type}</span>
                          <span><Icon name="clock" size={14} /> {entry.readTime}</span>
                        </div>
                        <div className="entry-chip-row">
                          <span className="chip">{entry.reusability}</span>
                          <span className="chip">{entry.contributor}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="entry-detail card">
                  {selectedEntry ? (
                    <>
                      <div className="detail-head">
                        <div>
                          <div className="detail-kicker">{selectedEntry.type} · {selectedEntry.role}</div>
                          <h2>{selectedEntry.title}</h2>
                          <p>{selectedEntry.useCase}</p>
                        </div>
                        <div className="detail-head-actions">
                          <Badge tone={selectedEntry.status === 'Approved' ? 'green' : selectedEntry.status === 'In Review' ? 'amber' : 'slate'}>{selectedEntry.status}</Badge>
                          <button className="icon-btn" onClick={() => handleCopy(selectedEntry.prompt, selectedEntry.id)}>
                            <Icon name="copy" size={15} /> {copiedId === selectedEntry.id ? 'Copied' : 'Copy prompt'}
                          </button>
                        </div>
                      </div>

                      <div className="detail-stat-row">
                        <span><Icon name="eye" size={14} /> {selectedEntry.views} views</span>
                        <span><Icon name="copy" size={14} /> {selectedEntry.copies} copies</span>
                        <span><Icon name="clock" size={14} /> Updated {selectedEntry.updated}</span>
                        <span><Icon name="users" size={14} /> {selectedEntry.contributor}</span>
                      </div>

                      <div className="detail-grid">
                        <InfoCard title="Required context" icon="file" body={selectedEntry.requiredContext} />
                        <InfoCard title="Usage notes" icon="spark" body={selectedEntry.notes} />
                        <InfoCard title="Known limitations" icon="warning" body={selectedEntry.limitations} />
                        <InfoCard title="Typical failure modes" icon="help" body={selectedEntry.failures} />
                      </div>

                      <div className="code-block-group">
                        <CodeBlock title="Prompt or workflow" text={selectedEntry.prompt} />
                        <div className="two-col-code">
                          <CodeBlock title="Example input" text={selectedEntry.input} />
                          <CodeBlock title="Example output" text={selectedEntry.output} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>No result found.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contribute' && (
            <div className="page-stack">
              <section className="card contribute-hero">
                <SectionTitle
                  eyebrow="Contribute"
                  title="Share a workflow without creating heavy process"
                  body="The goal is not perfect documentation. It is enough context for another person to use the workflow well and enough review structure to keep quality high."
                  action={<Badge tone="blue">Estimated time: 5–10 min</Badge>}
                />
                <div className="contribute-layout">
                  <div className="submit-panel">
                    <FormBlock label="Title" value="Win/Loss Interview Synthesis" />
                    <FormBlock label="What problem does it solve?" value="Turn raw interview notes into a clean, decision-oriented synthesis for the GTM team." large />
                    <FormBlock label="Prompt or workflow" value="Analyze the interview notes, separate repeated signal from isolated comments, identify top purchase drivers, blockers, and implications for messaging." large />
                    <div className="form-two-col">
                      <FormBlock label="One example" value="Input: 6 interview transcripts. Output: top themes, tensions, quotes to verify, and messaging implications." large />
                      <FormBlock label="Who should use it?" value="Product, GTM, leadership" />
                    </div>
                    <div className="form-two-col">
                      <FormBlock label="What works well" value="Works best when each interview has clear labels and quotes." large />
                      <FormBlock label="What fails or needs correction" value="Breaks down when notes are incomplete or the objective is too broad." large />
                    </div>
                    <div className="form-two-col">
                      <FormBlock label="Reusability level" value="Team reusable" />
                      <FormBlock label="Contributor" value="Your name" />
                    </div>
                    <div className="hero-actions">
                      <button className="primary-btn"><Icon name="upload" size={16} /> Submit for review</button>
                      <button className="secondary-btn"><Icon name="file" size={16} /> Save as draft</button>
                    </div>
                  </div>
                  <div className="contribute-side">
                    <div className="card callout-box">
                      <div className="callout-title"><Icon name="check" size={16} /> What makes a good submission</div>
                      <ul className="compact-list">
                        <li>Explain the job to be done, not only the prompt text.</li>
                        <li>Include one real example so the next user can see the pattern.</li>
                        <li>Be honest about failure modes. That saves time later.</li>
                        <li>Choose the smallest useful reusability level.</li>
                      </ul>
                    </div>
                    <div className="card callout-box">
                      <div className="callout-title"><Icon name="warning" size={16} /> What to avoid</div>
                      <ul className="compact-list">
                        <li>Uploading a prompt with no context or example.</li>
                        <li>Claiming it works broadly when it is still personal.</li>
                        <li>Turning the form into a long narrative.</li>
                        <li>Skipping known limitations.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'review' && (
            <div className="page-stack">
              <section className="card">
                <SectionTitle
                  eyebrow="Review queue"
                  title="Review does not need to be heavy. It only needs to protect usefulness."
                  body="Before an entry goes live, someone should make sure it includes enough context to help a person who did not write it."
                />
                <div className="review-grid">
                  {reviewQueue.map((item) => (
                    <div className="review-card" key={item.title}>
                      <div className="review-card-top">
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.contributor} · {item.role}</p>
                        </div>
                        <Badge tone={item.state === 'Ready to publish' ? 'green' : 'amber'}>{item.state}</Badge>
                      </div>
                      <div className="review-progress-row">
                        <div className="review-progress-label">Completeness</div>
                        <div className="review-progress-bar"><span style={{ width: `${item.completeness}%` }} /></div>
                        <strong>{item.completeness}%</strong>
                      </div>
                      <div className="review-issue"><Icon name="warning" size={14} /> {item.issue}</div>
                      <div className="review-actions">
                        <button className="secondary-btn small-btn">Request edits</button>
                        <button className="primary-btn small-btn">Approve</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'adoption' && (
            <div className="page-stack">
              <AdoptionBoard />
              <section className="card">
                <SectionTitle
                  eyebrow="Interpretation"
                  title="The main value is not only better prompts. It is a better shared system."
                  body="A shared library can improve prompt quality, reduce re-prompting, and multiply time savings across the team. That only happens if the system captures enough context, stays easy to contribute to, and makes useful entries easy to discover."
                />
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <label className="select-wrap">
      <Icon name="filter" size={14} />
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function InfoCard({ title, body, icon }) {
  return (
    <div className="info-card">
      <div className="info-card-title"><Icon name={icon} size={15} /> {title}</div>
      <div className="info-card-body">{body}</div>
    </div>
  );
}

function CodeBlock({ title, text }) {
  return (
    <div className="code-block">
      <div className="code-title">{title}</div>
      <pre>{text}</pre>
    </div>
  );
}

function FormBlock({ label, value, large }) {
  return (
    <div className={`form-block ${large ? 'form-block-large' : ''}`}>
      <label>{label}</label>
      <div className="form-field">{value}</div>
    </div>
  );
}

const styles = `
  :root {
    color-scheme: light;
    --bg: #f4f6fb;
    --panel: #ffffff;
    --panel-2: #f7f9fd;
    --line: #d8deec;
    --line-2: #e6eaf3;
    --text: #111827;
    --muted: #5a6475;
    --soft: #7b8597;
    --blue: #2355d8;
    --blue-2: #e8efff;
    --green: #0f8f68;
    --green-2: #e6f7f1;
    --amber: #b7791f;
    --amber-2: #fff4df;
    --shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
    --radius-xl: 24px;
    --radius-lg: 18px;
    --radius-md: 14px;
    --radius-sm: 10px;
  }

  * { box-sizing: border-box; }
  html, body, #root { margin: 0; padding: 0; background: var(--bg); color: var(--text); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  button, input, select { font: inherit; }
  .portal-root { min-height: 100vh; background: radial-gradient(circle at top left, #eef3ff 0, #f4f6fb 38%, #f4f6fb 100%); }
  .top-banner {
    display: flex; justify-content: space-between; gap: 16px; padding: 14px 22px; border-bottom: 1px solid var(--line);
    background: rgba(255,255,255,0.78); backdrop-filter: blur(16px); position: sticky; top: 0; z-index: 20;
  }
  .top-banner-left, .top-banner-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; color: var(--muted); font-size: 13px; }
  .top-banner-right span, .top-banner-left span { display: inline-flex; align-items: center; gap: 6px; }
  .portal-shell { display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 24px; padding: 24px; max-width: 1600px; margin: 0 auto; }
  .sidebar { display: flex; flex-direction: column; gap: 16px; }
  .card {
    background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,255,0.98));
    border: 1px solid var(--line-2); box-shadow: var(--shadow); border-radius: var(--radius-xl);
  }
  .brand-block { display: flex; gap: 12px; align-items: center; padding: 20px; background: var(--panel); border: 1px solid var(--line-2); border-radius: var(--radius-xl); box-shadow: var(--shadow); }
  .brand-mark { width: 42px; height: 42px; border-radius: 14px; display: grid; place-items: center; background: linear-gradient(135deg, #2355d8, #6d8dff); color: white; }
  .brand-kicker { color: var(--muted); font-size: 12px; }
  .brand-title { font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
  .nav-stack { display: grid; gap: 8px; }
  .nav-btn {
    display: flex; align-items: center; gap: 10px; width: 100%; border: 1px solid transparent; background: transparent;
    padding: 12px 14px; border-radius: 14px; color: var(--muted); cursor: pointer; text-align: left;
  }
  .nav-btn:hover { background: rgba(255,255,255,0.7); border-color: var(--line); color: var(--text); }
  .nav-btn-active { background: white; color: var(--text); border-color: #c9d5fb; box-shadow: inset 0 0 0 1px #eef3ff; }
  .sidebar-card { padding: 18px; }
  .sidebar-card-title { font-weight: 700; margin-bottom: 10px; }
  .compact-list { margin: 0; padding-left: 18px; color: var(--muted); display: grid; gap: 8px; }
  .sidebar-mini-metrics { display: grid; gap: 12px; }
  .mini-metric { display: grid; gap: 2px; }
  .mini-metric strong { font-size: 18px; }
  .mini-metric span { font-size: 13px; color: var(--muted); }
  .main-shell { display: grid; gap: 18px; min-width: 0; }
  .hero-header { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(380px, 0.95fr); gap: 20px; padding: 28px; overflow: hidden; }
  .hero-copy { display: grid; gap: 16px; align-content: start; }
  .hero-eyebrow, .eyebrow { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--blue); }
  .hero-copy h1 { margin: 0; font-size: clamp(30px, 4vw, 50px); letter-spacing: -0.04em; line-height: 1.02; max-width: 14ch; }
  .hero-copy p { margin: 0; color: var(--muted); font-size: 16px; line-height: 1.7; max-width: 68ch; }
  .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
  .primary-btn, .secondary-btn, .icon-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 12px; padding: 11px 14px;
    border: 1px solid transparent; cursor: pointer; font-weight: 600;
  }
  .primary-btn { background: var(--blue); color: white; }
  .primary-btn:hover { filter: brightness(1.03); }
  .secondary-btn { background: white; color: var(--text); border-color: var(--line); }
  .secondary-btn:hover, .icon-btn:hover { background: #f8fbff; }
  .icon-btn { background: white; border-color: var(--line); color: var(--text); }
  .hero-panel-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; height: 100%; }
  .stat-card { padding: 16px; display: grid; grid-template-columns: 38px minmax(0,1fr); gap: 12px; }
  .stat-icon-wrap { width: 38px; height: 38px; border-radius: 12px; display: grid; place-items: center; background: var(--panel-2); color: var(--blue); }
  .stat-value { font-size: 26px; font-weight: 800; letter-spacing: -0.03em; }
  .stat-label { font-size: 13px; font-weight: 700; }
  .stat-detail { font-size: 12px; color: var(--muted); line-height: 1.45; margin-top: 2px; }
  .mobile-nav-toggle-row { display: none; }
  .page-stack { display: grid; gap: 18px; }
  .section-title-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
  .section-title { margin: 6px 0 8px; font-size: clamp(22px, 2.2vw, 34px); letter-spacing: -0.03em; line-height: 1.1; }
  .section-body { margin: 0; color: var(--muted); line-height: 1.7; max-width: 78ch; }
  .problem-grid, .seed-grid, .question-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 14px; }
  .problem-card, .seed-card, .question-card { padding: 18px; border: 1px solid var(--line); border-radius: 18px; background: rgba(255,255,255,0.65); }
  .problem-card h3, .seed-card h3 { margin: 12px 0 8px; font-size: 17px; letter-spacing: -0.02em; }
  .problem-card p, .seed-card p, .question-card p { margin: 0; color: var(--muted); line-height: 1.65; }
  .problem-icon, .seed-icon { width: 38px; height: 38px; border-radius: 12px; display: grid; place-items: center; background: #eef3ff; color: var(--blue); }
  .question-title { display: flex; align-items: center; gap: 8px; font-weight: 700; margin-bottom: 8px; }
  .flow-wrap { padding: 20px; display: flex; gap: 12px; align-items: center; overflow-x: auto; }
  .flow-step { min-width: 210px; padding: 16px; border: 1px solid var(--line); border-radius: 18px; background: rgba(255,255,255,0.74); }
  .flow-step-number { font-size: 12px; font-weight: 800; color: var(--blue); letter-spacing: .08em; }
  .flow-step-title { margin-top: 10px; font-size: 16px; font-weight: 700; }
  .flow-step-body { margin-top: 6px; color: var(--muted); line-height: 1.55; font-size: 14px; }
  .anatomy-card { padding: 24px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(340px, 0.9fr); gap: 20px; }
  .mini-window { border: 1px solid var(--line); border-radius: 18px; overflow: hidden; background: white; }
  .mini-window-top { display: flex; gap: 8px; padding: 12px 14px; border-bottom: 1px solid var(--line); background: #f8faff; }
  .mini-window-top span { width: 10px; height: 10px; border-radius: 999px; background: #ced7ea; }
  .anatomy-list { padding: 14px; display: grid; gap: 10px; }
  .anatomy-item { padding: 12px; border-radius: 14px; border: 1px solid var(--line); background: #fbfcff; }
  .anatomy-item-title { font-weight: 700; margin-bottom: 4px; }
  .anatomy-item-body { font-size: 14px; color: var(--muted); line-height: 1.55; }
  .anatomy-right h3 { margin: 6px 0 10px; font-size: 28px; letter-spacing: -0.03em; }
  .anatomy-right p { margin: 0; color: var(--muted); line-height: 1.75; }
  .level-grid { display: grid; gap: 12px; margin-top: 18px; }
  .level-card { border: 1px solid var(--line); border-radius: 16px; padding: 14px; background: white; display: grid; grid-template-columns: 12px minmax(0, 1fr); gap: 12px; }
  .level-dot { width: 12px; height: 12px; border-radius: 999px; margin-top: 5px; }
  .level-title { font-weight: 700; }
  .level-desc { color: var(--muted); line-height: 1.55; font-size: 14px; margin-top: 4px; }
  .submit-flow-card { padding: 24px; }
  .submit-flow-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 20px; }
  .submit-flow-header h3 { margin: 6px 0 10px; font-size: 28px; letter-spacing: -0.03em; }
  .submit-flow-header p { margin: 0; color: var(--muted); line-height: 1.7; max-width: 65ch; }
  .submit-form-mock { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 14px; }
  .mock-row { display: grid; gap: 8px; }
  .mock-row label { font-weight: 700; font-size: 14px; }
  .mock-input { min-height: 48px; padding: 14px; border-radius: 14px; background: white; border: 1px solid var(--line); color: var(--soft); line-height: 1.5; }
  .mock-row-half:nth-child(odd) { }
  .review-strip { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 18px; }
  .review-strip-pill { display: inline-flex; align-items: center; gap: 8px; background: #f8faff; color: var(--muted); border: 1px solid var(--line); padding: 10px 12px; border-radius: 999px; }
  .boundary-card, .device-card { padding: 24px; }
  .boundary-table { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--line); border-radius: 20px; overflow: hidden; }
  .boundary-head { padding: 14px 16px; font-weight: 800; background: #f5f8ff; border-bottom: 1px solid var(--line); }
  .boundary-head:nth-child(2) { background: #fff8ec; }
  .boundary-cell { padding: 16px; border-top: 1px solid var(--line); display: flex; gap: 10px; align-items: flex-start; line-height: 1.6; }
  .boundary-yes { background: rgba(244,248,255,.6); }
  .boundary-no { background: rgba(255,250,240,.8); }
  .device-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 16px; }
  .device { border: 1px solid var(--line); border-radius: 18px; background: rgba(255,255,255,0.72); padding: 16px; }
  .device-label { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; margin-bottom: 12px; }
  .device-screen { background: white; border: 1px solid var(--line); border-radius: 16px; overflow: hidden; height: 220px; }
  .desktop-screen { display: grid; grid-template-columns: 66px 1fr; }
  .ds-sidebar { background: #f4f7ff; border-right: 1px solid var(--line); }
  .ds-main { padding: 12px; display: grid; gap: 10px; }
  .ds-header, .ts-bar, .ps-bar { height: 32px; border-radius: 10px; background: #eef3ff; }
  .ds-rows { display: grid; gap: 8px; }
  .ds-rows span, .ts-card, .ps-card { height: 52px; border-radius: 12px; background: #f7f9fd; border: 1px solid var(--line); display: block; }
  .tablet-screen, .phone-screen { padding: 12px; display: grid; gap: 10px; }
  .ts-card.short, .ps-card.short { height: 38px; }
  .ps-chip-row { display: flex; gap: 8px; }
  .ps-chip-row span { width: 64px; height: 24px; border-radius: 999px; background: #eef3ff; display: block; }
  .filter-bar { display: grid; gap: 14px; }
  .search-box { display: flex; align-items: center; gap: 10px; background: white; border: 1px solid var(--line); border-radius: 14px; padding: 0 14px; min-height: 50px; }
  .search-box input { flex: 1; border: 0; outline: none; background: transparent; color: var(--text); }
  .filter-group { display: flex; gap: 10px; flex-wrap: wrap; }
  .select-wrap { display: inline-flex; align-items: center; gap: 8px; background: white; border: 1px solid var(--line); border-radius: 12px; padding: 0 12px; min-height: 44px; color: var(--muted); }
  .select-wrap select { border: 0; background: transparent; outline: none; color: var(--text); padding-right: 10px; }
  .library-layout { display: grid; grid-template-columns: minmax(320px, 0.95fr) minmax(0, 1.35fr); gap: 18px; min-width: 0; }
  .library-list, .entry-detail { padding: 18px; min-width: 0; }
  .list-top-row { display: flex; justify-content: space-between; gap: 12px; align-items: center; margin-bottom: 14px; }
  .list-count { font-weight: 700; }
  .entry-list { display: grid; gap: 12px; }
  .entry-card {
    width: 100%; text-align: left; border: 1px solid var(--line); border-radius: 18px; background: white; padding: 16px; cursor: pointer;
    display: grid; gap: 12px; color: var(--text);
  }
  .entry-card:hover { border-color: #c9d5fb; box-shadow: inset 0 0 0 1px #eef3ff; }
  .entry-card-active { border-color: #94b0ff; box-shadow: inset 0 0 0 1px #c8d7ff; background: #fbfdff; }
  .entry-card-top { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
  .entry-title { font-weight: 800; letter-spacing: -0.02em; }
  .entry-sub { color: var(--muted); font-size: 14px; line-height: 1.55; margin-top: 4px; }
  .entry-meta-row, .entry-chip-row, .detail-stat-row { display: flex; flex-wrap: wrap; gap: 8px 14px; color: var(--muted); font-size: 13px; }
  .entry-meta-row span, .detail-stat-row span { display: inline-flex; align-items: center; gap: 6px; }
  .chip { display: inline-flex; align-items: center; background: #f5f8ff; border: 1px solid var(--line); border-radius: 999px; padding: 6px 10px; font-size: 12px; }
  .entry-detail { display: grid; gap: 18px; }
  .detail-head { display: flex; justify-content: space-between; gap: 18px; align-items: flex-start; }
  .detail-kicker { color: var(--blue); font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; }
  .detail-head h2 { margin: 6px 0 8px; font-size: clamp(24px, 2.6vw, 36px); line-height: 1.06; letter-spacing: -0.03em; }
  .detail-head p { margin: 0; color: var(--muted); line-height: 1.7; max-width: 64ch; }
  .detail-head-actions { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; justify-content: flex-end; }
  .detail-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
  .info-card { border: 1px solid var(--line); border-radius: 16px; background: #fbfcff; padding: 14px; }
  .info-card-title { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; margin-bottom: 8px; }
  .info-card-body { color: var(--muted); line-height: 1.65; font-size: 14px; }
  .code-block-group { display: grid; gap: 12px; }
  .code-block { border: 1px solid var(--line); border-radius: 18px; overflow: hidden; background: #101828; }
  .code-title { padding: 12px 14px; color: #dce6ff; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03); }
  .code-block pre {
    margin: 0; padding: 16px; color: #eef3ff; white-space: pre-wrap; word-break: break-word; line-height: 1.7; font-size: 13px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }
  .two-col-code { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
  .contribute-hero { padding: 24px; }
  .contribute-layout { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(280px, 0.8fr); gap: 18px; }
  .submit-panel { display: grid; gap: 12px; }
  .form-block { display: grid; gap: 8px; }
  .form-block label { font-weight: 700; font-size: 14px; }
  .form-field {
    min-height: 48px; background: white; border: 1px solid var(--line); border-radius: 14px; padding: 14px; color: var(--text); line-height: 1.6;
  }
  .form-block-large .form-field { min-height: 96px; }
  .form-two-col { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
  .contribute-side { display: grid; gap: 12px; }
  .callout-box { padding: 18px; }
  .callout-title { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; margin-bottom: 10px; }
  .review-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 14px; }
  .review-card { border: 1px solid var(--line); border-radius: 18px; background: white; padding: 18px; display: grid; gap: 14px; }
  .review-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .review-card h3 { margin: 0 0 6px; font-size: 18px; letter-spacing: -0.02em; }
  .review-card p { margin: 0; color: var(--muted); }
  .review-progress-row { display: grid; grid-template-columns: auto 1fr auto; gap: 12px; align-items: center; }
  .review-progress-label { font-size: 13px; color: var(--muted); }
  .review-progress-bar { height: 10px; border-radius: 999px; overflow: hidden; background: #eef2fb; border: 1px solid var(--line); }
  .review-progress-bar span { height: 100%; display: block; background: linear-gradient(90deg, #2355d8, #6e8fff); }
  .review-issue { display: inline-flex; gap: 8px; align-items: flex-start; color: var(--muted); line-height: 1.6; }
  .review-actions { display: flex; gap: 10px; flex-wrap: wrap; }
  .small-btn { padding: 10px 12px; }
  .adoption-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 18px; }
  .chart-card { padding: 24px; }
  .baseline-bars { display: grid; gap: 14px; margin-top: 6px; }
  .baseline-row { display: grid; grid-template-columns: 180px 1fr auto; gap: 12px; align-items: center; }
  .baseline-row div:first-child { font-size: 14px; color: var(--muted); }
  .bar-wrap { height: 14px; border-radius: 999px; overflow: hidden; background: #eef2fb; border: 1px solid var(--line); }
  .bar-fill { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #2355d8, #6e8fff); }
  .bar-fill.full { width: 92%; }
  .bar-fill.low { width: 24%; }
  .bar-fill.mid { width: 46%; }
  .bar-fill.low2 { width: 32%; }
  .signal-stack { display: grid; gap: 10px; }
  .signal-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px; border-radius: 14px; border: 1px solid var(--line); background: rgba(255,255,255,0.72); }
  .signal-row span { color: var(--muted); }
  .step-list { margin: 0; padding-left: 24px; display: grid; gap: 12px; line-height: 1.7; }
  .badge { display: inline-flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; border: 1px solid transparent; white-space: nowrap; }
  .badge-slate { background: #f5f7fb; color: #4d586b; border-color: var(--line); }
  .badge-blue { background: var(--blue-2); color: var(--blue); border-color: #d4defd; }
  .badge-green { background: var(--green-2); color: var(--green); border-color: #c7ebdd; }
  .badge-amber { background: var(--amber-2); color: var(--amber); border-color: #f0ddb8; }
  .mobile-only { display: none; }

  @media (max-width: 1180px) {
    .portal-shell { grid-template-columns: 1fr; }
    .sidebar { display: none; }
    .sidebar.sidebar-open { display: flex; }
    .mobile-nav-toggle-row { display: block; }
    .mobile-only { display: inline-flex; }
    .hero-header { grid-template-columns: 1fr; }
    .problem-grid, .seed-grid, .question-grid, .review-grid, .adoption-grid, .device-grid, .contribute-layout, .anatomy-card, .library-layout { grid-template-columns: 1fr; }
  }

  @media (max-width: 900px) {
    .top-banner { padding: 12px 14px; }
    .portal-shell { padding: 14px; gap: 14px; }
    .hero-header, .card, .boundary-card, .device-card, .contribute-hero, .chart-card, .submit-flow-card { padding: 18px; }
    .hero-panel-grid, .submit-form-mock, .detail-grid, .two-col-code, .form-two-col { grid-template-columns: 1fr; }
    .baseline-row { grid-template-columns: 1fr; }
    .section-title-row, .submit-flow-header, .detail-head { flex-direction: column; }
    .detail-head-actions { justify-content: flex-start; }
    .boundary-table { grid-template-columns: 1fr; }
    .boundary-head:nth-child(2) { border-top: 1px solid var(--line); }
  }

  @media (max-width: 640px) {
    .top-banner-right { display: none; }
    .hero-copy h1 { max-width: none; font-size: 34px; }
    .hero-copy p, .section-body { font-size: 15px; }
    .flow-step { min-width: 250px; }
    .entry-card-top, .review-card-top { flex-direction: column; }
    .list-top-row { align-items: flex-start; flex-direction: column; }
    .search-box { min-height: 46px; }
    .device-screen { height: 180px; }
  }
`;
