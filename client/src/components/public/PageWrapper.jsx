import { useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';

const PageWrapper = ({ children, title, description }) => {
  const { pathname } = useLocation();
  const context = useOutletContext();
  const settings = context?.settings || {};

  useEffect(() => {
    // Scroll to top instantly to prevent vertical sliding effect
    window.scrollTo(0, 0);
    
    // Update SEO
    const finalTitle = settings.seoMetaTitle || title || settings.siteTitle || 'Portfolio';
    const finalDescription = settings.seoMetaDescription || description || settings.siteDescription || '';
    
    document.title = finalTitle;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', finalTitle);
    
    if (finalDescription) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', finalDescription);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', finalDescription);
    }
    
    // Update favicon
    if (settings.favicon) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = settings.favicon;
    }
    
    // Update canonical URL based on actual domain
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', window.location.origin + pathname);
    }
  }, [pathname, title, description]);

  return <>{children}</>;
};

export default PageWrapper;
