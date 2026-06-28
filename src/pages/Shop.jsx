import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Star, Heart, ShoppingCart, Search, Grid3x3, List } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { categories, brands } from '../data/products';
import { useProducts } from '../hooks/useProducts';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';
import '../styles/shop.css';

export function Shop() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const { addToCart, addToWishlist, wishlist } = useApp();
  const { products, isLoading, error } = useProducts();

  const filteredProducts = products.filter((product) => {
    const searchString = (product.name + ' ' + (product.description || '') + ' ' + (product.storeName || '')).toLowerCase();
    const matchesSearch = searchString.includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand || product.storeName === selectedBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(t('shop.toast_added_cart', { name: product.name }));
  };

  const handleAddToWishlist = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    if (!isInWishlist) {
      addToWishlist(product);
      toast.success(t('shop.toast_added_wishlist', { name: product.name }));
    } else {
      toast.info(t('shop.toast_already_wishlist'));
    }
  };

  return (
    <div className="shop-page pt-100">
      {/* Hero Header */}
      <section className="shop-hero">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="shop-hero-content"
          >
            <h1 className="text-display shop-hero-title">{t('shop.hero_title')}</h1>
            <p className="text-body-large shop-hero-subtitle">
              {t('shop.hero_subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-premium py-12">
        {isLoading && (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="spinner mb-4"></div>
            <p className="text-white/70">{t('common.loading', 'Loading...')}</p>
          </div>
        )}
        
        {error && (
          <div className="py-20 text-center text-red-500">Error: {error}</div>
        )}

        {!isLoading && !error && (
          <>
          <div className="shop-filters-wrapper">
          <div className="shop-filters-top">
            {/* Search */}
            <div className="shop-search-wrapper">
              <div className="shop-search-inner">
                <Search className="shop-search-icon" />
                <Input
                  type="text"
                  placeholder={t('shop.search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="shop-search-input"
                />
              </div>
            </div>

            {/* Category */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="shop-select-trigger">
                <SelectValue placeholder={t('shop.category')} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Brand */}
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="shop-select-trigger">
                <SelectValue placeholder={t('shop.brand')} />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="shop-select-trigger">
                <SelectValue placeholder={t('shop.sort_by')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">{t('shop.sort_featured')}</SelectItem>
                <SelectItem value="price-low">{t('shop.sort_price_low')}</SelectItem>
                <SelectItem value="price-high">{t('shop.sort_price_high')}</SelectItem>
                <SelectItem value="rating">{t('shop.sort_rating')}</SelectItem>
                <SelectItem value="name">{t('shop.sort_name')}</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="shop-view-toggle">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className={`shop-view-btn ${viewMode === 'grid' ? 'shop-view-active' : 'shop-view-inactive'}`}
              >
                <Grid3x3 className="icon-sm" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className={`shop-view-btn ${viewMode === 'list' ? 'shop-view-active' : 'shop-view-inactive'}`}
              >
                <List className="icon-sm" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== 'All' || selectedBrand !== 'All' || searchQuery) && (
            <div className="shop-active-filters">
              <span className="shop-active-filters-label">{t('shop.active_filters')}</span>
              {selectedCategory !== 'All' && (
                <Badge variant="secondary" className="shop-active-badge">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} className="shop-active-badge-remove">×</button>
                </Badge>
              )}
              {selectedBrand !== 'All' && (
                <Badge variant="secondary" className="shop-active-badge">
                  {selectedBrand}
                  <button onClick={() => setSelectedBrand('All')} className="shop-active-badge-remove">×</button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="shop-active-badge">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="shop-active-badge-remove">×</button>
                </Badge>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="shop-results-count">
            {t('shop.showing_products', { count: sortedProducts.length, total: products.length })}
          </div>
        </div>

        {/* Products Grid */}
        {viewMode === 'grid' ? (
          <div className="shop-grid">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/shop/${product.id}`}>
                  <Card className="premium-card shop-product-card group cursor-pointer h-full">
                    <div className="shop-product-image-wrapper">
                      <img
                        src={product.image || product.imageUrl}
                        alt={product.name}
                        className="shop-product-image"
                      />

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => handleAddToWishlist(product, e)}
                        className="shop-wishlist-btn"
                      >
                        <Heart className={`icon-sm ${wishlist.some(item => item.id === product.id) ? 'shop-wishlist-active' : ''}`} />
                      </Button>
                    </div>
                    <div className="shop-product-content">
                      <div className="shop-product-meta-top">
                        <Badge variant="secondary" className="shop-brand-badge">
                          {product.brand || product.storeName || 'Global'}
                        </Badge>
                        <div className="shop-product-rating">
                          <Star className="shop-star-icon" />
                          <span className="shop-rating-text">{product.rating}</span>
                        </div>
                      </div>
                      <h3 className="shop-product-title">
                        {product.name}
                      </h3>
                      <p className="shop-product-desc">{product.description || product.storeName}</p>
                      <div className="shop-product-footer">
                        {product.productUrl ? (
                          <div className="w-full mt-auto">
                            <Button
                              size="sm"
                              className="shop-add-btn w-full"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(product.productUrl, '_blank'); }}
                            >
                              View Product
                            </Button>
                          </div>
                        ) : (
                          <>
                            <span className="shop-product-price">{product.price?.toLocaleString()} RWF</span>
                            <Button
                              size="sm"
                              onClick={(e) => handleAddToCart(product, e)}
                              className="shop-add-btn"
                            >
                              <ShoppingCart className="icon-sm shop-btn-icon-mr" />
                              {t('shop.add')}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="shop-list">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/shop/${product.id}`}>
                  <Card className="premium-card shop-list-card group cursor-pointer">
                    <div className="shop-list-image-wrapper">
                      <img
                        src={product.image || product.imageUrl}
                        alt={product.name}
                        className="shop-list-image"
                      />
                    </div>
                    <div className="shop-list-content">
                      <div className="shop-list-header">
                        <div>
                          <Badge variant="secondary" className="shop-brand-badge mb-2">
                            {product.brand || product.storeName || 'Global'}
                          </Badge>
                          <h3 className="shop-list-title">
                            {product.name}
                          </h3>
                        </div>
                        <div className="shop-product-rating">
                          <Star className="shop-star-icon-lg" />
                          <span className="shop-rating-text-lg">{product.rating}</span>
                        </div>
                      </div>
                      <p className="shop-list-desc">{product.description || product.storeName}</p>
                      {product.specs && (
                        <div className="shop-list-specs">
                          {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="shop-spec-item">
                              <span className="shop-spec-key">{key}:</span>{' '}
                              <span className="shop-spec-value">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="shop-list-footer">
                        {product.productUrl ? (
                          <div className="shop-list-actions w-full justify-end">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={(e) => handleAddToWishlist(product, e)}
                              className="shop-list-wishlist-btn"
                            >
                              <Heart className={`icon-sm ${wishlist.some(item => item.id === product.id) ? 'shop-wishlist-active' : ''}`} />
                            </Button>
                            <Button
                              className="shop-add-btn"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(product.productUrl, '_blank'); }}
                            >
                              View Product
                            </Button>
                          </div>
                        ) : (
                          <>
                            <span className="shop-list-price">{product.price?.toLocaleString()} RWF</span>
                            <div className="shop-list-actions">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={(e) => handleAddToWishlist(product, e)}
                                className="shop-list-wishlist-btn"
                              >
                                <Heart className={`icon-sm ${wishlist.some(item => item.id === product.id) ? 'shop-wishlist-active' : ''}`} />
                              </Button>
                              <Button
                                onClick={(e) => handleAddToCart(product, e)}
                                className="shop-add-btn"
                              >
                                <ShoppingCart className="icon-sm shop-btn-icon-mr" />
                                {t('shop.add_to_cart')}
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {sortedProducts.length === 0 && (
          <div className="shop-no-results">
            <p className="shop-no-results-text">{t('shop.no_results')}</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedBrand('All');
              }}
              className="shop-add-btn mt-4"
            >
              {t('shop.clear_filters')}
            </Button>
          </div>
        )}
        </>
        )}
      </div>
    </div>
  );
}
