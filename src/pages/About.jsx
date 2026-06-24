import { motion } from 'motion/react';
import { Target, Eye, Award, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui/card';
import '../styles/about.css';

export function About() {
  const { t } = useTranslation();

  const team = [
    {
      name: 'Mutasim Adam',
      role: t('about.role_founder'),
      image: 'images/team/ceoMutasim.png',
      bio: t('about.bio_founder'),
    },
    {
      name: 'Grace Uwase',
      role: t('about.role_creative'),
      image: 'images/team/cmoUwase.png',
      bio: t('about.bio_creative'),
    },
    {
      name: 'Patrick Niyonzima',
      role: t('about.role_technical'),
      image: 'images/team/ctoPatrick.png',
      bio: t('about.bio_technical'),
    },
    {
      name: 'Diane Mutesi',
      role: t('about.role_studio'),
      image: 'images/team/cooDiane.png',
      bio: t('about.bio_studio'),
    },
  ];

  return (
    <div className="about-page pt-20">
      {/* Hero */}
      <section className="about-hero py-16">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="about-hero-content"
          >
            <h1 className="text-display about-hero-title">{t('about.hero_title')}</h1>
            <p className="text-body-large about-hero-subtitle">
              {t('about.hero_subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="container-premium">
          <div className="about-story-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-display about-section-title">{t('about.story_title')}</h2>
              <div className="about-story-text">
                <p>
                  {t('about.story_p1')}
                </p>
                <p>
                  {t('about.story_p2')}
                </p>
                
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="about-story-images"
            >
              <img
                src="https://images.unsplash.com/photo-1556910633-5099dc3971e8?w=800&q=80"
                alt="Studio"
                className="about-story-img1"
              />
              <img
                src="https://images.unsplash.com/photo-1606980598821-4f0c4cc1c9c9?w=800&q=80"
                alt="Equipment"
                className="about-story-img2"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission-section py-24">
        <div className="container-premium">
          <div className="about-mission-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card about-mission-card">
                <div className="about-mission-icon-wrapper">
                  <Target className="about-mission-icon" />
                </div>
                <h3 className="text-heading-1 about-mission-title">{t('about.mission_title')}</h3>
                <p className="about-mission-desc">
                  {t('about.mission_desc')}
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card about-mission-card">
                <div className="about-mission-icon-wrapper">
                  <Eye className="about-mission-icon" />
                </div>
                <h3 className="text-heading-1 about-mission-title">{t('about.vision_title')}</h3>
                <p className="about-mission-desc">
                  {t('about.vision_desc')}
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-section-header"
          >
            <h2 className="text-display about-section-title text-center">{t('about.values_title')}</h2>
          </motion.div>

          <div className="about-values-grid">
            {[
              {
                icon: Award,
                title: t('about.value_quality'),
                description: t('about.value_quality_desc'),
              },
              {
                icon: Users,
                title: t('about.value_creator'),
                description: t('about.value_creator_desc'),
              },
              {
                icon: Target,
                title: t('about.value_innovation'),
                description: t('about.value_innovation_desc'),
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card about-value-card">
                  <value.icon className="about-value-icon" />
                  <h3 className="about-value-title">{value.title}</h3>
                  <p className="about-value-desc">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team-section py-24">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-section-header"
          >
            <h2 className="text-display about-section-title text-center">{t('about.team_title')}</h2>
            <p className="text-body-large text-center about-team-subtitle">
              {t('about.team_subtitle')}
            </p>
          </motion.div>

          <div className="about-team-grid">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card about-team-card group cursor-pointer">
                  <div className="about-team-img-wrapper">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="about-team-img"
                    />
                  </div>
                  <div className="about-team-content">
                    <h3 className="about-team-name">{member.name}</h3>
                    <p className="about-team-role">{member.role}</p>
                    <p className="about-team-bio">{member.bio}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
