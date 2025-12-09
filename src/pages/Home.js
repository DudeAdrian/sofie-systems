// src/pages/Home_v2.js - Glassmorphic Landing Page with Neon Chakra Theming

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { QuantumCard, QuantumGlassGrid, QuantumSection } from "../theme/QuantumGlassTheme";
import BiometricsMonitor from "../components/BiometricsMonitor";
import VoiceInterface from "../components/VoiceInterface";
import biometricsService from "../services/BiometricsService";

const Home = () => {
  const [showWellness, setShowWellness] = useState(false);

  useEffect(() => {
    // Check if user has biometric data
    const readings = biometricsService.getCurrentReadings();
    if (readings.timestamp) {
      setShowWellness(true);
    }
  }, []);

  const features = [
    {
      icon: "⚡",
      title: "Energy Systems",
      description: "Monitor solar production, battery levels, and grid balance in real-time.",
      link: "/services/energy",
      chakra: "solar",
    },
    {
      icon: "👥",
      title: "Community",
      description: "Connect, collaborate, and empower your local community.",
      link: "/services/community",
      chakra: "throat",
    },
    {
      icon: "🌍",
      title: "Sustainability",
      description: "Track food, water, housing, and environmental metrics.",
      link: "/sustainability",
      chakra: "heart",
    },
    {
      icon: "⚙️",
      title: "Admin",
      description: "Manage users, settings, and system configuration.",
      link: "/admin",
      chakra: "third_eye",
    },
    {
      icon: "🧘‍♀️",
      title: "Wellness Intelligence",
      description: "Real-time biometrics with voice-activated health monitoring.",
      link: "/wellness-dashboard",
      chakra: "crown",
    },
    {
      icon: "🌿",
      title: "Herbal Library",
      description: "Natural remedies and personalized wellness recommendations.",
      link: "/herbal-library",
      chakra: "heart",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-gray-900 to-teal-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <QuantumSection chakra="heart">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-300 to-green-400 bg-clip-text text-transparent mb-4">
              🌱 Sofie Systems
            </h1>
            <p className="text-xl text-emerald-200 max-w-3xl mx-auto mb-4">
              Operating System for Harmonic Habitats communities. Empowering sustainable living through integrated systems, collaborative networks, and intelligent resource management.
            </p>
            <p className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              The benchmark operating system for regenerative living
            </p>
            <div className="mt-6 text-xs inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-emerald-400/30 shadow-[0_0_20px_rgba(0,255,136,0.3)]">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(0,255,136,0.8)]"></div>
              <span className="font-semibold text-emerald-200">Network syncing</span>
            </div>
          </div>
        </QuantumSection>

        {/* Feature Cards */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-emerald-100 mb-4">Featured Services</h2>
          <QuantumGlassGrid columns={2} gap={6}>
            {features.map((feature) => (
              <Link key={feature.link} to={feature.link}>
                <QuantumCard 
                  chakra={feature.chakra}
                  blurLevel="deep"
                  opacityLevel="ultraClear"
                  glow={true}
                  edgeGlow={true}
                  interactive={true}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{feature.icon}</span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-200 shadow-[0_0_10px_rgba(0,255,136,0.3)]">
                      Active
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{feature.title}</h3>
                  <p className="text-emerald-100 mb-4">{feature.description}</p>
                  <div className="text-sm font-semibold text-emerald-300 drop-shadow-[0_0_5px_rgba(0,255,136,0.5)]">Explore →</div>
                </QuantumCard>
              </Link>
            ))}
          </QuantumGlassGrid>
        </div>

        {/* Wellness Intelligence Widgets (if user has data) */}
        {showWellness && (
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">🧘‍♀️ Wellness Intelligence</h2>
              <Link 
                to="/wellness-dashboard"
                className="text-sm font-semibold text-purple-400 hover:underline drop-shadow-[0_0_10px_rgba(170,76,255,0.5)]"
              >
                View Full Dashboard →
              </Link>
            </div>
            <QuantumGlassGrid columns={2} gap={6}>
              <QuantumCard chakra="crown" blurLevel="deep" opacityLevel="ultraClear" glow={true}>
                <BiometricsMonitor compact={true} />
              </QuantumCard>
              <QuantumCard chakra="throat" blurLevel="deep" opacityLevel="ultraClear" glow={true}>
                <VoiceInterface compact={true} />
              </QuantumCard>
            </QuantumGlassGrid>
          </div>
        )}

        {/* System Overview */}
        <QuantumSection chakra="third_eye">
          <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-[0_0_15px_rgba(170,76,255,0.5)]">System Overview</h2>
          <QuantumGlassGrid columns={3} gap={6}>
            <QuantumCard chakra="heart" blurLevel="medium" opacityLevel="veil" glow={true}>
              <div className="text-center">
                <div className="text-4xl mb-3 drop-shadow-[0_0_10px_rgba(0,255,136,0.5)]">♻️</div>
                <h3 className="text-lg font-bold text-white">Sustainable</h3>
                <p className="text-emerald-200 text-sm mt-1">Zero-waste living solutions</p>
              </div>
            </QuantumCard>
            <QuantumCard chakra="throat" blurLevel="medium" opacityLevel="veil" glow={true}>
              <div className="text-center">
                <div className="text-4xl mb-3 drop-shadow-[0_0_10px_rgba(0,187,255,0.5)]">🤝</div>
                <h3 className="text-lg font-bold text-white">Connected</h3>
                <p className="text-cyan-200 text-sm mt-1">Community-driven development</p>
              </div>
            </QuantumCard>
            <QuantumCard chakra="third_eye" blurLevel="medium" opacityLevel="veil" glow={true}>
              <div className="text-center">
                <div className="text-4xl mb-3 drop-shadow-[0_0_10px_rgba(170,76,255,0.5)]">🧠</div>
                <h3 className="text-lg font-bold text-white">Intelligent</h3>
                <p className="text-violet-200 text-sm mt-1">AI-powered optimization</p>
              </div>
            </QuantumCard>
          </QuantumGlassGrid>
        </QuantumSection>

        {/* Call to Action */}
        <QuantumSection chakra="heart">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(0,255,136,0.5)]">Ready to Transform Your Space?</h2>
            <p className="text-lg text-emerald-200 mb-6">Start tracking your sustainability metrics today.</p>
            <Link
              to="/sustainability"
              className="inline-block px-8 py-3 rounded-lg font-bold bg-gradient-to-r from-emerald-400 to-green-500 text-white hover:shadow-[0_0_30px_rgba(0,255,136,0.7)] transition-all"
            >
              Launch Sustainability Dashboard
            </Link>
          </div>
        </QuantumSection>
      </div>
    </div>
  );
};

export default Home;
