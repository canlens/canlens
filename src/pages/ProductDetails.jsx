import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Star,
  ShieldCheck,
  Truck,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Copy,
  BadgeCheck,
  Headphones,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../hooks/useProducts';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';
import '../styles/ProductDetails.css';

function ProfessionalProductGallery({ images, productName, isGlobal }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  if (!images || images.length === 0) return null;

  const mainImage = images[currentIndex];

  useEffect(() => {
    setIsImageLoaded(false);
    setHasImageError(false);
    setZoomStyle({});
  }, [currentIndex]);

  const handleMouseMove = (event) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;
    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
      backgroundImage: `url(${mainImage})`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  const handleNextImage = (event) => {
    event?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (event) => {
    event?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (delta > 50) {
      handlePrevImage();
    } else if (delta < -50) {
      handleNextImage();
    }
    setTouchStartX(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isLightboxOpen) return;
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNextImage();
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevImage();
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, images.length]);

  return (
    <div className="product-gallery">
      <div
        className="product-gallery-stage"
        onClick={() => setIsLightboxOpen(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsLightboxOpen(true);
          }
        }}
      >
        {!isImageLoaded && !hasImageError && <div className="product-gallery-skeleton" />}

        {hasImageError ? (
          <div className="product-gallery-fallback">
            <p>The selected image could not be loaded.</p>
          </div>
        ) : (
          <>
            <img
              src={mainImage}
              alt={productName}
              loading="lazy"
              className={`product-gallery-image${isImageLoaded ? ' product-gallery-image--ready' : ' product-gallery-image--loading'}`}
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setHasImageError(true)}
            />
            {zoomStyle.backgroundImage && (
              <div
                className="product-gallery-zoom-layer"
                style={{
                  ...zoomStyle,
                  backgroundSize: '200%',
                }}
              />
            )}
          </>
        )}

        <span className="product-gallery-counter">
          {currentIndex + 1} / {images.length}
        </span>

        {isGlobal && <span className="product-gallery-badge shop-brand-badge">Global Product</span>}

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="product-gallery-nav product-gallery-nav--prev"
              onClick={handlePrevImage}
              aria-label="View previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="product-gallery-nav product-gallery-nav--next"
              onClick={handleNextImage}
              aria-label="View next image"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        <span className="product-gallery-hint">Tap to expand</span>
      </div>

      {images.length > 1 && (
        <div className="product-gallery-thumbnails" aria-label="Product image thumbnails">
          {images.map((imgUrl, idx) => (
            <button
              key={`${imgUrl}-${idx}`}
              type="button"
              className={`product-gallery-thumb${currentIndex === idx ? ' product-gallery-thumb--active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Show image ${idx + 1}`}
            >
              <img src={imgUrl} alt={`${productName} thumbnail ${idx + 1}`} className="product-gallery-thumb-image" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {isLightboxOpen && (
        <div
          className="product-details-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Product gallery viewer"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="product-details-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <div className="product-details-lightbox-toolbar">
              <span className="product-details-lightbox-counter">
                {currentIndex + 1} / {images.length}
              </span>
              <button
                type="button"
                className="product-details-lightbox-close"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close image viewer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="product-details-lightbox-media" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              {images.length > 1 && (
                <button
                  type="button"
                  className="product-details-lightbox-nav product-details-lightbox-nav--prev"
                  onClick={handlePrevImage}
                  aria-label="View previous image"
                >
                  <ChevronLeft size={18} />
                </button>
              )}

              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={images[currentIndex]}
                alt={`${productName} large ${currentIndex + 1}`}
                className="product-details-lightbox-image"
              />

              {images.length > 1 && (
                <button
                  type="button"
                  className="product-details-lightbox-nav product-details-lightbox-nav--next"
                  onClick={handleNextImage}
                  aria-label="View next image"
                >
                  <ChevronRight size={18} />
                </button>
              )}
            </div>

            {images.length > 1 && (
              <div className="product-details-lightbox-thumbs" aria-label="Lightbox thumbnails">
                {images.map((imgUrl, idx) => (
                  <button
                    key={`${imgUrl}-${idx}-lightbox`}
                    type="button"
                    className={`product-details-lightbox-thumb${currentIndex === idx ? ' product-details-lightbox-thumb--active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Show image ${idx + 1}`}
                  >
                    <img src={imgUrl} alt={`${productName} thumbnail ${idx + 1}`} className="product-details-lightbox-thumb-image" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { products, isLoading } = useProducts();
  const [product, setProduct] = useState(null);
  const { addToCart, addToWishlist, wishlist } = useApp();

  useEffect(() => {
    if (!isLoading && products.length > 0) {
      const found = products.find((item) => String(item.id) === String(id));
      if (found) {
        setProduct(found);
      } else {
        toast.error('Product not found');
        navigate('/shop');
      }
    }
  }, [id, products, isLoading, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`Added ${product.name} to cart`);
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      const isInWishlist = wishlist.some((item) => item.id === product.id);
      if (!isInWishlist) {
        addToWishlist(product);
        toast.success(`Added ${product.name} to wishlist`);
      } else {
        toast.info(`${product.name} is already in wishlist`);
      }
    }
  };

  const handleCopyLink = async () => {
    if (typeof window === 'undefined') return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied');
    } catch {
      toast.error('Unable to copy product link');
    }
  };

  const handleShare = async () => {
    if (typeof window === 'undefined') return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || 'CanLens product',
          text: `Check out this product from CanLens: ${product?.name || ''}`,
          url: window.location.href,
        });
      } catch {
        // Share cancelled.
      }
      return;
    }

    handleCopyLink();
  };

  if (isLoading || !product) {
    return (
      <div className="product-details-loading-state">
        <div className="spinner" />
        <p>{t('common.loading', 'Loading product details...')}</p>
      </div>
    );
  }

  const isGlobal = !!product.productUrl;
  const productImages = (product.image || product.imageUrl)?.split(',').filter(Boolean) || [];
  const brandName = product.brand || product.storeName || product.category || 'Product';
  const availabilityLabel = product.available === false ? 'Limited availability' : 'Available now';
  const featureCards = [
    {
      title: 'Secure Payment',
      copy: 'Protected transactions with trusted checkout options.',
      icon: <ShieldCheck size={18} />,
    },
    {
      title: 'Fast Delivery',
      copy: 'Quick dispatch and reliable delivery for every order.',
      icon: <Truck size={18} />,
    },
    {
      title: 'Original Product',
      copy: 'Authentic equipment sourced directly from trusted partners.',
      icon: <BadgeCheck size={18} />,
    },
    {
      title: 'Customer Support',
      copy: 'Guidance from our on-hand specialists whenever you need it.',
      icon: <Headphones size={18} />,
    },
  ];

  return (
    <div className="product-details-page">
      <div className="container-premium product-details-page__inner">
        <nav className="product-details-breadcrumb" aria-label="Breadcrumb">
          <Link className="product-details-breadcrumb-link" to="/">
            Home
          </Link>
          <span>/</span>
          <Link className="product-details-breadcrumb-link" to="/shop">
            Shop
          </Link>
          <span>/</span>
          <span className="product-details-breadcrumb-link">{product.category || 'Collection'}</span>
          <span>/</span>
          <span className="product-details-breadcrumb-current">{product.name}</span>
        </nav>

        <Link to="/shop" className="product-details-back-link">
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        <div className="product-details-shell">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="product-details-gallery-card"
          >
            <ProfessionalProductGallery images={productImages} productName={product.name} isGlobal={isGlobal} />
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="product-details-info-card"
          >
            <div className="product-details-info-card__inner">
              <div className="product-details-top-row">
                <span className="shop-brand-badge">{brandName}</span>
                <div className="product-details-rating" aria-label={`Rated ${product.rating || '4.5'} out of 5`}>
                  <Star size={16} />
                  <span>{product.rating || '4.5'}</span>
                </div>
              </div>

              <div className="product-details-meta-row">
                <span className="product-details-meta-pill">{product.category || 'Photography'}</span>
                <span className="product-details-meta-pill">{isGlobal ? 'International shipping' : 'Studio pickup available'}</span>
              </div>

              <h1 className="product-details-title">{product.name}</h1>

              {!isGlobal ? (
                <div className="product-details-price">{product.price?.toLocaleString() || '0'} RWF</div>
              ) : (
                <div className="product-details-price">View on {product.storeName || 'store'}</div>
              )}

              <p className="product-details-description">
                {product.description || 'No description available for this product.'}
              </p>

              <div className="product-details-actions">
                {isGlobal ? (
                  <button
                    type="button"
                    className="product-details-primary-btn"
                    onClick={() => window.open(product.productUrl, '_blank')}
                  >
                    View on {product.storeName || 'Store'}
                  </button>
                ) : (
                  <button type="button" className="product-details-primary-btn" onClick={handleAddToCart}>
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                )}

                <button type="button" className="product-details-secondary-btn" onClick={handleAddToWishlist}>
                  <Heart size={18} className={wishlist.some((item) => item.id === product.id) ? 'product-details-wishlist-active' : ''} />
                  Wishlist
                </button>

                <button type="button" className="product-details-icon-btn" onClick={handleShare} aria-label="Share this product">
                  <Share2 size={18} />
                </button>

                <button type="button" className="product-details-icon-btn" onClick={handleCopyLink} aria-label="Copy product link">
                  <Copy size={18} />
                </button>
              </div>

              <div className="product-details-info-grid">
                <div className="product-details-info-stat">
                  <span className="product-details-info-label">Availability</span>
                  <span className="product-details-info-value">{availabilityLabel}</span>
                </div>
                <div className="product-details-info-stat">
                  <span className="product-details-info-label">Brand</span>
                  <span className="product-details-info-value">{brandName}</span>
                </div>
              </div>

              <div className="product-details-feature-grid">
                {featureCards.map((feature) => (
                  <div className="product-details-feature-card" key={feature.title}>
                    <div className="product-details-feature-icon">{feature.icon}</div>
                    <div>
                      <div className="product-details-feature-title">{feature.title}</div>
                      <div className="product-details-feature-copy">{feature.copy}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
