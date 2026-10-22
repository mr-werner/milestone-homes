import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, CalendarCheck, ChevronLeft, ChevronRight, Facebook, FileText, Instagram, Mail, MapPin, Menu, Phone, Ruler, X } from "lucide-react";
import { ConceptWidget, StudioCredit } from "./concept.jsx";

import logo from "./assets/milestone-logo.png";
import mark from "./assets/milestone-m.png";
import badgeHba from "./assets/badge-hba.png";
import badgeCpb from "./assets/badge-cpb.jpg";
import badgeNahb from "./assets/badge-nahb.jpg";

import heroHome from "./assets/photos/hero-kalispell.jpg";
import customBuild from "./assets/photos/hero-custom-build.jpg";
import stoneEstate from "./assets/photos/stone-estate.jpg";
import hickoryFalls from "./assets/photos/hickory-falls.jpg";
import stoneCreek from "./assets/photos/stonecreek-entry.jpg";
import theGrove from "./assets/photos/the-grove.jpg";
import landAerial from "./assets/photos/land-aerial.jpg";
import robMiles from "./assets/photos/rob-miles.jpg";
import robAndBailey from "./assets/photos/rob-and-bailey.jpg";
import allison from "./assets/photos/allison.jpg";
import sold110 from "./assets/photos/sold-110th.jpg";
import sold85 from "./assets/photos/sold-85th.jpg";
import soldJoshua from "./assets/photos/sold-joshua.jpg";
import lotsAerial from "./assets/photos/lots-aerial.jpg";
import livingVaulted from "./assets/photos/living-vaulted.jpg";

const imgs = (glob) => Object.fromEntries(Object.entries(glob).map(([path, mod]) => [path.split("/").pop().replace(/\.\w+$/, ""), mod.default]));
const PHOTOS = imgs(import.meta.glob("./assets/photos/g*.jpg", { eager: true }));
const PLAN_IMGS = imgs(import.meta.glob("./assets/plans/*.jpg", { eager: true }));
const SKETCHES = Object.values(imgs(import.meta.glob("./assets/sketches/*.jpg", { eager: true })));

// ------------------------------------------------------------ Content (from milestonehomesok.com: home, about, build, for sale, plans, communities, gallery, contact)
const COMPANY = "Milestone Homes";
const ABBR = "mh";
const END_DATE = "2026-11-30T23:59:59-06:00";
const ORIGINAL = "https://www.milestonehomesok.com/";
const PHONE = "918-232-4084";
const PHONE_HREF = "tel:+19182324084";
const EMAIL = "info@milestonehomesok.com";
const ADDRESS = "9802 S 33rd W Ave, Tulsa, OK 74037";
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=9802+S+33rd+W+Ave+Tulsa+OK+74037";
const MAP_EMBED = "https://www.google.com/maps?q=9802+S+33rd+W+Ave,+Tulsa,+OK+74037&output=embed";
const SOCIAL_LINKS = [
  ["Facebook", "https://www.facebook.com/Milestonehomesok/", Facebook],
  ["Instagram", "https://www.instagram.com/milestonehomesok/", Instagram],
  ["Houzz", "https://www.houzz.com/pro/milestonehomes/", null],
];
const NAV = [["About", "#about"], ["Build", "#build"], ["For Sale", "#for-sale"], ["Plans", "#plans"], ["Communities", "#communities"], ["Gallery", "#gallery"], ["Contact", "#schedule"]];

const STATS = [["1,700+", "homes built"], ["25", "Tulsa-area neighborhoods developed"], ["1984", "Rob Miles starts building in Tulsa"], ["3rd", "generation of builders"]];

const PROCESS = [
  ["01", "Meet Up", "Sit down with our team and talk through what you want to build and where."],
  ["02", "Dream Up", "Pick one of our plans or design one from scratch, uniquely and just for you."],
  ["03", "Team Up", "We guide you through the build and keep the process simple and straightforward."],
];

const WAYS = [
  ["Move in sooner", "An available new-construction home.", "#for-sale", "See homes & lots"],
  ["Start from a plan", "One of our floor plans, changed to fit your family.", "#plans", "Browse 18 plans"],
  ["Start from scratch", "Fully custom, in one of our neighborhoods or on your own land.", "#communities", "Find a homesite"],
];

