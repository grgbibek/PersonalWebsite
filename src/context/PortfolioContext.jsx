import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'portfolio_data';
const DEFAULT_DATA_URL = '/portfolioData.json';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load data: localStorage overrides JSON file
  useEffect(() => {
    const load = async () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setData(JSON.parse(stored));
          setLoading(false);
          return;
        }
        // Fetch default JSON
        const res = await fetch(DEFAULT_DATA_URL);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Persist changes to localStorage
  const updateData = useCallback((updater) => {
    setData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  // Reset to defaults from JSON file
  const resetToDefaults = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY);
    const res = await fetch(DEFAULT_DATA_URL + '?bust=' + Date.now());
    const json = await res.json();
    setData(json);
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading, updateData, resetToDefaults }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
};
