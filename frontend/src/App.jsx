import Footer from './components/Footer'
import SiteNav from './components/SiteNav'
import About from './pages/About'
import CaseStudies from './pages/CaseStudies'
import CoeConnect from './pages/CoeConnect'
import ResearchExpenditure from './pages/ResearchExpenditure'
import SparkHacksDashboard from './pages/SparkHacksDashboard'

// Vercel rewrites every path to index.html, so pick the page from the URL.
const PAGES = {
  '/': About,
  '/case-studies': CaseStudies,
  '/case-studies/coeconnect': CoeConnect,
  '/coeconnect': CoeConnect, // shared before the case studies section existed
  '/case-studies/research-expenditure': ResearchExpenditure,
  '/case-studies/sparkhacks-dashboard': SparkHacksDashboard,
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase() || '/'
  const Page = PAGES[path] || About

  return (
    <div className="relative bg-background font-mada">
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'linear-gradient(to bottom, #060B44 0%, #040933 100%)' }} />
      <SiteNav path={path} />
      <main className="relative z-1 min-h-screen">
        <Page />
      </main>
      <Footer />
    </div>
  )
}

export default App
