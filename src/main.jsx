import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  GraduationCap,
  Laptop,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Sigma,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import "./styles.css";

const contact = {
  email: "guez.ofer@gmail.com",
  phone: "07942 740306",
  location: "London and online",
};

const subjects = [
  "GCSE and IGCSE Maths",
  "A-level Maths",
  "KS2 and KS3 support",
  "Computer Science and coding projects",
  "Problem solving and exam preparation",
];

const strengths = [
  {
    icon: Brain,
    title: "Understanding before shortcuts",
    text: "Lessons focus on why methods work, so students can adapt when exam questions look unfamiliar.",
  },
  {
    icon: Target,
    title: "Structured practice",
    text: "Each topic is broken into clear steps, checked with worked examples, then strengthened with targeted questions.",
  },
  {
    icon: Laptop,
    title: "Real technical context",
    text: "Ofer brings a software engineering background into tutoring, making abstract ideas feel more concrete.",
  },
];

const levels = [
  {
    title: "GCSE Maths",
    text: "Core skills, exam readiness, confidence with algebra, graphs, number, ratio, geometry and problem solving.",
  },
  {
    title: "A-level Maths",
    text: "Conceptual support for Year 12 and Year 13 students, with attention to technique, fluency and exam strategy.",
  },
  {
    title: "Younger Learners",
    text: "KS2 and KS3 foundations for pupils who need patient explanations, steady practice and stronger habits.",
  },
  {
    title: "Coding Mentoring",
    text: "Computer Science, React/JavaScript, Python, C#, C++ and practical project guidance for motivated students.",
  },
];

const process = [
  "Start with the student's current topic, confidence level and immediate school goals.",
  "Explain the idea plainly, then work through examples together.",
  "Practise independently with guidance, spotting gaps before they become habits.",
  "Finish with a short recap and a useful next step for revision.",
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
        <a className="brand" href="#top" aria-label="Ofer Guez home">
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
          <a href="#approach" onClick={closeMenu}>Approach</a>
          <a href="#subjects" onClick={closeMenu}>Subjects</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">GCSE and A-level maths support in London and online</p>
          <h1>Private maths tutoring that builds real understanding.</h1>
          <p className="hero-text">
            Patient, structured lessons for students who want clearer explanations,
            stronger exam technique and more confidence with problem solving.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={enquiryHref}>
              <Mail size={18} />
              Enquire now
            </a>
            <a className="button secondary" href="#approach">
              See approach
              <ArrowRight size={18} />
            </a>
          </div>
          <div className="contact-strip" aria-label="Contact details">
            <span><Phone size={16} /> {contact.phone}</span>
            <span><MapPin size={16} /> {contact.location}</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Maths tutoring desk scene">
          <img src="/assets/maths-tutoring-desk.png" alt="" />
          <div className="hero-note">
            <Sparkles size={18} />
            <span>Clear explanations, steady practice, useful feedback.</span>
          </div>
        </div>
      </section>

      <section className="section intro-band" aria-label="Tutoring summary">
        <div>
          <strong>Teaching focus</strong>
          <p>{subjects.join(" · ")}</p>
        </div>
        <a className="text-link" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
      </section>

      <section className="section" id="approach">
        <div className="section-heading">
          <p className="eyebrow">Approach</p>
          <h2>Lessons shaped around how the student thinks.</h2>
        </div>
        <div className="feature-grid">
          {strengths.map(({ icon: Icon, title, text }) => (
            <article className="feature-card" key={title}>
              <Icon size={28} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section" id="subjects">
        <div className="section-heading">
          <p className="eyebrow">Subjects</p>
          <h2>Focused support from foundations to exam preparation.</h2>
          <p>
            Ofer works with students across school levels, with particular strength
            in GCSE, A-level and practical computing.
          </p>
        </div>
        <div className="level-list">
          {levels.map((level) => (
            <article className="level-row" key={level.title}>
              <CheckCircle2 size={22} />
              <div>
                <h3>{level.title}</h3>
                <p>{level.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section process-section">
        <div className="section-heading">
          <p className="eyebrow">Session flow</p>
          <h2>A calm rhythm for making progress.</h2>
        </div>
        <ol className="process-list">
          {process.map((step, index) => (
            <li key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-section" id="about">
        <div>
          <p className="eyebrow">About Ofer</p>
          <h2>Maths, Computer Science and professional software experience.</h2>
        </div>
        <div className="about-copy">
          <p>
            Ofer has a BSc in Mathematics and Computer Science from Tel Aviv
            University and a professional background building complex .NET/C#
            software systems. His tutoring experience includes Action Tutoring,
            GCSE pupils, A-level maths support and mentoring student coding projects.
          </p>
          <p>
            The aim is practical and human: help students understand the material,
            practise with purpose and feel less stuck when a question changes shape.
          </p>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Ask about availability.</h2>
          <p>
            Send the student year group, current topic, preferred format and useful
            times. Ofer offers online lessons and in-person tutoring across London.
          </p>
        </div>
        <div className="contact-panel">
          <a href={`tel:${contact.phone.replaceAll(" ", "")}`}>
            <Phone size={20} />
            {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`}>
            <Mail size={20} />
            {contact.email}
          </a>
          <a href={enquiryHref} className="button primary">
            <MessageCircle size={18} />
            Start an enquiry
          </a>
        </div>
      </section>

      <footer>
        <span>Ofer Guez Maths Tutoring</span>
        <span>London · Online · GCSE · A-level</span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