// Plan cards from the Plans page. lot: "std" = first carousel, "large" = "Plans for Larger Lots".
const PLANS = [
  { n: "01", name: "Alpine", beds: 5, bedsLabel: "5", baths: "4.5", sqft: 4018, lot: "std" },
  { n: "02", name: "Kalispell", beds: 5, bedsLabel: "5", baths: "4.5", sqft: 3974, lot: "std", photo: true },
  { n: "03", name: "Spokane", beds: 4, bedsLabel: "4", baths: "3.5", sqft: 3680, lot: "std", photo: true },
  { n: "04", name: "Whitefish", beds: 3, bedsLabel: "3–5", baths: "2–3", sqft: 2628, lot: "std", photo: true },
  { n: "05", name: "Banff", beds: 4, bedsLabel: "4", baths: "3.5", sqft: 2848, lot: "std", photo: true },
  { n: "06", name: "Taos", beds: 4, bedsLabel: "4", baths: "2.5", sqft: 2267, lot: "std" },
  { n: "07", name: "Moraine", beds: 4, bedsLabel: "4", baths: "3.5", sqft: 2552, lot: "std" },
  { n: "08", name: "Portland", beds: 5, bedsLabel: "5", baths: "4.5", sqft: 3432, lot: "std" },
  { n: "09", name: "Whistler", beds: 4, bedsLabel: "4", baths: "3.5", sqft: 2791, lot: "std" },
  { n: "10", name: "California", beds: 4, bedsLabel: "4", baths: "3.5", sqft: 3650, lot: "large" },
  { n: "11", name: "Glacier", beds: 4, bedsLabel: "4", baths: "2.5", sqft: 2771, lot: "large" },
  { n: "12", name: "Cascade", beds: 4, bedsLabel: "4", baths: "3.5", sqft: 3028, lot: "large" },
  { n: "13", name: "Houston", beds: 5, bedsLabel: "5", baths: "3.5", sqft: 4284, lot: "large" },
  { n: "14", name: "Teton", beds: 4, bedsLabel: "4", baths: "3.5", sqft: 2981, lot: "large" },
  { n: "15", name: "Tennessee", beds: 3, bedsLabel: "3", baths: "2.5", sqft: 2626, lot: "large" },
  { n: "16", name: "Tennessee 4-Bed", beds: 4, bedsLabel: "4", baths: "2.5", sqft: 3120, lot: "large" },
  { n: "17", name: "San Juan", beds: 4, bedsLabel: "4", baths: "3.5", sqft: 2292, lot: "large" },
  { n: "18", name: "Prairie", beds: 4, bedsLabel: "4", baths: "2.5", sqft: 2432, lot: "large", note: "Optional upstairs" },
];

const DOCS = "https://www.milestonehomesok.com/_files/ugd/";
const COMMUNITIES = [
  {
    name: "Hickory Falls", img: hickoryFalls, schools: "Sapulpa Schools",
    facts: [["Lots", "½+ acre"], ["Lots from", "$95,000"], ["Homes from", "the $500s"]],
    docs: [["Plat", "9de7ae_da5c61f784f140e3bf2a4b798e12fa4b.pdf"], ["Covenants", "9de7ae_036930f77afa499fb829b6c543be4f7f.pdf"], ["Available lots", "9de7ae_8717fa4136ab40f5883b0910f2ec7a2a.pdf"]],
  },
  {
    name: "StoneCreek", img: stoneCreek, schools: "Jenks Schools",
    facts: [["Lots", "½+ acre"], ["Lots from", "$155,000"], ["Homes from", "the high $700s"]],
    docs: [["Plat", "9de7ae_cbdd9dda58fd416ab38e28d73617a468.pdf"], ["Covenants", "9de7ae_90763b2ff88b475da556881913338fc4.pdf"], ["Available lots", "9de7ae_a7857d6bebed4d7cbe051b1f05a36dc1.pdf"]],
  },
  {
    name: "The Grove", img: theGrove, schools: "Sapulpa Schools",
    facts: [["Setting", "Gated & private"], ["Lots from", "$98,000"], ["Homes from", "the $450s"]],
    docs: [], docsNote: "Plat and covenants available on request",
  },
];

