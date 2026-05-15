import products, { productCategories } from '../data/products.js';
import {
  payoutHistory,
  vendorOrders,
  vendorProducts,
  vendorStats,
} from '../data/vendorDashboard.js';

const DEFAULT_DELAY = 450;

function wait(delay = DEFAULT_DELAY) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delay);
  });
}

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

async function respond(data, delay) {
  await wait(delay);
  return clone(data);
}

export async function getProducts({ search = '', category = 'All' } = {}) {
  const normalizedSearch = search.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch =
      !normalizedSearch ||
      product.title.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch) ||
      product.description.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  return respond(filteredProducts);
}

export async function getFeaturedProducts() {
  return respond(products.slice(0, 3));
}

export async function getProductCategories() {
  return respond(productCategories, 250);
}

export async function getProductBySlug(slug) {
  const product = products.find((item) => item.slug === slug) ?? null;
  return respond(product);
}

export async function getUserDashboard() {
  return respond({
    activity: [
      {
        title: 'Downloaded Nova SaaS Dashboard UI Kit',
        time: 'Today, 10:24 AM',
      },
      {
        title: 'Added Productivity App Icon Set to wishlist',
        time: 'Yesterday, 6:12 PM',
      },
      {
        title: 'Payment method updated',
        time: 'May 12, 2026',
      },
    ],
    libraryProducts: products.slice(0, 4),
    recommendation: products[2],
  });
}

export async function getVendorOverview() {
  return respond({
    orders: vendorOrders.slice(0, 3),
    stats: vendorStats,
    topProducts: vendorProducts.slice(0, 3),
  });
}

export async function getVendorProducts() {
  return respond(vendorProducts);
}

export async function getVendorOrders() {
  return respond(vendorOrders);
}

export async function getVendorEarnings() {
  return respond({
    availableBalance: 128940,
    payoutHistory,
    revenueTrend: [48, 62, 54, 78, 68, 92],
    revenueTrendHelper: vendorStats[0].helper,
  });
}
