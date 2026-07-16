import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Mail,
  Menu,
  Phone,
  Sigma,
  X,
} from "lucide-react";
import "./styles.css";

const contact = {
  email: "guez.ofer@gmail.com",
  phone: "07942 740306",
  location: "London and online",
};

const pages = [
  { id: "details", label: "Details" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
];

const detailItems = [
  {
    title: "GCSE and IGCSE Maths",
    text: "Clear support with algebra, graphs, number, ratio, geometry and exam-style problem solving.",
  },
  {
    title: "A-level Maths",
    text: "Structured help for Year 12 and Year 13 topics, with attention to method, fluency and exam technique.",
  },
  {
    title: "KS2 and KS3 Foundations",
    text: "Patient lessons for younger learners who need stronger basics, better habits and more confidence.",
  },
];

const process = [
  "Begin with the student's current topic, school goals and confidence level.",
  "Explain the idea plainly, then work through examples together.",
  "Practise independently with guidance and quick feedback.",
  "Share clear session notes and exercises so the student can revise before the next meeting.",
];

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const enquiryHref = `mailto:${contact.email}?subject=${encodeURIComponent(
    "Maths tutoring enquiry",
  )}&body=${encodeURIComponent(
    "Hello Ofer,\n\nI am interested in maths tutoring.\n\nStudent year group:\nMain topic or goal:\nOnline or London in-person:\nPreferred times:\n\nThanks,",
  )}`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ofer Guez home" onClick={closeMenu}>
          <span className="brand-mark">
            <Sigma size={24} strokeWidth={2.4} />
          </span>
          <span>
            <strong>Ofer Guez</strong>
            <small>Private Maths Tutor</small>
          </span>
        </a>

        <button
          className="icon-button menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          {pages.map((page) => (
            <a
              href={`#${page.id}`}
              key={page.id}
              onClick={closeMenu}
            >
              {page.label}
            </a>
          ))}
        </nav>
      </header>

      <Home enquiryHref={enquiryHref} />
      <Details />
      <Process enquiryHref={enquiryHref} />
      <About enquiryHref={enquiryHref} />

      <footer>
        <span>Ofer Guez Maths Tutoring</span>
        <span>{contact.location}</span>
      </footer>
    </main>
  );
}

function Home({ enquiryHref }) {
  return (
    <section className="hero page-shell" id="top">
      <div className="hero-copy">
        <p className="eyebrow">GCSE and A-level maths support</p>
        <h1>Simple, patient maths tutoring.</h1>
        <p className="hero-text">
          Private lessons in London and online for students who want clearer explanations,
          steadier practice and more confidence.
        </p>
        <div className="hero-actions">
          <a className="button primary" href={enquiryHref}>
            <Mail size={18} />
            Enquire
          </a>
          <a className="button secondary" href="#details">
            Details
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      <div className="hero-visual" aria-label="Maths tutoring desk scene">
        <img src="/assets/friendly-maths-landing.png" alt="" />
      </div>
    </section>
  );
}

function Details() {
  return (
    <section className="page-shell detail-page" id="details">
      <div className="page-heading">
        <p className="eyebrow">Details</p>
        <h1>Support for school maths.</h1>
        <p>
          Lessons are adapted to the student's level, current school work and upcoming
          assessments.
        </p>
      </div>

      <div className="level-list">
        {detailItems.map((level) => (
          <article className="level-row" key={level.title}>
            <CheckCircle2 size={22} />
            <div>
              <h2>{level.title}</h2>
              <p>{level.text}</p>
            </div>
          </article>
        ))}
      </div>

      <aside className="details-box" aria-label="Tuition details">
        <h2>Tuition details</h2>
        <p>
          Tuition is £50 per hour. The first introductory meeting is free. Lessons are
          available online and in London.
        </p>
      </aside>
    </section>
  );
}

function Process({ enquiryHref }) {
  return (
    <section className="page-shell detail-page" id="process">
      <div className="page-heading">
        <p className="eyebrow">Process</p>
        <h1>A calm lesson rhythm.</h1>
        <p>
          Each session is focused, practical and easy to follow, with time for
          explanation and independent practice.
        </p>
      </div>

      <ol className="process-list">
        {process.map((step, index) => (
          <li key={step}>
            <span>{index + 1}</span>
            <p>{step}</p>
          </li>
        ))}
      </ol>

      <div className="contact-card">
        <BookOpen size={24} />
        <div>
          <h2>Introductory meeting</h2>
          <p>
            The first introductory meeting is free. Regular tuition is £50 per hour.
          </p>
        </div>
        <a className="button primary" href={enquiryHref}>
          <Mail size={18} />
          Ask about times
        </a>
      </div>
    </section>
  );
}

function About({ enquiryHref }) {
  return (
    <section className="page-shell detail-page about-page" id="about">
      <div className="page-heading">
        <p className="eyebrow">About</p>
        <h1>Maths, computing and clear explanations.</h1>
      </div>

      <div className="about-copy">
        <p>
          Ofer has a BSc in Mathematics and Computer Science from Tel Aviv
          University and a professional background building complex .NET/C# software
          systems.
        </p>
        <p>
          His tutoring experience includes Action Tutoring, GCSE pupils, A-level
          maths support and mentoring student coding projects.
        </p>
        <p>
          Ofer also holds an enhanced DBS certificate.
        </p>
        <p>
          The aim is practical: help students understand the material, practise with
          purpose and feel less stuck when a question changes shape.
        </p>
      </div>

      <div className="contact-card">
        <Phone size={24} />
        <div>
          <h2>Contact</h2>
          <p>
            {contact.phone} · {contact.email}
          </p>
        </div>
        <a className="button primary" href={enquiryHref}>
          <Mail size={18} />
          Enquire
        </a>
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
