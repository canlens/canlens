import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';
import '../styles/cart.css';

export function Cart() {
  const { t } = useTranslation();
  const { cart, removeFromCart, updateCartQuantity, cartTotal, clearCart } = useApp();

  const handleCheckout = () => {
    toast.success(t('cart.toast_checkout'));
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page cart-empty pt-20">
        <div className="container-premium py-24 cart-empty-content">
          <ShoppingBag className="cart-empty-icon" />
          <h2 className="text-heading-1 cart-empty-title">{t('cart.empty_title')}</h2>
          <p className="cart-empty-subtitle">
            {t('cart.empty_subtitle')}
          </p>
          <Link to="/shop">
            <Button className="cart-browse-btn">
              {t('cart.browse_btn')}
              <ArrowRight className="icon-sm cart-btn-icon-ml" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page pt-20">
      <section className="cart-hero py-16">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-display cart-hero-title">{t('cart.title')}</h1>
            <p className="cart-hero-subtitle">{t('cart.items_count', { count: cart.length })}</p>
          </motion.div>
        </div>
      </section>

      <div className="container-premium py-12">
        <div className="cart-grid">
          {/* Cart Items */}
          <div className="cart-items-list">
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass-card cart-item-card">
                  <div className="cart-item-inner">
                    <Link to={`/shop/${item.id}`} className="cart-item-img-wrapper">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-img"
                      />
                    </Link>

                    <div className="cart-item-content">
                      <div className="cart-item-header">
                        <div>
                          <Link to={`/shop/${item.id}`}>
                            <h3 className="cart-item-title">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="cart-item-brand">{item.brand}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            removeFromCart(item.id);
                            toast.success(t('cart.toast_removed'));
                          }}
                          className="cart-item-remove-btn"
                        >
                          <Trash2 className="icon-sm" />
                        </Button>
                      </div>

                      <div className="cart-item-footer">
                        <div className="cart-quantity-controls">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="cart-quantity-btn"
                          >
                            <Minus className="cart-quantity-icon" />
                          </Button>
                          <span className="cart-quantity-value">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="cart-quantity-btn"
                          >
                            <Plus className="cart-quantity-icon" />
                          </Button>
                        </div>

                        <div className="cart-item-pricing">
                          <p className="cart-item-unit-price">
                            ${item.price.toLocaleString()} {t('cart.each')}
                          </p>
                          <p className="cart-item-total-price">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="cart-summary-wrapper">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="glass-card cart-summary-card">
                <h2 className="cart-summary-title">{t('cart.order_summary')}</h2>

                <div className="cart-summary-lines">
                  <div className="cart-summary-line">
                    <span>{t('cart.subtotal')}</span>
                    <span>${cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="cart-summary-line">
                    <span>{t('cart.shipping')}</span>
                    <span>{t('cart.free')}</span>
                  </div>
                  <div className="cart-summary-line">
                    <span>{t('cart.tax')}</span>
                    <span>${(cartTotal * 0.18).toLocaleString()}</span>
                  </div>
                  <div className="cart-summary-divider" />
                  <div className="cart-summary-total">
                    <span>{t('cart.total')}</span>
                    <span className="cart-summary-total-val">
                      ${(cartTotal * 1.18).toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="cart-checkout-btn"
                >
                  {t('cart.checkout_btn')}
                  <ArrowRight className="icon-sm cart-btn-icon-ml" />
                </Button>

                <Link to="/shop">
                  <Button
                    variant="outline"
                    className="cart-continue-btn"
                  >
                    {t('cart.continue_btn')}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
