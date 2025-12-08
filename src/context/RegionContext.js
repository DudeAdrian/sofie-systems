import React, { createContext, useState, useEffect } from 'react';
import RegionService from '../services/RegionService';

export const RegionContext = createContext();

export default function RegionProvider({ children }) {
  const [selectedRegion, setSelectedRegion] = useState(RegionService.getSelectedRegion());
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRegions();
  }, []);

  async function loadRegions() {
    setLoading(true);
    const data = await RegionService.fetchRegions();
    setRegions(data);
    setLoading(false);
  }

  function handleSelectRegion(region) {
    RegionService.setSelectedRegion(region);
    setSelectedRegion(region);
  }

  const value = {
    selectedRegion,
    regions,
    loading,
    selectRegion: handleSelectRegion,
    refreshRegions: loadRegions
  };

  return (
    <RegionContext.Provider value={value}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = React.useContext(RegionContext);
  if (!context) {
    throw new Error('useRegion must be used within RegionProvider');
  }
  return context;
}
