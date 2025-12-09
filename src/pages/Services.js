// src/pages/Services_v2.js - Quantum Services Hub with Heart Chakra Theme

import React from "react";
import { Link } from "react-router-dom";
import { QuantumSection, QuantumCard, QuantumGlassGrid } from "../theme/QuantumGlassTheme";

const Services = () => {
  const services = [
    {
      title: "Global Community Map",
      path: "/global-map",
      description: "Interactive continental map showing all 50+ communities worldwide with region filters.",
      icon: "🗺️",
      chakra: "throat",
    },
    {
      title: "Community Tools",
      path: "community",
      description: "Organize, connect, and empower community initiatives.",
      icon: "👥",
      chakra: "heart",
    },
    {
      title: "Herbal Library",
      path: "/herbal-library",
      description: "Indigenous herbal knowledge for resilience and shared wellness.",
      icon: "🌿",
      chakra: "heart",
    },
    {
      title: "Energy Systems",
      path: "energy",
      description: "Manage solar, battery, and off-grid solutions.",
      icon: "⚡",
      chakra: "solar",
    },
    {
      title: "AI Interfaces",
      path: "ai",
      description: "Deploy AI tools for communication and decision-making.",
      icon: "🧠",
      chakra: "third_eye",
    },
    {
      title: "Self-Sufficiency",
      path: "/sustainability",
      description: "Track food, water, housing, and local metrics.",
      icon: "🌍",
      chakra: "heart",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-gray-900 to-emerald-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <QuantumSection chakra="heart">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,255,136,0.5)]">
            Services Hub
          </h1>
          <p className="text-emerald-200 mt-2">Access all Sofie Systems modules and tools</p>
        </QuantumSection>

        {/* Services Grid */}
        <QuantumGlassGrid columns={2} gap={6}>
          {services.map((service, idx) => (
            <Link key={idx} to={service.path}>
              <QuantumCard 
                chakra={service.chakra} 
                blurLevel="deep" 
                opacityLevel="ultraClear" 
                glow={true} 
                edgeGlow={true} 
                interactive={true}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{service.icon}</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-200 shadow-[0_0_10px_rgba(0,255,136,0.3)]">
                    Active
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{service.title}</h3>
                <p className="text-emerald-100 mb-4">{service.description}</p>
                <div className="text-sm font-semibold text-emerald-300 drop-shadow-[0_0_5px_rgba(0,255,136,0.5)]">
                  Access →
                </div>
              </QuantumCard>
            </Link>
          ))}
        </QuantumGlassGrid>

        {/* Info Section */}
        <QuantumSection chakra="heart">
          <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(0,255,136,0.5)]">About Services</h2>
          <p className="text-emerald-200">
            Each service represents a critical module of the Sofie Systems operating system. All services are Web3-enabled,
            blockchain-verified, and connected through our distributed architecture to ensure seamless integration across
            your Harmonic Habitats community.
          </p>
        </QuantumSection>
      </div>
    </div>
  );
};

export default Services;
