import { usePageTitle } from '../hooks/usePageTitle'
import deployShot from '../assets/coeconnect-deploy.png'
import {
  CaseHeader, CaseBody, SectionTitle, Lead, ProblemColumns, CardGrid,
  DecisionGrid, LessonGrid, BulletList, MoreCaseStudies, CaseFooter,
} from '../components/CaseStudy'

// Case study for COEConnect. The system and its source are private to UIC.
// The deploy screenshot is real, with the app's name, URL and repo replaced;
// keep any new screenshots free of hostnames, repo names, other people and secrets.

const FACTS = [
  { label: 'Role', value: 'Made solo' },
  { label: 'Scope', value: '~10 production apps on 5 VMs, across Laravel, Node and Spring' },
  { label: 'Stack', value: 'TypeScript, React 19, Node/Express, SQLite, systemd' },
  { label: 'Status', value: 'In production, still growing' },
]

const PILLARS = [
  {
    title: 'Portal and app registry',
    body: 'One sign-in for staff and a launcher showing the apps each person can open. Registering an app is what puts it in the launcher and the fleet view, so the inventory can no longer drift from reality.',
  },
  {
    title: 'Shared SDK packages',
    body: 'Small npm packages that give any app university single sign-on, a synced people directory and transactional mail in one call, replacing 150+ lines each app used to copy from the last project.',
  },
  {
    title: 'VM agents and monitoring',
    body: 'A small systemd service on each VM reports disk, memory, services, certificates and per-app CPU, memory and restarts. Maintainers get charts, alarms and a read-only database viewer.',
  },
  {
    title: 'Deploy engine and CLI',
    body: 'Configurable pipelines run on any VM, with a live console, build history, one-click rollback and a terminal client that streams the same deploy.',
  },
]



const DECISIONS = [
  {
    title: 'The server never connects to a VM',
    body: 'Production VMs expose almost nothing inbound. Every agent makes outbound HTTPS calls instead: a heartbeat, and a long-poll that waits for work. A job reaches the agent the moment it is queued, without opening a single inbound port.',
  },
  {
    title: 'Agents receive data, never commands',
    body: 'A deploy travels as a list of typed steps. The agent compiles each step into a fixed argument list with its own copy of the engine, validates every name and branch, and refuses job kinds it does not know. A compromised portal still cannot turn a root process into a shell.',
  },
  {
    title: '"It restarted" is not "it works"',
    body: 'pm2 reports a process as online the moment it starts, even if it crashes a second later. Each deploy checks that the process stayed up, then asks the app itself over HTTP. A deploy only succeeds when the app answers.',
  },
  {
    title: 'Rollback is just another deploy',
    body: 'Before the first step runs, the engine records the current commit. Undoing a bad deploy means deploying that commit again, so there are no snapshots to store and every rollback shows up in the build history like any other run.',
  },
  {
    title: 'One engine, wherever it runs',
    body: 'Deploys on the portal’s own VM and on remote VMs run the same package, differing only in how they get privileges. Two code paths that are supposed to behave the same eventually drift, so there is only one.',
  },
  {
    title: 'Secrets are write-only',
    body: 'Environment values are encrypted at rest with AES-256-GCM. The API never returns a stored secret, the deploy writes .env through stdin rather than a command line, and stored values are masked out of every build log.',
  },
]

const LESSONS = [
  {
    title: 'A cancel that did not cancel',
    body: 'Signalling the build process killed only its shell wrapper; the real work kept running. Commands now run in their own process group, and a cancel stops the whole tree.',
  },
  {
    title: 'Logs cut off at the interesting part',
    body: 'When a job’s result arrived before its last batch of output, the console stopped right where the error was. The agent now drains its output before it reports a result.',
  },
  {
    title: 'An observer that made outages worse',
    body: 'A fixed timer kept stacking heavy collections on a VM while the portal was down. The agent now schedules its next run only after the last one finishes, and backs off exponentially during outages.',
  },
  {
    title: 'Upgrading the agent restarted every app',
    body: 'The process manager ran inside the agent’s systemd group, so restarting the agent took every app on the VM down with it. One systemd setting fixed it, and checking that setting is now part of every upgrade.',
  },
]

const NEXT = [
  'Automated tests and CI. Today the gate is lint and type-checking.',
  'Split the API’s route layer, which still lives in one large file.',
  'Move deploy queues and job state out of process memory so the API can run more than one instance.',
]


