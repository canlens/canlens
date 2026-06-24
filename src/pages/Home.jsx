import { motion } from "motion/react";
import { Link } from "react-router";
import {
  ArrowRight,
  Camera,
  Video,
  Lightbulb,
  Users,
  Award,
  TrendingUp,
  Star,
  Quote,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useProducts } from "../hooks/useProducts";
import "../styles/home.css";

export function Home() {
  const { t } = useTranslation();
  const { products, isLoading } = useProducts();
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  if (featuredProducts.length === 0) {
    featuredProducts.push(...products.slice(0, 4));
  }

  const stats = [
    { label: t("home.stats.happy_clients"), value: "500+", icon: Users },
    { label: t("home.stats.projects_completed"), value: "1,200+", icon: Award },
    { label: t("home.stats.studio_hours"), value: "5,000+", icon: TrendingUp },
    { label: t("home.stats.customer_rating"), value: "4.9/5", icon: Star },
  ];

  const brands = [
    { name: "Sony", logo: "SONY" },
    { name: "Canon", logo: "CANON" },
    { name: "Nikon", logo: "NIKON" },
    { name: "Fujifilm", logo: "FUJIFILM" },
    { name: "DJI", logo: "DJI" },
    { name: "Rode", logo: "RODE" },
  ];

  const testimonials = [
    {
      name: "Sarah Mugisha",
      role: "Content Creator",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      text: "CanLens Studio has everything I need. The equipment quality is top-notch and the studio rental service is incredibly professional.",
    },
    {
      name: "Jean-Paul Nkunda",
      role: "Wedding Photographer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      text: "Best photography equipment store in Kigali. Their team knows their stuff and always helps me find exactly what I need.",
    },
    {
      name: "Aisha Nsabimana",
      role: "Video Producer",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
      text: "The podcast studio is amazing! Professional setup, great acoustics, and affordable rates. Highly recommend for any creator.",
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Background Video/Image */}
        <div className="hero-bg">
          <div className="hero-overlay" />
        </div>

        {/* Hero Content */}
        <div className="hero-content container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-display-large gradient-text hero-title">
              {t("home.hero.title")}
            </h1>
            <p className="text-body-large hero-subtitle">
              {t("home.hero.subtitle")}
            </p>
            <div className="hero-actions">
              <Link to="/shop">
                <Button size="lg" className="hero-btn-primary">
                  {t("home.hero.shop_btn")}
                  <ArrowRight className="hero-btn-icon" />
                </Button>
              </Link>
              <Link to="/studio-rental">
                <Button
                  size="lg"
                  variant="outline"
                  className="hero-btn-outline"
                >
                  {t("home.hero.book_btn")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
        </motion.div>
      </section>

      {/* Services Overview */}
      <section className="services-section">
        <div className="container-premium">
          <div className="services-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card service-card">
                <div className="service-icon-wrapper">
                  <div className="service-card-icons">
                    <Camera className="service-icon" />
                  </div>
                  <h3 className="text-heading-2 service-title">
                    {t("home.services.sales_title")}
                  </h3>
                  <p className="service-desc">
                    {t("home.services.sales_desc")}
                  </p>
                </div>
                <div className="service-images">
                  <div className="service-image-overlay"></div>
                  <img
                    className="service-image s"
                    src="images/content2.jpeg"
                    alt=""
                  />
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card service-card">
                <div className="service-icon-wrapper">
                  <div className="service-card-icons">
                    <Video className="service-icon" />
                  </div>
                  <h3 className="text-heading-2 service-title">
                    {t("home.services.rental_title")}
                  </h3>
                  <p className="service-desc">
                    {t("home.services.rental_desc")}
                  </p>
                </div>
                <div className="service-images">
                  <div className="service-image-overlay"></div>
                  <img
                    className="service-image s"
                    src="images/studio3.jpeg"
                    alt=""
                  />
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card service-card">
                <div className="service-icon-wrapper">
                  <div className="service-card-icons">
                    <Lightbulb className="service-icon" />
                  </div>
                  <h3 className="text-heading-2 service-title">
                    {t("home.services.production_title")}
                  </h3>
                  <p className="service-desc">
                    {t("home.services.production_desc")}
                  </p>
                </div>
                <div className="service-images">
                  <div className="service-image-overlay"></div>
                  <img
                    className="service-image s"
                    src="images/content3.jpeg"
                    alt=""
                  />
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="featured-section">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="text-display section-title">
              {t("home.featured.title")}
            </h2>
            <p className="text-body-large section-subtitle">
              {t("home.featured.subtitle")}
            </p>
          </motion.div>

          <div className="featured-grid">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/shop/${product.id}`}>
                  <Card className="premium-card product-card">
                    <div className="product-image-wrapper">
                      <img
                        src={product.image || product.imageUrl}
                        alt={product.name}
                        className="product-image"
                      />
                    </div>
                    <div className="product-content">
                      <p className="product-brand">
                        {product.brand || product.storeName || "Global"}
                      </p>
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-meta">
                        {product.productUrl ? (
                          <span className="product-price">Global Product</span>
                        ) : (
                          <span className="product-price">
                            ${product.price?.toLocaleString()}
                          </span>
                        )}
                        <div className="product-rating">
                          <Star className="star-icon" />
                          <span>{product.rating || "New"}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="view-all-wrapper">
            <Link to="/shop">
              <Button size="lg" variant="outline" className="view-all-btn">
                {t("home.featured.view_all")}
                <ArrowRight className="btn-icon" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="stats-bg-gradient" />
        <div className="container-premium stats-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stat-item"
              >
                <stat.icon className="stat-icon" />
                <div className="stat-value gradient-text-blue">
                  {stat.value}
                </div>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio CTA */}
      <section className="studio-cta-section">
        <div className="container-premium">
          <div className="studio-cta-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-display studio-cta-title">
                {t("home.studio_cta.title")}
              </h2>
              <p className="text-body-large studio-cta-desc">
                {t("home.studio_cta.desc")}
              </p>
              <ul className="studio-cta-features">
                <li className="studio-feature-item">
                  <div className="feature-dot" />
                  {t("home.studio_cta.feature_1")}
                </li>
                <li className="studio-feature-item">
                  <div className="feature-dot" />
                  {t("home.studio_cta.feature_2")}
                </li>
                <li className="studio-feature-item">
                  <div className="feature-dot" />
                  {t("home.studio_cta.feature_3")}
                </li>
                <li className="studio-feature-item">
                  <div className="feature-dot" />
                  {t("home.studio_cta.feature_4")}
                </li>
              </ul>
              <Link to="/studio-rental">
                <Button size="lg" className="studio-cta-btn">
                  {t("home.studio_cta.btn")}
                  <ArrowRight className="btn-icon" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="studio-cta-images"
            >
              <img
                src="https://images.unsplash.com/photo-1577190651915-bf62d54d5b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBzdHVkaW8lMjBsaWdodHN8ZW58MXx8fHwxNzgwMTQ1MTgyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Studio"
                className="studio-img-large"
              />
              <img
                src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwb2RjYXN0JTIwcmVjb3JkaW5nJTIwc3R1ZGlvfGVufDF8fHx8MTc4MDE0NTE4M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Podcast Studio"
                className="studio-img-small"
              />
              <img
                src="https://images.unsplash.com/photo-1612548403247-aa2873e9422d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRvciUyMGZpbG1pbmclMjBzZXR1cHxlbnwxfHx8fDE3ODAxNDUxODN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Content Creation"
                className="studio-img-small"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="text-display section-title">
              {t("home.testimonials.title")}
            </h2>
            <p className="text-body-large section-subtitle">
              {t("home.testimonials.subtitle")}
            </p>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="testimonial-card-wrapper"
              >
                <Card className="glass-card testimonial-card">
                  <Quote className="quote-icon" />
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="author-image"
                    />
                    <div>
                      <p className="author-name">{testimonial.name}</p>
                      <p className="author-role">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="brands-section">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="brands-header"
          >
            <p className="brands-title">{t("home.brands.title")}</p>
          </motion.div>

          <div className="brands-grid">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="brand-item"
              >
                <p className="brand-logo">{brand.logo}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="final-cta-bg">
          <div className="final-cta-overlay" />
          <img
            src="https://images.unsplash.com/photo-1520390138845-fd2d229dd553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoZXIlMjB3b3JraW5nJTIwY2FtZXJhJTIwZXF1aXBtZW50fGVufDF8fHx8MTc4MDE0NTE4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Contact"
            className="final-cta-image"
          />
        </div>

        <div className="container-premium final-cta-content">
          <div className="final-cta-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-display section-title">
                {t("home.final_cta.title")}
              </h2>
              <p className="text-body-large final-cta-desc">
                {t("home.final_cta.desc")}
              </p>
              <div className="final-cta-actions">
                <Link to="/contact">
                  <Button size="lg" className="final-cta-btn-primary">
                    {t("home.final_cta.contact_btn")}
                    <ArrowRight className="btn-icon" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/250788123456"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="final-cta-btn-outline"
                  >
                    {t("home.final_cta.whatsapp_btn")}
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
