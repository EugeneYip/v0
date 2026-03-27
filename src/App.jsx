import React, { useMemo, useState } from 'react';

const ICON_PATHS = {
  spark: 'M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z',
  book: 'M5 4.5A2.5 2.5 0 017.5 2H20v18H7.5A2.5 2.5 0 015 17.5v-13zM7.5 2v18',
  search: 'M11 4a7 7 0 105.2 11.7l3.05 3.05 1.4-1.4-3.05-3.05A7 7 0 0011 4zm0 2a5 5 0 110 10 5 5 0 010-10z',
  plus: 'M12 5v14M5 12h14',
  arrowRight: 'M5 12h12m-4-4l4 4-4 4',
  check: 'M5 12l4 4L19 6',
  copy: 'M9 9h10v11H9zM5 5h10v2H7v8H5z',
  users: 'M16 14a4 4 0 10-3.9-4.8M8 14a4 4 0 103.9-4.8M3.5 20a6 6 0 0110 0m1 0a6 6 0 016 0',
  layers: 'M12 3l9 5-9 5-9-5 9-5zm-9 9l9 5 9-5m-18 4l9 5 9-5',
  filter: 'M4 6h16M7 12h10M10 18h4',
  file: 'M7 3h7l5 5v13H7zM14 3v5h5',
  target: 'M12 4v3m0 10v3M4 12H1m22 0h-3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1m0-12.8l-2.1 2.1M7.7 16.3l-2.1 2.1M12 8a4 4 0 100 8 4 4 0 000-8z',
  route: 'M5 19h3v-3H5v3zm11-11h3V5h-3v3zM8 17h3v-3H8v3zm3-1h3a3 3 0 003-3V8',
  shield: 'M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z',
  clock: 'M12 7v5l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z',
  eye: 'M2.5 12S6.5 6.5 12 6.5 21.5 12 21.5 12 17.5 17.5 12 17.5 2.5 12 2.5 12zm9.5-3a3 3 0 100 6 3 3 0 000-6z',
  info: 'M12 17h.01M12 11v-1m0-4h.01M12 22a10 10 0 110-20 10 10 0 010 20z',
  warning: 'M12 3l9 16H3l9-16zm0 5v4m0 4h.01',
  send: 'M3 20l18-8L3 4l3 7 8 1-8 1-3 7z',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  home: 'M3 11.5L12 4l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-8.5z',
};

