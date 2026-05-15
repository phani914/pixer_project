import { Link, useParams } from 'react-router-dom';
import {
  FiArrowLeft,
  FiCheckCircle,
  FiDownload,
  FiRefreshCw,
  FiShield,
  FiShoppingCart,
  FiStar,
  FiUser,
} from 'react-icons/fi';
import routePaths from '../../routes/routePaths.js';
import { useAppState } from '../../state/useAppState.js';
import { formatRupees } from '../../utils/currency.js';

function ProductDetailsPage() {
  const { productSlug } = useParams();
  const { addToCart, catalog } = useAppState();
  const product = catalog.products.find((item) => item.slug === productSlug);
  const isLoadingProduct = catalog.status === 'loading';

  if (isLoadingProduct) {
    return (
      <section className="page-section">
        <div className="container">
          <div className="api-state">Loading product details...</div>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="page-section">
        <div className="container">
          <span className="section-kicker">Product not found</span>
          <h1>This marketplace product is unavailable.</h1>
          <p className="lead">
            The item may have moved or the link may be incorrect.
          </p>
          <Link to={routePaths.shop} className="btn btn-primary">
            Back to shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="product-details-section">
      <div className="container">
        <Link to={routePaths.shop} className="details-back-link">
          <FiArrowLeft aria-hidden="true" /> Back to products
        </Link>

        <div className="details-grid">
          <div className="details-preview">
            <span className="product-badge">{product.badge}</span>
            <span
              className="details-product-image"
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundPosition: product.imagePosition,
              }}
              aria-hidden="true"
            />
          </div>

          <div className="details-content">
            <span className="section-kicker">{product.category}</span>
            <h1>{product.title}</h1>
            <p className="lead">{product.description}</p>

            <div className="details-meta">
              <span>
                <FiStar aria-hidden="true" /> {product.rating} rating
              </span>
              <span>
                <FiDownload aria-hidden="true" /> {product.downloads.toLocaleString()} downloads
              </span>
              <span>
                <FiUser aria-hidden="true" /> {product.creator}
              </span>
            </div>

            <div className="details-purchase">
              <div>
                <span>Price</span>
                <strong>{formatRupees(product.price)}</strong>
              </div>
              <button
                className="btn btn-primary d-inline-flex align-items-center gap-2"
                type="button"
                onClick={() => addToCart(product)}
              >
                <FiShoppingCart aria-hidden="true" /> Add to cart
              </button>
            </div>
          </div>
        </div>

        <div className="details-info-grid">
          <article className="details-panel">
            <h2>What is included</h2>
            <ul className="details-feature-list">
              {product.features.map((feature) => (
                <li key={feature}>
                  <FiCheckCircle aria-hidden="true" /> {feature}
                </li>
              ))}
            </ul>
          </article>

          <article className="details-panel">
            <h2>Product details</h2>
            <dl className="details-spec-list">
              <div>
                <dt>File type</dt>
                <dd>{product.fileType}</dd>
              </div>
              <div>
                <dt>Last updated</dt>
                <dd>{product.lastUpdated}</dd>
              </div>
              <div>
                <dt>License</dt>
                <dd>{product.license}</dd>
              </div>
            </dl>
          </article>

          <article className="details-panel">
            <h2>Buyer protection</h2>
            <div className="details-assurance">
              <span>
                <FiShield aria-hidden="true" /> Secure marketplace checkout
              </span>
              <span>
                <FiRefreshCw aria-hidden="true" /> Free updates for this item
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
