import projects from '../data/projects.json'

import Connect4OnlineTN from '../assets/ProjectThumbnails/Connect4OnlineTN.png'
import irladevTN from '../assets/ProjectThumbnails/irladevTN.png'
import LiteboardTN from '../assets/ProjectThumbnails/LiteboardTN.png'
import PogodaTN from '../assets/ProjectThumbnails/PogodaTN.png'
import ModelPredictorTN from '../assets/ProjectThumbnails/ModelPredictorTN.png'
import TropeSearchTN from '../assets/ProjectThumbnails/TropeSearchTN.png'

const thumbnails = {
  'Connect4OnlineTN.png': Connect4OnlineTN,
  'irladevTN.png': irladevTN,
  'LiteboardTN.png': LiteboardTN,
  'PogodaTN.png': PogodaTN,
  'ModelPredictorTN.png': ModelPredictorTN,
  'TropeSearchTN.png': TropeSearchTN,
}

function resolveThumbnail(path) {
  if (!path) return null
  const filename = path.split('/').pop()
  return thumbnails[filename] ?? null
}

const midIndex = Math.ceil(projects.length / 2)
const firstColumn = projects.slice(0, midIndex)
const secondColumn = projects.slice(midIndex)

export default function ProjectGallery() {
  return (
    <div className="px-10 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[firstColumn, secondColumn].map((col, ci) => (
        <div key={ci} className="flex flex-col gap-4">
          {col.map((project, i) => {
            const thumb = resolveThumbnail(project.thumbnail)
            return (
              <a
                key={i}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-secondary/30 overflow-hidden hover:border-secondary transition-colors duration-300"
              >
                <div className="w-full aspect-video bg-linear-to-br from-secondary/30 to-secondary/10 overflow-hidden">
                  {thumb
                    ? <img src={thumb} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    : <div className="w-full h-full" />
                  }
                </div>
                <div className="p-4 text-center bg-secondary/5">
                  <h2 className="font-semibold text-lg text-primary">{project.title}</h2>
                  <p className="mt-1 text-sm text-primary/60">{project.description}</p>
                  <p className="text-xs font-medium uppercase text-secondary mt-2 tracking-widest">{project.date}</p>
                </div>
              </a>
            )
          })}
        </div>
      ))}
    </div>
  )
}
