'use client';
import { useEffect, useRef, useState } from 'react';
import Icon from '../icons';
import { flows, positions, type Journey, type NodeId, type Product } from './flow-data';
import './flows.css';

const STEP_MS = 5200;
const DEFAULT_LANES = ['Customer experience', 'FSCO Stack', 'Connected services'];

export default function FlowExplorer({ product }: { product: Product }) {
  const [mode, setMode] = useState<'deposit' | 'redeem'>('deposit');
  const journey: Journey = product === 'registry' ? 'registry' : product === 'sendr' ? 'remittance' : mode;
  return (
    <div className="flow-explorer" data-product={product}>
      {product === 'finance' && (
        <div className="journey-switch" role="group" aria-label="JUST Finance journey">
          <button aria-pressed={mode === 'deposit'} onClick={() => setMode('deposit')}>Deposit</button>
          <button aria-pressed={mode === 'redeem'} onClick={() => setMode('redeem')}>Redeem</button>
        </div>
      )}
      <Walkthrough key={journey} journey={journey} />
    </div>
  );
}

function Walkthrough({ journey }: { journey: Journey }) {
  const flow = flows[journey];
  const [step, setStep] = useState(0);
  const [runId, setRunId] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(true);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const current = flow.steps[step];
  const last = step === flow.steps.length - 1;
  const running = playing && inView && visible;
  const animate = running && !reduced;
  const route = `${flow.nodes[current.from].title} to ${flow.nodes[current.to].title}: ${current.tag}`;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => {
      setReduced(media.matches);
      if (media.matches) setPlaying(false);
    };
    change();
    media.addEventListener('change', change);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    if (root.current) observer.observe(root.current);
    const visibility = () => setVisible(!document.hidden);
    visibility();
    document.addEventListener('visibilitychange', visibility);
    return () => {
      media.removeEventListener('change', change);
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      if (last) setPlaying(false);
      else setStep(s => s + 1);
    }, STEP_MS);
    return () => window.clearTimeout(timer);
  }, [running, step, last, runId]);

  const select = (index: number) => {
    setPlaying(false);
    setStep(index);
  };
  const play = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (last) setStep(0);
    setPlaying(true);
  };
  const replay = () => {
    setStep(0);
    setRunId(n => n + 1);
    setPlaying(true);
  };

  return (
    <div ref={root} className={`walkthrough ${animate ? 'is-running' : ''}`}>
      <div className="flow-head">
        <p className="flow-label">{flow.label}</p>
        <p className="flow-summary">{flow.summary}</p>
      </div>

      <ol className="flow-steps" aria-label="Walkthrough steps">
        {flow.steps.map((s, i) => (
          <li key={s.title}>
            <button onClick={() => select(i)} aria-current={i === step ? 'step' : undefined} className={i < step ? 'is-complete' : ''}>
              <span>{i < step ? <Icon name="check" /> : i + 1}</span>
              {s.title}
              <i aria-hidden="true">{i === step && <b key={`${step}-${running}-${runId}`} className={animate ? 'fill-progress' : ''} />}</i>
            </button>
          </li>
        ))}
      </ol>

      <div className="flow-diagram">
        <div className="lane-headings">{(flow.lanes ?? DEFAULT_LANES).map(lane => <span key={lane}>{lane}</span>)}</div>
        <svg viewBox="0 0 1000 390" role="img" aria-label={route}>
          <path className="lane-divider" d="M333 10V375M667 10V375" />
          <path className="flow-base-path" d="M260 120H390M500 160V240M610 280H740M150 160V240M610 120H740" />
          {(Object.keys(positions) as NodeId[]).map(id => {
            const pos = positions[id];
            const active = id === current.from || id === current.to;
            return (
              <g key={id} className={`flow-node ${active ? 'node-active' : ''}`}>
                <rect x={pos.x} y={pos.y} width="220" height="80" rx="10" />
                <text x={pos.x + 20} y={pos.y + 35} className="node-title">{flow.nodes[id].title}</text>
                <text x={pos.x + 20} y={pos.y + 58} className="node-subtitle">{flow.nodes[id].subtitle}</text>
              </g>
            );
          })}
          <path key={`${step}-path`} className={`flow-active-path ${current.kind}`} d={current.route} />
          {animate && (
            <rect key={`${step}-packet-${runId}`} className={`flow-packet ${current.kind}`} x="-6" y="-6" width="12" height="12" rx="2">
              <animateMotion dur="2.6s" repeatCount="indefinite" path={current.route} />
            </rect>
          )}
        </svg>
        <div className={`transfer-caption ${current.kind}`}>
          <span />
          {current.tag}
          <span className="transfer-direction">{flow.nodes[current.from].title} to {flow.nodes[current.to].title}</span>
        </div>
      </div>

      <div className="flow-mobile-route" role="img" aria-label={route}>
        <div>{flow.nodes[current.from].title}</div>
        <span className={current.kind}><Icon name="down" /> <small>{current.tag}</small></span>
        <div>{flow.nodes[current.to].title}</div>
      </div>

      <div className="flow-story" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
        <div className="flow-story-main">
          <h4>{current.title}</h4>
          <p>{current.action}</p>
        </div>
        <div className="flow-story-detail">
          <p>{current.platform}</p>
          <p className="flow-outcome">{current.result}</p>
        </div>
      </div>

      <div className="flow-bottom">
        <div className="flow-controls">
          <button className="flow-play" onClick={play} aria-label={playing ? 'Pause walkthrough' : last ? 'Replay walkthrough' : 'Play walkthrough'}>
            <Icon name={playing ? 'pause' : 'play'} />
            <span>{playing ? 'Pause' : last ? 'Replay' : 'Play'}</span>
          </button>
          <button onClick={() => select(step - 1)} disabled={step === 0} aria-label="Previous step"><Icon name="previous" /></button>
          <button onClick={() => select(step + 1)} disabled={last} aria-label="Next step"><Icon name="arrow" /></button>
          <button onClick={replay} aria-label="Restart walkthrough"><Icon name="restart" /></button>
        </div>
        <p className="flow-status">{current.status}</p>
        <div className="flow-legend" aria-label="Connection types">
          <span className="request">Instruction</span>
          <span className="value">{journey === 'registry' ? 'Credit movement' : 'Asset movement'}</span>
          <span className="event">Status update</span>
        </div>
      </div>

      <p className="flow-disclaimer">
        {flow.disclaimer ??
          'Illustrative walkthrough of a simplified successful flow. Animation speed does not represent processing time. ' +
            (journey === 'remittance'
              ? 'Checks, failed transactions and payout exceptions can require additional steps.'
              : 'Provider operations and withdrawal timing vary by product.')}{' '}
        {reduced ? 'Reduced motion is enabled; use the step controls or Play to advance.' : ''}
      </p>
    </div>
  );
}
