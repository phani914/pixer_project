import {
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {
  getFeaturedProducts,
  getProductCategories,
  getProducts,
  getUserDashboard,
  getVendorEarnings,
  getVendorOrders,
  getVendorOverview,
  getVendorProducts,
} from '../api/dummyApi.js';
import AppStateContext from './appStateContext.js';

const initialState = {
  cart: [],
  catalog: {
    categories: ['All'],
    featuredProducts: [],
    products: [],
    status: 'loading',
  },
  userDashboard: {
    activity: [],
    libraryProducts: [],
    recommendation: null,
    status: 'loading',
  },
  vendor: {
    earnings: null,
    orders: [],
    overview: {
      orders: [],
      stats: [],
      topProducts: [],
    },
    products: [],
    status: 'loading',
  },
};

function appStateReducer(state, action) {
  switch (action.type) {
    case 'app/loadSuccess':
      return {
        ...state,
        catalog: {
          categories: action.payload.categories,
          featuredProducts: action.payload.featuredProducts,
          products: action.payload.products,
          status: 'success',
        },
        userDashboard: {
          ...action.payload.userDashboard,
          status: 'success',
        },
        vendor: {
          earnings: action.payload.vendorEarnings,
          orders: action.payload.vendorOrders,
          overview: action.payload.vendorOverview,
          products: action.payload.vendorProducts,
          status: 'success',
        },
      };
    case 'app/loadError':
      return {
        ...state,
        catalog: {
          ...state.catalog,
          status: 'error',
        },
        userDashboard: {
          ...state.userDashboard,
          status: 'error',
        },
        vendor: {
          ...state.vendor,
          status: 'error',
        },
      };
    case 'cart/add': {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }
    case 'cart/remove':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case 'cart/decrease':
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    case 'cart/clear':
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
}

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      getProducts(),
      getFeaturedProducts(),
      getProductCategories(),
      getUserDashboard(),
      getVendorOverview(),
      getVendorProducts(),
      getVendorOrders(),
      getVendorEarnings(),
    ])
      .then(([
        products,
        featuredProducts,
        categories,
        userDashboard,
        vendorOverview,
        vendorProducts,
        vendorOrders,
        vendorEarnings,
      ]) => {
        if (!isMounted) {
          return;
        }

        dispatch({
          type: 'app/loadSuccess',
          payload: {
            categories,
            featuredProducts,
            products,
            userDashboard,
            vendorEarnings,
            vendorOrders,
            vendorOverview,
            vendorProducts,
          },
        });
      })
      .catch(() => {
        if (isMounted) {
          dispatch({ type: 'app/loadError' });
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(() => {
    const cartCount = state.cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = state.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    return {
      addToCart: (product) => dispatch({ type: 'cart/add', payload: product }),
      cartCount,
      cartItems: state.cart,
      cartTotal,
      catalog: state.catalog,
      clearCart: () => dispatch({ type: 'cart/clear' }),
      decreaseCartItem: (productId) => dispatch({ type: 'cart/decrease', payload: productId }),
      removeFromCart: (productId) => dispatch({ type: 'cart/remove', payload: productId }),
      userDashboard: state.userDashboard,
      vendor: state.vendor,
    };
  }, [state]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}
