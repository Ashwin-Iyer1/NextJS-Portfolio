'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ProjectArtwork from './ProjectArtwork';
import styles from '../projects/explore/explore.module.css';

function ProjectCards({ projects }) {
  return <div className={styles.grid}>
    {projects.map(project => <article className={styles.card} id={project.id} key={project.repo}>
      {project.image ? <div className={styles.preview}>
        <Image src={project.image} alt={`${project.title}: verified application screenshot`} fill sizes="(max-width: 760px) 100vw, 50vw" />
        <span>APPLICATION SCREENSHOT</span>
      </div> : project.artSlug ? <div className={styles.art}><ProjectArtwork slug={project.artSlug} category={project.category} /></div> : null}
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}><span>{project.category}</span><a href={`#${project.id}`} aria-label={`Permanent link to ${project.title}`}>#</a></div>
        <h2>{project.title}</h2>
        <p className={styles.summary}>{project.summary}</p>
        <ul className={styles.tags} aria-label="Technologies and methods">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        <p className={styles.attribution}>{project.attribution}</p>
        <details className={styles.details}>
          <summary>Implementation, evidence & limits</summary>
          <dl>
            <dt>The work</dt><dd>{project.contribution}</dd>
            <dt>Evidence</dt><dd>{project.evidence}</dd>
            <dt>Scope & limitations</dt><dd>{project.limitation}</dd>
          </dl>
          <p className={styles.repoName}>Repository: {project.repo}</p>
        </details>
        <div className={styles.links}>
          {project.demo ? <a className={styles.primaryLink} href={project.demo}>Try in browser ↗<span className={styles.srOnly}> — {project.title}</span></a> : project.runtime ? <a className={styles.primaryLink} href={`${project.source}#readme`}>Run locally ↗<span className={styles.srOnly}> — {project.title}</span></a> : null}
          {project.caseStudy ? <Link href={project.caseStudy}>Read case study →</Link> : null}
          {project.reference ? <a href={project.reference}>Read résumé ↗</a> : null}
          <a href={project.source}>Source ↗<span className={styles.srOnly}> — {project.repo}</span></a>
        </div>
        {project.runtime ? <p className={styles.runtime}>{project.runtime}</p> : null}
      </div>
    </article>)}
  </div>;
}

export function ExplorerFallback({ projects }) {
  return <><p className={styles.resultCount}>{projects.length} public repositories · browse the complete collection below</p><ProjectCards projects={projects} /></>;
}

export default function ProjectExplorer({ projects, categories }) {
  const params = useSearchParams();
  const query = (params.get('q') || '').slice(0, 200);
  const category = categories.includes(params.get('discipline')) ? params.get('discipline') : categories[0];
  const mode = ['browser', 'local'].includes(params.get('mode')) ? params.get('mode') : 'all';
  const [shareStatus, setShareStatus] = useState('');
  const needle = query.trim().toLowerCase();
  const displayed = projects.filter(p =>
    (category === categories[0] || p.category === category) &&
    (mode === 'all' || (mode === 'browser' ? Boolean(p.demo) : Boolean(p.runtime))) &&
    `${p.title} ${p.repo} ${p.summary} ${p.contribution} ${p.tags.join(' ')}`.toLowerCase().includes(needle));

  function update(key, value, push = false) {
    const next = new URLSearchParams(params.toString());
    if (!value || value === 'all' || value === categories[0]) next.delete(key); else next.set(key, value);
    const url = '/projects/explore' + (next.size ? `?${next}` : '');
    window.history[push ? 'pushState' : 'replaceState'](null, '', url);
    setShareStatus('');
  }
  function reset() { window.history.pushState(null, '', '/projects/explore'); setShareStatus(''); }
  async function share() {
    try { await navigator.clipboard.writeText(window.location.href); setShareStatus('Link copied.'); }
    catch { setShareStatus('Copy this page’s address to share the current view.'); }
  }

  return <>
    <section className={styles.controls} aria-label="Filter the project directory">
      <label className={styles.search}>Find an idea or technology<input type="search" value={query} maxLength={200} placeholder="Fourier, Python, control systems…" onChange={e => update('q', e.target.value)} /></label>
      <label>Discipline<select aria-label="Discipline" value={category} onChange={e => update('discipline', e.target.value, true)}>{categories.map(value => <option key={value}>{value}</option>)}</select></label>
      <label>How to explore<select aria-label="How to explore" value={mode} onChange={e => update('mode', e.target.value, true)}><option value="all">All public work</option><option value="browser">Try in browser</option><option value="local">Run locally</option></select></label>
    </section>
    <div className={styles.resultBar}>
      <p className={styles.resultCount} role="status">{displayed.length} of {projects.length} repositories</p>
      <div>{query || category !== categories[0] || mode !== 'all' ? <button onClick={reset}>Reset filters</button> : null}<button onClick={share}>Share this view</button></div>
    </div>
    <p className={styles.shareStatus} aria-live="polite">{shareStatus}</p>
    {displayed.length ? <ProjectCards projects={displayed} /> : <div className={styles.empty}><h2>No matching projects</h2><p>Try another topic or return to the complete collection.</p><button className="button-secondary" onClick={reset}>Clear filters</button></div>}
  </>;
}
