import axios from "axios";
import React, { useEffect, useState } from "react";

type Insight = {
  total_campaigns: number;
  active_campaigns: number;
  paused_campaigns: number;
  completed_campaigns: number;
  total_impressions: number;
  total_clicks: number;
  total_conversions: number;
  total_spend: number;
  avg_ctr: number;
  avg_cpc: number;
  avg_conversion_rate: number;
};

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Insights = () => {
  const [insights, setInsights] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/campaigns/insights`);
        setInsights(response.data.insights);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 bg-gray-950">
        <h2 className="text-sm text-gray-400">Loading insights...</h2>
      </div>
    );

  if (!insights)
    return (
      <div className="flex items-center justify-center h-64 bg-gray-950">
        <h2 className="text-sm text-red-400">No insights available</h2>
      </div>
    );

  return (
    <div className="p-3">
      <div className="bg-gray-900 rounded-xl p-5">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center justify-center">
          Campaign Insights
        </h2>

        <Section title="Campaign Counts">
          <Metric label="Total" value={insights.total_campaigns} />
          <Metric label="Active" value={insights.active_campaigns} />
          <Metric label="Paused" value={insights.paused_campaigns} />
          <Metric label="Completed" value={insights.completed_campaigns} />
        </Section>

        <Section title="Performance">
          <Metric label="Impressions" value={insights.total_impressions} />
          <Metric label="Clicks" value={insights.total_clicks} />
          <Metric label="Conversions" value={insights.total_conversions} />
          <Metric label="Spend" value={`$${insights.total_spend}`} />
        </Section>

        <Section title="Averages">
          <Metric label="CTR" value={`${insights.avg_ctr}%`} />
          <Metric label="CPC" value={`$${insights.avg_cpc}`} />
          <Metric
            label="Conversion Rate"
            value={`${insights.avg_conversion_rate}%`}
          />
        </Section>
      </div>
    </div>
  );
};

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
  <div className="mb-6">
    <h3 className="text-sm font-medium text-gray-300 mb-3">
      {title}
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {children}
    </div>
  </div>
);

type MetricProps = {
  label: string;
  value: string | number;
};

const Metric = ({ label, value }: MetricProps) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-xl font-semibold text-white mt-1">{value}</p>
  </div>
);

export default Insights;
