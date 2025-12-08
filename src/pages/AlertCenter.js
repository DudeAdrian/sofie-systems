import React, { useState, useEffect } from "react";
import sofieCore from "../core/SofieCore";
import eventBus, { EVENTS } from "../core/EventBus";
import { GlassSection, GlassCard, GlassGrid } from "../theme/GlassmorphismTheme";

const AlertCenter = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [acknowledgedFilter, setAcknowledgedFilter] = useState("unacknowledged");
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    initializeAlerts();
    const unsubscribers = [];
    unsubscribers.push(eventBus.on(EVENTS.ALERT_CREATED, handleNewAlert));
    unsubscribers.push(eventBus.on(EVENTS.WATER_QUALITY_ALERT, handleWaterAlert));
    unsubscribers.push(eventBus.on(EVENTS.PEST_RISK_CHANGED, handlePestAlert));
    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, []);

  const initializeAlerts = () => {
    const sampleAlerts = [
      { id: 1, timestamp: Date.now() - 3600000, service: "water", severity: "high", title: "pH Level Elevated", message: "Water pH is 8.4 - above range", acknowledged: false },
      { id: 2, timestamp: Date.now() - 7200000, service: "pest", severity: "medium", title: "Pest Population Rising", message: "Aphids detected in Zone A", acknowledged: false },
      { id: 3, timestamp: Date.now() - 10800000, service: "energy", severity: "low", title: "Efficiency Degraded", message: "Pump efficiency dropped to 88%", acknowledged: true },
      { id: 5, timestamp: Date.now() - 1800000, service: "water", severity: "critical", title: "CRITICAL: Oxygen Level Low", message: "DO at 4.2 mg/L - fish at risk", acknowledged: false }
    ];
    setAlerts(sampleAlerts);
  };

  const handleNewAlert = (alertData) => {
    const newAlert = {
      id: Date.now(),
      timestamp: Date.now(),
      ...alertData,
      acknowledged: false
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const handleWaterAlert = (data) => {
    console.log("Water alert:", data);
  };

  const handlePestAlert = (data) => {
    console.log("Pest alert:", data);
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case "critical": return { bg: "bg-red-100/40 dark:bg-red-900/40", border: "border-red-500", text: "text-red-700 dark:text-red-300", badge: "bg-red-100/50 dark:bg-red-900/50 text-red-700 dark:text-red-300" };
      case "high": return { bg: "bg-orange-100/40 dark:bg-orange-900/40", border: "border-orange-500", text: "text-orange-700 dark:text-orange-300", badge: "bg-orange-100/50 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300" };
      case "medium": return { bg: "bg-amber-100/40 dark:bg-amber-900/40", border: "border-amber-500", text: "text-amber-700 dark:text-amber-300", badge: "bg-amber-100/50 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300" };
      default: return { bg: "bg-blue-100/40 dark:bg-blue-900/40", border: "border-blue-500", text: "text-blue-700 dark:text-blue-300", badge: "bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300" };
    }
  };

  const filteredAlerts = alerts.filter(a => {
    let severityMatch = filter === "all" || a.severity === filter;
    let ackMatch = acknowledgedFilter === "all" || (acknowledgedFilter === "acknowledged" ? a.acknowledged : !a.acknowledged);
    return severityMatch && ackMatch;
  });

  const activeAlerts = filteredAlerts.filter(a => !a.acknowledged && a.severity !== "low");
  const resolvedAlerts = filteredAlerts.filter(a => a.acknowledged);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-gray-950 dark:via-gray-900 dark:to-red-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <GlassSection colors={{ primary: "red", secondary: "rose" }} elevation="high">
          <div className="py-12 px-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              🚨 Alert Center
            </h1>
            <p className="text-lg text-red-700 dark:text-red-200 max-w-2xl">
              Real-time system alerts, critical notifications, and issue tracking
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-red-100/50 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full text-sm font-medium backdrop-blur-sm">
                🔔 Live Alerts
              </span>
              <span className="px-4 py-2 bg-amber-100/50 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium backdrop-blur-sm">
                ⚙️ Auto-Detection
              </span>
              <span className="px-4 py-2 bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium backdrop-blur-sm">
                📊 Prioritized
              </span>
            </div>
          </div>
        </GlassSection>

        {/* Alert Stats */}
        <GlassGrid cols={2} colsMd={4} gap={5}>
          <GlassCard colors={{ primary: "red", secondary: "rose" }}>
            <div className="p-8 text-center min-h-[160px] flex flex-col justify-center">
              <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Total Alerts</div>
              <div className="text-5xl font-bold text-red-600 dark:text-red-400">{alerts.length}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">All-time</p>
            </div>
          </GlassCard>

          <GlassCard colors={{ primary: "orange", secondary: "red" }}>
            <div className="p-8 text-center min-h-[160px] flex flex-col justify-center">
              <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Active</div>
              <div className="text-5xl font-bold text-orange-600 dark:text-orange-400">{activeAlerts.length}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">Unresolved</p>
            </div>
          </GlassCard>

          <GlassCard colors={{ primary: "red", secondary: "rose" }}>
            <div className="p-8 text-center min-h-[160px] flex flex-col justify-center">
              <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Critical</div>
              <div className="text-5xl font-bold text-red-600 dark:text-red-400">{alerts.filter(a => a.severity === "critical").length}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">Immediate action</p>
            </div>
          </GlassCard>

          <GlassCard colors={{ primary: "emerald", secondary: "green" }}>
            <div className="p-8 text-center min-h-[160px] flex flex-col justify-center">
              <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Resolved</div>
              <div className="text-5xl font-bold text-emerald-600 dark:text-emerald-400">{resolvedAlerts.length}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">Acknowledged</p>
            </div>
          </GlassCard>
        </GlassGrid>

        {/* Filters & Tabs */}
        <GlassSection colors={{ primary: "red", secondary: "rose" }}>
          <div className="flex flex-wrap border-b border-red-300/30 dark:border-red-700/30 backdrop-blur-sm">
            {["active", "resolved"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 font-medium capitalize text-lg transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-gradient-to-b from-red-400/40 to-red-300/20 dark:from-red-600/50 dark:to-red-700/30 text-red-700 dark:text-red-300 border-b-2 border-red-600 dark:border-red-400"
                    : "text-gray-700 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-200/10 dark:hover:bg-red-700/10"
                }`}
              >
                {tab === "active" && "🔴"}
                {tab === "resolved" && "✅"}
                <span className="ml-2">{tab}</span>
              </button>
            ))}
          </div>

          {/* Severity Filter */}
          <div className="p-4 md:p-8 border-b border-red-200/30 dark:border-red-700/30 flex flex-wrap gap-3">
            {["all", "critical", "high", "medium", "low"].map(sev => (
              <button
                key={sev}
                onClick={() => setFilter(sev)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === sev
                    ? "bg-red-600 text-white"
                    : "bg-red-100/30 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200/50"
                }`}
              >
                {sev.charAt(0).toUpperCase() + sev.slice(1)}
              </button>
            ))}
          </div>

          {/* Alerts Content */}
          <div className="p-8 space-y-4">
            {activeTab === "active" ? (
              activeAlerts.length > 0 ? activeAlerts.map(alert => {
                const colors = getSeverityColor(alert.severity);
                return (
                  <GlassCard key={alert.id} colors={{ primary: "red", secondary: "rose" }}>
                    <div className={`p-6 border-l-4 ${colors.border} ${colors.bg}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{alert.title}</h3>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{alert.message}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-4 ${colors.badge}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200/30 dark:border-gray-700/30">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {alert.service.toUpperCase()} • {new Date(alert.timestamp).toLocaleTimeString()}
                        </p>
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition">
                          Acknowledge
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                );
              }) : (
                <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                  No active alerts - system is healthy ✓
                </div>
              )
            ) : (
              resolvedAlerts.length > 0 ? resolvedAlerts.map(alert => {
                const colors = getSeverityColor(alert.severity);
                return (
                  <GlassCard key={alert.id} colors={{ primary: "red", secondary: "rose" }}>
                    <div className={`p-6 border-l-4 border-gray-400 opacity-75`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white line-through">{alert.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{alert.message}</p>
                        </div>
                        <span className="px-3 py-1 bg-emerald-100/50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-bold">
                          ✓ RESOLVED
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {alert.service.toUpperCase()} • Resolved {new Date(alert.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </GlassCard>
                );
              }) : (
                <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                  No resolved alerts
                </div>
              )
            )}
          </div>
        </GlassSection>

      </div>
    </div>
  );
};

export default AlertCenter;
