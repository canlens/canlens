import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingCart, Heart, Star, ShieldCheck, Truck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useProducts } from '../hooks/useProducts';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';
import '../styles/shop.css';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { products, isLoading, error } = useProducts();
  const [product, setProduct] = useState(null);
  const { addToCart, addToWishlist, wishlist } = useApp();

  useEffect(() => {
    if (!isLoading && products.length > 0) {
      const found = products.find((p) => String(p.id) === String(id));
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

  if (isLoading || !product) {
    return (
      <div className="pt-100 flex flex-col items-center justify-center py-40">
        <div className="spinner mb-4"></div>
        <p className="text-white/70">{t('common.loading', 'Loading product details...')}</p>
      </div>
    );
  }

  const isGlobal = !!product.productUrl;

  return (
    <div className="shop-page pt-100">
      <div className="container-premium py-12">
        <Link to="/shop" className="back-to-shop-link">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Link>

        <div className="product-details-container">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="product-details-image-card"
          >
            <img
              src={product.image || product.imageUrl}
              alt={product.name}
              className="product-details-image"
            />
            {isGlobal && (
              <Badge className="absolute top-4 right-4 shop-brand-badge">Global Product</Badge>
            )}
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="product-details-info"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge className="shop-brand-badge">
                  {product.brand || product.storeName || product.category || 'Product'}
                </Badge>
                <div className="shop-product-rating">
                  <Star className="shop-star-icon-lg" />
                  <span className="shop-rating-text-lg font-medium ml-1">{product.rating || '4.5'}</span>
                </div>
              </div>
              <h1 className="product-details-title">{product.name}</h1>
              {!isGlobal && (
                <div className="product-details-price">
                  {product.price?.toLocaleString() || '0'} RWF
                </div>
              )}
            </div>

            <p className="product-details-desc">
              {product.description || 'No description available for this product.'}
            </p>

            {/* Actions */}
            <div className="product-details-actions">
              {isGlobal ? (
                <Button
                  className="product-details-btn shop-add-btn"
                  onClick={() => window.open(product.productUrl, '_blank')}
                >
                  View on {product.storeName || 'Store'}
                </Button>
              ) : (
                <Button
                  className="product-details-btn shop-add-btn"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                className="product-details-wishlist-btn"
                onClick={handleAddToWishlist}
              >
                <Heart className={`w-6 h-6 ${wishlist.some((item) => item.id === product.id) ? 'shop-wishlist-active' : ''}`} />
              </Button>
            </div>

            {/* Features */}
            {!isGlobal && (
              <div className="product-details-features">
                <div className="product-feature-item">
                  <div className="product-feature-icon-wrapper">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="product-feature-text">Secure Payment</div>
                </div>
                <div className="product-feature-item">
                  <div className="product-feature-icon-wrapper">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="product-feature-text">Fast Delivery</div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
