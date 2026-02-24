import ProjectGallery from '../components/ProjectGallery'
import ProjectGridBg from '../components/ProjectGridBg'

export default function Projects() {
  return (
    <section className="relative pt-10 overflow-hidden">
      <ProjectGridBg />
      <h2 className="text-primary text-4xl font-semibold text-center mb-14">Projects</h2>
      <ProjectGallery />
    </section>
  )
}
