import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Menu,
  Phone,
  Sigma,
  X,
} from "lucide-react";
import landingImage from "../assets/friendly-maths-landing.png";
import "./styles.css";

const contact = {
  email: "guez.ofer@gmail.com",
  phone: "07942 740306",
  location: "Islington/Hackney and online",
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

const themes = [
  { id: "default", emoji: "🎨", label: "Default" },
  { id: "ocean", emoji: "🌊", label: "Ocean" },
  { id: "sunset", emoji: "🌅", label: "Sunset" },
  { id: "forest", emoji: "🌲", label: "Forest" },
  { id: "midnight", emoji: "🌙", label: "Midnight" },
];

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [returnTarget, setReturnTarget] = React.useState("top");
  const [currentTheme, setCurrentTheme] = React.useState("default");

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("maths-theme") || "default";
    setCurrentTheme(savedTheme);
    if (savedTheme !== "default") {
      document.documentElement.setAttribute("data-scheme", savedTheme);
    }
  }, []);

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem("maths-theme", themeId);
    if (themeId === "default") {
      document.documentElement.removeAttribute("data-scheme");
    } else {
      document.documentElement.setAttribute("data-scheme", themeId);
    }
  };

  const closeMenu = () => setMenuOpen(false);
  const openContactFrom = (target) => {
    setReturnTarget(target);
    window.location.hash = "contact";
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ofer Guez home" onClick={closeMenu}>
          <span className="brand-mark">
            <Sigma size={32} strokeWidth={2.4} />
          </span>
          <span>
            <strong>Ofer Guez</strong>
            <small>Private Maths Tutor</small>
          </span>
        </a>

        <div className="header-controls">
          <div className="theme-selector" role="group" aria-label="Theme selector">
            {themes.map((theme) => (
              <button
                key={theme.id}
                className={`theme-button ${currentTheme === theme.id ? "active" : ""}`}
                onClick={() => handleThemeChange(theme.id)}
                title={theme.label}
                aria-pressed={currentTheme === theme.id}
              >
                {theme.emoji}
              </button>
            ))}
          </div>

          <button
            className="icon-button menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

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

      <Home openContactFrom={openContactFrom} />
      <Details />
      <Process openContactFrom={openContactFrom} />
      <About returnTarget={returnTarget} />

      <footer>
        <span>Ofer Guez Maths Tutoring</span>
        <span>{contact.location}</span>
      </footer>
    </main>
  );
}

function Home({ openContactFrom }) {
  return (
    <section className="hero page-shell" id="top">
      <div className="hero-copy">
        <p className="eyebrow">GCSE and A-level maths support</p>
        <h1>Simple, patient maths tutoring.</h1>
        <p className="hero-text">
          Private lessons in Islington/Hackney and online for students who want clearer explanations,
          steadier practice and more confidence.
        </p>
        <div className="hero-actions">
          <button className="button primary" type="button" onClick={() => openContactFrom("top")}>
            Enquire
          </button>
          <a className="button secondary" href="#details">
            Details
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      <div className="hero-visual" aria-label="Maths tutoring desk scene">
        <img src={landingImage} alt="" />
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
          available online and in Islington/Hackney.
        </p>
      </aside>
    </section>
  );
}

function Process({ openContactFrom }) {
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
        <button className="button primary" type="button" onClick={() => openContactFrom("process")}>
          Ask about times
        </button>
      </div>
    </section>
  );
}

function About({ returnTarget }) {
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
          Ofer also holds an enhanced DBS certificate, currently under renewal.
        </p>
        <p>
          The aim is practical: help students understand the material, practise with
          purpose and feel less stuck when a question changes shape.
        </p>
      </div>

      <div className="contact-card" id="contact">
        <Phone size={24} />
        <div>
          <h2>Contact</h2>
          <p>
            {contact.phone} · {contact.email}
          </p>
        </div>
        <ContactForm returnTarget={returnTarget} />
      </div>
    </section>
  );
}

function ContactForm({ returnTarget }) {
  const [status, setStatus] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      setStatus("Enquiry sent. Returning you to where you were.");
      window.setTimeout(() => {
        document.getElementById(returnTarget)?.scrollIntoView({ behavior: "smooth" });
      }, 900);
    } catch {
      setStatus(`Something went wrong. Please email ${contact.email}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="contact-form"
      action="https://formspree.io/f/mykdnwpp"
      method="POST"
      onSubmit={handleSubmit}
    >
          <label htmlFor="enquiryName">Name</label>
          <input id="enquiryName" name="name" type="text" required />

          <label htmlFor="enquiryEmail">Email</label>
          <input id="enquiryEmail" name="email" type="email" required />

          <label htmlFor="enquiryMessage">Message</label>
          <textarea
            id="enquiryMessage"
            name="message"
            rows="5"
            placeholder="Student year group, main topic or goal, online or Islington/Hackney in-person, and preferred times."
            required
          />

          <input type="hidden" name="_subject" value="Friendly Maths enquiry" />
          <input type="text" name="_gotcha" className="honeypot" tabIndex="-1" autoComplete="off" />

      <button className="button primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send enquiry"}
      </button>
      {status && (
        <p className="form-status" aria-live="polite">
          {status}
        </p>
      )}
    </form>
  );
}

createRoot(document.getElementById("root")).render(<App />);
