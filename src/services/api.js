/**
 * API Service Layer
 * Central hub for all backend API calls
 * Handles configuration, requests, error handling, and response formatting
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.timeout = 30000; // 30 seconds
  }

  /**
   * Generic fetch wrapper with error handling
   */
  async request(endpoint, options = {}) {
    const {
      method = 'GET',
      body = null,
      headers = {},
      requiresAuth = false,
      ...restOptions
    } = options;

    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };

    // Add auth token if required
    if (requiresAuth) {
      const token = localStorage.getItem('authToken');
      if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    const config = {
      method,
      headers: defaultHeaders,
      ...restOptions,
    };

    if (body) {
      config.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    try {
      const response = await Promise.race([
        fetch(url, config),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), this.timeout)
        ),
      ]);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          status: response.status,
          message: errorData.error || `HTTP ${response.status}`,
          data: errorData,
        };
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${method} ${endpoint}]:`, error);
      throw error;
    }
  }

  /**
   * Health Check
   */
  async health() {
    return this.request('/health');
  }

  // ============ WATER MANAGEMENT ============

  async getWaterRecycling(regionId = 'default') {
    return this.request(`/api/water/recycling?regionId=${regionId}`);
  }

  async updateWaterRecycling(id, data) {
    return this.request(`/api/water/recycling/${id}`, {
      method: 'PATCH',
      body: data,
    });
  }

  async getWaterQuality(regionId = 'default') {
    return this.request(`/api/water/quality?regionId=${regionId}`);
  }

  async recordWaterQualityTest(data) {
    return this.request('/api/water/quality', {
      method: 'POST',
      body: data,
    });
  }

  async getWaterUsage(regionId = 'default') {
    return this.request(`/api/water/usage?regionId=${regionId}`);
  }

  async getWaterUsageStatistics(regionId = 'default') {
    return this.request(`/api/water/usage/statistics?regionId=${regionId}`);
  }

  async recordWaterUsage(data) {
    return this.request('/api/water/usage/record', {
      method: 'POST',
      body: data,
    });
  }

  async getWaterLeaks(regionId = 'default') {
    return this.request(`/api/water/leaks?regionId=${regionId}`);
  }

  async detectWaterLeak(data) {
    return this.request('/api/water/leaks/detect', {
      method: 'POST',
      body: data,
    });
  }

  async getIrrigationZones(regionId = 'default') {
    return this.request(`/api/water/irrigation?regionId=${regionId}`);
  }

  async createIrrigationZone(data) {
    return this.request('/api/water/irrigation/zones', {
      method: 'POST',
      body: data,
    });
  }

  // ============ ENERGY MANAGEMENT ============

  async getSolarSystems(regionId = 'default') {
    return this.request(`/api/energy/solar?regionId=${regionId}`);
  }

  async updateSolarSystem(id, data) {
    return this.request(`/api/energy/solar/${id}`, {
      method: 'PATCH',
      body: data,
    });
  }

  async getBatterySystems(regionId = 'default') {
    return this.request(`/api/energy/battery?regionId=${regionId}`);
  }

  async getBatteryStatus(id) {
    return this.request(`/api/energy/battery/${id}/status`);
  }

  async chargeBattery(id, data) {
    return this.request(`/api/energy/battery/${id}/charge`, {
      method: 'POST',
      body: data,
    });
  }

  async getGridConnection(regionId = 'default') {
    return this.request(`/api/energy/grid?regionId=${regionId}`);
  }

  async getEnergyConsumption(regionId = 'default', timeRange = 'month') {
    return this.request(`/api/energy/consumption?regionId=${regionId}&timeRange=${timeRange}`);
  }

  async getEnergyMetrics(regionId = 'default') {
    return this.request(`/api/energy/metrics?regionId=${regionId}`);
  }

  // ============ CLIMATE MANAGEMENT ============

  async getClimateZones(regionId = 'default') {
    return this.request(`/api/climate/zones?regionId=${regionId}`);
  }

  async createClimateZone(data) {
    return this.request('/api/climate/zones', {
      method: 'POST',
      body: data,
    });
  }

  async updateClimateZone(id, data) {
    return this.request(`/api/climate/zones/${id}`, {
      method: 'PATCH',
      body: data,
    });
  }

  async getEnvironmentalMonitoring(regionId = 'default') {
    return this.request(`/api/climate/monitoring?regionId=${regionId}`);
  }

  async recordEnvironmentalData(data) {
    return this.request('/api/climate/monitoring/record', {
      method: 'POST',
      body: data,
    });
  }

  async getWeatherForecast(regionId = 'default', days = 7) {
    return this.request(`/api/climate/weather?regionId=${regionId}&days=${days}`);
  }

  async getHVACStatus(regionId = 'default') {
    return this.request(`/api/climate/hvac?regionId=${regionId}`);
  }

  // ============ FOOD PRODUCTION ============

  async getGardens(regionId = 'default') {
    return this.request(`/api/food/gardens?regionId=${regionId}`);
  }

  async createGarden(data) {
    return this.request('/api/food/gardens', {
      method: 'POST',
      body: data,
    });
  }

  async getCropPlans(regionId = 'default') {
    return this.request(`/api/food/crops?regionId=${regionId}`);
  }

  async recordCropPlanting(data) {
    return this.request('/api/food/crops/plant', {
      method: 'POST',
      body: data,
    });
  }

  async recordCropHarvest(id, data) {
    return this.request(`/api/food/crops/${id}/harvest`, {
      method: 'POST',
      body: data,
    });
  }

  async getStorageLocations(regionId = 'default') {
    return this.request(`/api/food/storage?regionId=${regionId}`);
  }

  async getStorageInventory(id) {
    return this.request(`/api/food/storage/${id}/inventory`);
  }

  async recordStorageEntry(data) {
    return this.request('/api/food/storage/record', {
      method: 'POST',
      body: data,
    });
  }

  async getPestManagement(regionId = 'default') {
    return this.request(`/api/food/pests?regionId=${regionId}`);
  }

  async reportPestIssue(data) {
    return this.request('/api/food/pests/report', {
      method: 'POST',
      body: data,
    });
  }

  // ============ COMMUNITY & HEARTWARE ============

  async getCommunityResources(regionId = 'default') {
    return this.request(`/api/heartware/resources?regionId=${regionId}`);
  }

  async createCommunityResource(data) {
    return this.request('/api/heartware/resources', {
      method: 'POST',
      body: data,
    });
  }

  async shareResource(id, data) {
    return this.request(`/api/heartware/resources/${id}/share`, {
      method: 'POST',
      body: data,
    });
  }

  async getSkillsMarketplace(regionId = 'default') {
    return this.request(`/api/heartware/skills?regionId=${regionId}`);
  }

  async listSkill(data) {
    return this.request('/api/heartware/skills', {
      method: 'POST',
      body: data,
    });
  }

  async getCommunityEvents(regionId = 'default') {
    return this.request(`/api/heartware/events?regionId=${regionId}`);
  }

  async createEvent(data) {
    return this.request('/api/heartware/events', {
      method: 'POST',
      body: data,
    });
  }

  async getWellnessTracking(regionId = 'default') {
    return this.request(`/api/heartware/wellness?regionId=${regionId}`);
    }

  async recordWellnessData(data) {
    return this.request('/api/heartware/wellness/record', {
      method: 'POST',
      body: data,
    });
  }

  // ============ SYSTEM MANAGEMENT ============

  async getExpansionPlans(regionId = 'default') {
    return this.request(`/api/system/expansions?regionId=${regionId}`);
  }

  async createExpansionPlan(data) {
    return this.request('/api/system/expansions', {
      method: 'POST',
      body: data,
    });
  }

  async getAssetInventory(regionId = 'default') {
    return this.request(`/api/system/assets?regionId=${regionId}`);
  }

  async recordAsset(data) {
    return this.request('/api/system/assets', {
      method: 'POST',
      body: data,
    });
  }

  async getIoTDevices(regionId = 'default') {
    return this.request(`/api/system/iot?regionId=${regionId}`);
  }

  async registerIoTDevice(data) {
    return this.request('/api/system/iot', {
      method: 'POST',
      body: data,
    });
  }

  async getSystemConfiguration(regionId = 'default') {
    return this.request(`/api/system/config?regionId=${regionId}`);
  }

  async updateSystemConfiguration(data) {
    return this.request('/api/system/config', {
      method: 'PATCH',
      body: data,
    });
  }

  async getSystemMetrics(regionId = 'default') {
    return this.request(`/api/system/metrics?regionId=${regionId}`);
  }

  // ============ REGIONS (Existing) ============

  async getRegions() {
    return this.request('/api/regions');
  }

  async getRegionDetails(regionId) {
    return this.request(`/api/regions/${regionId}`);
  }

  async getRegionalMetrics(regionId, metricType = null, year = null) {
    let query = `?regionId=${regionId}`;
    if (metricType) query += `&metricType=${metricType}`;
    if (year) query += `&year=${year}`;
    return this.request(`/api/regions/${regionId}/metrics${query}`);
  }

  async getRegionalBenchmarks(regionId) {
    return this.request(`/api/regions/${regionId}/benchmarks`);
  }
}

// Export singleton instance
export default new ApiService();
