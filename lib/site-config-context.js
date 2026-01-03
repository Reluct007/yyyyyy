'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { basic } from '@/data/basic';

const SiteConfigContext = createContext(null);

// 默认配置（来自本地文件）
const defaultConfig = {
  siteName: basic.navbar.brand,
  siteDescription: 'Premium designer collectibles',
  contactEmail: basic.info.email,
  logo: basic.navbar.logo,
};

export function SiteConfigProvider({ children }) {
  const [config, setConfig] = useState(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yooyooy.com';
        if (!API_URL) {
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_URL}/api/admin/config`);
        const data = await res.json();

        if (data.success && data.config) {
          setConfig(prev => ({
            ...prev,
            siteName: data.config.siteName || prev.siteName,
            siteDescription: data.config.siteDescription || prev.siteDescription,
            contactEmail: data.config.contactEmail || prev.contactEmail,
            logo: data.config.logo || prev.logo,
          }));
        }
      } catch (err) {
        console.log('Using default config');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <SiteConfigContext.Provider value={{ config, loading }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    return { config: defaultConfig, loading: false };
  }
  return context;
}
