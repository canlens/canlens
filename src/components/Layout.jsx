import { useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Toaster } from './ui/sonner';
import '../styles/layout.css';

export function Layout() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language || 'en';
  }, [i18n.language]);

  return (
    <div className={`dark-theme layout-wrapper ${i18n.language === 'ar' ? 'layout-rtl' : ''}`}>
      <Navigation />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
      <Toaster position="top-right" />
    </div>
  );
}
