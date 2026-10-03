import Footer from './components/Footer'
import About from './pages/About'

function App() {
  return (
    <div className="relative bg-background font-mada">
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'linear-gradient(to bottom, #060B44 0%, #040933 100%)' }} />
      <main className="relative z-1 min-h-screen">
        <About />
      </main>
      <Footer />
    </div>
  )
}

export default App