const PROBLEMS = [
  { lead: 'Login was rebuilt per app.', body: 'Each one hand-wired university single sign-on plus a fake identity provider for local development, with its own test users and attribute mapping.' },
  { lead: 'Mail was rebuilt per app.', body: 'Each app had its own mailer and mail log, and one kept its queue in memory, so a restart silently dropped reminders.' },
  { lead: 'Operations knowledge was tribal.', body: 'Apps ran under root’s process manager, so a maintainer on their own account saw nothing running. The app inventory lived in markdown tables that went stale.' },
]

function ArchitectureDiagram() {
  const box = 'fill-[#0b1257] stroke-[#6D7DD9]'
  return (
    <div className="overflow-x-auto -mx-6 px-6">
      <svg viewBox="0 0 760 420" className="min-w-[640px] w-full h-auto" role="img" aria-labelledby="arch-title arch-desc">
        <title id="arch-title">COEConnect architecture</title>
        <desc id="arch-desc">Staff use the portal, maintainers use the CLI, and department apps use the SDK, all talking to the COEConnect API. VM agents on each server poll the API over outbound HTTPS; the API never connects to a VM.</desc>
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="#AEB7EA" />
          </marker>
          <marker id="arr-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="#ed8f41" />
          </marker>
        </defs>

        {/* clients */}
        <g fontFamily="Mada, sans-serif" fill="#AEB7EA">
          <rect x="20" y="20" width="200" height="64" rx="12" className={box} />
          <text x="120" y="47" textAnchor="middle" fontSize="15" fontWeight="600">Staff portal</text>
          <text x="120" y="67" textAnchor="middle" fontSize="12" fill="#6D7DD9">React SPA · single sign-on</text>

          <rect x="280" y="20" width="200" height="64" rx="12" className={box} />
          <text x="380" y="47" textAnchor="middle" fontSize="15" fontWeight="600">coe CLI</text>
          <text x="380" y="67" textAnchor="middle" fontSize="12" fill="#6D7DD9">device-flow login · live deploys</text>

          <rect x="540" y="20" width="200" height="64" rx="12" className={box} />
          <text x="640" y="47" textAnchor="middle" fontSize="15" fontWeight="600">Department apps</text>
          <text x="640" y="67" textAnchor="middle" fontSize="12" fill="#6D7DD9">shared SDK · per-app tokens</text>
        </g>

        <line x1="120" y1="84" x2="300" y2="150" stroke="#AEB7EA" strokeWidth="1.5" markerEnd="url(#arr)" />
        <line x1="380" y1="84" x2="380" y2="150" stroke="#AEB7EA" strokeWidth="1.5" markerEnd="url(#arr)" />
        <line x1="640" y1="84" x2="460" y2="150" stroke="#AEB7EA" strokeWidth="1.5" markerEnd="url(#arr)" />

        {/* api */}
        <g fontFamily="Mada, sans-serif">
          <rect x="230" y="152" width="300" height="78" rx="14" fill="#AEB7EA" />
          <text x="380" y="182" textAnchor="middle" fontSize="17" fontWeight="700" fill="#060B44">COEConnect API</text>
          <text x="380" y="204" textAnchor="middle" fontSize="12.5" fill="#060B44">registry · deploy queue · metrics · alarms · mail</text>

          <rect x="580" y="166" width="160" height="50" rx="12" className={box} />
          <text x="660" y="196" textAnchor="middle" fontSize="13" fill="#AEB7EA">Mail relay</text>
        </g>
        <line x1="530" y1="191" x2="576" y2="191" stroke="#AEB7EA" strokeWidth="1.5" markerEnd="url(#arr)" />

        {/* agents: arrows point from the VM to the API */}
        <g fontFamily="Mada, sans-serif">
          {[0, 1, 2].map((i) => {
            const x = 70 + i * 220
            return (
              <g key={i}>
                <rect x={x} y="320" width="180" height="70" rx="12" className={box} />
                <text x={x + 90} y="349" textAnchor="middle" fontSize="15" fontWeight="600" fill="#AEB7EA">VM agent</text>
                <text x={x + 90} y="369" textAnchor="middle" fontSize="12" fill="#6D7DD9">systemd · runs typed jobs</text>
                <line x1={x + 90} y1="318" x2={300 + i * 80} y2="236" stroke="#ed8f41" strokeWidth="1.8" markerEnd="url(#arr-accent)" />
              </g>
            )
          })}
          <rect x="248" y="262" width="264" height="26" rx="13" fill="#060B44" stroke="#ed8f41" />
          <text x="380" y="280" textAnchor="middle" fontSize="12.5" fill="#ed8f41">outbound long-poll over 443 · API never dials in</text>
        </g>
      </svg>
    </div>
  )
}

