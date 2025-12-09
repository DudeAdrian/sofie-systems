import React, { useState } from "react";
import sofieCore from "../../core/SofieCore";
import { QuantumSection, QuantumCard, QuantumGlassGrid } from "../../theme/QuantumGlassTheme";

const Energy = () => {
  const energyService = sofieCore.getService("energy");
  const [data, setData] = useState(energyService.getEnergyData());
  const [history, setHistory] = useState([]);

  const simulateUpdate = () => {
    const newData = {
      solarProduction: Math.floor(Math.random() * 100),
      batteryLevel: Math.floor(Math.random() * 100),
      gridBalance: Math.floor(Math.random() * 100),
    };

    energyService.updateEnergyData(newData);
    setData(energyService.getEnergyData());
    setHistory([
      { timestamp: new Date().toLocaleTimeString(), ...newData },
      ...history,
    ].slice(0, 5));
  };

  const ProgressCard = ({ title, value, unit, icon, color }) => (
    <div className={`bg-gradient-to-br from-${color}-50 to-${color}-100 rounded-lg shadow-md p-6 border-l-4 border-${color}-600`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-600 uppercase">{title}</p>
          <div className="text-4xl font-bold text-gray-800 mt-2">{value}{unit}</div>
        </div>
        <div className="text-5xl opacity-20">{icon}</div>
      </div>
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
        <div
          className={`bg-${color}-600 h-2 rounded-full transition-all`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-950 via-gray-900 to-amber-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <QuantumSection chakra="solar">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,0,0.5)] mb-2">⚡ Energy Systems</h1>
          <p className="text-yellow-200">Monitor solar production, battery levels, and grid balance</p>
        </QuantumSection>

        {/* Energy Status Cards */}
        <QuantumGlassGrid columns={3} gap={6}>
          <QuantumCard chakra="solar" blurLevel="deep" opacityLevel="ultraClear" glow={true} edgeGlow={true}>
            <div className="p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-yellow-300 uppercase drop-shadow-[0_0_10px_rgba(255,255,0,0.5)]">Solar Production</p>
                  <div className="text-4xl font-bold text-white mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{data.solarProduction} kW</div>
                </div>
                <div className="text-5xl opacity-50 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">☀️</div>
              </div>
              <div className="mt-4 w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full shadow-[0_0_10px_rgba(255,255,0,0.5)]"
                  style={{ width: `${data.solarProduction}%` }}
                ></div>
              </div>
            </div>
          </QuantumCard>
          <QuantumCard chakra="throat" blurLevel="deep" opacityLevel="ultraClear" glow={true} edgeGlow={true}>
            <div className="p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-cyan-300 uppercase drop-shadow-[0_0_10px_rgba(0,187,255,0.5)]">Battery Level</p>
                  <div className="text-4xl font-bold text-white mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{data.batteryLevel}%</div>
                </div>
                <div className="text-5xl opacity-50 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">🔋</div>
              </div>
              <div className="mt-4 w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full shadow-[0_0_10px_rgba(0,187,255,0.5)]"
                  style={{ width: `${data.batteryLevel}%` }}
                ></div>
              </div>
            </div>
          </QuantumCard>
          <QuantumCard chakra="third_eye" blurLevel="deep" opacityLevel="ultraClear" glow={true} edgeGlow={true}>
            <div className="p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-violet-300 uppercase drop-shadow-[0_0_10px_rgba(170,76,255,0.5)]">Grid Balance</p>
                  <div className="text-4xl font-bold text-white mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{data.gridBalance} kWh</div>
                </div>
                <div className="text-5xl opacity-50 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">⚡</div>
              </div>
              <div className="mt-4 w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-violet-400 to-purple-500 h-2 rounded-full shadow-[0_0_10px_rgba(170,76,255,0.5)]"
                  style={{ width: `${data.gridBalance}%` }}
                ></div>
              </div>
            </div>
          </QuantumCard>
        </QuantumGlassGrid>

        {/* Control & Actions */}
        <QuantumCard chakra="solar" blurLevel="medium" opacityLevel="veil" glow={true}>
          <h2 className="text-xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,0,0.5)]">System Controls</h2>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={simulateUpdate}
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:shadow-[0_0_30px_rgba(255,255,0,0.7)] text-white font-bold py-3 px-6 rounded-lg transition"
            >
              🔄 Simulate Data Update
            </button>
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-[0_0_30px_rgba(0,255,136,0.7)] text-white font-bold py-3 px-6 rounded-lg transition">
              ⚙️ System Config
            </button>
            <button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:shadow-[0_0_30px_rgba(170,76,255,0.7)] text-white font-bold py-3 px-6 rounded-lg transition">
              📊 View Analytics
            </button>
          </div>
        </QuantumCard>

        {/* Data History */}
        {history.length > 0 && (
          <QuantumCard chakra="solar" blurLevel="deep" opacityLevel="ultraClear" glow={true}>
            <h2 className="text-xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,0,0.5)]">📈 Recent Updates</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/10 border-b-2 border-yellow-400/30">
                  <tr>
                    <th className="px-4 py-2 text-left text-yellow-300">Time</th>
                    <th className="px-4 py-2 text-left text-yellow-300">Solar (kW)</th>
                    <th className="px-4 py-2 text-left text-cyan-300">Battery (%)</th>
                    <th className="px-4 py-2 text-left text-violet-300">Grid (kWh)</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry, idx) => (
                    <tr key={idx} className="border-b border-white/10 hover:bg-white/5">
                      <td className="px-4 py-3 text-white">{entry.timestamp}</td>
                      <td className="px-4 py-3 font-semibold text-yellow-300">{entry.solarProduction}</td>
                      <td className="px-4 py-3 font-semibold text-cyan-300">{entry.batteryLevel}%</td>
                      <td className="px-4 py-3 font-semibold text-violet-300">{entry.gridBalance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </QuantumCard>
        )}
      </div>
    </div>
  );
};

Energy.propTypes = {};

export default Energy;