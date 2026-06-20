import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { getPortfolioItems } from '../services/googleSheetsApi';
import '../styles/portfolio.css';

const categories = ['All', 'Commercial', 'Events', 'Content Creation'];

export function Portfolio() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPortfolioItems();
        setItems(data);
      } catch (err) {
        console.error('Failed to load portfolio items', err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? items
    : items.filter((p) => p.category === selectedCategory);

  const getCategoryTranslation = (cat) => {
    switch(cat) {
      case 'All': return t('portfolio.cat_all');
      case 'Commercial': return t('portfolio.cat_commercial');
      case 'Events': return t('portfolio.cat_events');
      case 'Content Creation': return t('portfolio.cat_content');
      default: return cat;
    }
  };

  return (
    <div className="portfolio-page pt-20">
      {/* Hero */}
      <section className="portfolio-hero py-16">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="portfolio-hero-content"
          >
            <h1 className="text-display portfolio-hero-title">{t('portfolio.hero_title')}</h1>
            <p className="text-body-large portfolio-hero-subtitle">
              {t('portfolio.hero_subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-premium py-12">
        {/* Category Filter */}
        <div className="portfolio-filters">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={
                selectedCategory === category
                  ? 'portfolio-btn-active'
                  : 'portfolio-btn-inactive'
              }
            >
              {getCategoryTranslation(category)}
            </Button>
          ))}
        </div>

        {isLoading && (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="spinner mb-4"></div>
            <p className="text-white/70">{t('common.loading', 'Loading portfolio items...')}</p>
          </div>
        )}

        {/* Projects Grid */}
        <div className="portfolio-grid">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="premium-card portfolio-card group cursor-pointer">
                <div className="portfolio-image-wrapper">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="portfolio-image"
                  />
                  <div className="portfolio-overlay group-hover:opacity-100">
                    <div>
                      <Badge className="portfolio-badge">
                        {getCategoryTranslation(project.category)}
                      </Badge>
                      <p className="portfolio-desc">{project.description}</p>
                    </div>
                  </div>
                </div>
                <div className="portfolio-content">
                  <h3 className="portfolio-title">
                    {project.title}
                  </h3>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
