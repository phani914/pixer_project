import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import routePaths from '../routes/routePaths.js';
import { useAppState } from '../state/useAppState.js';

const SITE_NAME = 'Pixer';
const DEFAULT_DESCRIPTION =
  'Pixer is a digital marketplace for source code, UI kits, graphics, ebooks, templates, and creator-ready assets.';

const routeMeta = {
  [routePaths.home]: {
    description: DEFAULT_DESCRIPTION,
    title: 'Pixer | Digital Marketplace',
  },
  [routePaths.shop]: {
    description: 'Browse premium digital products, source code, UI kits, templates, icons, graphics, and ebooks on Pixer.',
    title: 'Shop Digital Products | Pixer',
  },
  [routePaths.about]: {
    description: 'Learn how Pixer helps buyers discover digital products and vendors publish marketplace-ready assets.',
    title: 'About Pixer | Digital Marketplace',
  },
  [routePaths.contact]: {
    description: 'Contact the Pixer marketplace team for vendor requests, support questions, and marketplace help.',
    title: 'Contact Pixer | Marketplace Support',
  },
  [routePaths.login]: {
    description: 'Login to your Pixer account to manage purchases, downloads, and marketplace activity.',
    title: 'Login | Pixer',
  },
  [routePaths.register]: {
    description: 'Create a Pixer account to save digital products, purchase assets, and manage downloads.',
    title: 'Register | Pixer',
  },
};

const protectedPathPrefixes = [
  routePaths.cart,
  routePaths.dashboard,
  routePaths.vendorDashboard,
];

function setMetaByName(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

function setMetaByProperty(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

function setCanonical(pathname) {
  let tag = document.querySelector('link[rel="canonical"]');

  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    document.head.appendChild(tag);
  }

  tag.setAttribute('href', `${window.location.origin}${pathname}`);
}

function RouteSEO() {
  const { catalog } = useAppState();
  const { pathname } = useLocation();

  const meta = useMemo(() => {
    const isProtectedPage = protectedPathPrefixes.some((path) => pathname.startsWith(path));

    if (pathname.startsWith('/shop/') && pathname !== routePaths.shop) {
      const slug = pathname.split('/shop/')[1];
      const product = catalog.products.find((item) => item.slug === slug);

      if (product) {
        return {
          description: product.description,
          robots: 'index,follow',
          title: `${product.title} | Pixer`,
        };
      }
    }

    if (isProtectedPage) {
      return {
        description: 'Protected Pixer account area.',
        robots: 'noindex,nofollow',
        title: 'Protected Area | Pixer',
      };
    }

    return {
      robots: 'index,follow',
      ...(routeMeta[pathname] ?? routeMeta[routePaths.home]),
    };
  }, [catalog.products, pathname]);

  useEffect(() => {
    document.title = meta.title;
    setMetaByName('description', meta.description);
    setMetaByName('robots', meta.robots);
    setMetaByProperty('og:site_name', SITE_NAME);
    setMetaByProperty('og:title', meta.title);
    setMetaByProperty('og:description', meta.description);
    setMetaByProperty('og:type', 'website');
    setMetaByProperty('og:url', window.location.href);
    setCanonical(pathname);
  }, [meta, pathname]);

  return null;
}

export default RouteSEO;
