// src/services/EnergyService.js
import sofieCore from "../core/SofieCore";
import APIService from "./APIService";

class EnergyService {
  constructor() {
    this.status = "idle";
    this.energyData = {
      solarProduction: 0,
      batteryLevel: 0,
      gridBalance: 0,
    };
    this.history = [];
    this.apiService = APIService;
    this.currentRegionId = null;
  }

  initialize(regionId) {
    try {
      this.currentRegionId = regionId;
      this.status = "initialized";
      sofieCore.getService("logger").log("[EnergyService] Energy module initialized for region: " + regionId);
      // Fetch energy data from backend
      this.fetchEnergyDataFromAPI(regionId);
    } catch (error) {
      this.status = "error";
      sofieCore.getService("logger").error("[EnergyService] Initialization failed", error);
      throw error;
    }
  }

  async fetchEnergyDataFromAPI(regionId) {
    try {
      const backendURL = this.apiService.baseURL || "http://localhost:3001/api";
      const response = await fetch(`${backendURL}/regions/${regionId}/energy`);
      if (response.ok) {
        const data = await response.json();
        if (data.metrics && data.metrics.length > 0) {
          const latest = data.metrics[0];
          this.energyData = {
            solarProduction: latest.energyProduction || 0,
            batteryLevel: 85,
            gridBalance: latest.energyScore || 50,
          };
          this.history = data.metrics;
        }
      }
    } catch (error) {
      sofieCore.getService("logger").warn("[EnergyService] API fetch failed, using local data", error);
    }
  }

  updateEnergyData(data) {
    try {
      if (!data || typeof data !== 'object') {
        throw new Error('Energy data must be a valid object');
      }
      this.energyData = { ...this.energyData, ...data };
      this.history.push({
        timestamp: new Date().toISOString(),
        data: { ...this.energyData },
      });
      sofieCore.updateState("energyData", this.energyData);
      sofieCore.getService("logger").debug("[EnergyService] Energy data updated");
      
      // Save to backend
      if (this.currentRegionId) {
        this.saveToBackend();
      }
    } catch (error) {
      sofieCore.getService("logger").error("[EnergyService] Update failed", error);
      throw error;
    }
  }

  async saveToBackend() {
    try {
      const backendURL = this.apiService.baseURL || "http://localhost:3001/api";
      await fetch(`${backendURL}/regions/${this.currentRegionId}/energy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          energyProduction: this.energyData.solarProduction,
          energyConsumption: this.energyData.gridBalance,
          energyScore: 75
        })
      });
    } catch (error) {
      sofieCore.getService("logger").warn("[EnergyService] Could not save to backend", error);
    }
  }

  getEnergyData() {
    try {
      return { ...this.energyData };
    } catch (error) {
      sofieCore.getService("logger").error("[EnergyService] Get data failed", error);
      return null;
    }
  }

  getHistory() {
    return this.history;
  }

  /**
   * Get pump efficiency percentage (for AutopilotService)
   */
  getPumpEfficiency() {
    // Simulate pump efficiency based on runtime and age
    const baseEfficiency = 95;
    const degradation = Math.random() * 5; // 0-5% degradation
    return Math.round(baseEfficiency - degradation);
  }

  /**
   * Get current power consumption in watts (for AutopilotService)
   */
  getCurrentPowerConsumption() {
    // Base consumption + variable load
    const baseConsumption = 800; // watts
    const variableLoad = Math.random() * 600; // 0-600w variable
    return Math.round(baseConsumption + variableLoad);
  }
}

const energyService = new EnergyService();
export default energyService;
