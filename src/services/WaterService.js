// src/services/WaterService.js
import sofieCore from "../core/SofieCore";
import APIService from "./APIService";

class WaterService {
  constructor() {
    this.status = "idle";
    this.waterData = {
      totalReserve: 0, // liters
      dailyUsage: 0,
      rainfall: 0,
      systems: [], // rainwater, greywater, wells
      purificationCapacity: 0,
      plants: [], // water-consuming plants
    };
    this.history = [];
    this.apiService = APIService;
    this.currentRegionId = null;
  }

  initialize(regionId) {
    try {
      this.currentRegionId = regionId;
      this.status = "initialized";
      sofieCore.getService("logger").log("[WaterService] Water conservation module initialized for region: " + regionId);
      // Fetch water data from backend
      this.fetchWaterDataFromAPI(regionId);
    } catch (error) {
      this.status = "error";
      sofieCore.getService("logger").error("[WaterService] Initialization failed", error);
      throw error;
    }
  }

  async fetchWaterDataFromAPI(regionId) {
    try {
      const backendURL = this.apiService.baseURL || "http://localhost:3001/api";
      const response = await fetch(`${backendURL}/regions/${regionId}/water`);
      if (response.ok) {
        const data = await response.json();
        if (data.metrics && data.metrics.length > 0) {
          const latest = data.metrics[0];
          this.waterData = {
            totalReserve: latest.waterAvailability || 5000,
            dailyUsage: (latest.waterAvailability || 5000) * 0.2,
            rainfall: 0,
            systems: [],
            purificationCapacity: (latest.waterAvailability || 5000) * 0.5,
            plants: []
          };
          this.history = data.metrics;
        }
      }
    } catch (error) {
      sofieCore.getService("logger").warn("[WaterService] API fetch failed, using local data", error);
    }
  }

  addWaterSystem(systemData) {
    const system = {
      id: Date.now(),
      ...systemData,
      capacity: systemData.capacity || 1000,
      current: systemData.current || 0,
      createdAt: new Date().toISOString(),
    };
    this.waterData.systems.push(system);
    sofieCore.updateState("waterSystems", this.waterData.systems);
    sofieCore.getService("logger").log("[WaterService] Water system added:", system.name);
    
    // Save to backend
    if (this.currentRegionId) {
      this.saveToBackend();
    }
    return system;
  }

  async saveToBackend() {
    try {
      const backendURL = this.apiService.baseURL || "http://localhost:3001/api";
      await fetch(`${backendURL}/regions/${this.currentRegionId}/water`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          waterAvailability: this.waterData.totalReserve,
          waterScore: 70
        })
      });
    } catch (error) {
      sofieCore.getService("logger").warn("[WaterService] Could not save to backend", error);
    }
  }

  recordRainfall(liters) {
    this.waterData.rainfall += liters;
    this.waterData.totalReserve += liters;
    this.history.push({
      type: "rainfall",
      amount: liters,
      timestamp: new Date().toISOString(),
    });
    sofieCore.updateState("waterReserve", this.waterData.totalReserve);
    sofieCore.getService("logger").log(`[WaterService] Rainfall recorded: +${liters}L`);
  }

  recordUsage(liters, category = "general") {
    this.waterData.dailyUsage += liters;
    this.waterData.totalReserve = Math.max(0, this.waterData.totalReserve - liters);
    this.history.push({
      type: "usage",
      amount: liters,
      category,
      timestamp: new Date().toISOString(),
    });
    sofieCore.updateState("waterUsage", this.waterData.dailyUsage);
  }

  purifyWater(liters) {
    const purified = Math.min(liters, this.waterData.purificationCapacity);
    this.history.push({
      type: "purification",
      amount: purified,
      timestamp: new Date().toISOString(),
    });
    return purified;
  }

  getWaterBalance() {
    return this.waterData.totalReserve;
  }

  getConservationScore() {
    const usageEfficiency = Math.max(100 - (this.waterData.dailyUsage / 10), 0);
    const reserveScore = Math.min((this.waterData.totalReserve / 5000) * 100, 100);
    return Math.round((usageEfficiency + reserveScore) / 2);
  }

  getWaterData() {
    return this.waterData;
  }

  getHistory() {
    return this.history;
  }
}

const waterService = new WaterService();
export default waterService;