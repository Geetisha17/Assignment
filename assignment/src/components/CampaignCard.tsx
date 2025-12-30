import { Campaign } from "../types/type";
import { useNavigateLink } from "../hooks/useNavigateLink";

type Props = {
  campaign: Campaign;
};

function CampaignCard({ campaign }: Props) {
  const { showDetails, showInsights } = useNavigateLink({ campaign });
  return (
    <div
      className="
        bg-gray-900 text-white rounded-2xl 
        w-[360px] p-6 flex flex-col justify-between
      "
    >
      <div>
        <h3 className="text-xl font-semibold mb-4">{campaign.name}</h3>

        <div className="text-sm space-y-2 text-gray-300">
          <p>
            <span className="text-white font-medium">Status:</span>{" "}
            {campaign.status}
          </p>
          <p>
            <span className="text-white font-medium">Budget:</span> $
            {campaign.budget}
          </p>
          <p>
            <span className="text-white font-medium">Daily Budget:</span> $
            {campaign.daily_budget}
          </p>
          <p className="truncate">
            <span className="text-white font-medium">Platforms:</span>{" "}
            {campaign.platforms.join(", ")}
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={showDetails}
          className="
            flex-1 h-11 rounded-lg
            bg-green-500 hover:bg-green-600 active:bg-green-700
            text-white font-semibold"
        >
          View Details
        </button>

        <button
          onClick={showInsights}
          className="
            flex-1 h-11 rounded-lg
            border border-blue-500 text-blue-400
            hover:bg-blue-500 hover:text-white
            active:bg-blue-600
            font-semibold"
        >
          View Insights
        </button>
      </div>
    </div>
  );
}

export default CampaignCard;
