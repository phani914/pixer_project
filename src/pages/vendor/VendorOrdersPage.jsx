import { FiDownload, FiShoppingBag } from 'react-icons/fi';
import { useAppState } from '../../state/useAppState.js';
import { formatRupees } from '../../utils/currency.js';

function VendorOrdersPage() {
  const { vendor } = useAppState();
  const isLoadingOrders = vendor.status === 'loading';

  return (
    <section className="dashboard-panel vendor-page-panel">
      <div className="vendor-page-heading">
        <div>
          <h2>Orders</h2>
          <p>Monitor buyer orders and fulfillment status.</p>
        </div>
        <button className="btn btn-outline-primary d-inline-flex align-items-center gap-2" type="button">
          <FiDownload aria-hidden="true" /> Export
        </button>
      </div>

      <div className="vendor-table vendor-orders-table">
        <div className="vendor-table-head">
          <span>Order</span>
          <span>Buyer</span>
          <span>Product</span>
          <span>Status</span>
          <span>Total</span>
        </div>
        {isLoadingOrders ? (
          <div className="api-state vendor-table-state">Loading vendor orders...</div>
        ) : (
          vendor.orders.map((order) => (
            <article className="vendor-table-row" key={order.id}>
              <span className="vendor-order-id">
                <FiShoppingBag aria-hidden="true" /> {order.id}
              </span>
              <span>{order.buyer}</span>
              <span>{order.product}</span>
              <span className="vendor-status">{order.status}</span>
              <strong>{formatRupees(order.total)}</strong>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default VendorOrdersPage;
