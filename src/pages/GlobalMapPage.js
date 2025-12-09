import React, { useState } from 'react';
import InteractiveMap from '../components/InteractiveMap';

const SAMPLE_COMMUNITIES = [
  { id: 'au-sydney', name: 'Sydney Hub', lat: -33.8688, lng: 151.2093, population: 5000000, tier: 'hub', region: 'Australia', health: 85, energy: 78, food: 72, water: 88, trade: 82, governance: 80 },
  { id: 'au-melbourne', name: 'Melbourne', lat: -37.8136, lng: 144.9631, population: 4500000, tier: 'regional', region: 'Australia', health: 82, energy: 75, food: 70, water: 85, trade: 80, governance: 78 },
  { id: 'us-denver', name: 'Denver Hub', lat: 39.7392, lng: -104.9903, population: 3000000, tier: 'hub', region: 'USA', health: 82, energy: 85, food: 75, water: 70, trade: 88, governance: 83 },
  { id: 'us-portland', name: 'Portland', lat: 45.5152, lng: -122.6784, population: 650000, tier: 'regional', region: 'USA', health: 85, energy: 88, food: 80, water: 75, trade: 82, governance: 85 },
  { id: 'in-bangalore', name: 'Bangalore Hub', lat: 12.9716, lng: 77.5946, population: 8000000, tier: 'hub', region: 'India', health: 68, energy: 72, food: 80, water: 65, trade: 75, governance: 70 },
  { id: 'eu-berlin', name: 'Berlin Hub', lat: 52.5200, lng: 13.4050, population: 4000000, tier: 'hub', region: 'Europe', health: 88, energy: 90, food: 85, water: 92, trade: 85, governance: 87 },
  { id: 'eu-amsterdam', name: 'Amsterdam', lat: 52.3676, lng: 4.9041, population: 872000, tier: 'regional', region: 'Europe', health: 90, energy: 92, food: 88, water: 95, trade: 88, governance: 89 },
  { id: 'uk-london', name: 'London Hub', lat: 51.5074, lng: -0.1278, population: 9000000, tier: 'hub', region: 'UK', health: 85, energy: 88, food: 82, water: 90, trade: 92, governance: 89 },
];

export default function GlobalMapPage() {
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🗺️ Global Community Map</h1>
          <p className="text-slate-400 text-lg">
            Explore sustainable communities across continents with interactive mapping
          </p>
        </div>

        {/* Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <div className="bg-slate-900 rounded-lg border border-slate-700 p-6 shadow-xl">
              <InteractiveMap
                communities={SAMPLE_COMMUNITIES}
                onCommunitySelect={setSelectedCommunity}
                defaultLayer="health"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Legend */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Health Metrics</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                  <span className="text-sm text-slate-300">Excellent (85+)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
                  <span className="text-sm text-slate-300">Good (75-84)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                  <span className="text-sm text-slate-300">Fair (60-74)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
                  <span className="text-sm text-slate-300">Needs Help (0-59)</span>
                </div>
              </div>
            </div>

            {/* Community Details */}
            {selectedCommunity ? (
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-3">{selectedCommunity.name}</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-slate-400">Population:</span>
                    <span className="text-slate-200 ml-2">{selectedCommunity.population.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Tier:</span>
                    <span className="text-slate-200 ml-2 capitalize">{selectedCommunity.tier}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Region:</span>
                    <span className="text-slate-200 ml-2">{selectedCommunity.region}</span>
                  </div>
                  <hr className="my-3 border-slate-700" />
                  <div className="text-xs text-slate-400 font-semibold mb-2">METRICS</div>
                  <div>
                    <span className="text-slate-400">🏥 Health:</span>
                    <span className="text-slate-200 ml-2">{selectedCommunity.health}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">⚡ Energy:</span>
                    <span className="text-slate-200 ml-2">{selectedCommunity.energy}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">🌾 Food:</span>
                    <span className="text-slate-200 ml-2">{selectedCommunity.food}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">💧 Water:</span>
                    <span className="text-slate-200 ml-2">{selectedCommunity.water}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">📦 Trade:</span>
                    <span className="text-slate-200 ml-2">{selectedCommunity.trade}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">🏛️ Governance:</span>
                    <span className="text-slate-200 ml-2">{selectedCommunity.governance}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-3">Select a Community</h3>
                <p className="text-slate-400 text-sm">Click on any marker to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 backdrop-blur-sm">
            <h4 className="text-white font-semibold mb-2">🎛️ Layer Switching</h4>
            <p className="text-slate-400 text-sm">Switch between 6 outcome metrics to analyze different community aspects</p>
          </div>
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 backdrop-blur-sm">
            <h4 className="text-white font-semibold mb-2">🖱️ Interactive Map</h4>
            <p className="text-slate-400 text-sm">Drag to pan, scroll to zoom, click to select communities</p>
          </div>
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 backdrop-blur-sm">
            <h4 className="text-white font-semibold mb-2">📊 Color Coded</h4>
            <p className="text-slate-400 text-sm">Visual health indicators across all outcome metrics</p>
          </div>
        </div>
      </div>
    </div>
  );
}