function Icon({ name, size = 18, stroke = 1.8, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

const navItems = [
  { id: 'discover', label: 'Discover', icon: 'home' },
  { id: 'library', label: 'Library', icon: 'search' },
  { id: 'submit', label: 'Submit', icon: 'plus' },
  { id: 'guide', label: 'How to use this', icon: 'info' },
];

const roleOptions = ['All roles', 'Leadership', 'Engineering', 'Product', 'Cross-functional'];
const typeOptions = ['All types', 'Meeting Prep', 'Debugging', 'Research', 'Content', 'Sales Insight'];
const formatOptions = ['All formats', 'Super Prompt', 'Skill Pack'];
const reuseOptions = ['All levels', 'Personal', 'Team', 'Cross-company'];

const entries = [
  {
    id: 'sp-001',
    title: 'Account Briefing Operator',
    shortTitle: 'Account briefing',
    useCase: 'Create a concise, decision-ready pre-meeting brief for a customer, partner, or internal stakeholder call.',
    role: 'Leadership',
    type: 'Meeting Prep',
    format: 'Super Prompt',
    reusability: 'Team',
    contributor: 'Ankur',
    readTime: '2 min',
    bestFor: 'High-stakes calls where the user has notes, account context, and a decision to prepare for.',
    requiredContext: [
      'Meeting objective',
      'Participants and roles',
      'Recent notes or transcript excerpts',
      'Open risks or objections',
      'Decisions needed by the end of the call',
    ],
    outputContract: [
      'One-screen brief',
      'Top risks and likely objections',
      'Recommended questions',
      'Decision watchouts',
    ],
    whatMakesItDifferent: 'This is not a single sentence. It defines role, task, required inputs, output structure, and refusal conditions when the context is too weak.',
    assetPreview: `# Account Briefing Operator\n\n## Role\nYou are preparing a pre-meeting brief for a decision-maker.\n\n## Goal\nTurn recent account context into a short briefing that helps the user enter the meeting with a clear objective, major risks, and recommended questions.\n\n## Inputs required\n- objective\n- participants\n- recent notes\n- decisions needed\n- open risks\n\n## Output format\n1. objective\n2. situation in 3 bullets\n3. likely objections\n4. questions to ask\n5. decision watchouts\n\n## Rules\n- do not invent missing context\n- label uncertainty clearly\n- keep it under 180 words unless asked otherwise`,
    exampleInput: `Objective: preserve renewal momentum.\nParticipants: VP Sales, Director of Ops, account lead.\nRecent notes: customer likes value but is worried about implementation speed and unclear ownership.\nDecisions needed: next-step owner, timeline, pricing posture.`,
    exampleOutput: `Objective\nPreserve renewal momentum while reducing implementation anxiety.\n\nSituation\n- Customer sees value but fears rollout friction.\n- Ownership on implementation remains unclear.\n- Pricing sensitivity is real but not yet the main blocker.\n\nLikely objections\nImplementation speed, onboarding burden, and who owns rollout internally.\n\nQuestions\nWhat would make implementation feel safe enough to move forward? Who needs to own rollout on your side? What timing constraints matter most?\n\nDecision watchouts\nDo not push pricing before ownership and timeline are clarified.`,
    usageNotes: 'Best when the notes are recent and the meeting objective is explicit. Weak notes produce generic briefs.',
    limitations: 'Not reliable when notes are stale, contradictory, or too thin. It should not infer account politics from sparse clues.',
    views: 42,
    copies: 19,
    featured: true,
  },
  {
    id: 'sk-001',
    title: 'meeting-brief-skill.md',
    shortTitle: 'Meeting brief skill',
    useCase: 'Package a repeatable briefing workflow into a reusable skill asset another teammate can run without re-explaining the method every time.',
    role: 'Cross-functional',
    type: 'Meeting Prep',
    format: 'Skill Pack',
    reusability: 'Cross-company',
    contributor: 'Portal seed library',
    readTime: '2 min',
    bestFor: 'Cases where the workflow should stay stable across users and where the same structure is repeatedly reused.',
    requiredContext: [
      'Objective',
      'Participants',
      'Recent notes or transcript excerpt',
      'Known risks',
      'Desired level of output detail',
    ],
    outputContract: [
      'Sectioned brief',
      'Consistent headings',
      'Clear uncertainty labeling',
      'No invented facts',
    ],
    whatMakesItDifferent: 'A skill pack stores durable operating instructions. It looks less like a chat prompt and more like a mini playbook that can be discovered, loaded, and reused.',
    assetPreview: `# meeting-brief-skill.md\n\n## Purpose\nProduce a concise briefing before an important meeting.\n\n## When to use\nUse for customer, partner, hiring, or internal decision meetings where preparation quality matters.\n\n## Inputs\nobjective\nparticipants\nrecent notes\nrisks\nquestions already known\n\n## Workflow\n1. identify the objective\n2. compress the situation into the fewest useful bullets\n3. extract likely objections\n4. recommend questions\n5. flag missing context before finalizing\n\n## Good output looks like\nshort\ndecision-relevant\nspecific to this meeting\nexplicit about uncertainty\n\n## Failure modes\nthin notes\nconflicting notes\nunclear objective\nmeeting does not require a brief`,
    exampleInput: `Use this skill for an internal product review where two leads disagree on launch timing and one executive is joining late.`,
    exampleOutput: `Brief created with sections for objective, disagreement summary, likely friction points, and questions needed to reach a decision.`,
    usageNotes: 'Use when you want consistency across many similar workflows, not just one strong one-off prompt.',
    limitations: 'It still depends on the operator supplying the right input fields. A skill pack does not replace judgment.',
    views: 37,
    copies: 14,
    featured: true,
  },
  {
    id: 'sk-002',
    title: 'bug-triage-skill.md',
    shortTitle: 'Bug triage skill',
    useCase: 'Standardize debugging requests so the model sees the architecture, observed behavior, logs, and constraints before offering hypotheses.',
    role: 'Engineering',
    type: 'Debugging',
    format: 'Skill Pack',
    reusability: 'Cross-company',
    contributor: 'Engineering seed contributor',
    readTime: '2 min',
    bestFor: 'Bugs where incomplete context leads to wasted loops and low-confidence suggestions.',
    requiredContext: [
      'Expected behavior',
      'Actual behavior',
      'Relevant code or files',
      'Logs or error trace',
      'Environment and constraints',
      'Already attempted fixes',
    ],
    outputContract: [
      'Ranked hypotheses',
      'Missing context callout',
      'Safest first check',
      'Do-not-assume notes',
    ],
    whatMakesItDifferent: 'The asset forces debugging discipline. It asks for the context fields most people forget, which is why it reduces re-prompting better than an ordinary ask.',
    assetPreview: `# bug-triage-skill.md\n\n## Purpose\nReduce wasted debugging loops by requiring a minimum context pack before analysis.\n\n## Required fields\nexpected behavior\nactual behavior\nrelevant files\nlogs\nenvironment\nattempted fixes\nconstraints\n\n## Output standard\n- ranked hypotheses\n- what context is still missing\n- safest next action\n- why this action comes first\n\n## Rules\nnever pretend the excerpt represents the whole system\ncall out missing context explicitly\ndo not recommend risky refactors as the first step`,
    exampleInput: `Expected 200 on authenticated request. Actual 500 after middleware refactor. Logs show timeout after token parsing change.`,
    exampleOutput: `Hypotheses ranked around middleware order, stale env config, and token parse regression, with a safe first check sequence.`,
    usageNotes: 'Useful as a template that engineers can fill before they ask the model for help.',
    limitations: 'If architecture context is still missing, the model can only offer partial guidance.',
    views: 51,
    copies: 22,
    featured: true,
  },
  {
    id: 'sp-002',
    title: 'Research Synthesis Operator',
    shortTitle: 'Research synthesis',
    useCase: 'Turn scattered notes into a decision-ready first synthesis with signals, tensions, and open questions separated cleanly.',
    role: 'Product',
    type: 'Research',
    format: 'Super Prompt',
    reusability: 'Team',
    contributor: 'Follow-up interview participant',
    readTime: '90 sec',
    bestFor: 'Early synthesis when the user needs structure before writing a memo or preparing a working session.',
    requiredContext: ['Raw notes', 'Audience', 'Decision this synthesis should support', 'Preferred length'],
    outputContract: ['Patterns', 'Tensions', 'Open questions', 'Implications'],
    whatMakesItDifferent: 'It tells the model exactly how to classify evidence instead of asking for a generic summary.',
    assetPreview: `# Research Synthesis Operator\n\nTask\nGroup notes by pattern, tension, and open question. Separate signal from opinion.\n\nRules\n- do not flatten disagreement\n- call out weak evidence\n- write implications only when supported by notes\n\nOutput\n1. patterns\n2. tensions\n3. unanswered questions\n4. implications for the next discussion`,
    exampleInput: `14 survey responses on AI usage. Need a first synthesis for a team discussion.`,
    exampleOutput: `Patterns: adoption is broad. Tensions: output quality depends on context discipline. Open questions: where should reusable workflows live?`,
    usageNotes: 'Good for a strong first pass, not final prose.',
    limitations: 'Can still compress nuance if the notes vary widely in quality.',
    views: 26,
    copies: 10,
    featured: false,
  },
  {
    id: 'sp-003',
    title: 'Content Repurposing Operator',
    shortTitle: 'Content repurposing',
    useCase: 'Turn one source asset into multiple channel-specific outputs without flattening tone or CTA.',
    role: 'Cross-functional',
    type: 'Content',
    format: 'Super Prompt',
    reusability: 'Personal',
    contributor: 'Caitlin',
    readTime: '80 sec',
    bestFor: 'Fast conversion from one source asset to multiple downstream formats.',
    requiredContext: ['Source asset', 'Audience', 'Channels', 'Tone', 'CTA', 'Forbidden claims'],
    outputContract: ['One output per channel', 'Distinct structure per channel', 'Clear CTA'],
    whatMakesItDifferent: 'It controls channel behavior rather than asking for a vague rewrite.',
    assetPreview: `# Content Repurposing Operator\n\nGiven one source asset, create channel-specific outputs.\n\nRequired inputs\nsource\naudience\nchannel\ntone\nCTA\nforbidden claims\n\nRules\nwrite differently for each channel\nkeep the CTA appropriate to the channel\ndo not reuse the same opening sentence`,
    exampleInput: `Turn webinar notes into one LinkedIn post, one short email, and one internal summary.`,
    exampleOutput: `Three outputs with distinct structure and CTA.`,
    usageNotes: 'Works best with a strong source asset and clear channel guardrails.',
    limitations: 'Thin source assets create repetitive outputs.',
    views: 14,
    copies: 5,
    featured: false,
  },
];

const anatomy = [
  { title: 'Use case', body: 'A clear job to be done.' },
  { title: 'Required context', body: 'The inputs the asset needs before it can work well.' },
  { title: 'Asset preview', body: 'A real prompt or skill file, not only a label.' },
  { title: 'Example input and output', body: 'The fastest way to understand how to adapt it.' },
  { title: 'Usage notes', body: 'What usually improves the result.' },
  { title: 'Limitations', body: 'Where the pattern breaks or becomes unreliable.' },
];

const comparison = [
  {
    label: 'Ordinary chat',
    tone: 'slate',
    points: ['Fast to start', 'High variation in quality', 'Usually depends on what the user remembers to include'],
  },
  {
    label: 'Super Prompt',
    tone: 'blue',
    points: ['Adds role, inputs, rules, and output shape', 'More consistent than ad hoc chat', 'Good when one operator still adapts it manually'],
  },
  {
    label: 'Skill Pack',
    tone: 'green',
    points: ['Stores durable workflow instructions', 'Easier to share and standardize', 'Best when the pattern should be reused repeatedly'],
  },
];

function Badge({ children, tone = 'slate' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function Select({ value, onChange, options }) {
  return (
    <select className="select" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

function StatCard({ icon, title, body }) {
  return (
    <div className="stat-card">
      <div className="stat-icon"><Icon name={icon} size={15} /></div>
      <div>
        <div className="stat-title">{title}</div>
        <div className="stat-body">{body}</div>
      </div>
    </div>
  );
}

function EntryCard({ entry, active, onClick }) {
  return (
    <button className={`entry-card ${active ? 'entry-card-active' : ''}`} onClick={() => onClick(entry.id)}>
      <div className="entry-card-top">
        <div className="entry-format-row">
          <Badge tone={entry.format === 'Skill Pack' ? 'green' : 'blue'}>{entry.format}</Badge>
          <Badge tone={entry.reusability === 'Cross-company' ? 'green' : entry.reusability === 'Team' ? 'blue' : 'slate'}>{entry.reusability}</Badge>
        </div>
        <div className="entry-readtime"><Icon name="clock" size={13} /> {entry.readTime}</div>
      </div>
      <div className="entry-card-title">{entry.shortTitle}</div>
      <div className="entry-card-body">{entry.useCase}</div>
      <div className="entry-card-meta">
        <span><Icon name="users" size={13} /> {entry.role}</span>
        <span><Icon name="layers" size={13} /> {entry.type}</span>
      </div>
    </button>
  );
}

function ComparisonCard({ item }) {
  return (
    <div className="comparison-card">
      <div className="comparison-title-row">
        <Badge tone={item.tone}>{item.label}</Badge>
      </div>
      <ul className="bullet-list compact">
        {item.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

function Block({ title, children, subtle }) {
  return (
    <div className={`block ${subtle ? 'block-subtle' : ''}`}>
      <div className="block-title">{title}</div>
      <div className="block-body">{children}</div>
    </div>
  );
}

function Field({ label, placeholder, large }) {
  return (
    <div className={`field ${large ? 'field-large' : ''}`}>
      <label>{label}</label>
      <div className="mock-input">{placeholder}</div>
    </div>
  );
}

export default function InternalAIWorkflowPromptPortalPlatformV4() {
  const [activeTab, setActiveTab] = useState('discover');
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('All roles');
  const [type, setType] = useState('All types');
  const [format, setFormat] = useState('All formats');
  const [reuse, setReuse] = useState('All levels');
  const [selectedId, setSelectedId] = useState(entries[0].id);
  const [copied, setCopied] = useState(false);

  const filteredEntries = useMemo(() => {
    const q = search.trim().toLowerCase();
    return entries.filter((entry) => {
      const matchesSearch = !q || [entry.title, entry.shortTitle, entry.useCase, entry.role, entry.type, entry.format, entry.contributor].join(' ').toLowerCase().includes(q);
      const matchesRole = role === 'All roles' || entry.role === role;
      const matchesType = type === 'All types' || entry.type === type;
      const matchesFormat = format === 'All formats' || entry.format === format;
      const matchesReuse = reuse === 'All levels' || entry.reusability === reuse;
      return matchesSearch && matchesRole && matchesType && matchesFormat && matchesReuse;
    });
  }, [search, role, type, format, reuse]);

  const selectedEntry = filteredEntries.find((entry) => entry.id === selectedId) || filteredEntries[0] || entries[0];
  const featured = entries.filter((entry) => entry.featured).slice(0, 3);

  async function handleCopy() {
    const text = selectedEntry?.assetPreview;
    if (!text) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="portal-shell">
      <style>{`
        :root {
          --bg: #f4f7fb;
          --surface: #ffffff;
          --surface-soft: #f8fbff;
          --line: #dce4ef;
          --text: #122033;
          --muted: #5c6b7c;
          --muted-2: #7d8897;
          --navy: #16253d;
          --blue: #2355d8;
          --blue-soft: #edf3ff;
          --green: #157a5a;
          --green-soft: #eef8f4;
          --slate-soft: #f2f5f9;
          --shadow: 0 24px 60px rgba(19, 34, 57, 0.08);
          --radius-xl: 28px;
          --radius-lg: 22px;
          --radius-md: 16px;
          --radius-sm: 12px;
        }
        * { box-sizing: border-box; }
        body { margin: 0; background: radial-gradient(circle at top left, #edf4ff 0, #f7f9fc 42%, #f4f6fa 100%); color: var(--text); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        button, input, select { font: inherit; }
        .portal-shell { min-height: 100vh; padding: 20px; }
        .portal-frame { max-width: 1480px; margin: 0 auto; border-radius: 34px; overflow: hidden; border: 1px solid rgba(255,255,255,0.7); background: rgba(255,255,255,0.58); backdrop-filter: blur(16px); box-shadow: var(--shadow); }
        .topbar { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 18px 22px; border-bottom: 1px solid var(--line); background: rgba(255,255,255,0.76); }
        .brand { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .brand-badge { width: 42px; height: 42px; border-radius: 14px; display: grid; place-items: center; background: linear-gradient(180deg, #fff, #edf3ff); border: 1px solid #d8e2f1; color: var(--blue); }
        .brand-title { font-size: 0.96rem; font-weight: 700; letter-spacing: -0.01em; }
        .brand-subtitle { font-size: 0.82rem; color: var(--muted); }
        .topbar-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .top-search { min-width: 280px; display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-radius: 999px; border: 1px solid var(--line); background: #fff; color: var(--muted); }
        .top-search input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--text); }
        .nav-pills { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .nav-pill { display: inline-flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 999px; border: 1px solid var(--line); background: rgba(255,255,255,0.92); color: var(--muted); cursor: pointer; transition: 160ms ease; }
        .nav-pill:hover { color: var(--text); border-color: #cad5e7; }
        .nav-pill.active { background: var(--navy); border-color: var(--navy); color: #fff; }
        .page { padding: 28px; }
        .stack { display: grid; gap: 20px; }
        .card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-xl); box-shadow: 0 14px 30px rgba(17, 31, 55, 0.05); }
        .hero { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr); gap: 18px; }
        .hero-main { padding: 30px; position: relative; overflow: hidden; }
        .hero-main::after { content: ''; position: absolute; inset: auto -70px -120px auto; width: 260px; height: 260px; background: radial-gradient(circle, rgba(35,85,216,0.12), rgba(35,85,216,0)); pointer-events: none; }
        .eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 0.76rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--blue); }
        h1 { margin: 14px 0 10px; font-size: clamp(2rem, 3.8vw, 3.4rem); line-height: 1.02; letter-spacing: -0.05em; max-width: 10ch; }
        .hero-copy { margin: 0; max-width: 55ch; color: var(--muted); line-height: 1.68; }
        .hero-actions { margin-top: 20px; display: flex; gap: 12px; flex-wrap: wrap; }
        .primary-btn, .secondary-btn, .ghost-btn { border: 0; cursor: pointer; transition: 160ms ease; }
        .primary-btn { display: inline-flex; align-items: center; gap: 10px; padding: 13px 18px; border-radius: 14px; background: var(--navy); color: #fff; box-shadow: 0 12px 24px rgba(22, 37, 61, 0.16); }
        .secondary-btn { display: inline-flex; align-items: center; gap: 10px; padding: 13px 18px; border-radius: 14px; background: #fff; color: var(--text); border: 1px solid var(--line); }
        .ghost-btn { display: inline-flex; align-items: center; gap: 10px; padding: 11px 14px; border-radius: 12px; background: #fff; border: 1px solid var(--line); color: var(--text); }
        .hero-side { padding: 18px; display: grid; gap: 12px; }
        .stat-card { display: grid; grid-template-columns: 38px 1fr; gap: 12px; padding: 15px; border-radius: 18px; border: 1px solid var(--line); background: linear-gradient(180deg, #fff, #f9fbff); }
        .stat-icon { width: 38px; height: 38px; border-radius: 12px; display: grid; place-items: center; background: var(--blue-soft); color: var(--blue); }
        .stat-title { font-weight: 700; }
        .stat-body { margin-top: 3px; font-size: 0.92rem; color: var(--muted); line-height: 1.52; }
        .section-head { display: flex; justify-content: space-between; align-items: end; gap: 16px; }
        .section-head h2 { margin: 8px 0 0; font-size: clamp(1.35rem, 2vw, 1.95rem); line-height: 1.08; letter-spacing: -0.03em; }
        .section-head p { margin: 8px 0 0; color: var(--muted); line-height: 1.62; max-width: 65ch; }
        .comparison-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        .comparison-card { padding: 18px; border-radius: 22px; border: 1px solid var(--line); background: linear-gradient(180deg, #fff, #fafcff); min-height: 198px; }
        .comparison-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .badge { display: inline-flex; align-items: center; gap: 8px; padding: 7px 11px; border-radius: 999px; font-size: 0.78rem; font-weight: 700; }
        .badge-slate { background: var(--slate-soft); color: #667487; }
        .badge-blue { background: var(--blue-soft); color: var(--blue); }
        .badge-green { background: var(--green-soft); color: var(--green); }
        .feature-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        .entry-card { text-align: left; padding: 18px; border-radius: 22px; border: 1px solid var(--line); background: linear-gradient(180deg, #fff, #fafcff); cursor: pointer; transition: 160ms ease; min-height: 230px; }
        .entry-card:hover { transform: translateY(-2px); box-shadow: 0 16px 28px rgba(18, 32, 51, 0.08); border-color: #cfd9ee; }
        .entry-card-active { border-color: #bcd0f7; box-shadow: 0 12px 26px rgba(35,85,216,0.08); }
        .entry-card-top, .entry-card-meta, .entry-format-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .entry-card-top { justify-content: space-between; align-items: start; }
        .entry-readtime { display: inline-flex; align-items: center; gap: 6px; color: var(--muted-2); font-size: 0.82rem; }
        .entry-card-title { margin-top: 14px; font-size: 1.03rem; font-weight: 700; letter-spacing: -0.02em; }
        .entry-card-body { margin-top: 8px; color: var(--muted); line-height: 1.56; font-size: 0.95rem; min-height: 72px; }
        .entry-card-meta { margin-top: 14px; color: var(--muted-2); font-size: 0.84rem; }
        .visual-grid { display: grid; grid-template-columns: minmax(0, 0.95fr) minmax(360px, 1.05fr); gap: 18px; }
        .flow-card, .detail-card, .guide-card, .submit-card { padding: 24px; }
        .flow-steps { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin-top: 16px; }
        .flow-step { padding: 15px; border-radius: 18px; border: 1px solid var(--line); background: var(--surface-soft); }
        .flow-index { width: 32px; height: 32px; border-radius: 11px; display: grid; place-items: center; background: var(--navy); color: #fff; font-size: 0.84rem; font-weight: 700; }
        .flow-title { margin-top: 12px; font-weight: 700; }
        .flow-body { margin-top: 5px; color: var(--muted); line-height: 1.5; font-size: 0.92rem; }
        .anatomy-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 16px; }
        .anatomy-item { padding: 14px; border-radius: 18px; border: 1px solid var(--line); background: #fbfcff; }
        .anatomy-item h3 { margin: 0; font-size: 0.95rem; }
        .anatomy-item p { margin: 6px 0 0; font-size: 0.91rem; color: var(--muted); line-height: 1.5; }
        .library-shell { display: grid; grid-template-columns: minmax(320px, 0.86fr) minmax(0, 1.14fr); gap: 18px; }
        .library-side { padding: 20px; }
        .library-top { display: flex; justify-content: space-between; gap: 12px; align-items: center; }
        .results-count { color: var(--muted); font-size: 0.92rem; }
        .filter-stack { display: grid; gap: 10px; margin-top: 16px; }
        .filter-row { display: grid; grid-template-columns: minmax(0, 1.35fr) repeat(3, minmax(0, 1fr)); gap: 10px; }
        .search-input { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-radius: 14px; border: 1px solid var(--line); background: #fff; color: var(--muted); }
        .search-input input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--text); }
        .select { width: 100%; padding: 12px 14px; border-radius: 14px; border: 1px solid var(--line); background: #fff; color: var(--text); outline: 0; }
        .entry-list { display: grid; gap: 12px; margin-top: 16px; }
        .detail-card { min-height: 100%; }
        .detail-top { display: flex; justify-content: space-between; align-items: start; gap: 16px; flex-wrap: wrap; }
        .detail-title { margin-top: 12px; font-size: clamp(1.45rem, 2vw, 2rem); line-height: 1.04; letter-spacing: -0.04em; }
        .detail-copy { margin-top: 10px; color: var(--muted); line-height: 1.66; max-width: 66ch; }
        .detail-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .detail-meta { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px; }
        .meta-pill { display: inline-flex; align-items: center; gap: 8px; padding: 9px 12px; border-radius: 999px; border: 1px solid var(--line); background: #fff; color: var(--muted); font-size: 0.87rem; }
        .detail-grid { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 16px; margin-top: 20px; }
        .block { padding: 16px; border-radius: 18px; border: 1px solid var(--line); background: #fff; }
        .block-subtle { background: #fbfcff; }
        .block-title { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.11em; text-transform: uppercase; color: var(--muted-2); }
        .block-body { margin-top: 10px; }
        .plain-list { margin: 0; padding-left: 18px; display: grid; gap: 8px; color: var(--text); }
        .bullet-list { margin: 0; padding-left: 18px; display: grid; gap: 10px; color: var(--text); }
        .bullet-list.compact { gap: 8px; }
        .text-muted { color: var(--muted); line-height: 1.6; }
        .asset-preview { background: #0f1827; color: #edf4ff; border-radius: 18px; padding: 18px; font-size: 0.9rem; line-height: 1.55; white-space: pre-wrap; overflow-x: auto; }
        .examples-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 16px; }
        .code-box { background: #f7f9fd; border: 1px solid var(--line); border-radius: 18px; padding: 16px; }
        .code-label { font-size: 0.77rem; font-weight: 700; letter-spacing: 0.11em; text-transform: uppercase; color: var(--muted-2); margin-bottom: 10px; }
        .code-box pre { margin: 0; white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.87rem; line-height: 1.56; color: #1f2c42; }
        .submit-layout { display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr); gap: 18px; }
        .form-grid { display: grid; gap: 12px; }
        .form-row-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .field label { display: block; margin-bottom: 8px; font-weight: 700; font-size: 0.92rem; }
        .mock-input { min-height: 50px; padding: 14px 15px; border-radius: 14px; border: 1px dashed #cad5e7; color: var(--muted); background: #fbfcff; line-height: 1.5; }
        .field-large .mock-input { min-height: 108px; }
        .submit-actions { margin-top: 18px; display: flex; gap: 12px; flex-wrap: wrap; }
        .tip-grid { display: grid; gap: 12px; margin-top: 16px; }
        .tip-box { padding: 16px; border-radius: 18px; border: 1px solid var(--line); background: #fbfcff; }
        .tip-box h3 { margin: 0 0 8px; font-size: 1rem; }
        .guide-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        .guide-card h2 { margin: 12px 0 0; font-size: 1.3rem; line-height: 1.1; letter-spacing: -0.03em; }
        .compact-list { margin: 14px 0 0; padding-left: 18px; display: grid; gap: 10px; color: var(--muted); line-height: 1.58; }
        .mini-table { margin-top: 14px; display: grid; gap: 10px; }
        .mini-row { display: grid; grid-template-columns: 160px 1fr; gap: 12px; padding: 12px 0; border-top: 1px solid var(--line); }
        .mini-row:first-child { border-top: 0; padding-top: 0; }
        .mini-key { color: var(--muted-2); font-size: 0.9rem; font-weight: 700; }
        .mini-value { color: var(--muted); line-height: 1.56; }
        @media (max-width: 1200px) {
          .hero, .visual-grid, .library-shell, .submit-layout, .detail-grid { grid-template-columns: 1fr; }
          .comparison-grid, .feature-grid, .guide-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .filter-row { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 860px) {
          .portal-shell { padding: 12px; }
          .page { padding: 18px; }
          .topbar { padding: 14px; }
          .topbar, .topbar-actions { align-items: stretch; flex-direction: column; }
          .top-search { min-width: 0; width: 100%; }
          .comparison-grid, .feature-grid, .guide-grid, .flow-steps, .anatomy-grid, .examples-grid, .form-row-2, .filter-row { grid-template-columns: 1fr; }
          .mini-row { grid-template-columns: 1fr; }
          .detail-actions { width: 100%; }
          .entry-card, .comparison-card { min-height: unset; }
          h1 { max-width: 12ch; }
        }
      `}</style>

      <div className="portal-frame">
        <header className="topbar">
          <div className="brand">
            <div className="brand-badge"><Icon name="spark" size={18} /></div>
            <div>
              <div className="brand-title">Internal AI Workflow Portal</div>
              <div className="brand-subtitle">Find reusable prompts, skill packs, and workflow patterns</div>
            </div>
          </div>

          <div className="topbar-actions">
            <div className="top-search">
              <Icon name="search" size={16} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search workflows, skills, roles, or use cases" />
            </div>
            <nav className="nav-pills">
              {navItems.map((item) => (
                <button key={item.id} className={`nav-pill ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
                  <Icon name={item.icon} size={15} /> {item.label}
                </button>
              ))}
            </nav>
          </div>
        </header>

        <main className="page">
          {activeTab === 'discover' && (
            <div className="stack">
              <section className="hero">
                <div className="card hero-main">
                  <div className="eyebrow"><Icon name="spark" size={14} /> Reusable AI workflows</div>
                  <h1>Start from a stronger pattern</h1>
                  <p className="hero-copy">
                    Find prompts and skill packs that already include the context, structure, and examples needed to produce more reliable output. Browse by role, workflow type, or reusable format, then adapt the asset to your own case.
                  </p>
                  <div className="hero-actions">
                    <button className="primary-btn" onClick={() => setActiveTab('library')}><Icon name="search" size={16} /> Browse library</button>
                    <button className="secondary-btn" onClick={() => setActiveTab('submit')}><Icon name="plus" size={16} /> Share a workflow</button>
                  </div>
                </div>

                <aside className="card hero-side">
                  <StatCard icon="clock" title="Readable fast" body="Each entry is designed to be understood in about two minutes." />
                  <StatCard icon="target" title="Context included" body="Required inputs are part of the asset, not something the user must guess." />
                  <StatCard icon="book" title="Real asset preview" body="See the actual Super Prompt or skill file before you copy it." />
                </aside>
              </section>

              <section className="card flow-card">
                <div className="section-head">
                  <div>
                    <div className="eyebrow"><Icon name="grid" size={14} /> Understand the difference</div>
                    <h2>Not every AI asset is the same</h2>
                    <p>Most users can spot a good answer, but not everyone can spot a reusable pattern. These examples show how a one-off chat differs from a reusable Super Prompt or a skills-style asset.</p>
                  </div>
                </div>
                <div className="comparison-grid" style={{ marginTop: 16 }}>
                  {comparison.map((item) => (
                    <ComparisonCard key={item.label} item={item} />
                  ))}
                </div>
              </section>

              <section className="card flow-card">
                <div className="section-head">
                  <div>
                    <div className="eyebrow"><Icon name="spark" size={14} /> Featured examples</div>
                    <h2>Examples with more operating depth</h2>
                    <p>These examples are intentionally more structured than a normal chat request. They show the kind of reusable asset this library is built to capture.</p>
                  </div>
                </div>
                <div className="feature-grid" style={{ marginTop: 16 }}>
                  {featured.map((entry) => (
                    <EntryCard key={entry.id} entry={entry} active={selectedId === entry.id} onClick={(id) => { setSelectedId(id); setActiveTab('library'); }} />
                  ))}
                </div>
              </section>

              <section className="visual-grid">
                <div className="card flow-card">
                  <div className="section-head">
                    <div>
                      <div className="eyebrow"><Icon name="route" size={14} /> How to use this</div>
                      <h2>Find, read, adapt, run</h2>
                      <p>The fastest path is simple. Find a pattern that fits your job, read the example first, check the required context, then adapt it to your real situation.</p>
                    </div>
                  </div>
                  <div className="flow-steps">
                    {[
                      ['1', 'Find', 'Search by role, type, or reusable format.'],
                      ['2', 'Read', 'Check example input and output before copying anything.'],
                      ['3', 'Adapt', 'Add the missing context from your own case.'],
                      ['4', 'Run', 'Use the asset, then review the output critically.'],
                    ].map(([index, title, body]) => (
                      <div className="flow-step" key={index}>
                        <div className="flow-index">{index}</div>
                        <div className="flow-title">{title}</div>
                        <div className="flow-body">{body}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card flow-card">
                  <div className="section-head">
                    <div>
                      <div className="eyebrow"><Icon name="layers" size={14} /> What every entry includes</div>
                      <h2>Enough detail for someone else to reuse it</h2>
                    </div>
                  </div>
                  <div className="anatomy-grid">
                    {anatomy.map((item) => (
                      <div className="anatomy-item" key={item.title}>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'library' && (
            <section className="library-shell">
              <aside className="card library-side">
                <div className="library-top">
                  <div>
                    <div className="eyebrow"><Icon name="search" size={14} /> Library</div>
                    <div style={{ marginTop: 10, fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Browse reusable assets</div>
                  </div>
                  <div className="results-count">{filteredEntries.length} result{filteredEntries.length === 1 ? '' : 's'}</div>
                </div>

                <div className="filter-stack">
                  <div className="filter-row">
                    <div className="search-input">
                      <Icon name="search" size={16} />
                      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search titles or use cases" />
                    </div>
                    <Select value={role} onChange={setRole} options={roleOptions} />
                    <Select value={type} onChange={setType} options={typeOptions} />
                    <Select value={format} onChange={setFormat} options={formatOptions} />
                  </div>
                  <div className="filter-row">
                    <Select value={reuse} onChange={setReuse} options={reuseOptions} />
                  </div>
                </div>

                <div className="entry-list">
                  {filteredEntries.map((entry) => (
                    <EntryCard key={entry.id} entry={entry} active={entry.id === selectedEntry.id} onClick={setSelectedId} />
                  ))}
                </div>
              </aside>

              <div className="card detail-card">
                <div className="detail-top">
                  <div>
                    <div className="eyebrow"><Icon name={selectedEntry.format === 'Skill Pack' ? 'book' : 'spark'} size={14} /> {selectedEntry.format}</div>
                    <div className="detail-title">{selectedEntry.title}</div>
                    <p className="detail-copy">{selectedEntry.useCase}</p>
                    <div className="detail-meta">
                      <span className="meta-pill"><Icon name="users" size={14} /> {selectedEntry.role}</span>
                      <span className="meta-pill"><Icon name="layers" size={14} /> {selectedEntry.type}</span>
                      <span className="meta-pill"><Icon name="clock" size={14} /> {selectedEntry.readTime}</span>
                      <span className="meta-pill"><Icon name="eye" size={14} /> {selectedEntry.views} views</span>
                    </div>
                  </div>
                  <div className="detail-actions">
                    <button className="primary-btn" onClick={handleCopy}><Icon name="copy" size={16} /> {copied ? 'Copied' : 'Copy asset'}</button>
                    <button className="secondary-btn" onClick={() => setActiveTab('submit')}><Icon name="plus" size={16} /> Create similar</button>
                  </div>
                </div>

                <div className="detail-grid">
                  <div className="stack">
                    <Block title="Best for" subtle>
                      <div className="text-muted">{selectedEntry.bestFor}</div>
                    </Block>

                    <Block title="Required context">
                      <ul className="plain-list">
                        {selectedEntry.requiredContext.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </Block>

                    <Block title="Expected output">
                      <ul className="plain-list">
                        {selectedEntry.outputContract.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </Block>

                    <Block title="Why this is more than normal chat" subtle>
                      <div className="text-muted">{selectedEntry.whatMakesItDifferent}</div>
                    </Block>
                  </div>

                  <div className="stack">
                    <Block title="Asset preview">
                      <div className="asset-preview">{selectedEntry.assetPreview}</div>
                    </Block>

                    <div className="examples-grid">
                      <Block title="Example input" subtle>
                        <div className="code-box">
                          <pre>{selectedEntry.exampleInput}</pre>
                        </div>
                      </Block>
                      <Block title="Example output" subtle>
                        <div className="code-box">
                          <pre>{selectedEntry.exampleOutput}</pre>
                        </div>
                      </Block>
                    </div>

                    <div className="examples-grid">
                      <Block title="Usage notes">
                        <div className="text-muted">{selectedEntry.usageNotes}</div>
                      </Block>
                      <Block title="Limitations">
                        <div className="text-muted">{selectedEntry.limitations}</div>
                      </Block>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'submit' && (
            <section className="submit-layout">
              <div className="card submit-card">
                <div className="section-head">
                  <div>
                    <div className="eyebrow"><Icon name="send" size={14} /> Submit</div>
                    <h2>Share something another person can actually reuse</h2>
                    <p>A strong entry does more than paste a prompt. It explains the job, shows the input pattern, and is honest about where the workflow breaks.</p>
                  </div>
                  <Badge tone="blue"><Icon name="clock" size={13} /> 5 to 10 min</Badge>
                </div>

                <div className="form-grid" style={{ marginTop: 18 }}>
                  <div className="form-row-2">
                    <Field label="Title" placeholder="Give the asset a short searchable name." />
                    <Field label="Format" placeholder="Choose Super Prompt or Skill Pack." />
                  </div>
                  <Field label="Use case" placeholder="Describe the job this asset helps someone do." large />
                  <Field label="Prompt or skill file" placeholder="Paste the actual prompt, skill file, or workflow steps." large />
                  <div className="form-row-2">
                    <Field label="Required context" placeholder="List the inputs the asset needs before it can work well." large />
                    <Field label="Example input and output" placeholder="Show a small real example so the next user understands the pattern quickly." large />
                  </div>
                  <div className="form-row-2">
                    <Field label="What works well" placeholder="When does this asset produce strong output?" large />
                    <Field label="Limitations" placeholder="Where does it become unreliable or need correction?" large />
                  </div>
                  <div className="form-row-2">
                    <Field label="Who should use it" placeholder="Role, team, or workflow type." />
                    <Field label="Reusability level" placeholder="Personal, team, or cross-company." />
                  </div>
                </div>

                <div className="submit-actions">
                  <button className="primary-btn"><Icon name="send" size={16} /> Submit for review</button>
                  <button className="secondary-btn"><Icon name="file" size={16} /> Save draft</button>
                </div>
              </div>

              <aside className="card submit-card">
                <div className="eyebrow"><Icon name="check" size={14} /> Before you submit</div>
                <h2 style={{ margin: '12px 0 0', fontSize: '1.35rem', lineHeight: 1.08, letterSpacing: '-0.03em' }}>What makes a strong asset</h2>
                <div className="tip-grid">
                  <div className="tip-box">
                    <h3>Show the real asset</h3>
                    <div className="text-muted">Do not only describe it. Include the Super Prompt or the skills-style file itself.</div>
                  </div>
                  <div className="tip-box">
                    <h3>Show one real example</h3>
                    <div className="text-muted">The next user should understand the pattern by reading one example input and output.</div>
                  </div>
                  <div className="tip-box">
                    <h3>Be explicit about limits</h3>
                    <div className="text-muted">The library becomes more useful when it also shows where a workflow should not be trusted.</div>
                  </div>
                </div>
              </aside>
            </section>
          )}

          {activeTab === 'guide' && (
            <div className="stack">
              <section className="guide-grid">
                <div className="card guide-card" style={{ padding: 22 }}>
                  <div className="eyebrow"><Icon name="book" size={14} /> Read this first</div>
                  <h2>Start with the example</h2>
                  <ul className="compact-list">
                    <li>Read the example input and output before you copy anything.</li>
                    <li>Then check required context and limitations.</li>
                    <li>Only then adapt the asset to your real case.</li>
                  </ul>
                </div>

                <div className="card guide-card" style={{ padding: 22 }}>
                  <div className="eyebrow"><Icon name="layers" size={14} /> Reuse level</div>
                  <h2>Choose the smallest honest scope</h2>
                  <div className="mini-table">
                    <div className="mini-row">
                      <div className="mini-key">Personal</div>
                      <div className="mini-value">Helpful but not yet ready for broad reuse.</div>
                    </div>
                    <div className="mini-row">
                      <div className="mini-key">Team</div>
                      <div className="mini-value">Reusable within one team with light adaptation.</div>
                    </div>
                    <div className="mini-row">
                      <div className="mini-key">Cross-company</div>
                      <div className="mini-value">Stable enough to be reused more broadly.</div>
                    </div>
                  </div>
                </div>

                <div className="card guide-card" style={{ padding: 22 }}>
                  <div className="eyebrow"><Icon name="shield" size={14} /> Good practice</div>
                  <h2>This is a starting point, not autopilot</h2>
                  <ul className="compact-list">
                    <li>Do not assume the asset is enough without context.</li>
                    <li>Do not skip the limitations section.</li>
                    <li>Do review factual accuracy before using output downstream.</li>
                  </ul>
                </div>
              </section>

              <section className="card guide-card">
                <div className="section-head">
                  <div>
                    <div className="eyebrow"><Icon name="warning" size={14} /> Common mistake</div>
                    <h2>Why ordinary chat often feels weaker</h2>
                    <p>Many weak results come from missing context, vague task framing, or no output standard. The point of this library is to reduce that guesswork by storing stronger reusable patterns.</p>
                  </div>
                </div>
                <div className="comparison-grid" style={{ marginTop: 16 }}>
                  {comparison.map((item) => (
                    <ComparisonCard key={item.label} item={item} />
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
