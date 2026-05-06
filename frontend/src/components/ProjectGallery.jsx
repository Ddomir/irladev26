import projects from '../data/projects.json'

import Connect4OnlineTN from '../assets/ProjectThumbnails/Connect4OnlineTN.png'
import irladevTN from '../assets/ProjectThumbnails/irladevTN.png'
import LiteboardTN from '../assets/ProjectThumbnails/LiteboardTN.png'
import PogodaTN from '../assets/ProjectThumbnails/PogodaTN.png'
import ModelPredictorTN from '../assets/ProjectThumbnails/ModelPredictorTN.png'
import TropeSearchTN from '../assets/ProjectThumbnails/TropeSearchTN.png'
import WebNeuralSimTN from '../assets/ProjectThumbnails/WebNeuralSimTN.png'
import LinksItTN from '../assets/ProjectThumbnails/LinksItTN.png'
import SparkhackTN from '../assets/ProjectThumbnails/Sparkhack26TN.png'

const thumbnails = {
  'Connect4OnlineTN.png': Connect4OnlineTN,
  'irladevTN.png': irladevTN,
  'LiteboardTN.png': LiteboardTN,
  'PogodaTN.png': PogodaTN,
  'ModelPredictorTN.png': ModelPredictorTN,
  'TropeSearchTN.png': TropeSearchTN,
  'WebNeuralSimTN.png': WebNeuralSimTN,
  'LinksItTN.png': LinksItTN,
  'Sparkhack26TN.png': SparkhackTN,
}

export default function ProjectGallery() {
  return (
    <div className="px-6 mb-12 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => {
          const thumb = thumbnails[project.thumbnail] ?? null
          return (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border border-secondary/20 overflow-hidden hover:border-secondary/60 hover:shadow-lg hover:shadow-secondary/10 transition-all duration-300 bg-secondary/5"
            >
              <div className="w-full aspect-video overflow-hidden bg-secondary/10">
                {thumb ? (
                  <img
                    src={thumb}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-secondary/30 text-xs uppercase tracking-widest">
                    No Preview
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 p-4 gap-1">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold text-base text-primary leading-tight">{project.title}</h2>
                  <span className="text-xs text-secondary/60 whitespace-nowrap pt-0.5">{project.date}</span>
                </div>
                <p className="text-sm text-primary/50 leading-snug">{project.description}</p>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
