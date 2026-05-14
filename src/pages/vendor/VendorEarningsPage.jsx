import { FiCreditCard, FiTrendingUp } from 'react-icons/fi';
import { payoutHistory, vendorStats } from '../../data/vendorDashboard.js';
import { formatRupees } from '../../utils/currency.js';

function VendorEarningsPage() {
  return (
    <>
      <div className="dashboard-content-grid dashboard-bottom-grid">
        <section className="dashboard-panel vendor-earnings-hero">
          <span className="section-kicker">Available balance</span>
          <strong>{formatRupees(128940)}</strong>
          <p>Next payout is scheduled after the current settlement window closes.</p>
          <button className="btn btn-primary d-inline-flex align-items-center gap-2" type="button">
            <FiCreditCard aria-hidden="true" /> Request payout
          </button>
        </section>

        <section className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>Revenue trend</h2>
              <p>{vendorStats[0].helper}</p>
            </div>
            <FiTrendingUp aria-hidden="true" />
          </div>
          <div className="vendor-chart-bars" aria-label="Monthly revenue chart">
            {[48, 62, 54, 78, 68, 92].map((height, index) => (
              <span key={height + index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </section>
      </div>

      <section className="dashboard-panel vendor-page-panel">
        <div className="vendor-page-heading">
          <div>
            <h2>Payout history</h2>
            <p>Completed vendor settlements.</p>
          </div>
        </div>

        <div className="vendor-table vendor-payout-table">
          <div className="vendor-table-head">
            <span>Payout ID</span>
            <span>Date</span>
            <span>Status</span>
            <span>Amount</span>
          </div>
          {payoutHistory.map((payout) => (
            <article className="vendor-table-row" key={payout.id}>
              <strong>{payout.id}</strong>
              <span>{payout.date}</span>
              <span className="vendor-status">{payout.status}</span>
              <strong>{formatRupees(payout.amount)}</strong>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default VendorEarningsPage;
