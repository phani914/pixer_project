import {
  useCallback,
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
  authUser: null,
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
  notification: null,
};

function createNotification(type, message) {
  return {
    id: Date.now(),
    message,
    type,
  };
}

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
        notification: createNotification(
          'error',
          'We could not load marketplace data. Please refresh and try again.',
        ),
      };
    case 'auth/login':
      return {
        ...state,
        authUser: action.payload,
        notification: createNotification('success', `Welcome, ${action.payload.name}.`),
      };
    case 'auth/logout':
      return {
        ...state,
        authUser: null,
        notification: createNotification('success', 'You have been logged out.'),
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
          notification: createNotification(
            'success',
            `${action.payload.title} quantity updated in your cart.`,
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
        notification: createNotification(
          'success',
          `${action.payload.title} was added to your cart.`,
        ),
      };
    }
    case 'cart/remove':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
        notification: createNotification('success', 'Product removed from your cart.'),
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
        notification: createNotification('success', 'Cart cleared.'),
      };
    case 'notification/show':
      return {
        ...state,
        notification: createNotification(action.payload.type, action.payload.message),
      };
    case 'notification/clear':
      return {
        ...state,
        notification:
          state.notification?.id === action.payload ? null : state.notification,
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

  const addToCart = useCallback((product) => {
    dispatch({ type: 'cart/add', payload: product });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'cart/clear' });
  }, []);

  const decreaseCartItem = useCallback((productId) => {
    dispatch({ type: 'cart/decrease', payload: productId });
  }, []);

  const dismissNotification = useCallback((notificationId) => {
    dispatch({ type: 'notification/clear', payload: notificationId });
  }, []);

  const login = useCallback((user) => {
    dispatch({ type: 'auth/login', payload: user });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'auth/logout' });
  }, []);

  const removeFromCart = useCallback((productId) => {
    dispatch({ type: 'cart/remove', payload: productId });
  }, []);

  const showError = useCallback((message) => {
    dispatch({ type: 'notification/show', payload: { message, type: 'error' } });
  }, []);

  const showSuccess = useCallback((message) => {
    dispatch({ type: 'notification/show', payload: { message, type: 'success' } });
  }, []);

  const cartSummary = useMemo(() => ({
    cartCount: state.cart.reduce((total, item) => total + item.quantity, 0),
    cartTotal: state.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    ),
  }), [state.cart]);

  const value = useMemo(() => {
    return {
      addToCart,
      cartCount: cartSummary.cartCount,
      cartItems: state.cart,
      cartTotal: cartSummary.cartTotal,
      catalog: state.catalog,
      clearCart,
      decreaseCartItem,
      dismissNotification,
      isAuthenticated: Boolean(state.authUser),
      login,
      logout,
      notification: state.notification,
      removeFromCart,
      showError,
      showSuccess,
      userDashboard: state.userDashboard,
      user: state.authUser,
      vendor: state.vendor,
    };
  }, [
    addToCart,
    cartSummary,
    clearCart,
    decreaseCartItem,
    dismissNotification,
    login,
    logout,
    removeFromCart,
    showError,
    showSuccess,
    state.cart,
    state.authUser,
    state.catalog,
    state.notification,
    state.userDashboard,
    state.vendor,
  ]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}
