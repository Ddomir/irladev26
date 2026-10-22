import coeDeploy from '../assets/coeconnect-deploy.png'
import rexpFyData from '../assets/rexp-fydata.png'
import sparkApplicants from '../assets/spark-applicants.png'

// One entry per case study. `path` is the canonical URL; `aliases` keep older
// links working (irla.dev/coeconnect was shared before the section existed).
export const CASE_STUDIES = [
  {
    slug: 'coeconnect',
    path: '/case-studies/coeconnect',
    aliases: ['/coeconnect'],
    title: 'COEConnect',
    org: 'UIC College of Engineering',
    summary: 'A portal, SDK and deploy system for about ten department apps. Agents on each server deploy with rollback, and the portal never gets a shell.',
    tags: ['TypeScript', 'React', 'Node', 'systemd'],
    image: coeDeploy,
    imageAlt: 'The COEConnect deploy tab with a pipeline and build history.',
  },
  {
    slug: 'research-expenditure',
    path: '/case-studies/research-expenditure',
    aliases: [],
    title: 'Research Expenditure',
    org: 'UIC College of Engineering',
    summary: 'Replaced a quarterly Excel process for the college’s grant spending. About 3,000 records, a review flow for 100 staff, and three weeks of manual work saved.',
    tags: ['React', 'TypeScript', 'Express', 'MySQL'],
    image: rexpFyData,
    imageAlt: 'The Research Expenditure FY Data table grouped by department.',
  },
  {
    slug: 'sparkhacks-dashboard',
    path: '/case-studies/sparkhacks-dashboard',
    aliases: [],
    title: 'SparkHacks Dashboard',
    org: 'SparkHacks 2026',
    summary: 'The applicant portal and staff dashboard for a 2,000-applicant hackathon: review, decisions, QR check-in for meals, and an activity log.',
    tags: ['Astro', 'React', 'Firebase', 'Vercel'],
    image: sparkApplicants,
    imageAlt: 'The SparkHacks applicant table with status filters.',
  },
]

export const findCaseStudy = (slug) => CASE_STUDIES.find((c) => c.slug === slug)
