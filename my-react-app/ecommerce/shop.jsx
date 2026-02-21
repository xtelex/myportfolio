import { useEffect, useMemo, useState } from "react";
import "./Shop.css";
import trike1 from "../trike1.jpg";
import stnls from "../stnls.jpg";
import top from "../top.jpg";

const tricycles = [
  {
    id: 1,
    name: "Mangkulas Trail Tricycle",
    type: "Ordinary",
    price: 48500,
    range: "610 km",
    acceleration: "0-100 in 4.8s",
    seats: 3,
    cashBack: "12%",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    description:
      "All-terrain tricycle engineered for long rides, comfort, and heavy-duty road performance.",
  },
  {
    id: 2,
    name: "Mangkulas Urban Tricycle",
    type: "Semi Stainless",
    price: 32000,
    range: "700 km",
    acceleration: "0-100 in 5.3s",
    seats: 3,
    cashBack: "15%",
    image: trike1,
    description:
      "Streamlined city tricycle setup with balanced power and low operating cost for daily routes.",
  },
  {
    id: 3,
    name: "Mangkulas Grand Tricycle",
    type: "Full",
    price: 72900,
    range: "510 km",
    acceleration: "0-100 in 3.4s",
    seats: 4,
    cashBack: "15%",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    description:
      "Premium touring tricycle package built for highway stability, comfort, and signature style.",
  },
  {
    id: 4,
    name: "Mangkulas Compact Tricycle",
    type: "Stainless",
    price: 24900,
    priceLabel: "50,000 to 60,000 pesos",
    range: "430 km",
    acceleration: "0-100 in 7.1s",
    seats: 2,
    cashBack: "10%",
    image: stnls,
    description:
      "Compact utility tricycle with practical cargo options and efficient city maneuverability.",
  },
  {
    id: 5,
    name: "Mangkulas Twin Bench Tricycle",
    type: "Back to Back",
    price: 31900,
    range: "520 km",
    acceleration: "0-100 in 6.2s",
    seats: 4,
    cashBack: "11%",
    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80",
    description:
      "Back-to-back seating layout designed for passenger-heavy routes with improved cabin space.",
  },
  {
    id: 6,
    name: "Mangkulas Open Roof Tricycle",
    type: "Top Downs",
    price: 20000,
    priceLabel: "20,000 to 25,000 pesos",
    range: "470 km",
    acceleration: "0-100 in 6.7s",
    seats: 3,
    cashBack: "10%",
    image: top,
    description:
      "Top-down tricycle build for scenic rides and airy comfort in warm-weather routes.",
  },
  {
    id: 7,
    name: "Mangkulas Pugot Tricycle",
    type: "Pugot",
    price: 25900,
    range: "450 km",
    acceleration: "0-100 in 7.0s",
    seats: 3,
    cashBack: "9%",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80",
    description:
      "Pugot style tricycle with compact front profile and practical setup for mixed road use.",
  },
];

const servicePlans = [
  {
    title: "Essential Care",
    items: ["Annual inspection", "Battery health diagnostics", "Software updates"],
    price: "$299/year",
  },
  {
    title: "Premium Care",
    items: ["Everything in Essential", "24/7 roadside support", "Priority service lane"],
    price: "$499/year",
  },
  {
    title: "Fleet Care",
    items: ["Dedicated account manager", "Monthly performance reports", "On-site maintenance"],
    price: "$899/year",
  },
];

const dealerships = [
  { city: "Manila", address: "North EDSA Auto Hub", schedule: "Mon-Sat 9:00 AM - 7:00 PM" },
  { city: "Cebu", address: "Mandaue Innovation Park", schedule: "Mon-Sat 9:00 AM - 7:00 PM" },
  { city: "Davao", address: "Lanang Mobility Center", schedule: "Mon-Sat 9:00 AM - 7:00 PM" },
];

const quickActions = [
  { label: "Search Inventory", icon: "Q" },
  { label: "Current Offers", icon: "%" },
  { label: "Build & Price", icon: "W" },
  { label: "Shop Online", icon: "O" },
];

