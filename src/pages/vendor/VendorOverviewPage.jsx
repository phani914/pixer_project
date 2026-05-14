import { FiActivity, FiDownload, FiEye, FiShoppingBag } from 'react-icons/fi';
import { vendorOrders, vendorProducts, vendorStats } from '../../data/vendorDashboard.js';
import { formatRupees } from '../../utils/currency.js';

const statIcons = [FiActivity, FiShoppingBag, FiEye, FiDownload];

function VendorOverviewPage() {
  const topProducts = vendorProducts.slice(0, 3);

  return (
    <>
      <div className="dashboard-stat-grid">
        {vendorStats.map((stat, index) => {
          const Icon = statIcons[index];

          return (
            <article className="dashboard-stat" key={stat.label}>
              <span className="dashboard-stat-icon">
                <Icon aria-hidden="true" />
              </span>
              <div>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.helper}</small>
              </div>
            </article>
          );
        })}
      </div>

      <div className="dashboard-content-grid">
        <section className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>Top products</h2>
              <p>Best performing listings this month.</p>
            </div>
            <FiActivity aria-hidden="true" />
          </div>

          <div className="vendor-product-list">
            {topProducts.map((product) => (
              <article className="vendor-product-row" key={product.id}>
                <span
                  className="vendor-product-thumb"
                  style={{
                    backgroundImage: `url(${product.image})`,
                    backgroundPosition: product.imagePosition,
                  }}
                  aria-hidden="true"
                />
                <div>
                  <h3>{product.title}</h3>
                  <p>{product.sales} sales · {product.conversion} conversion</p>
                </div>
                <strong>{formatRupees(product.revenue)}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>Recent orders</h2>
              <p>Latest buyer activity.</p>
            </div>
            <FiShoppingBag aria-hidden="true" />
          </div>

          <div className="vendor-order-stack">
            {vendorOrders.slice(0, 3).map((order) => (
              <article className="vendor-order-card" key={order.id}>
                <div>
                  <strong>{order.id}</strong>
                  <span>{order.buyer}</span>
                </div>
                <span className="vendor-status">{order.status}</span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default VendorOverviewPage;
