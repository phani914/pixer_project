import {
  FiArchive,
  FiBarChart2,
  FiClock,
  FiCreditCard,
  FiDownload,
  FiGrid,
  FiHeart,
  FiSettings,
  FiShoppingBag,
  FiStar,
  FiUser,
} from 'react-icons/fi';
import { useAppState } from '../../state/useAppState.js';
import { formatRupees } from '../../utils/currency.js';

const dashboardStats = [
  {
    change: '+18%',
    chart: [34, 48, 42, 66, 58, 78],
    icon: FiShoppingBag,
    label: 'Orders',
    value: '12',
    helper: '3 this month',
  },
  {
    change: '+9%',
    chart: [44, 52, 61, 55, 72, 84],
    icon: FiDownload,
    label: 'Downloads',
    value: '28',
    helper: 'All active',
  },
  {
    change: '+2',
    chart: [22, 28, 34, 31, 42, 47],
    icon: FiHeart,
    label: 'Wishlist',
    value: '7',
    helper: '2 price drops',
  },
  {
    change: '+₹3.2k',
    chart: [38, 36, 52, 64, 61, 74],
    icon: FiCreditCard,
    label: 'Spent',
    value: formatRupees(18450),
    helper: 'Lifetime',
  },
];

const dashboardNavItems = [
  { icon: FiGrid, label: 'Overview', active: true },
  { icon: FiArchive, label: 'Library' },
  { icon: FiShoppingBag, label: 'Orders' },
  { icon: FiHeart, label: 'Wishlist' },
  { icon: FiSettings, label: 'Settings' },
];

function UserDashboardPage() {
  const { userDashboard } = useAppState();
  const isLoadingDashboard = userDashboard.status === 'loading';

  return (
    <section className="dashboard-section">
      <div className="container">
        <div className="dashboard-shell">
          <aside className="dashboard-sidebar" aria-label="User dashboard">
            <div className="dashboard-profile">
              <div className="dashboard-avatar">
                <FiUser aria-hidden="true" />
              </div>
              <div>
                <strong>Priya Sharma</strong>
                <span>Creator account</span>
              </div>
            </div>

            <nav className="dashboard-menu">
              {dashboardNavItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    className={`dashboard-menu-item ${item.active ? 'active' : ''}`}
                    key={item.label}
                    type="button"
                  >
                    <Icon aria-hidden="true" /> {item.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="dashboard-main">
            <div className="dashboard-header">
              <div>
                <span className="section-kicker">Dashboard</span>
                <h1>Welcome back, Priya.</h1>
                <p>
                  Track purchases, manage downloads, and keep your favorite
                  marketplace assets close at hand.
                </p>
              </div>
              <button className="btn btn-primary d-inline-flex align-items-center gap-2" type="button">
                <FiShoppingBag aria-hidden="true" /> Browse products
              </button>
            </div>

            <div className="dashboard-stat-grid">
              {dashboardStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <article className="dashboard-stat analytics-card" key={stat.label}>
                    <div className="analytics-card-top">
                      <span className="dashboard-stat-icon">
                        <Icon aria-hidden="true" />
                      </span>
                      <span className="analytics-change">{stat.change}</span>
                    </div>
                    <div className="analytics-card-body">
                      <span className="analytics-label">{stat.label}</span>
                      <strong>{stat.value}</strong>
                      <small>{stat.helper}</small>
                    </div>
                    <div className="analytics-mini-chart" aria-hidden="true">
                      {stat.chart.map((height, index) => (
                        <span key={`${stat.label}-${height}-${index}`} style={{ height: `${height}%` }} />
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="dashboard-content-grid">
              <section className="dashboard-panel dashboard-library">
                <div className="dashboard-panel-heading">
                  <div>
                    <h2>My library</h2>
                    <p>Recent products ready to download.</p>
                  </div>
                  <FiDownload aria-hidden="true" />
                </div>

                <div className="dashboard-library-list">
                  {isLoadingDashboard ? (
                    <div className="api-state">Loading library...</div>
                  ) : (
                    userDashboard.libraryProducts.map((product) => (
                      <article className="dashboard-library-item" key={product.id}>
                        <div className="dashboard-product-icon">
                          <span
                            className="dashboard-product-image"
                            style={{
                              backgroundImage: `url(${product.image})`,
                              backgroundPosition: product.imagePosition,
                            }}
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <h3>{product.title}</h3>
                          <span>{product.category}</span>
                        </div>
                        <strong>{formatRupees(product.price)}</strong>
                      </article>
                    ))
                  )}
                </div>
              </section>

              <section className="dashboard-panel">
                <div className="dashboard-panel-heading">
                  <div>
                    <h2>Activity</h2>
                    <p>Latest account updates.</p>
                  </div>
                  <FiClock aria-hidden="true" />
                </div>

                <div className="dashboard-activity-list">
                  {isLoadingDashboard ? (
                    <div className="api-state">Loading activity...</div>
                  ) : (
                    userDashboard.activity.map((activity) => (
                      <article className="dashboard-activity" key={activity.title}>
                        <span />
                        <div>
                          <h3>{activity.title}</h3>
                          <p>{activity.time}</p>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </section>
            </div>

            <div className="dashboard-content-grid dashboard-bottom-grid">
              <section className="dashboard-panel">
                <div className="dashboard-panel-heading">
                  <div>
                    <h2>Recommendations</h2>
                    <p>Based on your recent downloads.</p>
                  </div>
                  <FiStar aria-hidden="true" />
                </div>
                {isLoadingDashboard ? (
                  <div className="api-state">Loading recommendations...</div>
                ) : (
                  <div className="dashboard-recommendation">
                    <FiBarChart2 aria-hidden="true" />
                    <div>
                      <h3>{userDashboard.recommendation.title}</h3>
                      <p>{userDashboard.recommendation.description}</p>
                    </div>
                  </div>
                )}
              </section>

              <section className="dashboard-panel dashboard-billing-panel">
                <h2>Billing summary</h2>
                <div>
                  <span>Next invoice</span>
                  <strong>{formatRupees(0)}</strong>
                </div>
                <p>No active subscriptions. One-time purchases remain available in your library.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserDashboardPage;
