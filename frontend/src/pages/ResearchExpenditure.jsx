import { usePageTitle } from '../hooks/usePageTitle'
import fyDataShot from '../assets/rexp-fydata.png'
import rougeShot from '../assets/rexp-rouge.png'
import viewsShot from '../assets/rexp-views.png'
import {
  CaseHeader, CaseBody, SectionTitle, Lead, Shot, ProblemColumns, CardGrid,
  DecisionGrid, FlowSteps, Stats, MoreCaseStudies, CaseFooter,
} from '../components/CaseStudy'

// Case study for Research Expenditure, an internal UIC app. Every screenshot is
// a frame from the app's own help videos, which were recorded against its demo
// seed: all names, grants and amounts are fictional. Never add frames recorded
// against real data, and keep real faculty names out of this page.

const FACTS = [
  { label: 'Role', value: 'Built solo, about six months of active development' },
  { label: 'Users', value: 'The college’s grants lead, department managers and about 100 staff reviewers' },
  { label: 'Stack', value: 'React, TypeScript, Bootstrap, Chart.js, Node/Express, MySQL with Drizzle' },
  { label: 'Status', value: 'In production, signed in and deployed through COEConnect' },
]

const STATS = [
  { value: '~3,000', label: 'expenditure records' },
  { value: '~100', label: 'staff who can review their own numbers' },
  { value: '3 weeks', label: 'of manual spreadsheet work saved' },
  { value: '3', label: 'roles: staff, department manager, grants lead' },
]

const PROBLEMS = [
  { lead: 'One person, one big spreadsheet.', body: 'A single staff member turned the university’s raw finance export into the college’s research expenditure report by hand in Excel: who spent what, on which grant, and how credit is split between investigators.' },
  { lead: 'Corrections came in by email.', body: 'Faculty and staff checked their own numbers from emailed spreadsheets and replied with fixes, which then had to be found, judged and typed back in.' },
  { lead: 'History lived in old files.', body: 'Past years sat in finished reports with inconsistent spelling and free-text credit splits, so comparing quarters meant opening several workbooks.' },
]

const FEATURES = [
  {
    title: 'Quarterly upload, with undo',
    body: 'The raw finance export goes in as CSV or Excel. Names that don’t match an investigator are listed so the uploader can map them by hand, and any upload can be undone.',
  },
  {
    title: 'FY Data browser',
    body: 'Spending by year and quarter, grouped by department, with condensed or full columns, a “My records” filter, per-department charts and Excel export.',
  },
  {
    title: 'Change requests',
    body: 'Anyone who spots a wrong number proposes the fix right on the record, with a reason. It goes to their department manager, then to the grants lead. Nothing changes until it is approved.',
  },
  {
    title: 'Credit splits',
    body: 'Each fund’s credit is split by percentage across investigators, including people outside the college. A split must add up to exactly 100% before it saves.',
  },
  {
    title: 'Views and charts',
    body: 'Look up any department, grant, fund or investigator across a range of quarters: totals, top grant, top investigator, a spending trend and share-of-spend charts.',
  },
  {
    title: 'Admin tools',
    body: 'In-table editing for the grants lead, single and bulk user creation, department-scoped roles, an importer for past finished reports, and short help videos for each role.',
  },
]

const FLOW = [
  { title: 'Grants lead uploads', body: 'The quarter’s finance export is parsed into records, and every record is credited to its investigators.' },
  { title: 'Everyone is asked to review', body: 'One email per person, sent from the app to everyone with data or credit that quarter, with a confirmation step first.' },
  { title: 'Staff request changes', body: 'A request carries the proposed values or split and a reason. The record itself stays untouched.' },
  { title: 'Manager, then grants lead', body: 'The department manager escalates or rejects. The grants lead can adjust the values, then approve and apply, or reject.' },
]

