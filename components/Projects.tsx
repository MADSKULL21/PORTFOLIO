
import React from 'react';
import projectsData, { Project } from '../data/projects';

const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.43 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.31 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22 0 1.6-.02 2.9-.02 3.29 0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const FeaturedProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="bg-brand-gray rounded-lg p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
    <div className="md:w-1/2">
      <h3 className="text-3xl font-bold text-white mb-4">
        {project.repo ? (
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-2" aria-label={`Open ${project.title} on GitHub`}>
            {project.title}
            <GitHubIcon className="h-5 w-5 text-brand-pink" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-2">{project.title}</span>
        )}
      </h3>
      {project.tech && <p className="text-brand-pink font-semibold mb-4">{project.date} | {project.tech}</p>}
      <p className="text-brand-light-gray leading-relaxed" dangerouslySetInnerHTML={{ __html: project.description.replace('<', '&lt;') }} />
      {project.repo && (
        <div className="mt-6">
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-transparent border border-brand-pink text-brand-pink px-4 py-2 rounded hover:bg-brand-pink hover:text-white transition">
            <GitHubIcon className="h-4 w-4" />
            View on GitHub
          </a>
        </div>
      )}
    </div>
    <div className="md:w-1/2">
      {project.image && (
        <img src={project.image} alt={project.title} className="rounded-lg shadow-xl w-full h-auto object-cover" />
      )}
    </div>
  </div>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="bg-brand-gray p-8 rounded-lg flex flex-col">
    <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-between">
      <span className="inline-flex items-center gap-2">
        {project.repo ? (
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-2" aria-label={`Open ${project.title} on GitHub`}>
            <span>{project.title}</span>
            <GitHubIcon className="h-5 w-5 text-brand-pink" />
          </a>
        ) : (
          <span>{project.title}</span>
        )}
      </span>
    </h3>
    {project.date && <p className="text-brand-pink font-semibold mb-4">{project.date}</p>}
    <div className="flex flex-col md:flex-row gap-6">
      <p className="text-brand-light-gray flex-grow">{project.description}</p>
      {project.image && (
        <div className="md:w-1/3">
          <img src={project.image} alt={project.title} className="rounded-lg shadow-md w-full h-auto object-cover" />
        </div>
      )}
    </div>
    {project.repo && (
      <div className="mt-6">
        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-transparent border border-brand-pink text-brand-pink px-4 py-2 rounded hover:bg-brand-pink hover:text-white transition" aria-label={`View ${project.title} on GitHub`}>
          <GitHubIcon className="h-4 w-4" />
          View on GitHub
        </a>
      </div>
    )}
  </div>
);

const Projects: React.FC = () => {
  const featured = projectsData.find((p) => p.featured) || projectsData[0];
  const others = projectsData.filter((p) => p !== featured);

  return (
    <section id="projects" className="py-20 md:py-32 bg-brand-dark">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
        {featured && <FeaturedProjectCard project={featured} />}

        <h2 className="text-4xl font-bold mb-12 text-center">Advanced AI Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {others.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
