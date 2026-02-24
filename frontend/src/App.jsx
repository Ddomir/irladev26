import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Blogs from './pages/Blogs'
import RevenuePredictorBlog from './pages/Blogs/RevenuePredictorBlog'
import Projects from './pages/Projects'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
    <div className="bg-background font-mada">
      <Navbar />
      <main className="pt-16 min-h-screen">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/revenue-predictor" element={<RevenuePredictorBlog />} />
        </Routes>
      </main>
      <Footer />
    </div>
      
    </BrowserRouter>
  )
}

export default App
