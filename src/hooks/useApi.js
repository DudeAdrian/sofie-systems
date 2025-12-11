import { useEffect, useState } from 'react';
import api from '../services/api';

/**
 * Custom Hook: useApiHealth
 * Monitors backend API connectivity and health status
 */
export const useApiHealth = () => {
  const [isHealthy, setIsHealthy] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastCheck, setLastCheck] = useState(null);

  useEffect(() => {
    const checkHealth = async () => {
      setIsLoading(true);
      try {
        const result = await api.health();
        setIsHealthy(true);
        setError(null);
        setLastCheck(new Date());
        console.log('✅ Backend API Health: OK', result);
      } catch (err) {
        setIsHealthy(false);
        setError(err.message || 'Backend connection failed');
        setLastCheck(new Date());
        console.error('❌ Backend API Health Check Failed:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // Check health immediately
    checkHealth();

    // Check every 30 seconds
    const interval = setInterval(checkHealth, 30000);

    return () => clearInterval(interval);
  }, []);

  return { isHealthy, isLoading, error, lastCheck };
};

/**
 * Custom Hook: useApiCall
 * Handles data fetching with loading and error states
 */
export const useApiCall = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiFunction();
        setData(result);
      } catch (err) {
        setError(err);
        console.error('API Call Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiFunction();
      setData(result);
    } catch (err) {
      setError(err);
      console.error('API Call Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, refetch };
};

/**
 * Custom Hook: useWaterData
 * Fetches all water-related data
 */
export const useWaterData = (regionId = 'default') => {
  const recycling = useApiCall(() => api.getWaterRecycling(regionId), [regionId]);
  const quality = useApiCall(() => api.getWaterQuality(regionId), [regionId]);
  const usage = useApiCall(() => api.getWaterUsage(regionId), [regionId]);
  const leaks = useApiCall(() => api.getWaterLeaks(regionId), [regionId]);
  const irrigation = useApiCall(() => api.getIrrigationZones(regionId), [regionId]);

  return {
    recycling,
    quality,
    usage,
    leaks,
    irrigation,
    isLoading: [recycling, quality, usage, leaks, irrigation].some(d => d.isLoading),
    hasError: [recycling, quality, usage, leaks, irrigation].some(d => d.error),
  };
};

/**
 * Custom Hook: useEnergyData
 * Fetches all energy-related data
 */
export const useEnergyData = (regionId = 'default') => {
  const solar = useApiCall(() => api.getSolarSystems(regionId), [regionId]);
  const battery = useApiCall(() => api.getBatterySystems(regionId), [regionId]);
  const grid = useApiCall(() => api.getGridConnection(regionId), [regionId]);
  const consumption = useApiCall(() => api.getEnergyConsumption(regionId), [regionId]);
  const metrics = useApiCall(() => api.getEnergyMetrics(regionId), [regionId]);

  return {
    solar,
    battery,
    grid,
    consumption,
    metrics,
    isLoading: [solar, battery, grid, consumption, metrics].some(d => d.isLoading),
    hasError: [solar, battery, grid, consumption, metrics].some(d => d.error),
  };
};

/**
 * Custom Hook: useClimateData
 * Fetches all climate-related data
 */
export const useClimateData = (regionId = 'default') => {
  const zones = useApiCall(() => api.getClimateZones(regionId), [regionId]);
  const monitoring = useApiCall(() => api.getEnvironmentalMonitoring(regionId), [regionId]);
  const weather = useApiCall(() => api.getWeatherForecast(regionId), [regionId]);
  const hvac = useApiCall(() => api.getHVACStatus(regionId), [regionId]);

  return {
    zones,
    monitoring,
    weather,
    hvac,
    isLoading: [zones, monitoring, weather, hvac].some(d => d.isLoading),
    hasError: [zones, monitoring, weather, hvac].some(d => d.error),
  };
};

/**
 * Custom Hook: useFoodData
 * Fetches all food-related data
 */
export const useFoodData = (regionId = 'default') => {
  const gardens = useApiCall(() => api.getGardens(regionId), [regionId]);
  const crops = useApiCall(() => api.getCropPlans(regionId), [regionId]);
  const storage = useApiCall(() => api.getStorageLocations(regionId), [regionId]);
  const pests = useApiCall(() => api.getPestManagement(regionId), [regionId]);

  return {
    gardens,
    crops,
    storage,
    pests,
    isLoading: [gardens, crops, storage, pests].some(d => d.isLoading),
    hasError: [gardens, crops, storage, pests].some(d => d.error),
  };
};

/**
 * Custom Hook: useCommunityData
 * Fetches all community/heartware-related data
 */
export const useCommunityData = (regionId = 'default') => {
  const resources = useApiCall(() => api.getCommunityResources(regionId), [regionId]);
  const skills = useApiCall(() => api.getSkillsMarketplace(regionId), [regionId]);
  const events = useApiCall(() => api.getCommunityEvents(regionId), [regionId]);
  const wellness = useApiCall(() => api.getWellnessTracking(regionId), [regionId]);

  return {
    resources,
    skills,
    events,
    wellness,
    isLoading: [resources, skills, events, wellness].some(d => d.isLoading),
    hasError: [resources, skills, events, wellness].some(d => d.error),
  };
};

/**
 * Custom Hook: useSystemData
 * Fetches all system management data
 */
export const useSystemData = (regionId = 'default') => {
  const expansions = useApiCall(() => api.getExpansionPlans(regionId), [regionId]);
  const assets = useApiCall(() => api.getAssetInventory(regionId), [regionId]);
  const iot = useApiCall(() => api.getIoTDevices(regionId), [regionId]);
  const config = useApiCall(() => api.getSystemConfiguration(regionId), [regionId]);
  const metrics = useApiCall(() => api.getSystemMetrics(regionId), [regionId]);

  return {
    expansions,
    assets,
    iot,
    config,
    metrics,
    isLoading: [expansions, assets, iot, config, metrics].some(d => d.isLoading),
    hasError: [expansions, assets, iot, config, metrics].some(d => d.error),
  };
};
