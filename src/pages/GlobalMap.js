import React, { useEffect, useMemo, useState } from "react";
import { useRegion } from "../context/RegionContext";
import GlobalMapService from "../services/GlobalMapService";
import InteractiveMap from "../components/InteractiveMap";
import { QuantumSection, QuantumCard } from "../theme/QuantumGlassTheme";

// Map RegionSelector selection -> GlobalMapService continent keys
const CONTINENT_BY_REGION = {
  "North America": "North America",
  "Oceania": "Oceania",
  "South America": "South America",
  "Europe & UK": "Europe",
  "Asia": "Asia",
};

const GlobalMap = () => {
  const { selectedRegion } = useRegion();
  const [selectedLayer, setSelectedLayer] = useState("health");
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  useEffect(() => {
    if (GlobalMapService.status === "idle") {
      GlobalMapService.initialize();
    }
  }, []);

  const continent = selectedRegion ? (CONTINENT_BY_REGION[selectedRegion.name] || selectedRegion.name) : null;

  const communities = useMemo(() => {
    if (!continent) return [];
    return GlobalMapService.getCommunitiesByContinent(continent);
  }, [continent]);

  useEffect(() => {
    if (communities.length > 0) {
      setSelectedCommunity(communities[0]);
    } else {
      setSelectedCommunity(null);
    }
  }, [communities]);

  const layerOptions = GlobalMapService.getLayers();

  const renderCommunityCard = (community) => {
    if (!community) return null;
    return (
      <QuantumCard chakra="throat" blurLevel="deep" opacityLevel="ultraClear" glow edgeGlow>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Selected community</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{community.name}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{community.region}, {community.country}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 dark:text-slate-400">Population</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{community.population.toLocaleString()}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">Tier: {community.tier}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {["health", "energy", "food", "water", "trade", "governance"].map((metric) => (
            <div key={metric} className="p-3 rounded-lg bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/40">
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">{metric}</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{community[metric] ?? 0}%</p>
            </div>
          ))}
        </div>
      </QuantumCard>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-950 via-gray-900 to-blue-950 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <QuantumSection chakra="throat" opacityLevel="crystal" blurLevel="deep" edgeGlow>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                🗺️ Regional Community Map
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                Dots represent communities in your selected region. Click a dot to see a brief population + metric breakdown.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {layerOptions.map((layer) => (
                <button
                  key={layer}
                  onClick={() => setSelectedLayer(layer)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                    selectedLayer === layer
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow"
                      : "bg-white/40 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {layer}
                </button>
              ))}
            </div>
          </div>
          {!selectedRegion && (
            <p className="mt-4 text-sm text-amber-700 bg-amber-50 dark:bg-amber-900/40 dark:text-amber-200 rounded-lg px-3 py-2 border border-amber-200 dark:border-amber-800">
              Select a region in the header to load its communities.
            </p>
          )}
        </QuantumSection>

        {selectedRegion && (
          <QuantumCard chakra="throat" blurLevel="deep" opacityLevel="ultraClear" glow edgeGlow>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-xs uppercase text-cyan-200 font-semibold drop-shadow-[0_0_10px_rgba(0,187,255,0.5)]">Region</p>
                  <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_15px_rgba(0,187,255,0.4)]">{selectedRegion.name}</h2>
                  <p className="text-sm text-cyan-100/80">{continent}</p>
                </div>
                <div className="text-sm text-cyan-100/80">
                  {communities.length} communities in view
                </div>
              </div>

              {communities.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">No communities found for this region.</p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-3">
                    <InteractiveMap
                      communities={communities.map((c) => ({ ...c, value: c[selectedLayer] }))}
                      onCommunitySelect={setSelectedCommunity}
                      defaultLayer={selectedLayer}
                    />
                    <div className="flex flex-wrap gap-2">
                      {communities.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedCommunity(c)}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold border transition ${
                            selectedCommunity && selectedCommunity.id === c.id
                              ? "border-cyan-400 bg-cyan-500/10 text-cyan-200 shadow-[0_0_15px_rgba(0,187,255,0.5)]"
                              : "border-cyan-700/50 bg-white/5 text-white hover:bg-white/10"
                          }`}
                        >
                          {GlobalMapService.getMetricIndicator(c[selectedLayer])} {c.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {renderCommunityCard(selectedCommunity)}
                  </div>
                </div>
              )}
            </div>
          </QuantumCard>
        )}
      </div>
    </div>
  );
};

export default GlobalMap;
