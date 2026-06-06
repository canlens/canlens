import { Link } from 'react-router';
import { Camera, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/layout.css';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container-premium footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo-group">
              <img src="/images/canlensLogo.png" alt="CanLens Studio" className="footer-logo" />
              <div>
                <h3 className="footer-brand-title">{t('footer.brand_title')}</h3>
                <p className="footer-brand-subtitle">{t('footer.brand_subtitle')}</p>
              </div>
            </div>
            <p className="footer-brand-desc">
              {t('footer.brand_desc')}
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-link">
                <Instagram className="icon-sm" />
              </a>
              <a href="#" className="footer-social-link">
                <Facebook className="icon-sm" />
              </a>
              <a href="#" className="footer-social-link">
                <Twitter className="icon-sm" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">{t('footer.quick_links')}</h4>
            <ul className="footer-links">
              <li>
                <Link to="/shop" className="footer-link">{t('footer.shop_equipment')}</Link>
              </li>
              <li>
                <Link to="/studio-rental" className="footer-link">{t('footer.studio_rental')}</Link>
              </li>
              <li>
                <Link to="/portfolio" className="footer-link">{t('footer.portfolio')}</Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">{t('footer.about_us')}</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="footer-heading">{t('footer.services')}</h4>
            <ul className="footer-links">
              <li className="footer-text">{t('footer.equipment_sales')}</li>
              <li className="footer-text">{t('footer.studio_rental')}</li>
              <li className="footer-text">{t('footer.content_production')}</li>
              <li className="footer-text">{t('footer.photography_services')}</li>
              <li className="footer-text">{t('footer.video_production')}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-heading">{t('footer.contact_us')}</h4>
            <ul className="footer-contact">
              <li className="footer-contact-item">
                <MapPin className="footer-contact-icon" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="footer-contact-item">
                <Phone className="footer-contact-icon" />
                <a href="tel:+250788123456" className="footer-link">+250 788 123 456</a>
              </li>
              <li className="footer-contact-item">
                <Mail className="footer-contact-icon" />
                <a href="mailto:hello@canlensstudio.com" className="footer-link">hello@canlensstudio.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-flex">
            <p className="footer-copyright">
              {t('footer.copyright')}
            </p>
            <div className="footer-legal">
              <a href="#" className="footer-legal-link">{t('footer.privacy_policy')}</a>
              <a href="#" className="footer-legal-link">{t('footer.terms_of_service')}</a>
            </div>
          </div>
          <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px', color: 'var(--canlens-silver)' }}>
            {t('footer.developed_by')} <a href="https://mustafa-khamis.sudanteach.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--canlens-blue)', textDecoration: 'none' }}>Mustafa khamis</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
