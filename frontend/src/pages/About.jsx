import { useEffect, useRef, useState } from 'react'
import WaveDivider from '../components/WaveDivider'
import ExperienceCard from '../components/ExperienceCard'
import HeroTitle from '../components/HeroTitle'
import ContactMarquee from '../components/ContactMarquee'
import acmImg from '../assets/Experiences/ACM.png'
import edtImg from '../assets/Experiences/EDT.png'
import sparkImg from '../assets/Experiences/SparkHacks.png'
import uicImg from '../assets/Experiences/UICENG.png'

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

        {/* Large star */}
        <svg className="absolute -left-[95px] top-[10%]" width="190" height="190" viewBox="0 0 190 190" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M101.604 124.42L69.8311 186.763L73.4854 116.915L90.0107 111.547L101.604 124.42ZM116.163 116.561L127.61 151.804L102.808 124.262L106.977 116.08L116.163 116.561ZM73.0039 106.977L72.5225 116.176L37.3203 127.61L64.8477 102.82L73.0039 106.977ZM98.5879 78.4883L98.8047 78.7295L99.1133 78.6289L115.539 73.293L115.064 82.3799L115.048 82.7041L115.337 82.8516L123.494 87.0088L110.637 98.5879L110.396 98.8047L110.496 99.1133L115.832 115.542L106.705 115.064L106.381 115.048L106.233 115.337L102.09 123.466L90.5371 110.637L90.3203 110.396L90.0107 110.496L73.542 115.845L74.0205 106.705L74.0371 106.381L73.748 106.233L65.6445 102.104L78.4883 90.5371L78.7295 90.3203L78.6289 90.0107L73.2803 73.5439L82.3799 74.0205L82.7041 74.0371L82.8516 73.748L86.9951 65.6152L98.5879 78.4883ZM186.763 119.253L116.901 115.598L111.547 99.1133L124.448 87.4951L186.763 119.253ZM72.21 73.4883L77.5771 90.0107L64.6895 101.617L2.32031 69.8311L72.21 73.4883ZM124.29 86.291L116.08 82.1074L116.559 72.9619L151.804 61.5137L124.29 86.291ZM115.596 72.2236L99.1133 77.5771L87.4814 64.6611L119.253 2.32031L115.596 72.2236ZM86.2783 64.8193L82.1074 73.0039L72.9492 72.5254L61.5137 37.3203L86.2783 64.8193Z" stroke="#6D7DD9"/>
        </svg>

        {/* Small star — left edge, middle area */}
        <svg className="absolute -left-[33px] top-[65%] none sm:block" width="67" height="63" viewBox="0 0 67 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M33.9411 23.2558L34.2528 23.7894L34.7101 23.3734L52.0638 7.57596L40.4218 27.9522L40.1152 28.4888L40.704 28.6766L63.0592 35.8072L39.5947 35.9126L38.9765 35.9155L39.1079 36.5193L44.1098 59.443L32.2869 39.1765L31.9753 38.6428L31.5188 39.0585L14.1644 54.8541L25.8062 34.48L26.1128 33.9434L25.524 33.7557L3.16541 26.6243L26.6342 26.5193L27.2515 26.5167L27.1201 25.9129L22.1179 2.98834L33.9411 23.2558Z" stroke="#6D7DD9"/>
        </svg>

        {/* Medium star — left edge, lower area */}
        <svg className="absolute -right-[49px] top-[50%]" width="99" height="99" viewBox="0 0 99 99" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M57.6639 40.2352L57.5993 40.8498L58.2141 40.785L95.3528 36.8642L61.2294 52.0387L60.6647 52.2898L61.0282 52.7896L82.9929 82.9919L52.7901 61.028L52.2899 60.6645L52.0386 61.229L36.8649 95.3512L40.7852 58.2137L40.8498 57.5991L40.2359 57.6641L3.09531 61.5844L37.2206 46.4104L37.7853 46.1593L37.4218 45.6595L15.4557 15.4548L45.6599 37.4211L46.1591 37.7844L46.4104 37.2199L61.5841 3.0977L57.6639 40.2352Z" stroke="#6D7DD9"/>
        </svg>
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

      <section className='relative pt-15 px-10'>
        <h2 className="text-primary text-4xl font-semibold text-center mb-2">Contact Me</h2>
        <p className='text-primary text-lg text-center mb-16'>Let's get in touch!</p>

        <ContactMarquee />
      </section>
      </div>

    </>
  )
}
