import { Link } from 'react-router-dom'
import posts from '../data/blogs.json'
import ModelPredictorTN from '../assets/ProjectThumbnails/ModelPredictorTN.png'

const images = {
  'ModelPredictorTN.png': ModelPredictorTN,
}

function resolveImage(path) {
  if (!path) return null
  const filename = path.split('/').pop()
  return images[filename] ?? null
}

export default function Blogs() {
  return (
    <section className="pt-20 px-10 pb-20">
      <h2 className="text-primary text-4xl font-semibold text-center mb-14">Blogs</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {posts.map((post, i) => {
          const img = resolveImage(post.image)
          const isInternal = post.url && post.url.startsWith('/')
          const cardClass = "flex items-stretch rounded-2xl border border-secondary/30 overflow-hidden hover:border-secondary transition-colors duration-300 no-underline"
          const cardContent = (
            <>
              <div className="flex-1 p-5 min-w-0 bg-secondary/5">
                <h2 className="text-primary font-semibold text-lg">{post.title}</h2>
                {post.description && (
                  <p className="text-primary/60 text-sm mt-1 truncate">{post.description}</p>
                )}
                {post.date && (
                  <p className="text-secondary text-xs font-medium uppercase tracking-widest mt-2">{post.date}</p>
                )}
              </div>
              {img && (
                <div className="w-60 md:w-32 lg:w-40 shrink-0">
                  <img src={img} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}
            </>
          )
          return isInternal ? (
            <Link key={i} to={post.url} className={cardClass}>{cardContent}</Link>
          ) : (
            <a key={i} href={post.url} target="_blank" rel="noopener noreferrer" className={cardClass}>{cardContent}</a>
          )
        })}
      </div>
    </section>
  )
}
