import { usePageTitle } from '../hooks/usePageTitle'
import applicantsShot from '../assets/spark-applicants.png'
import graphsShot from '../assets/spark-graphs.png'
import checkinShot from '../assets/spark-checkin.png'
import monitoringShot from '../assets/spark-monitoring.png'
import lookupShot from '../assets/spark-lookup.png'
import {
  CaseHeader, CaseBody, SectionTitle, Lead, Shot, ProblemColumns, CardGrid,
  DecisionGrid, FlowSteps, Stats, MoreCaseStudies, CaseFooter,
} from '../components/CaseStudy'

// Case study for the SparkHacks applicant dashboard (public repo). The
// screenshots are the real Astro app run locally with Firebase replaced by
// made-up applicants and activity, so no applicant's data appears here.

const FACTS = [
  { label: 'Role', value: 'Web Development Lead. Rebuilt the dashboard for 2026 while the team built the separate landing page' },
  { label: 'Scale', value: '2,000+ applicants, about 400 accepted, a two-day event' },
  { label: 'Stack', value: 'Astro, React, TypeScript, Firebase Auth and Firestore, Chart.js, Vercel' },
  { label: 'Timeline', value: 'Sep 2025 – Feb 2026, with activity logging added for 2027' },
]

const STATS = [
  { value: '2,000+', label: 'applications reviewed in the dashboard' },
  { value: '~400', label: 'accepted hackers checked in by QR' },
  { value: '8', label: 'check-ins and meals tracked across two days' },
  { value: '~75%', label: 'of the 2026 cycle’s commits' },
]

const PROBLEMS = [
  { lead: 'Five applicants per seat.', body: 'Directors had to sort, filter and decide on 2,000+ applications, and keep every decision private until they announced them together.' },
  { lead: 'Two days of lines.', body: 'Staff had to check in hundreds of people each day and hand out six rounds of meals and snacks without serving anyone twice.' },
  { lead: '“The site was broken.”', body: 'After deadlines, emails asked to apply late because the form supposedly failed. Nobody could check whether it had.' },
]

const FEATURES = [
  {
    title: 'Applicant review table',
    body: 'Search, filters by year, gender, diet, shirt size and availability, sortable and resizable columns, an expandable full application, and multi-select status changes with a confirmation step.',
  },
  {
    title: 'Decisions and RSVPs',
    body: 'Applicants move from pending to invited or waitlisted. Invited applicants accept or decline from their dashboard, and waitlisted ones can withdraw.',
  },
  {
    title: 'Applicant dashboard',
    body: 'Each applicant sees their status, a personal QR code, their meal group and the live event schedule, and can edit their application while editing is open.',
  },
  {
    title: 'QR check-in and meals',
    body: 'Staff scan a QR code or search by name or UIN, then tick check-in and each meal. Every button shows a live count for that day.',
  },
  {
    title: 'Stats and export',
    body: 'Charts of status, year, gender and any question, plus a CSV export where staff choose the columns.',
  },
  {
    title: 'Roles',
    body: 'QR scanner, web dev, director and admin, stored as Firebase custom claims, with a page to grant and remove them.',
  },
]

const FLOW = [
  { title: 'Apply', body: 'Sign in with a UIC Google account and fill in the application. Submissions are checked on the server.' },
  { title: 'Review', body: 'Directors filter the table and move people to invited or waitlisted, in bulk if needed.' },
  { title: 'Reveal and RSVP', body: 'Decisions stay hidden until directors flip one switch. Then invited applicants accept or decline.' },
  { title: 'Event days', body: 'Accepted hackers are spread across four meal groups and checked in by QR code at each meal.' },
]

