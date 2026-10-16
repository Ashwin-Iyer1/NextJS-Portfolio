import Link from 'next/link';
import { Suspense } from 'react';
import ProjectExplorer, { ExplorerFallback } from '../../components/ProjectExplorer';
import { explorerProjects, projectCategories } from '../../data/explorerProjects';
import styles from './explore.module.css';

export const metadata = {
  title: 'Project directory — Ashwin Iyer',
  description: 'Explore 39 public repositories: interactive mathematical tools, machine-learning experiments, desktop utilities, robotics, and practical web applications. Each entry explains the work, evidence, and boundaries.',
  alternates: { canonical: '/projects/explore' },
};

export default function ExplorePage() {
  return (
    <div className={`page-shell ${styles.page}`} id="page-content" tabIndex={-1}>
      <header className={styles.header}>
        <div>
          <Link className={styles.back} href="/projects">← Selected case studies</Link>
          <p className={styles.eyebrow}>THE PUBLIC WORK / A CLOSER LOOK</p>
          <h1>Follow the idea.<br /><em>Try the implementation.</em></h1>
          <p className={styles.lede}>From Fourier analysis to video pipelines, a directory of tools you can explore and code you can inspect. Each project explains what it does, how it was checked, and where its claims end.</p>
        </div>
        <dl className={styles.numbers}>
          <div><dt>Public repositories</dt><dd>{explorerProjects.length}</dd></div>
          <div><dt>Browser experiences</dt><dd>{explorerProjects.filter(p => p.demo).length}</dd></div>
          <div><dt>Ways to explore</dt><dd>Math · software · data</dd></div>
        </dl>
      </header>
      <Suspense fallback={<ExplorerFallback projects={explorerProjects} />}>
        <ProjectExplorer projects={explorerProjects} categories={projectCategories} />
      </Suspense>
      <footer className={styles.footer}>
        <p>Public source, with context. Forks and team projects retain their original attribution. Reference repositories and historical archives are labeled separately; a browser demo may use synthetic examples or a saved research snapshot.</p>
        <Link href="/projects">Read the selected case studies →</Link>
      </footer>
    </div>
  );
}
