import { FiEdit3, FiPlus, FiSearch } from 'react-icons/fi';
import { vendorProducts } from '../../data/vendorDashboard.js';
import { formatRupees } from '../../utils/currency.js';

function VendorProductsPage() {
  return (
    <section className="dashboard-panel vendor-page-panel">
      <div className="vendor-page-heading">
        <div>
          <h2>Products</h2>
          <p>Review, edit, and publish your marketplace listings.</p>
        </div>
        <button className="btn btn-primary d-inline-flex align-items-center gap-2" type="button">
          <FiPlus aria-hidden="true" /> New product
        </button>
      </div>

      <div className="vendor-toolbar">
        <FiSearch aria-hidden="true" />
        <input type="search" placeholder="Search vendor products" aria-label="Search vendor products" />
      </div>

      <div className="vendor-table">
        <div className="vendor-table-head">
          <span>Product</span>
          <span>Status</span>
          <span>Sales</span>
          <span>Revenue</span>
          <span>Action</span>
        </div>
        {vendorProducts.map((product) => (
          <article className="vendor-table-row" key={product.id}>
            <div className="vendor-table-product">
              <span
                className="vendor-product-thumb"
                style={{
                  backgroundImage: `url(${product.image})`,
                  backgroundPosition: product.imagePosition,
                }}
                aria-hidden="true"
              />
              <div>
                <strong>{product.title}</strong>
                <span>{product.category}</span>
              </div>
            </div>
            <span className="vendor-status">{product.status}</span>
            <span>{product.sales}</span>
            <span>{formatRupees(product.revenue)}</span>
            <button className="vendor-icon-button" type="button" aria-label={`Edit ${product.title}`}>
              <FiEdit3 aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default VendorProductsPage;