const SOLD = [
  ["719 W 110th Pl", sold110],
  ["905 W 85th", sold85],
  ["6601 S Joshua", soldJoshua],
];

const GALLERY = {
  Exteriors: ["g02", "g08", customBuild, "g12", "g13", "g15", "g17", stoneEstate],
  Kitchens: ["g27", "g35", "g37", "g45", "g47"],
  Living: ["g53", "g54", "g57", "g58", livingVaulted, "g-living2"],
  Baths: ["g01", "g-bath2", "g-bath3", "g-bath4"],
  Sketches: SKETCHES,
};

const TIMELINE = [
  ["1974", "Jim Beale founds Beale Company Builders in Tulsa."],
  ["1984", "Rob Miles graduates from Oklahoma State and joins his father-in-law's company."],
  ["1988", "Rob joins the Home Builders Association of Greater Tulsa."],
  ["1993", "Rob founds Milestone Homes."],
  ["2011", "Rob serves as President of the HBA of Greater Tulsa."],
  ["Today", "1,700+ homes and 25 neighborhoods, with a third generation on the team."],
];

const VALUES = ["Faith", "Integrity", "Intentionality", "Energy", "Enthusiasm", "Empathy", "Resilience", "Confidence", "Commitment", "Care", "Content", "Excellence"];

// Verbatim from the Testimonials section of milestonehomesok.com/about
const TESTIMONIALS = [
  ["I can't say enough good things about working with Milestone Homes and Rob Miles when building my house in Stonebrooke. Milestone Homes did everything from helping me design a custom layout to the final build. Rob was patient with me and my build needs, while explaining any question I had in detail I could easily understand. The end result was a home I am very proud of!", "John Belie"],
  ["My husband and I have known Rob Miles/Milestone Homes since 2000 when he built our new home in Sapulpa. We have been very happy with our home for the last 16 years and recently decided to add a mother-in-law suite. We contacted Rob to help us design our new addition and we couldn't be happier with the final result. Our concerns were the curb appeal and making the addition work with our unique situation. Rob was able to give us a design that worked great and also greatly improved the curb appeal of our house! The process was handled professionally and timely and Rob was very patient with us as we changed our mind a 'few' times and Bailey was always there to see that things were going smoothly. I highly recommend Milestone Homes!!!!!!", "Julie and Edgar Mercado"],
  ["We have had experience of building two custom homes. We used Milestone to build each home. The first home building experience was a new process to us. Rob and his staff made it as easy for us as possible. It was a rewarding experience in which we were involved in and were consulted with in the process. We were very comfortable when we used Milestone to build our ‘estate’ home that we currently live in. Rob once again made the building process as fun and rewarding as possible.", "Krystye and Chuck McKinney"],
];

const BADGES = [
  [badgeHba, "Home Builders Association of Greater Tulsa", "https://www.tulsahba.com/"],
  [badgeCpb, "OSHBA Certified Professional Builder", "https://www.okhba.org/"],
  [badgeNahb, "National Association of Home Builders member", "https://www.nahb.org/"],
];

const fmt = (n) => n.toLocaleString("en-US");
const src = (x) => (typeof x === "string" && PHOTOS[x]) || x;

// ------------------------------------------------------------ Small pieces
function Eyebrow({ children, light }) {
  return <span className={`eyebrow${light ? " is-light" : ""}`}><Ruler size={14} aria-hidden="true" />{children}</span>;
}

