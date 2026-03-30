import GithubGraph from '@/components/ui/GithubGraph';

export default function GithubSection() {
  return (
    <section id="github-graph" className="panel" data-reveal>
      <div className="panel-head compact">
        <p className="label">github commit graph</p>
        <a className="panel-link" href="https://github.com/MADSKULL21" target="_blank" rel="noopener noreferrer">
          open github ↗
        </a>
      </div>
      <h2 className="sr-only">GitHub Commit Graph</h2>
      <GithubGraph user="MADSKULL21" />
    </section>
  );
}
