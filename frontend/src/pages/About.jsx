import { useEffect, useRef, useState } from 'react'
import WaveDivider from '../components/WaveDivider'
import ExperienceCard from '../components/ExperienceCard'
import HeroTitle from '../components/HeroTitle'
import acmImg from '../assets/ACM.png'
import edtImg from '../assets/EDT.png'
import sparkImg from '../assets/SparkHacks.png'
import uicImg from '../assets/UICENG.png'

const PARALLAX_SPEED = 0.4
const MD = 768

export default function About() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= MD)
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY
        heroRef.current.style.transform = `translateY(${scrollY * PARALLAX_SPEED}px)`
      }
    }

    const handleResize = () => setIsDesktop(window.innerWidth >= MD)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative flex flex-col items-center w-full h-[65vh] justify-center gap-10 z-0 overflow-hidden">
        <div ref={heroRef} className="flex flex-col items-center gap-10" style={{ willChange: 'transform' }}>
          <HeroTitle />

          {/* Text */}
          <div className="text-center max-w-[75vw] w-200 text-lg">
            <p className="text-primary">Full stack web developer based in Chicago. I love creating beautiful interfaces and tools that help people in their daily lives. Find out more about my projects, past experiences, and blogs where I ramble on about anything I've learned.</p>
          </div>
        </div>
      </section>


      {/* Divider + Experiences scroll over the hero */}
      <div className="relative z-10">
      <WaveDivider />

      {/* Experiences */}
      <section className="relative py-15 px-10 mb-15">
        <h2 className="text-primary text-4xl font-semibold text-center mb-14">Past Experiences</h2>
        <div className={`flex flex-col items-center ${isDesktop ? 'gap-12' : 'gap-10'}`}>
          {[
            { image: acmImg, title: 'ACM @ UIC', description: 'Association of Computer Machining Special Interest Group Leader: Teach UIC students web development through group projects, lectures, and one on one help.', date: 'AUG 2025 - NOW' },
            { image: edtImg, title: 'EDT', description: 'Engineering Design Team Member: Part of the AiR team, creating automated drones through YOLO. Also, created their website.', date: 'AUG 2024 - NOW' },
            { image: sparkImg, title: 'SparkHacks', description: "On the webdev team for Chicago's largest hackathon! Created a dashboard for 700+ applicants, and helped run the event.", date: 'OCT 2025 - FEB 2026' },
            { image: uicImg, title: 'UIC Engineering', description: "Creating internal tools for UIC's engineering department.", date: 'AUG 2024 - NOW' },
          ].map((exp, i) => (
            <div
              key={i}
              className="w-full md:w-auto"
              style={isDesktop ? {
                alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
                marginLeft: i % 2 === 0 ? `${10 + i * 2}%` : undefined,
                marginRight: i % 2 !== 0 ? `${10 + (i - 1) * 2}%` : undefined,
                marginTop: i > 0 ? '-60px' : undefined,
              } : {}}
            >
              <ExperienceCard
                image={exp.image}
                title={exp.title}
                description={exp.description}
                date={exp.date}
                index={i}
              />
            </div>
          ))}
        </div>
      </section>

      <WaveDivider />

      <section className='relative py-15 px-10 mb-15'>
        <h2 className="text-primary text-4xl font-semibold text-center mb-2">Contact Me</h2>
        <p className='text-primary text-lg text-center mb-14'>Let's get in touch!</p>
      </section>
      </div>

    </>
  )
}