function Shop() {
  const [loaded, setLoaded] = useState(false);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedTricycle, setSelectedTricycle] = useState(tricycles[0]);
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    budget: "",
    model: tricycles[0].name,
  });
  const [quoteSent, setQuoteSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title = "mangkulas sidecar";
  }, []);

  const tricycleTypes = useMemo(
    () => ["All", "Ordinary", "Semi Stainless", "Full", "Stainless", "Back to Back", "Top Downs", "Pugot"],
    []
  );

  const filteredTricycles = useMemo(() => {
    if (selectedType === "All") return tricycles;
    return tricycles.filter((tricycle) => tricycle.type === selectedType);
  }, [selectedType]);

  const featuredTricycles = useMemo(() => [...tricycles, ...tricycles], []);

  const handleQuoteSubmit = (event) => {
    event.preventDefault();
    setQuoteSent(true);
    setTimeout(() => setQuoteSent(false), 3500);
    setQuoteForm((prev) => ({ ...prev, name: "", email: "", budget: "" }));
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  const openImagePreview = (src, alt) => {
    setPreviewImage({ src, alt });
  };

  return (
    <div className={`mk-site ${loaded ? "loaded" : ""}`}>
      <header className="mk-topbar">
        <div className="mk-container mk-nav-row">
          <button className="mk-logo-btn" onClick={() => scrollToSection("home")} type="button">
            <span className="mk-logo-mark">mk</span>
            <span className="mk-logo-text">mangkulas tricycle</span>
          </button>
          <button className="mk-menu-toggle" type="button" onClick={() => setMenuOpen((v) => !v)}>
            Menu
          </button>
          <nav className={`mk-nav-links ${menuOpen ? "open" : ""}`}>
            <button type="button" onClick={() => scrollToSection("models")}>
              Vehicles
            </button>
            <button type="button" onClick={() => scrollToSection("technology")}>
              Shopping Tools
            </button>
            <button type="button" onClick={() => scrollToSection("service")}>
              Owners
            </button>
            <button type="button" onClick={() => scrollToSection("contact")}>
              Find A Dealer
            </button>
          </nav>
          <div className="mk-nav-meta">
            <span>English</span>
            <span>Search</span>
          </div>
        </div>
      </header>

      <div className="mk-promo-strip">
        <div className="mk-container mk-promo-content">
          <p>
            Up to <strong>15%</strong> of MSRP cash back
          </p>
          <button type="button" onClick={() => scrollToSection("service")}>
            See all sale offers
          </button>
        </div>
      </div>

      <main>
        <section className="mk-hero" id="home">
          <div className="mk-hero-image-layer" aria-hidden="true"></div>
          <div className="mk-container mk-hero-content">
            <div className="mk-hero-copy">
              <p className="mk-kicker">Open Road Sales Event</p>
                <h1>Ride farther with mangkulas tricycle.</h1>
              <p>
                Commercial-grade tricycle builds with limited-time cash back promos and flexible financing options.
              </p>
              <div className="mk-hero-actions">
                <button type="button" onClick={() => scrollToSection("models")}>
                  Search Inventory
                </button>
                <button type="button" className="alt" onClick={() => scrollToSection("contact")}>
                  Build & Price
                </button>
              </div>
            </div>
          </div>

          <div className="mk-container mk-featured-row">
            <div className="mk-featured-track">
              {featuredTricycles.map((tricycle, index) => (
                <article key={`${tricycle.id}-${index}`} className="mk-featured-card">
                  <button
                    type="button"
                    className="mk-image-button mk-image-button-featured"
                    onClick={() => openImagePreview(tricycle.image, tricycle.name)}
                    aria-label={`View full image of ${tricycle.name}`}
                  >
                    <img src={tricycle.image} alt={tricycle.name} />
                  </button>
                  <div className="mk-featured-meta">
                    <h3>{tricycle.name}</h3>
                    <p>
                      Up to <strong>{tricycle.cashBack}</strong> cash back
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mk-shortcuts">
          <div className="mk-container mk-shortcut-grid">
            {quickActions.map((item) => (
              <article key={item.label} className="mk-shortcut-item">
                <span className="mk-shortcut-icon">{item.icon}</span>
                <p>{item.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mk-section" id="models">
          <div className="mk-container">
            <div className="mk-section-head">
              <p className="mk-badge">Tricycle Lineup</p>
              <h2>Find your perfect tricycle setup.</h2>
            </div>

            <div className="mk-filter">
              {tricycleTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={selectedType === type ? "active" : ""}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="mk-model-grid">
              {filteredTricycles.map((tricycle) => (
                <article
                  key={tricycle.id}
                  className={`mk-card ${selectedTricycle.id === tricycle.id ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedTricycle(tricycle);
                    setQuoteForm((prev) => ({ ...prev, model: tricycle.name }));
                  }}
                >
                  <button
                    type="button"
                    className="mk-image-button mk-image-button-card"
                    onClick={(event) => {
                      event.stopPropagation();
                      openImagePreview(tricycle.image, tricycle.name);
                    }}
                    aria-label={`View full image of ${tricycle.name}`}
                  >
                    <img src={tricycle.image} alt={tricycle.name} />
                  </button>
                  <div className="mk-card-content">
                    <h3>{tricycle.name}</h3>
                    <strong>{tricycle.priceLabel ?? `${tricycle.price.toLocaleString()} pesos`}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mk-section mk-tech" id="technology">
          <div className="mk-container">
            <div className="mk-section-head">
              <p className="mk-badge">Innovation</p>
              <h2>Technology that works with your routes.</h2>
            </div>
            <div className="mk-tech-grid">
              <article>
                <h3>MK Pilot Assist</h3>
                <p>Adaptive cruise control, lane guidance, and traffic response for safer long rides.</p>
              </article>
              <article>
                <h3>Smart Cabin OS</h3>
                <p>Voice-powered infotainment, OTA updates, and one-touch personalization profiles.</p>
              </article>
              <article>
                <h3>FastCharge Network</h3>
                <p>Get up to 80% charge in 25 minutes with nationwide charging partner stations.</p>
              </article>
              <article>
                <h3>Battery Shield Warranty</h3>
                <p>Eight-year battery performance coverage with proactive diagnostics in the MK app.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="mk-section" id="service">
          <div className="mk-container">
            <div className="mk-section-head">
              <p className="mk-badge">After Sales</p>
              <h2>Service plans built for real ownership.</h2>
            </div>
            <div className="mk-service-grid">
              {servicePlans.map((plan) => (
                <article key={plan.title} className="mk-plan">
                  <h3>{plan.title}</h3>
                  <ul>
                    {plan.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="mk-plan-price">{plan.price}</p>
                </article>
              ))}
            </div>
            <div className="mk-dealers">
              <h3>Visit Our Dealerships</h3>
              <div className="mk-dealer-grid">
                {dealerships.map((branch) => (
                  <article key={branch.city}>
                    <h4>{branch.city}</h4>
                    <p>{branch.address}</p>
                    <p>{branch.schedule}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mk-section mk-contact" id="contact">
          <div className="mk-container">
            <div className="mk-section-head">
                <p className="mk-badge">Book a Tricycle Test Drive</p>
              <h2>Request a custom quote.</h2>
            </div>
            {quoteSent ? (
              <div className="mk-success">Thank you. Our team will contact you within 24 hours.</div>
            ) : (
              <form className="mk-form" onSubmit={handleQuoteSubmit}>
                <label>
                  Full Name
                  <input
                    type="text"
                    required
                    value={quoteForm.name}
                    onChange={(event) => setQuoteForm((prev) => ({ ...prev, name: event.target.value }))}
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    required
                    value={quoteForm.email}
                    onChange={(event) => setQuoteForm((prev) => ({ ...prev, email: event.target.value }))}
                  />
                </label>
                <label>
                  Preferred Model
                  <select
                    value={quoteForm.model}
                    onChange={(event) => setQuoteForm((prev) => ({ ...prev, model: event.target.value }))}
                  >
                    {tricycles.map((tricycle) => (
                      <option key={tricycle.id} value={tricycle.name}>
                        {tricycle.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Budget Range
                  <input
                    type="text"
                    required
                    placeholder="e.g. $30,000 - $50,000"
                    value={quoteForm.budget}
                    onChange={(event) => setQuoteForm((prev) => ({ ...prev, budget: event.target.value }))}
                  />
                </label>
                <button type="submit">Send Request</button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="mk-footer">
        <div className="mk-container">
          <p>2026 mangkulas tricycle. Built for modern riders.</p>
        </div>
      </footer>

      {previewImage && (
        <div className="mk-lightbox" role="dialog" aria-modal="true" onClick={() => setPreviewImage(null)}>
          <button
            type="button"
            className="mk-lightbox-close"
            onClick={() => setPreviewImage(null)}
            aria-label="Close image preview"
          >
            x
          </button>
          <img
            src={previewImage.src}
            alt={previewImage.alt}
            className="mk-lightbox-image"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default Shop;
