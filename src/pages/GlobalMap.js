// src/pages/GlobalMap.js
// Interactive hierarchical global map (Continent -> Country -> Community)

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import GlobalMapService from "../services/GlobalMapService";
import { GlassSection, GlassCard, GlassGrid } from "../theme/GlassmorphismTheme";

const GlobalMap = () => {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState("continent"); // continent, country, community
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState("energy");
  const [continents, setContinents] = useState([]);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    GlobalMapService.initialize();
    setContinents(GlobalMapService.getContinents());

    // Check URL params for deep linking
    const continent = searchParams.get("continent");
    const country = searchParams.get("country");
    if (continent) {
      setSelectedContinent(continent);
      setView("country");
      if (country) {
        setSelectedCountry(country);
        setView("country");
      }
    }
  }, [searchParams]);

  // ContinentView: Show all 5 continents
  const ContinentView = () => (
    <div className="space-y-8">
      {/* Header */}
      <GlassSection colors={{ primary: "blue", secondary: "cyan" }} elevation="high">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-900 to-cyan-700 dark:from-blue-100 dark:to-cyan-300 bg-clip-text text-transparent mb-3">
          🌍 Global Community Network Map
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Explore {continents.length} continental regions with {GlobalMapService.communities.length}+ sustainable communities worldwide
        </p>
      </GlassSection>

      {/* Layer Selector */}
      <GlassSection colors={{ primary: "slate", secondary: "gray" }}>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Viewing Layer</h3>
        <div className="flex flex-wrap gap-3">
          {GlobalMapService.getLayers().map(layer => (
            <button
              key={layer}
              onClick={() => setSelectedLayer(layer)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedLayer === layer
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                  : "bg-white/40 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60"
              }`}
            >
              {GlobalMapService.getLayerDescription(layer)}
            </button>
          ))}
        </div>
      </GlassSection>

      {/* Continents Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Continental Regions</h2>
        <GlassGrid cols={1} colsMd={2} gap={6}>
          {continents.map(continent => {
            const metrics = GlobalMapService.getContinentMetrics(continent.displayName);
            const layerValue = metrics[selectedLayer] || 0;
            const colorGradient = GlobalMapService.getMetricColor(layerValue, selectedLayer);

            return (
              <button
                key={continent.id}
                onClick={() => {
                  setSelectedContinent(continent.displayName);
                  setSelectedCountry(null);
                  setView("country");
                }}
                className="text-left transition transform hover:scale-105"
              >
                <GlassCard colors={{ primary: "blue", secondary: "cyan" }}>
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                          {continent.emoji} {continent.displayName}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{continent.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                          {continent.communities}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Communities</p>
                      </div>
                    </div>

                    {/* Metrics Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          {GlobalMapService.getLayerDescription(selectedLayer)}
                        </span>
                        <span className="text-lg font-bold text-slate-900 dark:text-white">{layerValue}%</span>
                      </div>
                      <div className="w-full h-3 bg-white/20 dark:bg-slate-800/40 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${colorGradient} transition-all duration-500`}
                          style={{ width: `${layerValue}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="text-center p-2 rounded bg-white/30 dark:bg-slate-800/30">
                        <p className="text-xs text-slate-600 dark:text-slate-400">Population</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                          {(continent.population / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <div className="text-center p-2 rounded bg-white/30 dark:bg-slate-800/30">
                        <p className="text-xs text-slate-600 dark:text-slate-400">Countries</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">{continent.countries.length}</p>
                      </div>
                      <div className="text-center p-2 rounded bg-white/30 dark:bg-slate-800/30">
                        <p className="text-xs text-slate-600 dark:text-slate-400">Traditions</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">🌿</p>
                      </div>
                    </div>

                    {/* Herbal Info */}
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                      <p className="text-xs text-green-700 dark:text-green-300">
                        <span className="font-semibold">Herbal Traditions:</span> {continent.herbalTraditions.join(", ")}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/20 dark:border-slate-700">
                      <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">View Communities</span>
                      <span className="text-xl">→</span>
                    </div>
                  </div>
                </GlassCard>
              </button>
            );
          })}
        </GlassGrid>
      </div>
    </div>
  );

  // CountryView: Show countries in selected continent
  const CountryView = () => {
    const continent = GlobalMapService.getContinent(selectedContinent);
    const countryList = continent?.countries || [];
    const communitiesByContinent = GlobalMapService.getCommunitiesByContinent(selectedContinent);

    return (
      <div className="space-y-8">
        {/* Header */}
        <GlassSection colors={{ primary: "green", secondary: "emerald" }} elevation="high">
          <button
            onClick={() => {
              setView("continent");
              setSelectedContinent(null);
            }}
            className="mb-4 px-4 py-2 rounded-lg bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60 transition font-semibold text-slate-700 dark:text-slate-300"
          >
            ← Back to World Map
          </button>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-900 to-emerald-700 dark:from-green-100 dark:to-emerald-300 bg-clip-text text-transparent mb-3">
            {continent?.emoji} {selectedContinent}
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            {communitiesByContinent.length} communities across {countryList.length} countries
          </p>
        </GlassSection>

        {/* Layer Selector */}
        <GlassSection colors={{ primary: "slate", secondary: "gray" }}>
          <div className="flex flex-wrap gap-2">
            {GlobalMapService.getLayers().map(layer => (
              <button
                key={layer}
                onClick={() => setSelectedLayer(layer)}
                className={`px-3 py-2 rounded text-sm font-semibold transition ${
                  selectedLayer === layer
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                    : "bg-white/40 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:bg-white/60"
                }`}
              >
                {layer}
              </button>
            ))}
          </div>
        </GlassSection>

        {/* Countries Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Countries & Communities</h2>
          <GlassGrid cols={1} colsMd={2} gap={5}>
            {countryList.map(country => {
              const countryCommunities = GlobalMapService.getCommunitiesByCountry(country);
              const countryMetrics = GlobalMapService.getCountryMetrics(country);
              const layerValue = countryMetrics[selectedLayer] || 0;
              const colorGradient = GlobalMapService.getMetricColor(layerValue, selectedLayer);

              return (
                <GlassCard key={country} colors={{ primary: "green", secondary: "emerald" }}>
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{country}</h3>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600 dark:text-green-400">{countryCommunities.length}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Communities</p>
                      </div>
                    </div>

                    {/* Metric Value */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          {GlobalMapService.getLayerDescription(selectedLayer)}
                        </span>
                        <span className="text-lg font-bold text-slate-900 dark:text-white">{layerValue}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/20 dark:bg-slate-800/40 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${colorGradient} transition-all duration-300`}
                          style={{ width: `${layerValue}%` }}
                        />
                      </div>
                    </div>

                    {/* Communities List */}
                    <div className="space-y-2 max-h-56 overflow-y-auto">
                      {countryCommunities.map(community => {
                        const communityLayerValue = community[selectedLayer] || 0;
                        const communityColor = GlobalMapService.getMetricColor(communityLayerValue, selectedLayer);

                        return (
                          <button
                            key={community.id}
                            onClick={() => {
                              setSelectedCommunity(community);
                              setView("community");
                            }}
                            className="w-full text-left p-3 rounded-lg bg-white/30 dark:bg-slate-800/30 hover:bg-white/50 dark:hover:bg-slate-800/50 transition"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="font-semibold text-slate-900 dark:text-white text-sm">{community.name}</p>
                                <p className="text-xs text-slate-600 dark:text-slate-400">{community.region} • {community.population} people</p>
                              </div>
                              <div className="text-right ml-2">
                                <p className="text-lg font-bold text-slate-900 dark:text-white">{communityLayerValue}%</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{community.tier}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </GlassGrid>
        </div>
      </div>
    );
  };

  // CommunityView: Show individual community details
  const CommunityView = () => {
    if (!selectedCommunity) return null;

    const continent = GlobalMapService.getContinent(selectedContinent);

    return (
      <div className="space-y-8">
        {/* Header */}
        <GlassSection colors={{ primary: "purple", secondary: "violet" }} elevation="high">
          <button
            onClick={() => setView("country")}
            className="mb-4 px-4 py-2 rounded-lg bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60 transition font-semibold text-slate-700 dark:text-slate-300"
          >
            ← Back to {selectedContinent}
          </button>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{selectedCommunity.name}</h1>
          <p className="text-slate-600 dark:text-slate-300">
            {selectedCommunity.region}, {selectedCommunity.country} • Tier: <span className="font-semibold">{selectedCommunity.tier}</span>
          </p>
        </GlassSection>

        {/* Quick Stats */}
        <GlassGrid cols={2} colsMd={4} gap={4}>
          <GlassCard colors={{ primary: "purple", secondary: "violet" }}>
            <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">Population</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{selectedCommunity.population}</p>
          </GlassCard>
          <GlassCard colors={{ primary: "purple", secondary: "violet" }}>
            <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">Tier</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 capitalize">{selectedCommunity.tier}</p>
          </GlassCard>
          <GlassCard colors={{ primary: "purple", secondary: "violet" }}>
            <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">Region</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white mt-2">{selectedCommunity.country}</p>
          </GlassCard>
          <GlassCard colors={{ primary: "purple", secondary: "violet" }}>
            <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">Status</p>
            <p className="text-2xl mt-2">🟢 Active</p>
          </GlassCard>
        </GlassGrid>

        {/* Detailed Metrics */}
        <GlassSection colors={{ primary: "slate", secondary: "gray" }}>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Community Metrics</h2>
          <GlassGrid cols={2} colsMd={3} gap={4}>
            {GlobalMapService.getLayers().map(layer => {
              const value = selectedCommunity[layer] || 0;
              const color = GlobalMapService.getMetricColor(value, layer);
              const indicator = GlobalMapService.getMetricIndicator(value);

              return (
                <div key={layer} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                      {GlobalMapService.getLayerDescription(layer)} {indicator}
                    </span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{value}%</span>
                  </div>
                  <div className="w-full h-3 bg-white/20 dark:bg-slate-800/40 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-300`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </GlassGrid>
        </GlassSection>

        {/* Related Communities */}
        <GlassSection colors={{ primary: "slate", secondary: "gray" }}>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Connected Communities in {selectedContinent}</h2>
          <GlassGrid cols={1} colsMd={2} gap={4}>
            {GlobalMapService.getCommunitiesByContinent(selectedContinent)
              .filter(c => c.id !== selectedCommunity.id)
              .slice(0, 4)
              .map(community => (
                <button
                  key={community.id}
                  onClick={() => setSelectedCommunity(community)}
                  className="text-left p-4 rounded-lg bg-white/30 dark:bg-slate-800/30 hover:bg-white/50 dark:hover:bg-slate-800/50 transition"
                >
                  <p className="font-semibold text-slate-900 dark:text-white">{community.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{community.region} • {community.population} people</p>
                </button>
              ))}
          </GlassGrid>
        </GlassSection>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {view === "continent" && <ContinentView />}
        {view === "country" && <CountryView />}
        {view === "community" && <CommunityView />}
      </div>
    </div>
  );
};

export default GlobalMap;
