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
        <Link to="/shop" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="product-details-image-container bg-muted rounded-2xl overflow-hidden aspect-square flex items-center justify-center p-8 relative"
          >
            <img
              src={product.image || product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain"
            />
            {isGlobal && (
              <Badge className="absolute top-4 right-4 bg-primary text-white">Global Product</Badge>
            )}
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="text-sm font-medium">
                  {product.brand || product.storeName || product.category || 'Product'}
                </Badge>
                <div className="flex items-center text-amber-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1 text-sm font-medium text-foreground">{product.rating || '4.5'}</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
              {!isGlobal && (
                <div className="text-3xl font-semibold text-primary mb-6">
                  ${product.price?.toLocaleString() || '0'}
                </div>
              )}
            </div>

            <div className="prose prose-sm dark:prose-invert mb-8 text-muted-foreground whitespace-pre-wrap">
              {product.description || 'No description available for this product.'}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mt-auto">
              <div className="flex gap-4">
                {isGlobal ? (
                  <Button
                    className="flex-1 h-14 text-lg bg-primary hover:bg-primary/90 text-white shadow-lg"
                    onClick={() => window.open(product.productUrl, '_blank')}
                  >
                    View on {product.storeName || 'Store'}
                  </Button>
                ) : (
                  <Button
                    className="flex-1 h-14 text-lg bg-primary hover:bg-primary/90 text-white shadow-lg"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 border-2"
                  onClick={handleAddToWishlist}
                >
                  <Heart className={`w-6 h-6 ${wishlist.some((item) => item.id === product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Features */}
            {!isGlobal && (
              <div className="grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-medium">Secure Payment</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-medium">Fast Delivery</div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