function DimLine({ label }) {
  return (
    <div className="dimline" aria-hidden="true">
      <span className="dimline-tick" /><span className="dimline-rule" /><span className="dimline-label">{label}</span><span className="dimline-rule" /><span className="dimline-tick" />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="topline">
        <span>Building Made Simple · Custom homes in the Tulsa area since 1993</span>
        <a href={PHONE_HREF}><Phone size={13} /> {PHONE}</a>
      </div>
      <div className="nav-row">
        <a href="#top" className="brand" aria-label="Milestone Homes home"><img src={logo} alt="Milestone Homes" width="104" height="72" /></a>
        <nav className={`nav${open ? " is-open" : ""}`} aria-label="Main">
          {NAV.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-phone" href={PHONE_HREF}><Phone size={16} /> {PHONE}</a>
        </nav>
        <a className="btn btn-gold nav-cta" href="#schedule"><CalendarCheck size={17} /> Schedule</a>
        <button className="nav-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <Eyebrow light>Custom home builder · Tulsa, Oklahoma</Eyebrow>
        <h1>We can help you build your <em>dream home.</em></h1>
        <p className="hero-lede">A full custom home, one of our floor plans, or a lot in one of our neighborhoods. Since 1993, Rob Miles and his family have guided more than 1,700 Tulsa-area families from first sketch to front door.</p>
        <div className="hero-ctas">
          <a className="btn btn-gold" href="#schedule"><CalendarCheck size={18} /> Schedule an Appointment</a>
          <a className="btn btn-ghost" href="#plans">Browse floor plans <ArrowRight size={18} /></a>
        </div>
        <a className="hero-call" href={PHONE_HREF}>
          <img src={allison} alt="" loading="eager" />
          <span><small>Call Allison</small><strong>{PHONE}</strong></span>
        </a>
      </div>
      <div className="hero-sheet">
        <div className="hero-frame">
          <img src={heroHome} alt="White farmhouse-style Milestone home with board-and-batten garage doors and a metal-roof porch" />
          <span className="corner c1" /><span className="corner c2" /><span className="corner c3" /><span className="corner c4" />
        </div>
        <div className="hero-dim-x" aria-hidden="true"><span>Kalispell plan · 3,974 sq ft</span></div>
        <div className="hero-dim-y" aria-hidden="true"><span>5 bed · 4.5 bath</span></div>
        <div className="title-block" aria-hidden="true">
          <img src={mark} alt="" />
          <dl>
            <div><dt>Project</dt><dd>Your home</dd></div>
            <div><dt>Builder</dt><dd>Milestone Homes</dd></div>
            <div><dt>Location</dt><dd>Tulsa metro, OK</dd></div>
            <div><dt>Sheet</dt><dd>A-1</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats" aria-label="Milestone Homes by the numbers">
      {STATS.map(([value, label]) => (
        <div className="stat" key={label}>
          <strong>{value}</strong><span>{label}</span>
        </div>
      ))}
    </section>
  );
}

function Build() {
  return (
    <section className="build section" id="build">
      <div className="wrap build-grid">
        <div className="build-copy">
          <Eyebrow>Building made simple</Eyebrow>
          <h2>If you can dream it, <em>we can build it.</em></h2>
          <p>Building a home is not a simple or easy experience. That is why we are here. Our process has been refined over decades and more than 1,700 customers, and it comes down to three steps.</p>
          <blockquote>“Many people in the home building industry cringe at the word custom, but to us that is a word we thrive on.”</blockquote>
        </div>
        <ol className="process">
          {PROCESS.map(([n, title, text]) => (
            <li key={n}>
              <span className="process-n">{n}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </li>
          ))}
        </ol>
      </div>
      <div className="wrap ways">
        {WAYS.map(([title, text, href, cta], i) => (
          <a className="way" href={href} key={title}>
            <span className="way-n">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <span className="way-cta">{cta} <ArrowRight size={16} /></span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Plans({ onAsk }) {
  const [lot, setLot] = useState("all");
  const [beds, setBeds] = useState(0);
  const [sort, setSort] = useState("size-asc");
  const [active, setActive] = useState(null);
  const list = useMemo(() => {
    const filtered = PLANS.filter((p) => (lot === "all" || p.lot === lot) && (beds === 0 || p.beds >= beds || (p.bedsLabel === "3–5" && beds <= 5)));
    return [...filtered].sort((a, b) => (sort === "size-asc" ? a.sqft - b.sqft : sort === "size-desc" ? b.sqft - a.sqft : a.n.localeCompare(b.n)));
  }, [lot, beds, sort]);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => { if (e.key === "Escape") setActive(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [active]);

  return (
    <section className="plans section blueprint" id="plans">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Eyebrow light>Floor plans</Eyebrow>
            <h2>Find a plan, <em>then make it yours.</em></h2>
          </div>
          <p>Eighteen of our plans, from 2,267 to 4,284 square feet. Every one can be changed, and more plans are available on request. Pricing is quoted per lot, so just ask.</p>
        </div>
        <div className="plan-filters" role="group" aria-label="Filter plans">
          <div className="seg">
            {[["all", "All lots"], ["std", "Standard lots"], ["large", "Larger lots"]].map(([v, l]) => (
              <button key={v} type="button" className={lot === v ? "is-on" : ""} onClick={() => setLot(v)} aria-pressed={lot === v}>{l}</button>
            ))}
          </div>
          <div className="seg">
            {[[0, "Any beds"], [4, "4+ beds"], [5, "5 beds"]].map(([v, l]) => (
              <button key={v} type="button" className={beds === v ? "is-on" : ""} onClick={() => setBeds(v)} aria-pressed={beds === v}>{l}</button>
            ))}
          </div>
          <label className="sort">Sort
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="size-asc">Size: small to large</option>
              <option value="size-desc">Size: large to small</option>
              <option value="sheet">Sheet number</option>
            </select>
          </label>
          <span className="plan-count">{list.length} plans</span>
        </div>
        <div className="plan-grid">
          {list.map((p) => (
            <button type="button" className="plan-card" key={p.n} onClick={() => setActive(p)} aria-label={`${p.name} plan, ${p.bedsLabel} bedrooms, ${p.baths} baths, ${fmt(p.sqft)} square feet. Open floor plan.`}>
              <span className={`plan-elev${p.photo ? " is-photo" : ""}`}><img src={PLAN_IMGS[`elev-${p.n}`]} alt="" loading="lazy" /></span>
              <span className="plan-block">
                <span className="plan-name"><small>Plan</small>{p.name}</span>
                <span className="plan-sheet"><small>Sheet</small>A-{p.n}</span>
                <span className="plan-spec"><b>{p.bedsLabel}</b> bed</span>
                <span className="plan-spec"><b>{p.baths}</b> bath</span>
                <span className="plan-spec"><b>{fmt(p.sqft)}</b> sq ft</span>
              </span>
              {p.lot === "large" && <span className="plan-tag">Larger lot</span>}
            </button>
          ))}
        </div>
        <p className="plan-hint">Swipe for more plans →</p>
        <div className="sketch-strip" aria-label="Hand-drawn elevations from the Milestone design table">
          <div className="sketch-head"><Eyebrow light>Creative designs</Eyebrow><p>Hand-drawn elevations from our design table. Don’t see it? We’ll draw it.</p></div>
          <div className="sketch-track">
            {[...SKETCHES, ...SKETCHES].map((s, i) => <img key={i} src={s} alt="" loading="lazy" />)}
          </div>
        </div>
      </div>
      {active && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${active.name} plan`} onMouseDown={(e) => { if (e.target === e.currentTarget) setActive(null); }}>
          <div className="plan-modal">
            <button type="button" className="lb-close" onClick={() => setActive(null)} aria-label="Close"><X /></button>
            <img src={PLAN_IMGS[`card-${active.n}`]} alt={`${active.name} plan sheet with elevation and floor plan`} />
            <div className="plan-modal-side">
              <span className="mono">Sheet A-{active.n} · {active.lot === "large" ? "Larger lots" : "Standard lots"}</span>
              <h3>{active.name} Plan</h3>
              <dl>
                <div><dt>Bedrooms</dt><dd>{active.bedsLabel}</dd></div>
                <div><dt>Baths</dt><dd>{active.baths}</dd></div>
                <div><dt>Square feet</dt><dd>{fmt(active.sqft)}</dd></div>
                {active.note && <div><dt>Note</dt><dd>{active.note}</dd></div>}
              </dl>
              <p>Inquire on pricing. Any plan can be adjusted to your lot and your family.</p>
              <button type="button" className="btn btn-gold" onClick={() => { onAsk(active.name); setActive(null); }}>Ask about this plan <ArrowRight size={17} /></button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Communities() {
  return (
    <section className="communities section" id="communities">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Eyebrow>Communities</Eyebrow>
            <h2>Half-acre homesites, <em>south and west of Tulsa.</em></h2>
          </div>
          <p>Rob has developed 25 neighborhoods in the Tulsa metro. These are the ones building now, with more on the way. Or bring your own land.</p>
        </div>
        <div className="comm-grid">
          {COMMUNITIES.map((c) => (
            <article className="comm" key={c.name}>
              <div className="comm-img"><img src={c.img} alt={`${c.name} entrance`} loading="lazy" /><span>{c.schools}</span></div>
              <div className="comm-body">
                <h3>{c.name}</h3>
                <dl>{c.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                <div className="comm-docs">
                  {c.docs.map(([label, file]) => <a key={label} href={DOCS + file} target="_blank" rel="noopener noreferrer"><FileText size={15} /> {label}</a>)}
                  {c.docsNote && <span>{c.docsNote}</span>}
                </div>
              </div>
            </article>
          ))}
          <article className="comm comm-land">
            <div className="comm-img"><img src={landAerial} alt="Aerial view of a wooded homesite near Tulsa" loading="lazy" /></div>
            <div className="comm-body">
              <h3>On your land</h3>
              <p>Already own a lot or acreage? We build there too. New developments are also coming soon.</p>
              <a className="btn btn-navy" href={PHONE_HREF}><Phone size={16} /> Call {PHONE}</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function ForSale() {
  return (
    <section className="forsale section" id="for-sale">
      <div className="wrap forsale-grid">
        <div className="forsale-copy">
          <Eyebrow>For sale</Eyebrow>
          <h2>Homes and lots <em>move fast.</em></h2>
          <p>Our recent listings have all sold. Ask what is coming up next, or pick a homesite and we will build it.</p>
          <div className="forsale-ctas">
            <a className="btn btn-navy" href="#schedule">Ask about upcoming homes</a>
            <a className="text-link" href="#communities">See available lots <ArrowRight size={16} /></a>
          </div>
        </div>
        <div className="sold-row">
          {SOLD.map(([addr, img]) => (
            <figure className="sold" key={addr}>
              <img src={img} alt={`Milestone home at ${addr}`} loading="lazy" />
              <span className="stamp">Sold</span>
              <figcaption>{addr}</figcaption>
            </figure>
          ))}
          <figure className="sold sold-lots">
            <img src={lotsAerial} alt="Aerial view of a Milestone neighborhood under development" loading="lazy" />
            <figcaption>Lots for sale</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const tabs = Object.keys(GALLERY);
  const [tab, setTab] = useState(tabs[0]);
  const [idx, setIdx] = useState(-1);
  const items = GALLERY[tab].map(src);
  useEffect(() => {
    if (idx < 0) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setIdx(-1);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [idx, items.length]);
  return (
    <section className="gallery section" id="gallery">
      <div className="wrap">
        <div className="section-head">
          <div><Eyebrow>Gallery</Eyebrow><h2>Homes we’ve <em>built.</em></h2></div>
          <div className="tabs" role="tablist" aria-label="Gallery categories">
            {tabs.map((t) => <button key={t} type="button" role="tab" aria-selected={tab === t} className={tab === t ? "is-on" : ""} onClick={() => { setTab(t); setIdx(-1); }}>{t}</button>)}
          </div>
        </div>
        <div className={`masonry${tab === "Sketches" ? " is-sketch" : ""}`}>
          {items.map((im, i) => (
            <button type="button" key={tab + i} onClick={() => setIdx(i)} aria-label={`Open ${tab.toLowerCase()} photo ${i + 1}`}>
              <img src={im} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
      {idx >= 0 && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${tab} photo`} onMouseDown={(e) => { if (e.target === e.currentTarget) setIdx(-1); }}>
          <button type="button" className="lb-close" onClick={() => setIdx(-1)} aria-label="Close"><X /></button>
          <button type="button" className="lb-nav lb-prev" onClick={() => setIdx((i) => (i - 1 + items.length) % items.length)} aria-label="Previous"><ChevronLeft /></button>
          <img className={`lb-img${tab === "Sketches" ? " is-sketch" : ""}`} src={items[idx]} alt={`${tab} photo ${idx + 1} of ${items.length}`} />
          <button type="button" className="lb-nav lb-next" onClick={() => setIdx((i) => (i + 1) % items.length)} aria-label="Next"><ChevronRight /></button>
          <span className="lb-count">{idx + 1} / {items.length}</span>
        </div>
      )}
    </section>
  );
}

function About() {
  return (
    <section className="about section blueprint" id="about">
      <div className="wrap">
        <div className="about-top">
          <div>
            <Eyebrow light>Who we are</Eyebrow>
            <h2>Three generations <em>of Tulsa builders.</em></h2>
            <p>What we enjoy most is the friendships created while building a customer’s home. We hope you walk away with a quality home, a great experience, and a love for life.</p>
          </div>
          <figure className="about-photo"><img src={robAndBailey} alt="Rob and Bailey Miles" loading="lazy" /><figcaption>Rob &amp; Bailey Miles</figcaption></figure>
        </div>
        <ol className="timeline">
          {TIMELINE.map(([year, text]) => (
            <li key={year}><span className="tl-year">{year}</span><span className="tl-dot" /><p>{text}</p></li>
          ))}
        </ol>
        <div className="team">
          <article className="person">
            <img src={robMiles} alt="Rob Miles" loading="lazy" />
            <div>
              <h3>Rob Miles <small>Founder</small></h3>
              <p>A Jenks native, Rob has built in the Tulsa metro since 1984 and has developed 25 neighborhoods and built over 1,700 homes. He has been a member of the HBA of Greater Tulsa since 1988, served as its President in 2011, and still sits on its Board of Directors and the board of Nature Works of Tulsa. Off the clock, you’ll find him at his ranch.</p>
            </div>
          </article>
          <article className="person">
            <div className="person-initial" aria-hidden="true">BM</div>
            <div>
              <h3>Bailey Miles <small>3rd-generation builder</small></h3>
              <p>Bailey designs homes and developments meant to be timeless and does a little of everything for Milestone. An Oklahoma State graduate (2015) and former Furman basketball staffer, he is President of the Tulsa HBA’s Builder and Developers Council and the Southwest Chapter, and serves on the HBA of Greater Tulsa board and the Salvation Army Boys &amp; Girls Club of Metro Tulsa board.</p>
            </div>
          </article>
        </div>
        <div className="values" aria-label="Our values">
          <span className="values-label">Our values</span>
          {VALUES.map((v) => <span key={v}>{v}</span>)}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="testimonials section" id="testimonials">
      <div className="wrap">
        <div className="section-head">
          <div><Eyebrow>Homeowners</Eyebrow><h2>In their <em>own words.</em></h2></div>
          <p className="source-note">Testimonials as published on milestonehomesok.com.</p>
        </div>
        <div className="quotes">
          {TESTIMONIALS.map(([text, who]) => (
            <figure className="quote" key={who}>
              <blockquote>{text}</blockquote>
              <figcaption>{who}</figcaption>
            </figure>
          ))}
        </div>
        <div className="badges">
          {BADGES.map(([img, label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}><img src={img} alt={label} loading="lazy" /></a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Schedule({ plan }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", interest: "Custom home", plan: "", date: "", notes: "", website: "" });
  const [status, setStatus] = useState("idle");
  useEffect(() => { if (plan) setForm((f) => ({ ...f, interest: "One of your floor plans", plan })); }, [plan]);
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await r.json().catch(() => ({}));
      setStatus(r.ok && d.success ? (d.demo ? "demo" : "sent") : "error");
    } catch { setStatus("demo"); }
  }
  return (
    <section className="schedule section" id="schedule">
      <div className="wrap schedule-grid">
        <div className="schedule-info">
          <Eyebrow light>Schedule an appointment</Eyebrow>
          <h2>Let’s meet up <em>and dream up.</em></h2>
          <p>Tell us a little about what you want to build and when you’d like to talk. Or skip the form and call.</p>
          <a className="call-card" href={PHONE_HREF}>
            <img src={allison} alt="Allison of Milestone Homes" loading="lazy" />
            <span><small>Call Allison</small><strong>{PHONE}</strong></span>
          </a>
          <ul className="contact-list">
            <li><Mail size={18} /><a href={`mailto:${EMAIL}?subject=Build%20My%20Dream%20Home!`}>{EMAIL}</a></li>
            <li><MapPin size={18} /><a href={MAP_URL} target="_blank" rel="noopener noreferrer">{ADDRESS}</a></li>
          </ul>
          <div className="map"><iframe title="Map to Milestone Homes" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        </div>
        <form className="sched-form" onSubmit={submit}>
          {status === "sent" || status === "demo" ? (
            <div className="sent">
              <CalendarCheck size={40} />
              <h3>Thanks, {form.name.split(" ")[0] || "friend"}.</h3>
              <p>{status === "demo" ? "This concept isn’t connected to email yet, so nothing was sent. On the live site this request goes straight to the Milestone team." : "Your request is in. We’ll reach out to set a time."}</p>
            </div>
          ) : (
            <>
              <div className="form-title"><span className="mono">Appointment request</span><span className="mono">Form A-2</span></div>
              <label>Name<input required value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" /></label>
              <div className="row2">
                <label>Phone<input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" /></label>
                <label>Email<input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" /></label>
              </div>
              <label>I’m interested in
                <select value={form.interest} onChange={(e) => update("interest", e.target.value)}>
                  <option>Custom home</option>
                  <option>One of your floor plans</option>
                  <option>A lot in Hickory Falls</option>
                  <option>A lot in StoneCreek</option>
                  <option>A lot in The Grove</option>
                  <option>Building on my land</option>
                  <option>An available home</option>
                  <option>Something else</option>
                </select>
              </label>
              <div className="row2">
                <label>Plan (optional)
                  <select value={form.plan} onChange={(e) => update("plan", e.target.value)}>
                    <option value="">No plan yet</option>
                    {PLANS.map((p) => <option key={p.n} value={p.name}>{p.name}</option>)}
                  </select>
                </label>
                <label>Preferred date<input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} /></label>
              </div>
              <label>Tell us about your dream home<textarea rows={4} value={form.notes} onChange={(e) => update("notes", e.target.value)} /></label>
              <div className="hp" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>
              {status === "error" && <p className="form-error" role="alert">That didn’t go through. Please call {PHONE}.</p>}
              <button className="btn btn-gold btn-full" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : <>Request my appointment <ArrowUpRight size={18} /></>}</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <img src={logo} alt="Milestone Homes" loading="lazy" />
          <p>Custom homes, floor plans and neighborhoods in the Tulsa metro since 1993.</p>
          <div className="socials">
            {SOCIAL_LINKS.filter(([, href]) => href).map(([label, href, Icon]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>{Icon ? <Icon size={18} /> : <span className="houzz">h</span>}</a>
            ))}
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          {NAV.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
        <div>
          <h4>Contact</h4>
          <a href={PHONE_HREF}>{PHONE}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={MAP_URL} target="_blank" rel="noopener noreferrer">{ADDRESS}</a>
        </div>
        <div>
          <h4>Memberships</h4>
          {BADGES.map(([, label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>)}
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} {COMPANY}. Concept redesign by Blueprint WebStudio · Independent concept · not for official use. Current site: <a href={ORIGINAL}>milestonehomesok.com</a></span>
        <StudioCredit />
      </div>
    </footer>
  );
}

export default function App() {
  const [askPlan, setAskPlan] = useState("");
  const onAsk = (name) => {
    setAskPlan(name);
    requestAnimationFrame(() => document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" }));
  };
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Build />
        <Plans onAsk={onAsk} />
        <Communities />
        <ForSale />
        <Gallery />
        <About />
        <Testimonials />
        <Schedule plan={askPlan} />
      </main>
      <Footer />
      <ConceptWidget company={COMPANY} abbr={ABBR} endDate={END_DATE} />
    </>
  );
}
