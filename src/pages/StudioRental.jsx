import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Users, MapPin, Check, Calendar, DollarSign, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { studios, timeSlots } from '../data/studios';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';
import '../styles/studio.css';

export function StudioRental() {
  const { t } = useTranslation();
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    timeSlot: '',
    hours: '1',
    customerName: '',
    customerEmail: '',
  });
  const { createBooking } = useApp();

  const studio = studios.find((s) => s.id === selectedStudio);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!studio) return;

    const totalPrice = studio.hourlyRate * parseInt(bookingData.hours);
    
    createBooking({
      studioId: studio.id,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      hours: parseInt(bookingData.hours),
      totalPrice,
      customerName: bookingData.customerName,
      customerEmail: bookingData.customerEmail,
    });

    toast.success(t('studio.toast_confirmed', { name: studio.name }));
    setIsBookingOpen(false);
    setBookingData({
      date: '',
      timeSlot: '',
      hours: '1',
      customerName: '',
      customerEmail: '',
    });
  };

  const openBooking = (studioId) => {
    setSelectedStudio(studioId);
    setIsBookingOpen(true);
  };

  return (
    <div className="studio-page pt-20">
      {/* Hero */}
      <section className="studio-hero py-16">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="studio-hero-content"
          >
            <h1 className="text-display studio-hero-title">{t('studio.hero_title')}</h1>
            <p className="text-body-large studio-hero-subtitle">
              {t('studio.hero_subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Studios */}
      <div className="container-premium py-12">
        <div className="studio-list-grid">
          {studios.map((studio, index) => (
            <motion.div
              key={studio.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card studio-card">
                <div className="studio-card-inner">
                  {/* Images */}
                  <div className="studio-images-wrapper">
                    <div className="studio-images-grid">
                      <img
                        src={studio.images[0]}
                        alt={studio.name}
                        className="studio-img-main"
                      />
                      {studio.images.slice(1, 3).map((image, i) => (
                        <img
                          key={i}
                          src={image}
                          alt={`${studio.name} ${i + 2}`}
                          className="studio-img-sub"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="studio-info">
                    <div className="studio-info-header">
                      <div>
                        <h2 className="text-heading-1 studio-title">{studio.name}</h2>
                        <div className="studio-meta">
                          <span className="studio-meta-item">
                            <Users className="icon-sm" />
                            {t('studio.capacity', { capacity: studio.capacity })}
                          </span>
                          <span className="studio-meta-item">
                            <MapPin className="icon-sm" />
                            {studio.size}
                          </span>
                        </div>
                      </div>
                      <Badge className="studio-price-badge">
                        {studio.priceDisplay}
                      </Badge>
                    </div>

                    <p className="studio-desc">{studio.description}</p>

                    {/* Equipment */}
                    <div className="studio-equipment-section">
                      <h3 className="studio-equipment-title">{t('studio.equipment_included')}</h3>
                      <div className="studio-equipment-grid">
                        {studio.details?.map((item, i) => (
                          <div key={i} className="studio-equipment-item">
                            <Check className="studio-check-icon" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-small mt-2" style={{ color: 'var(--canlens-silver)' }}>
                        {t('studio.price_note')}
                      </p>
                    </div>

                    {/* CTA */}
                    <Button
                      onClick={() => openBooking(studio.id)}
                      className="studio-book-btn"
                    >
                      <Calendar className="icon-sm studio-btn-icon" />
                      {t('studio.book_btn')}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-body-large" style={{ color: 'var(--canlens-silver)' }}>
            Prices may vary depending on project requirements, location, duration, and production complexity.
          </p>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="studio-faq-section"
        >
          <h2 className="text-heading-1 studio-faq-title">{t('studio.faq_title')}</h2>
          <div className="studio-faq-grid">
            {[
              {
                q: t('studio.faq_1_q'),
                a: t('studio.faq_1_a'),
              },
              {
                q: t('studio.faq_2_q'),
                a: t('studio.faq_2_a'),
              },
              {
                q: t('studio.faq_3_q'),
                a: t('studio.faq_3_a'),
              },
              {
                q: t('studio.faq_4_q'),
                a: t('studio.faq_4_a'),
              },
            ].map((faq, index) => (
              <Card key={index} className="glass-card studio-faq-card">
                <h3 className="studio-faq-q">{faq.q}</h3>
                <p className="studio-faq-a">{faq.a}</p>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="studio-dialog-content">
          <DialogHeader>
            <DialogTitle className="studio-dialog-title">{t('studio.dialog_title', { name: studio?.name })}</DialogTitle>
            <DialogDescription className="studio-dialog-desc">
              {t('studio.dialog_desc')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBookingSubmit} className="studio-booking-form">
            <div className="form-group">
              <Label className="form-label">{t('studio.form_name')}</Label>
              <Input
                required
                value={bookingData.customerName}
                onChange={(e) => setBookingData({ ...bookingData, customerName: e.target.value })}
                className="form-input"
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <Label className="form-label">{t('studio.form_email')}</Label>
              <Input
                required
                type="email"
                value={bookingData.customerEmail}
                onChange={(e) => setBookingData({ ...bookingData, customerEmail: e.target.value })}
                className="form-input"
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <Label className="form-label">{t('studio.form_date')}</Label>
              <Input
                required
                type="date"
                value={bookingData.date}
                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                className="form-input"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <Label className="form-label">{t('studio.form_time')}</Label>
              <Select
                required
                value={bookingData.timeSlot}
                onValueChange={(value) => setBookingData({ ...bookingData, timeSlot: value })}
              >
                <SelectTrigger className="form-select-trigger">
                  <SelectValue placeholder={t('studio.form_select_time')} />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="form-group">
              <Label className="form-label">{t('studio.form_hours')}</Label>
              <Select
                required
                value={bookingData.hours}
                onValueChange={(value) => setBookingData({ ...bookingData, hours: value })}
              >
                <SelectTrigger className="form-select-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {hour} {hour === 1 ? t('studio.hour_single') : t('studio.hour_plural')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {studio && bookingData.hours && studio.hourlyRate && (
              <div className="studio-total-price-box">
                <div className="studio-total-flex">
                  <span className="studio-total-label">{t('studio.total_price')}</span>
                  <span className="studio-total-value">
                    ${studio.hourlyRate * parseInt(bookingData.hours)}
                  </span>
                </div>
              </div>
            )}

            <div className="studio-form-actions">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsBookingOpen(false)}
                className="studio-btn-cancel"
              >
                {t('studio.cancel')}
              </Button>
              <Button
                type="submit"
                className="studio-btn-confirm"
              >
                {t('studio.confirm')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
