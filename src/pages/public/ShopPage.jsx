import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  FiBookOpen,
  FiCode,
  FiDownload,
  FiGrid,
  FiImage,
  FiLayers,
  FiSearch,
  FiShoppingCart,
  FiStar,
} from 'react-icons/fi';
import { useAppState } from '../../state/useAppState.js';
import { formatRupees } from '../../utils/currency.js';

const categoryIcons = {
  'Ebooks': FiBookOpen,
  'Graphics': FiImage,
  'Icons': FiGrid,
  'Source Code': FiCode,
  'Templates': FiLayers,
  'UI Kits': FiLayers,
};

function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') ?? '';
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart, catalog } = useAppState();
  const isLoadingProducts = catalog.status === 'loading';

  const updateSearchTerm = (value) => {
    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return catalog.products.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch =
        !normalizedSearch ||
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, catalog.products, searchTerm]);

  return (
    <section className="product-listing-section">
      <div className="container">
        <div className="listing-header">
          <div>
            <span className="section-kicker">Shop</span>
            <h1>Browse digital marketplace products.</h1>
            <p className="lead">
              Explore source codes, UI kits, graphics, ebooks, courses, and
              digital assets from marketplace vendors.
            </p>
          </div>
          <div className="listing-stat">
            <strong>{catalog.products.length}</strong>
            <span>Curated products</span>
          </div>
        </div>

        <div className="listing-toolbar" aria-label="Product filters">
          <div className="product-search">
            <FiSearch aria-hidden="true" />
            <input
              type="search"
              className="form-control"
              placeholder="Search products"
              value={searchTerm}
              onChange={(event) => updateSearchTerm(event.target.value)}
              aria-label="Search products"
            />
          </div>

          <div className="category-pills" aria-label="Product categories">
            {catalog.categories.map((category) => (
              <button
                className={`category-pill ${activeCategory === category ? 'active' : ''}`}
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {isLoadingProducts ? (
          <div className="api-state">Loading products...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => {
              const ProductIcon = categoryIcons[product.category] || FiGrid;

              return (
                <article className="product-card" key={product.id}>
                  <div className="product-media">
                    <span className="product-badge">{product.badge}</span>
                    <span
                      className="product-image"
                      style={{
                        backgroundImage: `url(${product.image})`,
                        backgroundPosition: product.imagePosition,
                      }}
                      aria-hidden="true"
                    />
                    <ProductIcon className="product-icon product-icon-overlay" aria-hidden="true" />
                  </div>
                  <div className="product-body">
                    <div className="product-meta">
                      <span>{product.category}</span>
                      <span className="product-rating">
                        <FiStar aria-hidden="true" /> {product.rating}
                      </span>
                    </div>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <div className="product-footer">
                      <div>
                        <strong>{formatRupees(product.price)}</strong>
                        <span>
                          <FiDownload aria-hidden="true" /> {product.downloads.toLocaleString()}
                        </span>
                      </div>
                      <button
                        className="btn btn-primary d-inline-flex align-items-center gap-2"
                        type="button"
                        onClick={() => addToCart(product)}
                      >
                        <FiShoppingCart aria-hidden="true" /> Add
                      </button>
                    </div>
                    <Link className="product-details-link" to={`/shop/${product.slug}`}>
                      View details
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-products">
            <h2>No products found</h2>
            <p>Try a different search term or category.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ShopPage;
