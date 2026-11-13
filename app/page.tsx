'use client';
import { useEffect, useState } from 'react';
import ChainCanvas from '../components/chain/ChainCanvas';
import type { SceneName } from '../components/chain/scenes';
import FlowExplorer from '../components/flows/FlowExplorer';
import type { Product } from '../components/flows/flow-data';
import Icon, { Mark } from '../components/icons';

type Solution = {
  key: Product;
  hash: string;
  scene: SceneName;
  name: string;
  claim: string;
  body: string;
  brand: string;
  study: string;
  note?: string;
  follow: string;
  motion: string;
};

const solutions: Solution[] = [
  {
    key: 'sendr',
    hash: '#sendr',
    scene: 'move',
    name: 'Move money',
    claim: 'Send value across borders on stablecoin rails.',
    body: 'Remittance and payout from customer onboarding and quotes, through stablecoin settlement, to local payout.',
    brand: 'Sendr',
    study: 'A white-label remittance experience for financial services companies. Sendr connects customer onboarding and transfer initiation with stablecoin settlement and local payout workflows.',
    follow: 'Follow a Sendr transfer',
    motion: 'A transfer leaves the sender, crosses three linked blocks and arrives with the recipient.',
  },
  {
    key: 'finance',
    hash: '#just-finance',
    scene: 'invest',
    name: 'Digital investment',
    claim: 'Offer financial products through Web3 wallets.',
    body: 'Balances, provider-based savings, deposits, withdrawals and activity, brought into one customer interface.',
    brand: 'JUST Finance',
    study: 'A white-label product experience that connects financial offerings to Web3 wallets, with interfaces for balances, provider-based savings, deposits, withdrawals and activity.',
    follow: 'Follow a JUST Finance deposit',
    motion: 'Deposits travel from a wallet into a savings provider, then withdrawals return.',
  },
  {
    key: 'registry',
    hash: '#environmental-registry',
    scene: 'assets',
    name: 'Tokenized assets',
    claim: 'Give real-world records a digital lifecycle.',
    body: 'Registries that connect project records, supporting evidence and administrator decisions to the digital assets issued from them.',
    brand: 'Environmental Registry',
    study: 'A registry product foundation for environmental markets. It connects project records, verification evidence and administrator decisions with a planned digital credit lifecycle.',
    note: 'Issuance, transfer and retirement are a target workflow, scoped for each registry.',
    follow: 'Follow the registry workflow',
    motion: 'A project issues credits as a block of tokens. Some transfer to a holder and are retired.',
  },
];

const services = [
  ['Money movement', 'Wallet infrastructure, stablecoin operations and bank integration workflows.'],
  ['Assets and contracts', 'Token creation, smart contract management and blockchain connectivity.'],
  ['Identity and operations', 'Organisation access, identity workflows, activity records and notifications.'],
  ['Data and integration', 'APIs, webhooks, document processing and event-driven services.'],
  ['Mission Control', 'An operational view of platform events, wallets, transactions and contract activity.'],
];

const audiences = [
  ['Financial institutions', 'Connect existing banking systems to wallets, stablecoin operations and digital asset workflows.'],
  ['Fintech companies', 'Launch a white-label remittance or investment product under your own brand.'],
  ['Enterprise teams', 'Bring records, assets and contracts onchain through APIs and event-driven services.'],
];