function DeployScreenshot() {
  return (
    <figure className="flex flex-col gap-3">
      <a href={deployShot} target="_blank" rel="noopener noreferrer" className="block rounded-2xl overflow-hidden shadow-2xl ring-1 ring-primary/20 bg-white">
        <img
          src={deployShot}
          alt="The COEConnect deploy tab: branch and commit pickers with a Redeploy button, a pipeline of Git pull, Secret scan, Write .env, npm install and npm build steps, and a build history with succeeded and failed runs, each with log, rollback and rerun buttons."
          width="1600"
          height="908"
          loading="lazy"
          className="w-full h-auto block"
        />
      </a>
      <figcaption className="text-secondary text-sm">
        The deploy tab in production. The app’s name, URL and repository are swapped for placeholders; everything else is the real interface. Each build can be opened, rolled back to, or rerun from its exact commit.
      </figcaption>
    </figure>
  )
}

const PIPELINE_JSON = `[
  { "type": "preflight", "minFreeMb": 1024 },
  { "type": "backup",    "db": true, "keepDays": 14 },
  { "type": "pull" },
  { "type": "scan" },
  { "type": "npm",       "script": "ci" },
  { "type": "env" },
  { "type": "migrate" },
  { "type": "npm",       "script": "build" },
  { "type": "pm2",       "process": "lab-inventory", "action": "reload" },
  { "type": "health",    "path": "/healthz", "status": 200, "retries": 5 }
]`


export default function CoeConnect() {
  usePageTitle('COEConnect case study — Dominic Irla')

  return (
    <article className="relative text-primary">
      <CaseHeader
        eyebrow="Case study · UIC College of Engineering"
        title="COEConnect"
        intro="One portal, SDK and deploy system for the College of Engineering’s web apps. It replaced login, mail and server tooling that every app had been rebuilding on its own, and it deploys apps across the department’s servers without ever giving the portal a shell."
        facts={FACTS}
      />

      <CaseBody>
        <section>
          <SectionTitle eyebrow="The problem">Ten apps, ten copies of the same plumbing</SectionTitle>
          <ProblemColumns items={PROBLEMS} />
        </section>

        <section>
          <SectionTitle eyebrow="What I built">Four parts, one backend</SectionTitle>
          <CardGrid items={PILLARS} />
        </section>

        <section>
          <SectionTitle eyebrow="Architecture">Every arrow points away from the servers</SectionTitle>
          <Lead>
            The department’s production VMs accept almost no inbound traffic, and SSH isn’t reachable from the portal at all. So the portal never connects to a VM. An agent on each VM calls out over HTTPS and holds a long-poll open; when someone presses Deploy, the waiting request is answered with the job.
          </Lead>
          <ArchitectureDiagram />
        </section>

        <section>
          <SectionTitle eyebrow="Deep dive">The deploy engine</SectionTitle>
          <Lead>
            A pipeline is a list of typed steps, stored as data. The order matters: cheap read-only checks first, the irreversible restart last. Pre-flight catches a renamed npm script, a missing process or a full disk in about a second and a half, before anything is touched, instead of four minutes in with the app already stopped.
          </Lead>
          <DeployScreenshot />
          <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 mt-12 items-start">
            <div className="flex flex-col gap-4 leading-relaxed">
              <h3 className="text-xl font-semibold">This array is the whole contract</h3>
              <p>There is no field anywhere in a step that holds a shell string. The agent turns each step into a fixed argument list, checks every branch, process and directory name against strict patterns, and refuses anything it doesn’t recognize.</p>
              <p>Deploys stream line by line to everyone watching, from the browser or the CLI. One deploy runs per app at a time; a second one queues and starts automatically. Anyone who manages the app can cancel it, because the person who notices an app is down mid-deploy is often not the one who started it.</p>
            </div>
            <pre className="rounded-2xl bg-[#03072b] border border-primary/15 p-5 text-[12.5px] leading-relaxed overflow-x-auto font-mono text-primary/90"><code>{PIPELINE_JSON}</code></pre>
          </div>
        </section>

        <section>
          <SectionTitle eyebrow="Design decisions">What I’d defend in a design review</SectionTitle>
          <DecisionGrid items={DECISIONS} />
        </section>

        <section>
          <SectionTitle eyebrow="What broke">Bugs that taught me something</SectionTitle>
          <LessonGrid items={LESSONS} />
        </section>

        <section>
          <SectionTitle eyebrow="Next">What I’d improve</SectionTitle>
          <BulletList items={NEXT} />
        </section>

        <MoreCaseStudies current="coeconnect" />

        <CaseFooter note="Built for UIC’s College of Engineering. The source and the live system are private; identifying names in the screenshot are replaced." />
      </CaseBody>
    </article>
  )
}
