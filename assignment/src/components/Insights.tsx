import { useFetchInsights } from "../hooks/useFetchInsight";
import { MetricProps } from "../types/type";

const Insights = () => {
  const { insights, loading, error } = useFetchInsights();

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 bg-gray-950">
        <h2 className="text-sm text-gray-400">Loading insights...</h2>
      </div>
    );

  if (!insights || error)
    return (
      <div className="flex items-center justify-center h-64 bg-gray-950">
        <h2 className="text-sm text-red-400">No insights available</h2>
      </div>
    );

  return (
    <div className="p-3">
      <div className="bg-gray-900 rounded-xl p-5">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Campaign Insights
        </h2>

        <h3 className="text-sm font-medium text-gray-300 mb-3">
          Campaign Counts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Metric label="Total" value={insights.total_campaigns} />
          <Metric label="Active" value={insights.active_campaigns} />
          <Metric label="Paused" value={insights.paused_campaigns} />
          <Metric label="Completed" value={insights.completed_campaigns} />
        </div>

        <h3 className="text-sm font-medium text-gray-300 mb-3">Performance</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Metric label="Impressions" value={insights.total_impressions} />
          <Metric label="Clicks" value={insights.total_clicks} />
          <Metric label="Conversions" value={insights.total_conversions} />
          <Metric label="Spend" value={`$${insights.total_spend}`} />
        </div>

        <h3 className="text-sm font-medium text-gray-300 mb-3">Averages</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Metric label="CTR" value={`${insights.avg_ctr}%`} />
          <Metric label="CPC" value={`$${insights.avg_cpc}`} />
          <Metric
            label="Conversion Rate"
            value={`${insights.avg_conversion_rate}%`}
          />
        </div>
      </div>
    </div>
  );
};

const Metric = ({ label, value }: MetricProps) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-xl font-semibold text-white mt-1">{value}</p>
  </div>
);

export default Insights;
