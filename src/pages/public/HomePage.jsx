import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import routePaths from '../../routes/routePaths.js';
import { useAppState } from '../../state/useAppState.js';
import { formatRupees } from '../../utils/currency.js';

function HomePage() {
  const { catalog } = useAppState();
  const isLoadingFeatured = catalog.status === 'loading';

  return (
    <>
      <section className="hero-section">
        <img
          className="hero-image"
          src="/assets/hero-marketplace.png"
          alt=""
          aria-hidden="true"
        />
        <div className="container">
          <div className="hero-content">
            <span className="section-kicker">Pixer marketplace</span>
            <h1>Discover digital products built for creators and teams.</h1>
            <p className="lead">
              Browse premium source codes, UI kits, graphics, ebooks, courses,
              and software assets from independent vendors in one simple
              marketplace.
            </p>
            <Link to={routePaths.shop} className="btn btn-primary d-inline-flex align-items-center gap-2">
              Browse products <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-products-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Featured</span>
            <h2>Latest marketplace picks</h2>
          </div>
          {isLoadingFeatured ? (
            <div className="api-state">Loading featured products...</div>
          ) : (
            <div className="featured-product-row">
              {catalog.featuredProducts.map((product) => (
                <article className="featured-product" key={product.id}>
                  <div className="featured-product-icon">
                    <span
                      className="featured-product-image"
                      style={{
                        backgroundImage: `url(${product.image})`,
                        backgroundPosition: product.imagePosition,
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <span>{product.category}</span>
                    <h3>{product.title}</h3>
                    <p>
                      <FiStar aria-hidden="true" /> {product.rating} rating
                    </p>
                  </div>
                  <strong>{formatRupees(product.price)}</strong>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default HomePage;
