import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Blogs from './pages/Blogs'
import RevenuePredictorBlog from './pages/Blogs/RevenuePredictorBlog'
import PogodaBlog from './pages/Blogs/PogodaBlog'
import ArbitrageBlog from './pages/Blogs/ArbitrageBlog'
import DCAVIXCudaBlog from './pages/Blogs/DCAVTICudaBlog'
import Projects from './pages/Projects'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
    <div className="relative bg-background font-mada">
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'linear-gradient(to bottom, #060B44 0%, #040933 100%)' }} />
      <Navbar />
      <main className="relative z-1 pt-16 min-h-screen">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/revenue-predictor" element={<RevenuePredictorBlog />} />
          <Route path="/blogs/pogoda" element={<PogodaBlog />} />
          <Route path="/blogs/arbitrage" element={<ArbitrageBlog />} />
          <Route path="/blogs/dca-vix-cuda" element={<DCAVIXCudaBlog />} />
        </Routes>
      </main>
      <Footer />
    </div>
      
    </BrowserRouter>
  )
}

export default App
