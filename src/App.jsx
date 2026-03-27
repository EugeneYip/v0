import React, { useMemo, useState } from 'react';

const ICON_PATHS = {
  home: 'M3 11.5L12 4l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-8.5z',
  search: 'M11 4a7 7 0 105.2 11.7l3.05 3.05 1.4-1.4-3.05-3.05A7 7 0 0011 4zm0 2a5 5 0 110 10 5 5 0 010-10z',
  plus: 'M12 5v14M5 12h14',
  upload: 'M12 16V6m0 0l-4 4m4-4l4 4M5 18h14',
  check: 'M5 12l4 4L19 6',
  info: 'M12 17h.01M12 11v-1m0-4h.01M12 22a10 10 0 110-20 10 10 0 010 20z',
  layers: 'M12 3l9 5-9 5-9-5 9-5zm-9 9l9 5 9-5m-18 4l9 5 9-5',
  clock: 'M12 7v5l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z',
  users: 'M16 14a4 4 0 10-3.9-4.8M8 14a4 4 0 103.9-4.8M3.5 20a6 6 0 0110 0m1 0a6 6 0 016 0',
  filter: 'M4 6h16M7 12h10M10 18h4',
  copy: 'M9 9h10v11H9zM5 5h10v2H7v8H5z',
  file: 'M7 3h7l5 5v13H7zM14 3v5h5',
  arrowRight: 'M5 12h12m-4-4l4 4-4 4',
  spark: 'M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z',
  warning: 'M12 3l9 16H3l9-16zm0 5v4m0 4h.01',
  chart: 'M5 19V9m7 10V5m7 14v-7M4 19h16',
  eye: 'M2.5 12S6.5 6.5 12 6.5 21.5 12 21.5 12 17.5 17.5 12 17.5 2.5 12 2.5 12zm9.5-3a3 3 0 100 6 3 3 0 000-6z',
  book: 'M5 4.5A2.5 2.5 0 017.5 2H20v18H7.5A2.5 2.5 0 015 17.5v-13zM7.5 2v18',
  send: 'M3 20l18-8L3 4l3 7 8 1-8 1-3 7z',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  target: 'M12 4v3m0 10v3M4 12H1m22 0h-3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1m0-12.8l-2.1 2.1M7.7 16.3l-2.1 2.1M12 8a4 4 0 100 8 4 4 0 000-8z',
  route: 'M5 19h3v-3H5v3zm11-11h3V5h-3v3zM8 17h3v-3H8v3zm3-1h3a3 3 0 003-3V8',
  shield: 'M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z',
};

