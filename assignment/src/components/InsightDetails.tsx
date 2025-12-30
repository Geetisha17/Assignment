import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {RealtimeInsight} from '../types/type';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const InsightDetails = () => {
  const { id } = useParams<{id:string}>();
  const [realtimeData, setRealtimeData] = useState<RealtimeInsight[]>([]);
  const [latest, setLatest] = useState<RealtimeInsight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const eventSource = new EventSource(
      `${BASE_URL}/campaigns/${id}/insights/stream`
    );

    eventSource.onmessage = (event) => {
      const newData: RealtimeInsight = JSON.parse(event.data);
      setRealtimeData((prev) => [...prev.slice(-19), newData]);
      setLatest(newData);
      setLoading(false);
    };

    eventSource.onerror = () => {
      console.error("SSE connection error");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <h2 className="text-lg font-medium text-gray-400">
          Loading insights...
        </h2>
      </div>
    );

  if (!latest)
    return (
      <div className="flex items-center justify-center h-64">
        <h2 className="text-lg font-medium text-red-400">
          No insights available
        </h2>
      </div>
    );

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-4xl font-bold text-black text-center mb-6 flex items-center justify-center gap-3">
        Campaign Insights
        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" title="Live"></span>
      </h2>

      <div className="bg-gray-900 rounded-2xl shadow-lg p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Metric label="Impressions" value={latest.impressions} />
        <Metric label="Clicks" value={latest.clicks} />
        <Metric label="Conversions" value={latest.conversions} />
        <Metric label="Spend" value={`$${latest.spend}`} />
        <Metric label="CTR" value={`${latest.ctr}%`} />
        <Metric label="CPC" value={`$${latest.cpc}`} />
        <Metric label="Conversion Rate" value={`${latest.conversion_rate}%`} />
      </div>

      <div className="bg-gray-900 rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Real-Time Performance
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={realtimeData}>
              <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                stroke="#9ca3af"
                tickFormatter={(t) =>
                  new Date(t).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                }
              />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                labelFormatter={(t) =>
                  `Time: ${new Date(t).toLocaleTimeString()}`
                }
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                name="Clicks"
              />
              <Line
                type="monotone"
                dataKey="conversions"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
                name="Conversions"
              />
              <Line
                type="monotone"
                dataKey="impressions"
                stroke="#facc15"
                strokeWidth={2}
                dot={false}
                name="Impressions"
              />
              <Line
                type="monotone"
                dataKey="spend"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                name="Spend ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

type MetricProps = {
  label: string;
  value: string | number;
};

const Metric = ({ label, value }: MetricProps) => (
  <div className="bg-gray-800 rounded-xl p-4 text-center hover:bg-gray-700 transition-colors">
    <p className="text-sm text-gray-400 mb-1">{label}</p>
    <p className="text-2xl font-semibold text-white">{value}</p>
  </div>
);

export default InsightDetails;
