// src/pages/Map_v2.js - Glassmorphic System Navigation Map

import React from "react";
import { Link } from "react-router-dom";
import { GlassSection, GlassCard, GlassGrid } from "../theme/GlassmorphismTheme";

const modules = [
  { 
    title: "Community Tools", 
    path: "/services/community", 
    icon: "👥",
    description: "Organize and empower community initiatives",
    color: "indigo"
  },
  { 
    title: "Energy Systems", 
    path: "/services/energy", 
    icon: "⚡",
    description: "Monitor solar, battery, and grid systems",
    color: "amber"
  },
  { 
    title: "AI Interfaces", 
    path: "/services/ai", 
    icon: "🧠",
    description: "Deploy AI tools for communication",
    color: "green"
  },
  { 
    title: "Sustainability Layers", 
    path: "/services/sustainability", 
    icon: "🌍",
    description: "Track food, water, housing metrics",
    color: "blue"
  },
  { 
    title: "Admin Dashboard", 
    path: "/admin", 
    icon: "⚙️",
    description: "Manage users and system settings",
    color: "slate"
  },
];

const Map = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <GlassSection colors={{ primary: "slate", secondary: "gray" }} elevation="high">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            🗺️ Sofie Systems Map
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">Navigate your operating system and access all modules</p>
        </GlassSection>

        {/* Navigation Grid */}
        <GlassGrid cols={1} colsMd={2} gap={6}>
          {modules.map((mod, idx) => (
            <Link key={idx} to={mod.path}>
              <GlassCard colors={{ primary: mod.color, secondary: mod.color }}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{mod.icon}</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/30 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300">
                    Active
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{mod.title}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{mod.description}</p>
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                  Navigate →
                </div>
              </GlassCard>
            </Link>
          ))}
        </GlassGrid>

        {/* Quick Links Section */}
        <GlassSection colors={{ primary: "slate", secondary: "gray" }}>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Quick Links</h2>
          <GlassGrid cols={2} colsMd={5} gap={4}>
            <Link to="/sustainability">
              <div className="p-4 rounded-lg bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-800/60 transition text-center">
                <p className="text-2xl mb-2">📊</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Dashboard</p>
              </div>
            </Link>
            <Link to="/map">
              <div className="p-4 rounded-lg bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-800/60 transition text-center">
                <p className="text-2xl mb-2">🗂️</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Browse</p>
              </div>
            </Link>
            <Link to="/settings">
              <div className="p-4 rounded-lg bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-800/60 transition text-center">
                <p className="text-2xl mb-2">⚙️</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Settings</p>
              </div>
            </Link>
            <Link to="/admin">
              <div className="p-4 rounded-lg bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-800/60 transition text-center">
                <p className="text-2xl mb-2">👑</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Admin</p>
              </div>
            </Link>
            <Link to="/services">
              <div className="p-4 rounded-lg bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-800/60 transition text-center">
                <p className="text-2xl mb-2">🔧</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Services</p>
              </div>
            </Link>
          </GlassGrid>
        </GlassSection>

        {/* Info Card */}
        <GlassCard colors={{ primary: "slate", secondary: "gray" }}>
          <p className="text-center text-sm font-semibold text-slate-600 dark:text-slate-400">
            🔗 All modules connected via Web3 • System-wide blockchain integration
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default Map;
