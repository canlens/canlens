import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';
import '../styles/contact.css';

export function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const messageText = `*New Contact Form Submission*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone || 'N/A'}
*Subject:* ${formData.subject}

*Message:*
${formData.message}`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/250795458114?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    toast.success(t('contact.toast_success'));
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page pt-20">
      {/* Hero */}
      <section className="contact-hero py-16">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="contact-hero-content"
          >
            <h1 className="text-display contact-hero-title">{t('contact.hero_title')}</h1>
            <p className="text-body-large contact-hero-subtitle">
              {t('contact.hero_subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-premium py-12">
        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info-list">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card contact-info-card">
                <div className="contact-info-item">
                  <div className="contact-icon-wrapper">
                    <MapPin className="contact-icon" />
                  </div>
                  <div>
                    <h3 className="contact-info-title">{t('contact.visit_us')}</h3>
                    <p className="contact-info-text">
                      KK 12 Ave, Kigali<br />
                      {t('contact.address_2')}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card contact-info-card">
                <div className="contact-info-item">
                  <div className="contact-icon-wrapper">
                    <Phone className="contact-icon" />
                  </div>
                  <div>
                    <h3 className="contact-info-title">{t('contact.call_us')}</h3>
                    <p className="contact-info-text">
                      +250 795 458 114<br />
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card contact-info-card">
                <div className="contact-info-item">
                  <div className="contact-icon-wrapper">
                    <Mail className="contact-icon" />
                  </div>
                  <div>
                    <h3 className="contact-info-title">{t('contact.email_us')}</h3>
                    <p className="contact-info-text">
                      canlens9@gmail.com<br />
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-card contact-info-card">
                <div className="contact-info-item">
                  <div className="contact-icon-wrapper">
                    <Clock className="contact-icon" />
                  </div>
                  <div>
                    <h3 className="contact-info-title">{t('contact.business_hours')}</h3>
                    <p className="contact-info-text">
                      {t('contact.hours_1')}<br />
                      {t('contact.hours_2')}<br />
                      {t('contact.hours_3')}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href="https://wa.me/250795458114"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-whatsapp-link"
              >
                <Button className="contact-whatsapp-btn">
                  <Phone className="icon-sm contact-btn-icon-mr" />
                  {t('contact.whatsapp_btn')}
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="glass-card contact-form-card">
                <h2 className="text-heading-1 contact-form-title">{t('contact.form_title')}</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form-row">
                    <div className="contact-form-group">
                      <Label htmlFor="name" className="contact-label">{t('contact.label_name')}</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="contact-input"
                        placeholder={t('contact.placeholder_name')}
                      />
                    </div>
                    <div className="contact-form-group">
                      <Label htmlFor="email" className="contact-label">{t('contact.label_email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="contact-input"
                        placeholder={t('contact.placeholder_email')}
                      />
                    </div>
                  </div>

                  <div className="contact-form-row">
                    <div className="contact-form-group">
                      <Label htmlFor="phone" className="contact-label">{t('contact.label_phone')}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="contact-input"
                        placeholder={t('contact.placeholder_phone')}
                      />
                    </div>
                    <div className="contact-form-group">
                      <Label htmlFor="subject" className="contact-label">{t('contact.label_subject')}</Label>
                      <Input
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="contact-input"
                        placeholder={t('contact.placeholder_subject')}
                      />
                    </div>
                  </div>

                  <div className="contact-form-group">
                    <Label htmlFor="message" className="contact-label">{t('contact.label_message')}</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="contact-textarea"
                      placeholder={t('contact.placeholder_message')}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="contact-submit-btn"
                  >
                    <Send className="icon-sm contact-btn-icon-mr" />
                    {t('contact.submit_btn')}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="contact-map-wrapper"
        >
          <Card className="glass-card contact-map-card">
            <div className="contact-map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d996.8664101838018!2d30.1026782!3d-1.9677223!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca7005651cf5f%3A0xf2a0d696d6a9cfd9!2sCanLens%20Studio!5e0!3m2!1sen!2srw!4v1780247405530!5m2!1sen!2srw"
                className="contact-map-iframe"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
