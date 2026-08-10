import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Menu,
  Phone,
  X,
} from "lucide-react";
import landingImage from "../assets/friendly-maths-landing.png";
import logoImage from "../assets/friendly-maths-logo-mark.png";
import "./styles.css";

const contact = {
  email: "guez.ofer@gmail.com",
  phone: "07942 740306",
  location: "Islington/Hackney and online",
};

const pages = [
  {
    id: "home",
    label: "Home",
    path: "/",
    title: "Maths Tutor in Islington & Hackney | Ofer Guez",
    description:
      "Patient GCSE maths tutoring in Islington and Hackney, with online support for GCSE, KS2/KS3 foundations and A-level Maths.",
  },
  {
    id: "details",
    label: "Details",
    path: "/details",
    title: "GCSE Maths Tutoring | Ofer Guez",
    description:
      "GCSE Maths tutoring for Foundation and Higher tier, plus KS2/KS3 foundations and A-level Maths in Islington, Hackney and online.",
  },
  {
    id: "process",
    label: "Process",
    path: "/process",
    title: "How Maths Tutoring Works | Ofer Guez",
    description:
      "See how calm, practical maths tutoring combines clear explanations, guided practice, independent work and useful revision notes.",
  },
  {
    id: "resources",
    label: "Resources",
    path: "/resources",
    title: "Maths Resources and Tools | Ofer Guez",
    description:
      "Useful online calculators, graphing, geometry and maths tools for pupils studying GCSE and A-level Maths.",
  },
  {
    id: "about",
    label: "About",
    path: "/about",
    title: "About Ofer Guez | Maths Tutor in Islington",
    description:
      "Meet Ofer Guez, a maths tutor in Islington with a BSc in Mathematics and Computer Science, an MA in Philosophy and an enhanced DBS certificate.",
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact",
    title: "Contact Ofer Guez | Maths Tutor",
    description:
      "Contact Ofer Guez about GCSE Maths, A-level Maths or online maths tutoring in Islington and Hackney, and arrange a free introductory meeting.",
  },
];
const navigationPages = pages;
const siteUrl = "https://friendly-maths.com";

const detailItems = [
  {
    title: "GCSE Maths — Foundation and Higher",
    text: "Foundation and Higher tier topics and exam questions.",
  },
  {
    title: "A-level Maths",
    text: "Year 12 and Year 13 topics, fluency and exam technique.",
  },
  {
    title: "KS2 and KS3 Foundations",
    text: "Stronger foundations, working habits and confidence.",
  },
];

const audienceItems = [
  "Cover earlier gaps and build confidence through practice",
  "Want to understand maths rather than memorise methods",
  "More guided practice or exam technique would help",
];

const process = [
  "Begin with the student's current topic, school goals and confidence level.",
  "Explain the idea plainly, then work through examples together.",
  "Practise independently with guidance and quick feedback.",
  "Share clear session notes and exercises so the student can revise before the next meeting.",
];

const resources = [
  { name: "Wolfram Alpha", url: "https://www.wolframalpha.com/input" },
  { name: "Desmos calculator", url: "https://www.desmos.com/calculator" },
  { name: "Desmos Geometry", url: "https://www.desmos.com/geometry/9hidw4hpw2" },
  { name: "GeoGebra", url: "https://www.geogebra.org/classic/zzd8sxve" },
  { name: "Matcha", url: "https://www.mathcha.io/" },
];

const themes = [
  { id: "easy-focus", label: "Easy Focus" },
  { id: "number-sense", label: "Number Sense" },
  { id: "calm-geometry", label: "Calm Geometry" },
  { id: "algebra-spark", label: "Algebra Spark" },
  { id: "fraction-flow", label: "Fraction Flow" },
  { id: "graph-glow", label: "Graph Glow" },
  { id: "proof-peace", label: "Proof Peace" },
  { id: "times-table", label: "Times Table" },
  { id: "exam-calm", label: "Exam Calm" },
  { id: "confidence-curve", label: "Confidence Curve" },
];

const defaultThemeId = themes[0].id;

