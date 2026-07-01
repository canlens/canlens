import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { getPortfolioItems } from '../services/googleSheetsApi';
import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react';
import '../styles/portfolio.css';

const categories = ['All', 'Commercial', 'Events', 'Content Creation'];

export function Portfolio() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  useEffect(() => {
    if (!selectedProject) return;

    setActiveImageIndex(0);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      } else if (event.key === 'ArrowRight') {
        setActiveImageIndex((prev) => prev + 1);
      } else if (event.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

  const filteredProjects = selectedCategory === 'All'
    ? items
    : items.filter((project) => project.category === selectedCategory);

  const getCategoryTranslation = (category) => {
    switch (category) {
      case 'All': return t('portfolio.cat_all');
      case 'Commercial': return t('portfolio.cat_commercial');
      case 'Events': return t('portfolio.cat_events');
      case 'Content Creation': return t('portfolio.cat_content');
      default: return category;
    }
  };

  const getProjectImages = (project) => (project?.imageUrl || '').split(',').filter(Boolean);

  const openProject = (project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  const showNextImage = () => {
    if (!selectedProject) return;
    const images = getProjectImages(selectedProject);
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const showPrevImage = () => {
    if (!selectedProject) return;
    const images = getProjectImages(selectedProject);
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="portfolio-page">
      <section className="portfolio-hero">
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

      <div className="container-premium portfolio-main">
        <div className="portfolio-filters">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={selectedCategory === category ? 'portfolio-btn-active' : 'portfolio-btn-inactive'}
            >
              {getCategoryTranslation(category)}
            </Button>
          ))}
        </div>

        {isLoading && (
          <div className="portfolio-loading-state">
            <div className="spinner" />
            <p>{t('common.loading', 'Loading portfolio items...')}</p>
          </div>
        )}

        <div className="portfolio-grid">
          {filteredProjects.map((project, index) => {
            const images = getProjectImages(project);
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="premium-card portfolio-card" onClick={() => openProject(project)}>
                  <div className="portfolio-image-wrapper">
                    {images.length > 1 ? (
                      <div className="portfolio-preview-stack" role="img" aria-label={`${project.title} preview gallery`}>
                        <img src={images[0]} alt={project.title} className="portfolio-image portfolio-image--main" loading="lazy" />
                        <div className="portfolio-preview-side">
                          <img src={images[1]} alt={`${project.title} secondary`} className="portfolio-image portfolio-image--secondary" loading="lazy" />
                          <img src={images[2] || images[1]} alt={`${project.title} secondary`} className="portfolio-image portfolio-image--secondary portfolio-image--secondary-last" loading="lazy" />
                        </div>
                        <div className="portfolio-image-count-pill">
                          <Images size={12} />
                          <span>{images.length}</span>
                        </div>
                      </div>
                    ) : (
                      <img src={images[0]} alt={project.title} className="portfolio-image" loading="lazy" />
                    )}

                    <div className="portfolio-overlay">
                      <div>
                        <Badge className="portfolio-badge">
                          {getCategoryTranslation(project.category)}
                        </Badge>
                        <p className="portfolio-desc">{project.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="portfolio-content">
                    <h3 className="portfolio-title">{project.title}</h3>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <div className="portfolio-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="portfolio-modal-panel" onClick={(event) => event.stopPropagation()}>
            <button className="portfolio-modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project gallery">
              <X size={18} />
            </button>

            <div className="portfolio-modal-media-shell">
              {getProjectImages(selectedProject).length > 1 && (
                <button className="portfolio-modal-nav portfolio-modal-nav--prev" onClick={showPrevImage} aria-label="View previous image">
                  <ChevronLeft size={18} />
                </button>
              )}

              <div className="portfolio-modal-main-frame">
                <img
                  src={getProjectImages(selectedProject)[activeImageIndex]}
                  alt={`${selectedProject.title} ${activeImageIndex + 1}`}
                  className="portfolio-modal-image"
                />
              </div>

              {getProjectImages(selectedProject).length > 1 && (
                <button className="portfolio-modal-nav portfolio-modal-nav--next" onClick={showNextImage} aria-label="View next image">
                  <ChevronRight size={18} />
                </button>
              )}
            </div>

            {getProjectImages(selectedProject).length > 1 && (
              <div className="portfolio-modal-thumbnails" aria-label="Project image thumbnails">
                {getProjectImages(selectedProject).map((image, index) => (
                  <button
                    key={`${selectedProject.id}-${index}`}
                    className={`portfolio-modal-thumb${activeImageIndex === index ? ' portfolio-modal-thumb--active' : ''}`}
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`Show image ${index + 1}`}
                  >
                    <img src={image} alt={`${selectedProject.title} thumbnail ${index + 1}`} className="portfolio-modal-thumb-image" loading="lazy" />
                  </button>
                ))}
              </div>
            )}

            <div className="portfolio-modal-info">
              <h3 className="portfolio-modal-title">{selectedProject.title}</h3>
              <Badge className="portfolio-badge">{getCategoryTranslation(selectedProject.category)}</Badge>
              <p className="portfolio-modal-copy">{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