const DECISIONS = [
  {
    title: 'The server decides who can RSVP',
    body: 'An accept or decline only goes through if the stored status is “invited”. Every refused attempt is logged with the reason it was refused.',
  },
  {
    title: 'Decisions stay hidden until they’re released',
    body: 'Directors record decisions as they go, but applicants see “pending” until a single reveal setting is turned on, so everyone hears at the same moment.',
  },
  {
    title: 'Logging can’t break the request it describes',
    body: 'Writing an event never throws. If logging fails, the sign-in or submission still succeeds and the failure goes to the server log instead.',
  },
  {
    title: 'Daily rollups instead of scanning events',
    body: 'Each event also bumps a counter for that day and updates a per-person summary in the same batch. The overview reads 14 small documents instead of scanning thousands of events.',
  },
  {
    title: 'One collection per year',
    body: 'Each cycle’s applications live in their own collection, so past years stay browsable from the same table with a year dropdown.',
  },
  {
    title: 'Analytics without recording applicants',
    body: 'Product analytics run through the app’s own domain, session recording is off on every staff page because they show other people’s applications, and form inputs are always masked.',
  },
]

export default function SparkHacksDashboard() {
  usePageTitle('SparkHacks Dashboard case study — Dominic Irla')

  return (
    <article className="relative text-primary">
      <CaseHeader
        eyebrow="Case study · SparkHacks 2026"
        title="SparkHacks Dashboard"
        intro="The applicant portal and staff dashboard for SparkHacks, UIC’s hackathon. Applicants apply, see their decision and get a QR code. Staff review 2,000+ applications, check people in for meals, and can look up exactly what any applicant did on the site."
        facts={FACTS}
      />

      <CaseBody>
        <section>
          <Stats items={STATS} />
        </section>

        <section>
          <SectionTitle eyebrow="The problem">A hackathon run out of spreadsheets and inboxes</SectionTitle>
          <ProblemColumns items={PROBLEMS} />
        </section>

        <section>
          <SectionTitle eyebrow="What I built">One app for applicants and staff</SectionTitle>
          <Shot
            src={applicantsShot}
            alt="The Applicants table: totals for accepted, invited, waitlisted, declined and pending, and rows of applicants with their status and a View button."
            width="1600"
            height="1311"
            caption="The applicant table. Rows are colored by status, and the totals at the top update as directors make decisions."
            className="mb-12"
          />
          <CardGrid items={FEATURES} />
        </section>

        <section>
          <SectionTitle eyebrow="How a cycle runs">From application to dinner on day two</SectionTitle>
          <FlowSteps steps={FLOW} />
          <div className="grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-8 mt-12 items-start">
            <Shot
              src={graphsShot}
              alt="Pie charts of applicants by gender, year and status, and a custom chart of dietary restrictions with counts and percentages."
              width="1600"
              height="1672"
              caption="The graph view. Any question can be charted, such as dietary restrictions or shirt sizes."
            />
            <Shot
              src={checkinShot}
              alt="The QR check-in panel for an accepted applicant, with day one and day two buttons for check-in and each meal, each showing a running count."
              width="1200"
              height="720"
              caption="Check-in after a scan. Filled buttons are meals this person already got; the numbers are running totals for the day."
            />
          </div>
        </section>

        <section>
          <SectionTitle eyebrow="Activity log">Answering “the site was broken”</SectionTitle>
          <Lead>
            For the 2027 cycle I added server-side event logging. Every sign-in, application opened, submission, edit, decision and RSVP is recorded, with daily totals for the dashboard. Staff can see the sign-up funnel, who started an application but never submitted, and any one person’s full timeline.
          </Lead>
          <Shot
            src={monitoringShot}
            alt="The Activity Monitoring dashboard: active users, returning users, submissions and failed submits, an application funnel, a daily active users chart, a user lookup box and a recent activity feed."
            width="1600"
            height="1778"
            caption="Activity monitoring on the staff home page: the funnel, daily activity and a live feed of events."
            className="mb-10"
          />
          <Shot
            src={lookupShot}
            alt="A user lookup showing an account that signed in and opened the dashboard twice, two weeks apart, and never opened or submitted the application."
            width="1600"
            height="529"
            caption="A user lookup. This applicant signed in twice, two weeks apart, and never opened the application, which settles a late-application request in seconds."
          />
        </section>

        <section>
          <SectionTitle eyebrow="Design decisions">What I’d defend in a design review</SectionTitle>
          <DecisionGrid items={DECISIONS} />
        </section>

        <MoreCaseStudies current="sparkhacks-dashboard" />

        <CaseFooter note="Built for SparkHacks at UIC. The screenshots are the real app running on made-up applicants and activity, so no applicant’s data appears here." />
      </CaseBody>
    </article>
  )
}