async function getFormErrorMessage(response) {
  const fallback = `Something went wrong. Please email ${contact.email}.`;

  try {
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await response.json();
      const errorMessages = Array.isArray(data.errors)
        ? data.errors.map((error) => error.message || error.field).filter(Boolean)
        : [];

      return errorMessages.join(" ") || data.message || data.error || fallback;
    }

    const message = await response.text();
    return message.trim() || fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [returnTarget, setReturnTarget] = React.useState("/");
  const [currentTheme, setCurrentTheme] = React.useState(defaultThemeId);
  const [themeSelectorOpen, setThemeSelectorOpen] = React.useState(false);
  const wheelDeltaRef = React.useRef(0);
  const wheelLockRef = React.useRef(false);
  const wheelLockTimeoutRef = React.useRef();
  const wheelResetTimeoutRef = React.useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const pageIndex = Math.max(
    0,
    pages.findIndex((page) => page.path === location.pathname),
  );
  const activePage = pages[pageIndex];
  const previousPage = pages[pageIndex - 1];
  const nextPage = pages[pageIndex + 1];

  React.useEffect(() => {
    document.title = activePage.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", activePage.description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", new URL(activePage.path, siteUrl).href);
  }, [activePage]);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("maths-theme");
    const nextTheme = themes.some((theme) => theme.id === savedTheme) ? savedTheme : defaultThemeId;

    setCurrentTheme(nextTheme);
    localStorage.setItem("maths-theme", nextTheme);
    if (nextTheme !== defaultThemeId) {
      document.documentElement.setAttribute("data-scheme", nextTheme);
    } else {
      document.documentElement.removeAttribute("data-scheme");
    }
  }, []);

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem("maths-theme", themeId);
    if (themeId === defaultThemeId) {
      document.documentElement.removeAttribute("data-scheme");
    } else {
      document.documentElement.setAttribute("data-scheme", themeId);
    }
  };

  const closeMenu = () => setMenuOpen(false);
  const openContactFrom = (target) => {
    setReturnTarget(target);
    navigate("/contact");
  };
  const navigateToPage = (page) => {
    if (!page) {
      return;
    }

    closeMenu();
    navigate(page.path);
  };

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest("input, textarea, select, button, a, [contenteditable='true']")
      ) {
        return;
      }

      if (event.key === "ArrowRight" || event.key === "PageDown") {
        if (nextPage) {
          event.preventDefault();
          navigate(nextPage.path);
        }
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        if (previousPage) {
          event.preventDefault();
          navigate(previousPage.path);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, nextPage, previousPage]);

  React.useEffect(() => {
    document.querySelector(".page-stage")?.scrollTo({ top: 0 });
  }, [location.pathname]);

  React.useEffect(() => {
    const handleWheel = (event) => {
      const target = event.target;
      if (
        event.ctrlKey ||
        menuOpen ||
        (target instanceof HTMLElement &&
          target.closest("input, textarea, select, [contenteditable='true']"))
      ) {
        return;
      }

      const stage = document.querySelector(".page-stage");
      const atTop = !stage || stage.scrollTop <= 1;
      const atBottom =
        !stage || stage.scrollTop + stage.clientHeight >= stage.scrollHeight - 1;

      if ((event.deltaY > 0 && !atBottom) || (event.deltaY < 0 && !atTop)) {
        wheelDeltaRef.current = 0;
        return;
      }

      if (wheelLockRef.current) {
        event.preventDefault();
        return;
      }

      wheelDeltaRef.current += event.deltaY;
      window.clearTimeout(wheelResetTimeoutRef.current);
      wheelResetTimeoutRef.current = window.setTimeout(() => {
        wheelDeltaRef.current = 0;
      }, 120);

      if (Math.abs(wheelDeltaRef.current) < 40) {
        event.preventDefault();
        return;
      }

      const destination = wheelDeltaRef.current > 0 ? nextPage : previousPage;
      wheelDeltaRef.current = 0;
      if (!destination) {
        return;
      }

      event.preventDefault();
      wheelLockRef.current = true;
      setMenuOpen(false);
      navigate(destination.path);
      wheelLockTimeoutRef.current = window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 650);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [menuOpen, navigate, nextPage, previousPage]);

  React.useEffect(
    () => () => {
      window.clearTimeout(wheelLockTimeoutRef.current);
      window.clearTimeout(wheelResetTimeoutRef.current);
    },
    [],
  );

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Ofer Guez home" onClick={closeMenu}>
          <span
            className="brand-mark"
            onDoubleClick={(event) => {
              event.preventDefault();
              setThemeSelectorOpen((open) => !open);
            }}
          >
            <img className="brand-logo" src={logoImage} alt="" />
          </span>
          <span className="brand-copy">
            <strong>Ofer Guez</strong>
            <span aria-hidden="true">|</span>
            <small>Private Maths Tutoring</small>
            <span aria-hidden="true">|</span>
            <strong>Islington/Hackney and Online</strong>
          </span>
        </Link>

        <div className="header-controls">
          {themeSelectorOpen && (
            <div className="theme-selector">
              <select
                aria-label="Colour palette"
                value={currentTheme}
                onChange={(event) => handleThemeChange(event.target.value)}
              >
                {themes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.label}
                  </option>
                ))}
              </select>
            </div>
          )}

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
          {navigationPages.map((page) => (
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to={page.path}
              key={page.id}
              onClick={closeMenu}
            >
              {page.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="page-stage" aria-label={`${activePage.label} page`}>
        <Routes>
          <Route path="/" element={<Home openContactFrom={openContactFrom} />} />
          <Route path="/details" element={<Details />} />
          <Route path="/process" element={<Process openContactFrom={openContactFrom} />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact returnTarget={returnTarget} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer>
        <span>Ofer Guez Private Maths Tutoring</span>
        <PageControls
          nextPage={nextPage}
          previousPage={previousPage}
          onNavigate={navigateToPage}
        />
        <span>{contact.email}</span>
      </footer>
    </div>
  );
}

function PageControls({ nextPage, previousPage, onNavigate }) {
  return (
    <div className="page-controls" aria-label="Page controls">
      <button
        className="page-nav-button previous"
        type="button"
        aria-label={previousPage ? `Previous page: ${previousPage.label}` : "No previous page"}
        disabled={!previousPage}
        onClick={() => onNavigate(previousPage)}
      >
        <ArrowLeft size={24} />
      </button>
      <button
        className="page-nav-button next"
        type="button"
        aria-label={nextPage ? `Next page: ${nextPage.label}` : "No next page"}
        disabled={!nextPage}
        onClick={() => onNavigate(nextPage)}
      >
        <ArrowRight size={24} />
      </button>
    </div>
  );
}

function Home({ openContactFrom }) {
  return (
    <section className="hero page-shell" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Calm, guided maths tutoring</p>
        <h1>Understand maths, not just the method.</h1>
        <p className="hero-text">
          GCSE maths tutoring in Islington/Hackney and online, plus KS2/KS3 foundations
          and A-level support. Clear explanations and guided practice build understanding
          and confidence when a question changes shape.
        </p>
        <div className="hero-actions">
          <button className="button primary" type="button" onClick={() => openContactFrom("/")}>
            Enquire
          </button>
          <Link className="button secondary" to="/details">
            Details
            <ArrowRight size={18} />
          </Link>
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
      <section className="audience" aria-labelledby="audience-heading">
        <h2 className="eyebrow" id="audience-heading">Who this is for</h2>
        <ul>
          {audienceItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <div className="page-heading">
        <p className="eyebrow">Details</p>
        <h1>Support for school maths.</h1>
        <p>
          Lessons follow the pupil's level, school work and goals.
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
          £50 per hour, online or in Islington/Hackney. The first 30-minute meeting is
          free: the pupil attends, parents are welcome, and we try some maths together.
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
            Free 30-minute first meeting: discuss priorities and try some maths together.
            Regular tuition is £50 per hour.
          </p>
        </div>
        <button className="button primary" type="button" onClick={() => openContactFrom("/process")}>
          Ask about times
        </button>
      </div>
    </section>
  );
}

function Resources() {
  return (
    <section className="page-shell detail-page resources-page" id="resources">
      <div className="page-heading">
        <p className="eyebrow">Resources</p>
        <h1>Useful maths tools.</h1>
        <p>Calculators, graphing and geometry tools for practice and exploration.</p>
      </div>

      <div className="resource-list">
        {resources.map((resource) => (
          <a
            className="resource-link"
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            key={resource.name}
          >
            <span>{resource.name}</span>
            <ExternalLink size={20} aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="page-shell detail-page about-page" id="about">
      <div className="page-heading">
        <p className="eyebrow">About</p>
        <h1>Helping maths make sense.</h1>
      </div>

      <div className="about-copy">
        <p>
          I enjoy working with pupils who feel they "should" understand something but do
          not yet see why. A different explanation, diagram or carefully chosen example
          often unlocks it.
        </p>
        <p>
          Lessons are calm and practical: explain clearly, work together, then practise
          independently. Years as a software developer taught me to break complex problems
          into understandable steps.
        </p>
        <p>
          I have a BSc in Mathematics and Computer Science from Tel Aviv University and
          an MA in Philosophy, with experience across Action Tutoring, GCSE and A-level
          maths, and coding mentorship. I hold an enhanced DBS certificate, currently under
          renewal. My aim is to help pupils understand, practise with purpose and stay
          confident when a question changes shape.
        </p>
      </div>
    </section>
  );
}

function Contact({ returnTarget }) {
  return (
    <section className="page-shell detail-page contact-page" id="contact">
      <div className="contact-card">
        <Phone size={24} />
        <div>
          <h2>Contact</h2>
          <p>
            {contact.phone} · {contact.email}
          </p>
          <p>
            Get in touch and we can arrange a free introductory meeting.
          </p>
        </div>
        <ContactForm returnTarget={returnTarget} />
      </div>
    </section>
  );
}

function ContactForm({ returnTarget }) {
  const [status, setStatus] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    setIsError(false);
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
        setStatus(await getFormErrorMessage(response));
        setIsError(true);
        return;
      }

      form.reset();
      setIsError(false);
      setStatus("Enquiry sent. Returning you to where you were.");
      window.setTimeout(() => {
        navigate(returnTarget || "/");
      }, 900);
    } catch (error) {
      setStatus(error.message || `Something went wrong. Please email ${contact.email}.`);
      setIsError(true);
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
            rows="3"
            placeholder="Student year group, main topic or goal, online or in person location, and preferred times."
            required
          />

          <input type="hidden" name="_subject" value="Friendly Maths enquiry" />
          <input type="text" name="_gotcha" className="honeypot" tabIndex="-1" autoComplete="off" />

      <button className="button primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send enquiry"}
      </button>
      {status && (
        <p className={isError ? "form-status error" : "form-status"} aria-live="polite">
          {isError && <strong>error sending mail: </strong>}
          {status}
        </p>
      )}
    </form>
  );
}

const rootElement = document.getElementById("root");
// Reuse the root during Vite hot reloads to avoid duplicate createRoot warnings.
const root = rootElement._reactRoot ?? createRoot(rootElement);
rootElement._reactRoot = root;
root.render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>,
);
