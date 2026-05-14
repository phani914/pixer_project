import products from './products.js';
import { formatRupees } from '../utils/currency.js';

export const vendorProducts = products.map((product, index) => ({
  ...product,
  conversion: ['8.4%', '6.9%', '9.1%', '5.8%', '10.2%', '7.6%'][index],
  revenue: [126900, 87900, 184772, 65400, 94641, 51200][index],
  sales: [31, 35, 28, 22, 59, 26][index],
  status: ['Published', 'Published', 'Published', 'Draft', 'Published', 'Review'][index],
  views: [4800, 3560, 2940, 2100, 6120, 1840][index],
}));

export const vendorStats = [
  {
    helper: '+12.4% vs last month',
    label: 'Revenue',
    value: formatRupees(610813),
  },
  {
    helper: '18 pending fulfillment checks',
    label: 'Orders',
    value: '201',
  },
  {
    helper: 'Across all product pages',
    label: 'Views',
    value: '21.3k',
  },
  {
    helper: 'Average across listings',
    label: 'Conversion',
    value: '7.9%',
  },
];

export const vendorOrders = [
  {
    buyer: 'Ananya Rao',
    date: 'May 14, 2026',
    id: 'PX-2408',
    product: products[0].title,
    status: 'Paid',
    total: 4099,
  },
  {
    buyer: 'Rahul Mehta',
    date: 'May 13, 2026',
    id: 'PX-2407',
    product: products[2].title,
    status: 'Delivered',
    total: 6599,
  },
  {
    buyer: 'Neha Kapoor',
    date: 'May 12, 2026',
    id: 'PX-2406',
    product: products[4].title,
    status: 'Paid',
    total: 1599,
  },
  {
    buyer: 'Kabir Sethi',
    date: 'May 11, 2026',
    id: 'PX-2405',
    product: products[1].title,
    status: 'Refund review',
    total: 2499,
  },
];

export const payoutHistory = [
  {
    amount: 85400,
    date: 'May 10, 2026',
    id: 'PAY-1182',
    status: 'Paid',
  },
  {
    amount: 73220,
    date: 'April 25, 2026',
    id: 'PAY-1154',
    status: 'Paid',
  },
  {
    amount: 64290,
    date: 'April 10, 2026',
    id: 'PAY-1128',
    status: 'Paid',
  },
];
