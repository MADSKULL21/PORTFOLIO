import Header from '@/components/layout/Header';
import TerminalExperience from '@/components/terminal/TerminalExperience';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terminal',
  description: "Interactive terminal for exploring Shaunak Lad's portfolio, projects, and links.",
  alternates: {
    canonical: '/terminal',
  },
};

export default function TerminalPage() {
  return (
    <div className="site-wrapper terminal-layout">
      <div className="site-backdrop" aria-hidden="true" />
      <Header />

      <main id="main-content" className="page terminal-main">
        <TerminalExperience />
      </main>
    </div>
  );
}
