import { useState } from 'react';
import {
  FiArrowRight,
  FiCheckCircle,
  FiCreditCard,
  FiMinus,
  FiPlus,
  FiShield,
  FiShoppingBag,
  FiSmartphone,
  FiTrash2,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import routePaths from '../../routes/routePaths.js';
import { useAppState } from '../../state/useAppState.js';
import { formatRupees } from '../../utils/currency.js';

const paymentMethods = [
  {
    description: 'Visa, Mastercard, RuPay',
    icon: FiCreditCard,
    id: 'card',
    label: 'Card',
  },
  {
    description: 'UPI ID or QR payment',
    icon: FiSmartphone,
    id: 'upi',
    label: 'UPI',
  },
  {
    description: 'Saved wallet balance',
    icon: FiShoppingBag,
    id: 'wallet',
    label: 'Wallet',
  },
];

function CartPage() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const {
    addToCart,
    cartCount,
    cartItems,
    cartTotal,
    clearCart,
    decreaseCartItem,
    removeFromCart,
  } = useAppState();
  const platformFee = cartItems.length > 0 ? 99 : 0;
  const savings = cartTotal >= 6000 ? 500 : 0;
  const payableTotal = Math.max(cartTotal + platformFee - savings, 0);
  const selectedPaymentMethod = paymentMethods.find((method) => method.id === paymentMethod);

  if (cartItems.length === 0) {
    return (
      <section className="cart-section">
        <div className="container">
          <div className="cart-empty-state">
            <span className="cart-empty-icon">
              <FiShoppingBag aria-hidden="true" />
            </span>
            <span className="section-kicker">Cart</span>
            <h1>Your cart is ready for something good.</h1>
            <p className="lead">
              Add digital products from the shop and they will appear here with
              pricing, quantities, and checkout details.
            </p>
            <Link to={routePaths.shop} className="btn btn-primary d-inline-flex align-items-center gap-2">
              Browse products <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-section">
      <div className="container">
        <span className="section-kicker">Cart</span>
        <div className="cart-header">
          <div>
            <h1>Your cart</h1>
            <p className="lead">
              {cartCount} item{cartCount === 1 ? '' : 's'} ready for instant digital delivery.
            </p>
          </div>
          <div className="cart-header-actions">
            <Link to={routePaths.shop} className="btn btn-outline-primary">
              Continue shopping
            </Link>
            <button className="btn btn-link cart-clear-button" type="button" onClick={clearCart}>
              Clear cart
            </button>
          </div>
        </div>

        <div className="cart-grid">
          <div className="cart-main-stack">
            <section className="cart-panel">
              <div className="cart-panel-heading">
                <h2>Products</h2>
                <span>{cartItems.length} selected</span>
              </div>

              <div className="cart-items">
                {cartItems.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <span
                      className="cart-item-thumb"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundPosition: item.imagePosition,
                      }}
                      aria-hidden="true"
                    />
                    <div className="cart-item-main">
                      <span>{item.category}</span>
                      <h2>{item.title}</h2>
                      <p>{item.fileType} · {item.license}</p>
                    </div>
                    <div className="cart-quantity-control" aria-label={`${item.title} quantity`}>
                      <button
                        type="button"
                        onClick={() => decreaseCartItem(item.id)}
                        aria-label={`Decrease ${item.title} quantity`}
                      >
                        <FiMinus aria-hidden="true" />
                      </button>
                      <strong>{item.quantity}</strong>
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        aria-label={`Increase ${item.title} quantity`}
                      >
                        <FiPlus aria-hidden="true" />
                      </button>
                    </div>
                    <div className="cart-item-price">
                      <span>{formatRupees(item.price)} each</span>
                      <strong>{formatRupees(item.price * item.quantity)}</strong>
                    </div>
                    <button
                      className="cart-remove-button"
                      type="button"
                      aria-label={`Remove ${item.title}`}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FiTrash2 aria-hidden="true" />
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <section className="cart-panel payment-panel">
              <div className="cart-panel-heading">
                <h2>Payment method</h2>
                <span>{selectedPaymentMethod.label}</span>
              </div>

              <div className="payment-method-grid">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = paymentMethod === method.id;

                  return (
                    <label
                      className={`payment-method ${isSelected ? 'active' : ''}`}
                      key={method.id}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={isSelected}
                        onChange={() => setPaymentMethod(method.id)}
                      />
                      <span className="payment-method-icon">
                        <Icon aria-hidden="true" />
                      </span>
                      <span>
                        <strong>{method.label}</strong>
                        <small>{method.description}</small>
                      </span>
                    </label>
                  );
                })}
              </div>

              {paymentMethod === 'card' ? (
                <div className="payment-card-form">
                  <label>
                    <span>Name on card</span>
                    <input type="text" placeholder="Priya Sharma" autoComplete="cc-name" />
                  </label>
                  <label>
                    <span>Card number</span>
                    <input type="text" placeholder="4242 4242 4242 4242" autoComplete="cc-number" inputMode="numeric" />
                  </label>
                  <div className="payment-card-row">
                    <label>
                      <span>Expiry</span>
                      <input type="text" placeholder="MM / YY" autoComplete="cc-exp" />
                    </label>
                    <label>
                      <span>CVV</span>
                      <input type="password" placeholder="123" autoComplete="cc-csc" inputMode="numeric" />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="payment-alt-state">
                  <selectedPaymentMethod.icon aria-hidden="true" />
                  <div>
                    <strong>{selectedPaymentMethod.label} selected</strong>
                    <span>{selectedPaymentMethod.description}</span>
                  </div>
                </div>
              )}
            </section>
          </div>

          <aside className="cart-summary">
            <div>
              <span className="section-kicker">Summary</span>
              <h2>Order details</h2>
            </div>
            <dl className="cart-summary-list">
              <div>
                <dt>Subtotal</dt>
                <dd>{formatRupees(cartTotal)}</dd>
              </div>
              <div>
                <dt>Platform fee</dt>
                <dd>{formatRupees(platformFee)}</dd>
              </div>
              <div>
                <dt>Bundle savings</dt>
                <dd>-{formatRupees(savings)}</dd>
              </div>
            </dl>
            <div className="cart-payment-chip">
              <FiCreditCard aria-hidden="true" />
              <span>Paying with {selectedPaymentMethod.label}</span>
            </div>
            <div className="cart-total-row">
              <span>Total</span>
              <strong>{formatRupees(payableTotal)}</strong>
            </div>
            <button className="btn btn-primary d-inline-flex align-items-center justify-content-center gap-2" type="button">
              Checkout <FiArrowRight aria-hidden="true" />
            </button>
            <div className="cart-assurance">
              <span>
                <FiShield aria-hidden="true" /> Secure checkout
              </span>
              <span>
                <FiCheckCircle aria-hidden="true" /> Instant downloads after payment
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