const DECISIONS = [
  {
    title: 'An undo that won’t lie',
    body: 'Each upload records what every row held before it ran. Undo restores those values, but skips any row that has changed since, through an edit or an approved request, and lists it instead. Silently throwing away later work would be worse than an incomplete undo.',
  },
  {
    title: 'Read messy history instead of retyping it',
    body: 'The importer reads years of finished reports: names typed with periods or spaces instead of commas, accented and plain spellings, two-word surnames, and credit splits written as free text like “Name 45%; Name 20%”. The parsers have Jest tests, because a wrong match credits the wrong person.',
  },
  {
    title: 'Sign-ins attach to existing records',
    body: 'Uploads create investigator records long before those people ever sign in, and those rows have no NetID. On first login the app links by NetID, then UIN, then email, then name, and an ambiguous match links nothing.',
  },
  {
    title: 'Permissions follow what people can see',
    body: 'A credit-split row appears under each investigator’s home department, so access follows the same rule. Roles are read from the database on every request, so a demotion takes effect immediately rather than at the next sign-in.',
  },
  {
    title: 'Deploys that can’t half-migrate',
    body: 'A migration script runs on every deploy before the restart. Each step checks the current schema first, so running it twice is safe, and it fails loudly so the pipeline stops before a half-migrated database goes live.',
  },
  {
    title: 'Built for a shared database',
    body: 'The university’s central MySQL caps each account at 10 connections, so the pool stays at 6 to leave room for migrations and tools. Every query error is now counted in one place, added after a schema mismatch in production went unnoticed for too long.',
  },
]


export default function ResearchExpenditure() {
  usePageTitle('Research Expenditure case study — Dominic Irla')

  return (
    <article className="relative text-primary">
      <CaseHeader
        eyebrow="Case study · UIC College of Engineering"
        title="Research Expenditure"
        intro="A web app that replaced the College of Engineering’s quarterly Excel process for tracking research grant spending. The grants lead uploads the quarter, about 100 staff review their own numbers, and corrections go through department managers before anything changes."
        facts={FACTS}
      />

      <CaseBody>
        <section>
          <Stats items={STATS} />
        </section>

        <section>
          <SectionTitle eyebrow="The problem">A quarterly report built by hand</SectionTitle>
          <ProblemColumns items={PROBLEMS} />
        </section>

        <section>
          <SectionTitle eyebrow="What I built">One place for the numbers and the corrections</SectionTitle>
          <Shot
            src={fyDataShot}
            alt="The FY Data page for 2026 Q2: an Electrical and Computer Engineering table listing investigators, credit splits, grant codes, and Q1, Q2 and total spending."
            width="1320"
            height="720"
            caption="FY Data for one quarter, grouped by department. Each department can switch to charts or export to Excel."
            className="mb-12"
          />
          <CardGrid items={FEATURES} />
        </section>

        <section>
          <SectionTitle eyebrow="How a quarter runs">From upload to approved correction</SectionTitle>
          <FlowSteps steps={FLOW} />
          <Shot
            src={rougeShot}
            alt="The change request form: the record’s current values, a proposed change to Q1 from $88,734 to 95000 with a reason, and a 60/40 credit split between two investigators."
            width="1320"
            height="720"
            caption="Requesting a change: the current record on top, the proposed value and reason below, and the credit split, which must total 100% before it can be submitted."
            className="mt-12"
          />
        </section>

        <section>
          <SectionTitle eyebrow="Views">Answering “where did the money go?”</SectionTitle>
          <Lead>
            Views pulls one department, grant, fund or investigator across any range of quarters, so questions that used to mean opening several workbooks take one search.
          </Lead>
          <Shot
            src={viewsShot}
            alt="A department’s spending history line chart across six quarters, with pie charts of spending share by grant and by investigator."
            width="1320"
            height="720"
            caption="A department across six quarters: the spending trend, and its share of spending by grant and by investigator."
          />
        </section>

        <section>
          <SectionTitle eyebrow="Design decisions">What I’d defend in a design review</SectionTitle>
          <DecisionGrid items={DECISIONS} />
        </section>

        <MoreCaseStudies current="research-expenditure" />

        <CaseFooter note="Built for UIC’s College of Engineering. The source and the live system are private. The screenshots come from the app’s demo database, so every name, grant and amount is made up." />
      </CaseBody>
    </article>
  )
}