function Icon({ name, size = 18, stroke = 1.85, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

const tabs = [
  { id: 'discover', label: 'Discover', icon: 'home' },
  { id: 'library', label: 'Library', icon: 'search' },
  { id: 'submit', label: 'Submit', icon: 'plus' },
  { id: 'help', label: 'How it works', icon: 'info' },
];

const roleOptions = ['All roles', 'Leadership', 'Engineering', 'Product', 'Cross-functional'];
const typeOptions = ['All types', 'Meeting Prep', 'Debugging', 'Research', 'Content', 'Sales Insight'];
const reusabilityOptions = ['All levels', 'Personal', 'Team', 'Cross-company'];

const quickFacts = [
  { icon: 'clock', title: 'Fast to scan', body: 'Each entry is designed to be readable in under two minutes.' },
  { icon: 'file', title: 'Context first', body: 'Every workflow includes required context, not just prompt text.' },
  { icon: 'check', title: 'Example included', body: 'Each entry shows at least one sample input and output.' },
];

const anatomy = [
  ['Title', 'A short searchable name.'],
  ['Use case', 'The job this workflow helps you do.'],
  ['Prompt or steps', 'The exact prompt or short walkthrough.'],
  ['Required context', 'What to provide before you run it.'],
  ['Example input and output', 'A concrete pattern to copy and adapt.'],
  ['Usage notes', 'How to get a stronger result.'],
  ['Known limitations', 'Where it can break or mislead.'],
  ['Contributor', 'Who shared it.'],
];

const reusabilityRows = [
  { label: 'Personal', desc: 'Useful to one person and not yet ready for broad reuse.', tone: 'slate' },
  { label: 'Team', desc: 'Reusable within one team with light adaptation.', tone: 'blue' },
  { label: 'Cross-company', desc: 'Broadly reusable with stable context and clear examples.', tone: 'green' },
];

const flows = [
  { title: 'Find', body: 'Search by keyword, role, or workflow type.' },
  { title: 'Open', body: 'Read what the workflow does and what context it needs.' },
  { title: 'Adapt', body: 'Use the example to tailor it to your own case.' },
  { title: 'Run', body: 'Copy the prompt or follow the workflow steps.' },
];

const entries = [
  {
    id: 'wf-001',
    title: 'Meeting Brief Builder',
    useCase: 'Prepare a concise pre-meeting brief before a customer, partner, or internal decision call.',
    role: 'Leadership',
    type: 'Meeting Prep',
    reusability: 'Team',
    contributor: 'Ankur',
    requiredContext: 'Meeting goal, participants, recent notes, open risks, and decisions needed.',
    prompt: 'Given the meeting goal, participants, and recent notes, produce a short pre-meeting brief with objective, context, likely objections, decision points, and recommended questions.',
    input: 'Renewal call next Tuesday. Customer is concerned about pricing and implementation speed. Include top risks and likely objections.',
    output: 'Objective: preserve renewal momentum. Risks: pricing sensitivity and unclear implementation scope. Questions: confirm success criteria, timing constraints, and expansion blockers.',
    notes: 'Works best when recent notes are attached. Use for high-stakes meetings, not routine status calls.',
    limitations: 'Can sound too certain if the notes are stale, thin, or contradictory.',
    failures: 'Missing stakeholder context, stale notes, and unclear meeting objective.',
    readTime: '90 sec',
    views: 28,
    copies: 11,
    featured: true,
  },
  {
    id: 'wf-002',
    title: 'Debug Context Pack',
    useCase: 'Structure debugging requests so the model sees enough context to give useful technical help.',
    role: 'Engineering',
    type: 'Debugging',
    reusability: 'Cross-company',
    contributor: 'Engineering seed contributor',
    requiredContext: 'Expected behavior, actual behavior, relevant file or snippet, environment, logs, attempted fixes, and constraints.',
    prompt: 'Analyze the bug using the provided expected behavior, actual behavior, logs, relevant files, and attempted fixes. Return ranked hypotheses, next checks, and the safest first action.',
    input: 'API returns 500 after auth refactor. Expected 200 with valid token. Logs show timeout after middleware update.',
    output: 'Most likely causes: middleware order, stale env var, token parsing regression. First checks: compare middleware chain, validate token decode path, and review timeout config.',
    notes: 'Works better as a template than a raw prompt. Fill every context field before use.',
    limitations: 'Weak when architecture context is missing. Can invent system behavior if the excerpt is too small.',
    failures: 'Incomplete logs, omitted constraints, and unclear expected behavior.',
    readTime: '2 min',
    views: 34,
    copies: 17,
    featured: true,
  },
  {
    id: 'wf-003',
    title: 'Research Synthesis Draft',
    useCase: 'Turn scattered notes into a clean first synthesis for a memo, working session, or recommendation.',
    role: 'Product',
    type: 'Research',
    reusability: 'Team',
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
    featured: true,
  },
  {
    id: 'wf-004',
    title: 'Content Repurposing Workflow',
    useCase: 'Turn one source asset into multiple downstream formats for social, email, and internal sharing.',
    role: 'Cross-functional',
    type: 'Content',
    reusability: 'Personal',
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
    featured: false,
  },
  {
    id: 'wf-005',
    title: 'Objection Pattern Extractor',
    useCase: 'Pull recurring objections from call notes and group them into usable categories.',
    role: 'Cross-functional',
    type: 'Sales Insight',
    reusability: 'Team',
    contributor: 'Seed interview contributor',
    requiredContext: 'Call notes, segment, deal stage, and whether the source is internal or customer-facing.',
    prompt: 'Identify recurring objections, cluster them by type, and note what evidence is strong, weak, or anecdotal.',
    input: 'Eight notes from discovery and renewal calls across three accounts.',
    output: 'Recurring themes: integration speed, proof of ROI, and uncertainty on rollout ownership.',
    notes: 'Useful for fast pattern recognition before writing a memo.',
    limitations: 'Should not be treated as a formal market study without validation.',
    failures: 'Too few calls, low-quality notes, and unclear segment labels.',
    readTime: '85 sec',
    views: 9,
    copies: 1,
    featured: false,
  },
];

function Select({ value, onChange, options }) {
  return (
    <select className="select" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

function Badge({ children, tone = 'slate' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function MetricPill({ icon, title, body }) {
  return (
    <div className="metric-pill">
      <div className="metric-pill-icon"><Icon name={icon} size={16} /></div>
      <div>
        <div className="metric-pill-title">{title}</div>
        <div className="metric-pill-body">{body}</div>
      </div>
    </div>
  );
}

function FeatureCard({ entry, onOpen }) {
  return (
    <button className="feature-card" onClick={() => onOpen(entry.id)}>
      <div className="feature-card-top">
        <Badge tone={entry.reusability === 'Cross-company' ? 'green' : entry.reusability === 'Team' ? 'blue' : 'slate'}>{entry.reusability}</Badge>
        <span className="inline-meta"><Icon name="clock" size={13} /> {entry.readTime}</span>
      </div>
      <div className="feature-card-title">{entry.title}</div>
      <div className="feature-card-body">{entry.useCase}</div>
      <div className="feature-card-meta">
        <span><Icon name="users" size={13} /> {entry.role}</span>
        <span><Icon name="layers" size={13} /> {entry.type}</span>
      </div>
    </button>
  );
}

function InfoCard({ icon, title, body }) {
  return (
    <div className="info-card">
      <div className="info-card-title"><Icon name={icon} size={15} /> {title}</div>
      <p>{body}</p>
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

function FormField({ label, placeholder, large }) {
  return (
    <div className={`form-field ${large ? 'form-field-large' : ''}`}>
      <label>{label}</label>
      <div className="mock-input">{placeholder}</div>
    </div>
  );
}

export default function InternalAIWorkflowPromptPortalPlatformV3EndUser() {
  const [activeTab, setActiveTab] = useState('discover');
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('All roles');
  const [type, setType] = useState('All types');
  const [level, setLevel] = useState('All levels');
  const [selectedId, setSelectedId] = useState(entries[0].id);
  const [copiedId, setCopiedId] = useState(null);

  const filteredEntries = useMemo(() => {
    const q = search.trim().toLowerCase();
    return entries.filter((entry) => {
      const matchesSearch = !q || [entry.title, entry.useCase, entry.role, entry.type, entry.contributor].join(' ').toLowerCase().includes(q);
      const matchesRole = role === 'All roles' || entry.role === role;
      const matchesType = type === 'All types' || entry.type === type;
      const matchesLevel = level === 'All levels' || entry.reusability === level;
      return matchesSearch && matchesRole && matchesType && matchesLevel;
    });
  }, [search, role, type, level]);

  const selectedEntry = filteredEntries.find((entry) => entry.id === selectedId) || filteredEntries[0] || null;
  const featured = entries.filter((entry) => entry.featured);

  async function handleCopy() {
    if (!selectedEntry) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(selectedEntry.prompt);
        setCopiedId(selectedEntry.id);
        setTimeout(() => setCopiedId(null), 1400);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function openEntry(id) {
    setSelectedId(id);
    setActiveTab('library');
  }

  return (
    <div className="portal-shell">
      <style>{`
        :root {
          --bg: #f5f7fb;
          --surface: rgba(255,255,255,0.84);
          --surface-solid: #ffffff;
          --line: #dfe5f0;
          --text: #122033;
          --muted: #5f6b7e;
          --muted-2: #7a8697;
          --blue: #2355d8;
          --blue-soft: #eff4ff;
          --green: #15805f;
          --green-soft: #eef9f5;
          --amber: #b66a08;
          --amber-soft: #fff5e7;
          --shadow: 0 20px 50px rgba(20, 32, 58, 0.08);
          --radius-xl: 28px;
          --radius-lg: 22px;
          --radius-md: 16px;
          --radius-sm: 12px;
        }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: var(--text); background: radial-gradient(circle at top left, #eef4ff 0, #f7f9fc 40%, #f4f6fa 100%); }
        button, input, select { font: inherit; }
        .portal-shell { min-height: 100vh; padding: 20px; }
        .portal-frame { max-width: 1450px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.6); background: rgba(255,255,255,0.56); backdrop-filter: blur(16px); border-radius: 34px; box-shadow: var(--shadow); overflow: hidden; }
        .topbar { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 18px 22px; border-bottom: 1px solid var(--line); background: rgba(255,255,255,0.72); position: sticky; top: 0; z-index: 10; }
        .brand { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .brand-badge { width: 42px; height: 42px; border-radius: 14px; display: grid; place-items: center; background: linear-gradient(135deg, #eef3ff, #ffffff); border: 1px solid #dde5f4; color: var(--blue); box-shadow: inset 0 1px 0 rgba(255,255,255,0.7); }
        .brand-copy { min-width: 0; }
        .brand-title { font-size: 0.96rem; font-weight: 700; letter-spacing: -0.01em; }
        .brand-subtitle { font-size: 0.82rem; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .topbar-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .top-search { display: flex; align-items: center; gap: 10px; min-width: 280px; padding: 12px 14px; border: 1px solid var(--line); background: #fff; border-radius: 999px; color: var(--muted); }
        .top-search input { border: 0; outline: 0; background: transparent; width: 100%; color: var(--text); }
        .nav-pills { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .nav-pill { display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--line); background: rgba(255,255,255,0.9); color: var(--muted); border-radius: 999px; padding: 10px 14px; cursor: pointer; transition: 160ms ease; }
        .nav-pill:hover { border-color: #c9d6f6; color: var(--text); }
        .nav-pill.active { background: #16253d; border-color: #16253d; color: #fff; }
        .page { padding: 28px; }
        .stack { display: grid; gap: 20px; }
        .hero { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr); gap: 20px; }
        .card { background: var(--surface-solid); border: 1px solid var(--line); border-radius: var(--radius-xl); box-shadow: 0 14px 32px rgba(17, 31, 55, 0.05); }
        .hero-main { padding: 32px; position: relative; overflow: hidden; }
        .hero-main::after { content: ''; position: absolute; inset: auto -80px -120px auto; width: 260px; height: 260px; background: radial-gradient(circle, rgba(35,85,216,0.10), rgba(35,85,216,0)); pointer-events: none; }
        .eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--blue); }
        .hero h1 { margin: 14px 0 10px; font-size: clamp(2rem, 4vw, 3.6rem); line-height: 1.03; letter-spacing: -0.05em; max-width: 9.5ch; }
        .hero p { margin: 0; max-width: 58ch; color: var(--muted); line-height: 1.72; font-size: 1rem; }
        .hero-cta { margin-top: 22px; display: flex; gap: 12px; flex-wrap: wrap; }
        .primary-btn, .secondary-btn, .icon-btn { border: 0; cursor: pointer; transition: 160ms ease; }
        .primary-btn { display: inline-flex; align-items: center; gap: 10px; background: #16253d; color: #fff; padding: 13px 18px; border-radius: 14px; box-shadow: 0 12px 24px rgba(22, 37, 61, 0.16); }
        .primary-btn:hover { transform: translateY(-1px); }
        .secondary-btn { display: inline-flex; align-items: center; gap: 10px; background: #fff; color: var(--text); padding: 13px 18px; border-radius: 14px; border: 1px solid var(--line); }
        .hero-sidebar { padding: 20px; display: grid; gap: 14px; }
        .metric-pill { display: grid; grid-template-columns: 42px 1fr; gap: 12px; padding: 16px; border: 1px solid var(--line); border-radius: 18px; background: linear-gradient(180deg, #fff, #f9fbff); }
        .metric-pill-icon { width: 42px; height: 42px; border-radius: 14px; display: grid; place-items: center; background: var(--blue-soft); color: var(--blue); }
        .metric-pill-title { font-weight: 700; margin-bottom: 2px; }
        .metric-pill-body { color: var(--muted); font-size: 0.93rem; line-height: 1.55; }
        .section-head { display: flex; justify-content: space-between; gap: 18px; align-items: end; }
        .section-head h2 { margin: 8px 0 0; font-size: clamp(1.4rem, 2vw, 2rem); line-height: 1.1; letter-spacing: -0.03em; }
        .section-head p { margin: 8px 0 0; color: var(--muted); line-height: 1.65; max-width: 64ch; }
        .feature-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
        .feature-card { text-align: left; padding: 18px; border: 1px solid var(--line); border-radius: 22px; background: linear-gradient(180deg, #ffffff, #f9fbff); cursor: pointer; transition: 160ms ease; }
        .feature-card:hover { transform: translateY(-2px); box-shadow: 0 16px 28px rgba(18, 32, 51, 0.08); border-color: #cfd9ee; }
        .feature-card-top, .feature-card-meta, .inline-meta { display: flex; align-items: center; gap: 10px; }
        .feature-card-top { justify-content: space-between; color: var(--muted-2); font-size: 0.82rem; }
        .feature-card-title { margin-top: 14px; font-size: 1.05rem; font-weight: 700; letter-spacing: -0.02em; }
        .feature-card-body { margin-top: 8px; color: var(--muted); line-height: 1.6; min-height: 76px; }
        .feature-card-meta { margin-top: 14px; flex-wrap: wrap; color: var(--muted-2); font-size: 0.85rem; }
        .badge { display: inline-flex; align-items: center; gap: 8px; padding: 7px 11px; border-radius: 999px; font-size: 0.78rem; font-weight: 700; }
        .badge-slate { background: #f2f5f9; color: #5f6b7e; }
        .badge-blue { background: var(--blue-soft); color: var(--blue); }
        .badge-green { background: var(--green-soft); color: var(--green); }
        .badge-amber { background: var(--amber-soft); color: var(--amber); }
        .visual-grid { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr); gap: 20px; }
        .flow-card, .anatomy-card, .panel-card, .help-card { padding: 24px; }
        .flow-steps { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin-top: 18px; }
        .flow-step { padding: 16px; border-radius: 20px; border: 1px solid var(--line); background: linear-gradient(180deg, #ffffff, #f8faff); }
        .flow-step-index { width: 34px; height: 34px; border-radius: 12px; display: grid; place-items: center; background: #16253d; color: #fff; font-weight: 700; font-size: 0.85rem; }
        .flow-step-title { margin-top: 14px; font-weight: 700; }
        .flow-step-body { margin-top: 6px; color: var(--muted); line-height: 1.55; font-size: 0.93rem; }
        .anatomy-list { margin-top: 18px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .anatomy-item { padding: 14px; border-radius: 18px; border: 1px solid var(--line); background: #fbfcff; }
        .anatomy-item-title { font-weight: 700; }
        .anatomy-item-body { margin-top: 6px; color: var(--muted); line-height: 1.5; font-size: 0.92rem; }
        .library-shell { display: grid; grid-template-columns: minmax(310px, 0.95fr) minmax(0, 1.2fr); gap: 20px; }
        .library-side { padding: 20px; }
        .library-top { display: flex; justify-content: space-between; gap: 12px; align-items: center; margin-bottom: 16px; }
        .results-count { font-size: 0.92rem; color: var(--muted); }
        .filter-stack { display: grid; gap: 12px; margin-bottom: 16px; }
        .filter-row { display: grid; grid-template-columns: minmax(0, 1.25fr) repeat(3, minmax(0, 1fr)); gap: 10px; }
        .search-input { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-radius: 14px; border: 1px solid var(--line); background: #fff; color: var(--muted); }
        .search-input input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--text); }
        .select { width: 100%; border: 1px solid var(--line); border-radius: 14px; background: #fff; color: var(--text); padding: 12px 14px; outline: 0; }
        .entry-list { display: grid; gap: 12px; }
        .entry-card { width: 100%; text-align: left; border: 1px solid var(--line); border-radius: 20px; background: linear-gradient(180deg, #fff, #fafcff); padding: 16px; cursor: pointer; transition: 160ms ease; }
        .entry-card:hover { border-color: #cfdaef; }
        .entry-card.active { border-color: #bfd0f8; box-shadow: inset 0 0 0 1px #bfd0f8; background: #f8fbff; }
        .entry-card-top { display: flex; justify-content: space-between; gap: 10px; align-items: start; }
        .entry-title { font-size: 1rem; font-weight: 700; letter-spacing: -0.02em; }
        .entry-sub { margin-top: 6px; color: var(--muted); line-height: 1.55; font-size: 0.92rem; }
        .entry-meta { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 12px; color: var(--muted-2); font-size: 0.82rem; }
        .entry-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
        .chip { display: inline-flex; align-items: center; padding: 7px 10px; border-radius: 999px; background: #f3f6fb; color: var(--muted); font-size: 0.8rem; }
        .detail-panel { padding: 24px; }
        .detail-top { display: flex; justify-content: space-between; gap: 18px; align-items: start; }
        .detail-kicker { color: var(--blue); font-size: 0.83rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
        .detail-panel h2 { margin: 10px 0 8px; font-size: clamp(1.6rem, 2.4vw, 2.3rem); line-height: 1.08; letter-spacing: -0.04em; }
        .detail-panel p { margin: 0; color: var(--muted); line-height: 1.7; }
        .detail-actions { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
        .icon-btn { display: inline-flex; align-items: center; gap: 8px; padding: 11px 14px; border-radius: 14px; border: 1px solid var(--line); background: #fff; color: var(--text); }
        .detail-stats { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 16px; color: var(--muted-2); font-size: 0.85rem; }
        .detail-stats span { display: inline-flex; align-items: center; gap: 7px; }
        .info-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 20px; }
        .info-card { padding: 16px; border-radius: 18px; border: 1px solid var(--line); background: #fbfcff; }
        .info-card-title { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; margin-bottom: 10px; }
        .info-card p { margin: 0; font-size: 0.93rem; }
        .code-grid { display: grid; gap: 12px; margin-top: 20px; }
        .code-grid.two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .code-block { border: 1px solid var(--line); border-radius: 20px; overflow: hidden; background: #0f1a2d; }
        .code-title { padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #dfe8ff; font-weight: 700; font-size: 0.86rem; }
        .code-block pre { margin: 0; padding: 16px; white-space: pre-wrap; line-height: 1.62; color: #edf2ff; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.89rem; }
        .submit-layout { display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(280px, 0.92fr); gap: 20px; }
        .submit-form, .submit-side { padding: 24px; }
        .form-grid { display: grid; gap: 12px; }
        .form-row-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .form-field label { display: block; margin-bottom: 8px; font-weight: 700; }
        .mock-input { min-height: 50px; display: flex; align-items: center; padding: 13px 14px; border: 1px solid var(--line); border-radius: 16px; background: #fbfcff; color: var(--muted); line-height: 1.55; }
        .form-field-large .mock-input { min-height: 96px; align-items: start; padding-top: 14px; }
        .submit-cta { display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap; }
        .help-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
        .compact-list { margin: 14px 0 0; padding-left: 18px; color: var(--muted); line-height: 1.72; }
        .level-table { margin-top: 18px; border: 1px solid var(--line); border-radius: 20px; overflow: hidden; }
        .level-row { display: grid; grid-template-columns: 170px minmax(0, 1fr); }
        .level-row + .level-row { border-top: 1px solid var(--line); }
        .level-key, .level-value { padding: 16px; }
        .level-key { background: #f8fbff; font-weight: 700; }
        .cover-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 18px; }
        .cover-box { padding: 16px; border-radius: 18px; border: 1px solid var(--line); }
        .cover-box h3 { margin: 0 0 8px; font-size: 1rem; }
        .cover-box p, .cover-box li { color: var(--muted); line-height: 1.65; }
        .cover-box ul { margin: 10px 0 0; padding-left: 18px; }
        .mobile-tabs { display: none; }

        @media (max-width: 1200px) {
          .hero, .visual-grid, .library-shell, .submit-layout { grid-template-columns: 1fr; }
          .feature-grid, .help-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 920px) {
          .page { padding: 18px; }
          .topbar { padding: 14px 16px; }
          .top-search { min-width: 0; width: 100%; }
          .topbar { align-items: stretch; flex-direction: column; }
          .topbar-actions { width: 100%; flex-direction: column; align-items: stretch; }
          .nav-pills { display: none; }
          .mobile-tabs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
          .mobile-tabs button { display: grid; place-items: center; gap: 6px; padding: 10px 8px; border-radius: 14px; border: 1px solid var(--line); background: #fff; color: var(--muted); }
          .mobile-tabs button.active { background: #16253d; border-color: #16253d; color: #fff; }
          .filter-row, .form-row-2, .code-grid.two, .info-grid, .help-grid, .cover-grid, .anatomy-list, .flow-steps { grid-template-columns: 1fr; }
          .feature-grid { grid-template-columns: 1fr; }
          .detail-top, .section-head { flex-direction: column; align-items: start; }
        }
        @media (max-width: 640px) {
          .portal-shell { padding: 10px; }
          .portal-frame { border-radius: 24px; }
          .hero-main, .hero-sidebar, .flow-card, .anatomy-card, .panel-card, .help-card, .library-side, .detail-panel, .submit-form, .submit-side { padding: 18px; }
          .hero h1 { max-width: 11ch; }
          .brand-subtitle { white-space: normal; }
          .detail-stats { gap: 10px; }
          .entry-card-top { flex-direction: column; }
          .level-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="portal-frame">
        <header className="topbar">
          <div className="brand">
            <div className="brand-badge"><Icon name="spark" size={18} /></div>
            <div className="brand-copy">
              <div className="brand-title">AI Workflow and Prompt Portal</div>
              <div className="brand-subtitle">Find proven workflows, use them with the right context, and share what works.</div>
            </div>
          </div>

          <div className="topbar-actions">
            <div className="top-search">
              <Icon name="search" size={16} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search workflows, roles, or use cases" />
            </div>
            <nav className="nav-pills">
              {tabs.map((tab) => (
                <button key={tab.id} className={`nav-pill ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                  <Icon name={tab.icon} size={15} /> {tab.label}
                </button>
              ))}
            </nav>
            <div className="mobile-tabs">
              {tabs.map((tab) => (
                <button key={tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => setActiveTab(tab.id)}>
                  <Icon name={tab.icon} size={16} />
                  <span style={{ fontSize: '0.78rem' }}>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="page">
          {activeTab === 'discover' && (
            <div className="stack">
              <section className="hero">
                <div className="hero-main card">
                  <div className="eyebrow"><Icon name="target" size={14} /> For everyday work</div>
                  <h1>Find the right workflow and use it well.</h1>
                  <p>
                    This library helps you find proven AI workflows, understand what context they need, and adapt them to your own task without starting from zero.
                  </p>
                  <div className="hero-cta">
                    <button className="primary-btn" onClick={() => setActiveTab('library')}><Icon name="search" size={16} /> Browse library</button>
                    <button className="secondary-btn" onClick={() => setActiveTab('submit')}><Icon name="plus" size={16} /> Submit a workflow</button>
                  </div>
                </div>
                <aside className="hero-sidebar card">
                  {quickFacts.map((item) => (
                    <MetricPill key={item.title} {...item} />
                  ))}
                </aside>
              </section>

              <section className="card panel-card">
                <div className="section-head">
                  <div>
                    <div className="eyebrow"><Icon name="spark" size={14} /> Start here</div>
                    <h2>Featured workflows</h2>
                    <p>These are strong examples of workflows that are easy to understand, easy to adapt, and clear about where they work best.</p>
                  </div>
                </div>
                <div className="feature-grid" style={{ marginTop: 18 }}>
                  {featured.map((entry) => (
                    <FeatureCard key={entry.id} entry={entry} onOpen={openEntry} />
                  ))}
                </div>
              </section>

              <section className="visual-grid">
                <div className="card flow-card">
                  <div className="section-head">
                    <div>
                      <div className="eyebrow"><Icon name="route" size={14} /> Simple flow</div>
                      <h2>How to use the library</h2>
                      <p>Use the library as a starting point. Search for a workflow, read the context requirements, adapt the example, and then run it in your own environment.</p>
                    </div>
                  </div>
                  <div className="flow-steps">
                    {flows.map((item, idx) => (
                      <div className="flow-step" key={item.title}>
                        <div className="flow-step-index">0{idx + 1}</div>
                        <div className="flow-step-title">{item.title}</div>
                        <div className="flow-step-body">{item.body}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card anatomy-card">
                  <div className="section-head">
                    <div>
                      <div className="eyebrow"><Icon name="grid" size={14} /> Entry anatomy</div>
                      <h2>What every workflow entry includes</h2>
                      <p>The goal is not just to give you a prompt. The goal is to give you enough structure to use it correctly.</p>
                    </div>
                  </div>
                  <div className="anatomy-list">
                    {anatomy.map(([title, body]) => (
                      <div className="anatomy-item" key={title}>
                        <div className="anatomy-item-title">{title}</div>
                        <div className="anatomy-item-body">{body}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'library' && (
            <div className="stack">
              <section className="card panel-card">
                <div className="section-head">
                  <div>
                    <div className="eyebrow"><Icon name="book" size={14} /> Library</div>
                    <h2>Browse by role, workflow type, or keyword</h2>
                    <p>Open a workflow to see what it does, what context it needs, one example, and where it can fail.</p>
                  </div>
                  <Badge tone="slate"><Icon name="clock" size={13} /> Under 2 min per entry</Badge>
                </div>
              </section>

              <section className="library-shell">
                <div className="card library-side">
                  <div className="library-top">
                    <div className="results-count">{filteredEntries.length} workflows</div>
                    <Badge tone="blue"><Icon name="filter" size={13} /> Filtered view</Badge>
                  </div>
                  <div className="filter-stack">
                    <div className="search-input">
                      <Icon name="search" size={16} />
                      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title, use case, role, or contributor" />
                    </div>
                    <div className="filter-row">
                      <Select value={role} onChange={setRole} options={roleOptions} />
                      <Select value={type} onChange={setType} options={typeOptions} />
                      <Select value={level} onChange={setLevel} options={reusabilityOptions} />
                      <button className="secondary-btn" onClick={() => { setRole('All roles'); setType('All types'); setLevel('All levels'); setSearch(''); }}>
                        Reset
                      </button>
                    </div>
                  </div>

                  <div className="entry-list">
                    {filteredEntries.map((entry) => (
                      <button key={entry.id} className={`entry-card ${selectedEntry?.id === entry.id ? 'active' : ''}`} onClick={() => setSelectedId(entry.id)}>
                        <div className="entry-card-top">
                          <div>
                            <div className="entry-title">{entry.title}</div>
                            <div className="entry-sub">{entry.useCase}</div>
                          </div>
                          <Badge tone={entry.reusability === 'Cross-company' ? 'green' : entry.reusability === 'Team' ? 'blue' : 'slate'}>{entry.reusability}</Badge>
                        </div>
                        <div className="entry-meta">
                          <span><Icon name="users" size={13} /> {entry.role}</span>
                          <span><Icon name="layers" size={13} /> {entry.type}</span>
                          <span><Icon name="clock" size={13} /> {entry.readTime}</span>
                        </div>
                        <div className="entry-chips">
                          <span className="chip">{entry.contributor}</span>
                          <span className="chip">Example included</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="card detail-panel">
                  {selectedEntry ? (
                    <>
                      <div className="detail-top">
                        <div>
                          <div className="detail-kicker">{selectedEntry.type} · {selectedEntry.role}</div>
                          <h2>{selectedEntry.title}</h2>
                          <p>{selectedEntry.useCase}</p>
                        </div>
                        <div className="detail-actions">
                          <Badge tone={selectedEntry.reusability === 'Cross-company' ? 'green' : selectedEntry.reusability === 'Team' ? 'blue' : 'slate'}>{selectedEntry.reusability}</Badge>
                          <button className="icon-btn" onClick={handleCopy}><Icon name="copy" size={15} /> {copiedId === selectedEntry.id ? 'Copied' : 'Copy prompt'}</button>
                        </div>
                      </div>

                      <div className="detail-stats">
                        <span><Icon name="eye" size={13} /> {selectedEntry.views} views</span>
                        <span><Icon name="copy" size={13} /> {selectedEntry.copies} copies</span>
                        <span><Icon name="clock" size={13} /> {selectedEntry.readTime}</span>
                        <span><Icon name="users" size={13} /> {selectedEntry.contributor}</span>
                      </div>

                      <div className="info-grid">
                        <InfoCard icon="file" title="Required context" body={selectedEntry.requiredContext} />
                        <InfoCard icon="spark" title="Usage notes" body={selectedEntry.notes} />
                        <InfoCard icon="warning" title="Known limitations" body={selectedEntry.limitations} />
                        <InfoCard icon="shield" title="Typical failure modes" body={selectedEntry.failures} />
                      </div>

                      <div className="code-grid">
                        <CodeBlock title="Prompt or workflow" text={selectedEntry.prompt} />
                        <div className="code-grid two">
                          <CodeBlock title="Example input" text={selectedEntry.input} />
                          <CodeBlock title="Example output" text={selectedEntry.output} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>No workflows match the current filters.</div>
                  )}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'submit' && (
            <div className="stack">
              <section className="submit-layout">
                <div className="card submit-form">
                  <div className="section-head">
                    <div>
                      <div className="eyebrow"><Icon name="send" size={14} /> Submit</div>
                      <h2>Share a workflow that others can actually use</h2>
                      <p>Keep it practical. A strong submission explains the job, shows one example, and is honest about what still needs correction.</p>
                    </div>
                    <Badge tone="blue"><Icon name="clock" size={13} /> 5 to 10 min</Badge>
                  </div>

                  <div className="form-grid" style={{ marginTop: 18 }}>
                    <FormField label="Title" placeholder="Give the workflow a short searchable name." />
                    <FormField label="What problem does it solve?" placeholder="State the job this workflow helps someone do." large />
                    <FormField label="Prompt or workflow" placeholder="Paste the prompt or describe the steps in a short sequence." large />
                    <div className="form-row-2">
                      <FormField label="Required context" placeholder="List the inputs or background this workflow needs." large />
                      <FormField label="One example" placeholder="Show a simple input and output pattern." large />
                    </div>
                    <div className="form-row-2">
                      <FormField label="What works well" placeholder="When does this work best?" large />
                      <FormField label="What fails or needs correction" placeholder="Where does it usually break down?" large />
                    </div>
                    <div className="form-row-2">
                      <FormField label="Who should use it?" placeholder="Role, team, or workflow type." />
                      <FormField label="Reusability level" placeholder="Personal, team, or cross-company." />
                    </div>
                    <FormField label="Contributor" placeholder="Add your name so others can follow up if needed." />
                  </div>

                  <div className="submit-cta">
                    <button className="primary-btn"><Icon name="upload" size={16} /> Submit for review</button>
                    <button className="secondary-btn"><Icon name="file" size={16} /> Save draft</button>
                  </div>
                </div>

                <aside className="card submit-side">
                  <div className="section-head">
                    <div>
                      <div className="eyebrow"><Icon name="check" size={14} /> Before you submit</div>
                      <h2>What makes a good entry</h2>
                    </div>
                  </div>
                  <ul className="compact-list">
                    <li>Describe the job to be done, not only the prompt text.</li>
                    <li>Include one real example so the next user can see the pattern.</li>
                    <li>Write the required context clearly. Weak context leads to weak output.</li>
                    <li>Be direct about limitations. That saves time later.</li>
                  </ul>

                  <div className="cover-grid">
                    <div className="cover-box" style={{ background: '#fbfcff' }}>
                      <h3>What happens next</h3>
                      <ul>
                        <li>Your submission is checked for clarity and completeness.</li>
                        <li>It is tagged so others can find it by role, type, and use case.</li>
                        <li>Once ready, it appears in the shared library.</li>
                      </ul>
                    </div>
                    <div className="cover-box" style={{ background: '#fffaf4' }}>
                      <h3>What to avoid</h3>
                      <ul>
                        <li>A raw prompt with no example.</li>
                        <li>A long narrative with no clear structure.</li>
                        <li>Claiming broad reuse when it is still personal.</li>
                      </ul>
                    </div>
                  </div>
                </aside>
              </section>
            </div>
          )}

          {activeTab === 'help' && (
            <div className="stack">
              <section className="help-grid">
                <div className="card help-card">
                  <div className="eyebrow"><Icon name="book" size={14} /> What this library covers</div>
                  <h2 style={{ margin: '12px 0 0', fontSize: '1.35rem', lineHeight: 1.15, letterSpacing: '-0.03em' }}>Prompts plus workflow context</h2>
                  <ul className="compact-list">
                    <li>When to use a workflow</li>
                    <li>What good output looks like</li>
                    <li>What usually goes wrong</li>
                    <li>Whether it is personal, team, or cross-company</li>
                  </ul>
                </div>

                <div className="card help-card">
                  <div className="eyebrow"><Icon name="layers" size={14} /> Reusability levels</div>
                  <h2 style={{ margin: '12px 0 0', fontSize: '1.35rem', lineHeight: 1.15, letterSpacing: '-0.03em' }}>Choose the smallest useful level</h2>
                  <div className="level-table">
                    {reusabilityRows.map((row) => (
                      <div className="level-row" key={row.label}>
                        <div className="level-key"><Badge tone={row.tone}>{row.label}</Badge></div>
                        <div className="level-value">{row.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card help-card">
                  <div className="eyebrow"><Icon name="warning" size={14} /> Scope</div>
                  <h2 style={{ margin: '12px 0 0', fontSize: '1.35rem', lineHeight: 1.15, letterSpacing: '-0.03em' }}>What this version does not try to do</h2>
                  <ul className="compact-list">
                    <li>It does not solve connected data access or security.</li>
                    <li>It does not build prompts for you automatically.</li>
                    <li>It does not standardize every workflow at once.</li>
                    <li>It focuses on strong reusable entries that are easy to find and easy to use.</li>
                  </ul>
                </div>
              </section>

              <section className="visual-grid">
                <div className="card help-card">
                  <div className="section-head">
                    <div>
                      <div className="eyebrow"><Icon name="target" size={14} /> Faster understanding</div>
                      <h2>Use examples before you copy</h2>
                      <p>The quickest way to understand a workflow is to read the example input and output first. Then check required context and limitations before you copy the prompt.</p>
                    </div>
                  </div>
                  <div className="cover-grid">
                    <div className="cover-box" style={{ background: '#f8fbff' }}>
                      <h3>Best reading order</h3>
                      <ul>
                        <li>Use case</li>
                        <li>Example input and output</li>
                        <li>Required context</li>
                        <li>Usage notes and limitations</li>
                      </ul>
                    </div>
                    <div className="cover-box" style={{ background: '#fbfcff' }}>
                      <h3>Why this helps</h3>
                      <ul>
                        <li>Less guesswork</li>
                        <li>Fewer re-prompt loops</li>
                        <li>More consistent output quality</li>
                        <li>Faster reuse across the team</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card help-card">
                  <div className="section-head">
                    <div>
                      <div className="eyebrow"><Icon name="shield" size={14} /> Good practice</div>
                      <h2>Treat this as a starting point, not autopilot</h2>
                      <p>The library helps you start from a stronger pattern. You still need to review output, check factual accuracy, and adjust for the real context of your task.</p>
                    </div>
                  </div>
                  <ul className="compact-list">
                    <li>Do not assume the prompt is enough without context.</li>
                    <li>Do not skip the limitation notes.</li>
                    <li>Do not treat a personal workflow as broadly reusable unless it has been tested that way.</li>
                    <li>Do reuse patterns that save time and improve clarity for others.</li>
                  </ul>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