const engagement = [
  'Use-case discovery and solution architecture',
  'API and business-system integration',
  'White-label product implementation',
  'Deployment and operational handover planning',
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const topics = ['Integration services', 'White-label product', 'Technical walkthrough', 'Stack acquisition'];

const mail = (topic: string) =>
  `mailto:info@fsco.io?subject=${encodeURIComponent(`FSCO Stack: ${topic}`)}&body=${encodeURIComponent(
    `Hello FSCO,\n\nI would like to discuss ${topic.toLowerCase()}.\n\nCompany:\nCurrent systems:\nUse case:\nPreferred timing:\n\n`,
  )}`;

export default function Home() {
  const [product, setProduct] = useState<Product>('sendr');
  const [topic, setTopic] = useState(topics[0]);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash === '#environmental-markets' ? '#environmental-registry' : window.location.hash;
      const match = solutions.find(s => s.hash === hash);
      if (!match) return;
      setProduct(match.key);
      document.getElementById('walkthrough')?.scrollIntoView();
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const choose = (solution: Solution) => {
    setProduct(solution.key);
    window.history.replaceState(null, '', solution.hash);
  };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="nav">
        <div className="wrap nav-row">
          <a className="brand" href="#" aria-label="FSCO Stack home"><Mark />FSCO Stack</a>
          <button className="menu" aria-expanded={menu} aria-controls="primary-nav" onClick={() => setMenu(!menu)}>Menu</button>
          <nav id="primary-nav" aria-label="Primary" className={menu ? 'open' : undefined} onClick={() => setMenu(false)}>
            <a href="#solutions">Solutions</a>
            <a href="#walkthrough">How it works</a>
            <a href="#platform">Platform</a>
            <a href="#services">Services</a>
          </nav>
          <a className="button small" href="#contact">Talk to us</a>
        </div>
      </header>

      <main id="main">
        <section className="hero">
          <div className="wrap hero-copy">
            <h1>Bring your business onchain.</h1>
            <p className="lede">Connect the systems you already run to stablecoin payments, digital investment and tokenized assets.</p>
            <div className="actions">
              <a className="button" href="#contact">Talk to us</a>
              <a className="link" href="#solutions">See the solutions <Icon name="arrow" /></a>
            </div>
          </div>
          <div className="wrap">
            <ChainCanvas className="hero-chain" scene="chain" label="Money, investments and assets flow along a network into a block. When the block is full it seals and joins the chain." />
          </div>
        </section>

        <section id="solutions" className="band">
          <div className="wrap">
            <div className="heading">
              <h2>Three solutions. One shared stack.</h2>
              <p className="lede">Each is shown through a product built on FSCO Stack, which can be white labelled or connected to what you already run.</p>
            </div>
            <div className="solutions">
              {solutions.map(solution => (
                <article key={solution.key} className="solution" data-product={solution.key}>
                  <div className="solution-copy">
                    <h3>{solution.name}</h3>
                    <p className="solution-claim">{solution.claim}</p>
                    <p>{solution.body}</p>
                    <div className="study">
                      <h4>Case study: {solution.brand}</h4>
                      <p>{solution.study}</p>
                      {solution.note && <p className="fine">{solution.note}</p>}
                      <a className="link" href="#walkthrough" onClick={() => choose(solution)}>{solution.follow} <Icon name="arrow" /></a>
                    </div>
                  </div>
                  <ChainCanvas className="solution-scene" scene={solution.scene} label={solution.motion} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="walkthrough" className="band night">
          <div className="wrap">
            <div className="heading">
              <h2>Follow one transaction through the stack.</h2>
              <p className="lede">Step through what the customer does, what the platform does behind it, and what comes back.</p>
            </div>
            <div className="segments" role="group" aria-label="Walkthrough">
              {solutions.map(solution => (
                <button key={solution.key} data-product={solution.key} aria-pressed={product === solution.key} onClick={() => choose(solution)}>
                  {solution.name}
                  <span>{solution.brand}</span>
                </button>
              ))}
            </div>
            <FlowExplorer key={product} product={product} />
          </div>
        </section>

        <section id="platform" className="band">
          <div className="wrap split">
            <div className="heading">
              <h2>One stack under all of it.</h2>
              <p className="lede">Your business systems stay at the centre. FSCO Stack adds modular services around them, so every product builds on the same foundation.</p>
              <ChainCanvas className="stack-scene" scene="stack" label="Three solutions rest on one stack of shared service layers." />
            </div>
            <dl className="spec">
              {services.map(([name, detail]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="services" className="band mist">
          <div className="wrap">
            <div className="heading">
              <h2>Built with your team.</h2>
              <p className="lede">Bring a defined business workflow. We map your existing systems, identify the services and providers involved, and scope an implementation and handover plan.</p>
            </div>
            <div className="audiences">
              {audiences.map(([name, detail]) => (
                <div key={name}>
                  <h3>{name}</h3>
                  <p>{detail}</p>
                </div>
              ))}
            </div>
            <div className="engage">
              <div>
                <h3>What an engagement covers</h3>
                <ul>
                  {engagement.map(item => <li key={item}><Icon name="check" />{item}</li>)}
                </ul>
                <p className="fine">Scope follows your systems, providers and operating requirements.</p>
              </div>
              <div>
                <h3>Or own the stack outright</h3>
                <p>FSCO Stack is also available for acquisition as the technology foundation for your own platform. Start with an architecture walkthrough, then assess source-code scope, dependencies, IP ownership and transition requirements.</p>
                <p className="fine">Asset scope and commercial terms are subject to diligence and agreement.</p>
                <a className="link" href="#contact" onClick={() => setTopic('Stack acquisition')}>Discuss an acquisition <Icon name="arrow" /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="band close">
          <div className="wrap">
            <h2>Tell us what you’re building.</h2>
            <p className="lede">Where you are today, and where onchain fits. We’ll reply from info@fsco.io.</p>
            <div className="topics" role="radiogroup" aria-label="What would you like to discuss?">
              {topics.map(item => (
                <button key={item} role="radio" aria-checked={topic === item} onClick={() => setTopic(item)}>{item}</button>
              ))}
            </div>
            <a className="button large" href={mail(topic)}>Start a conversation <Icon name="arrow" /></a>
            <p className="fine">Opens your email app with the topic filled in.</p>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="footer-row">
            <a className="brand" href="#"><Mark />FSCO Stack</a>
            <nav aria-label="Resources">
              <a href={`${basePath}/overview.html`} target="_blank" rel="noreferrer">One-page overview</a>
              <a href={`${basePath}/deck.html`} target="_blank" rel="noreferrer">Presentation</a>
              <a href={mail('Technical documentation')}>Request technical documentation</a>
              <a href="mailto:info@fsco.io">info@fsco.io</a>
            </nav>
          </div>
          <div className="footer-legal">
            <p>Technology and integration services. Financial product availability depends on provider, jurisdiction and implementation. Commercial scope is agreed for each engagement.</p>
            <p>© {new Date().getFullYear()} FSCO</p>
          </div>
        </div>
      </footer>
    </>
  );
}
