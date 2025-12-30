import CampaignCard from "./CampaignCard";
import useFetchCampaign from "../hooks/useFetchCampaign";

function CampaignList() {
  const { campaigns, loading, error } = useFetchCampaign();

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 bg-gray-950">
        <h2 className="text-sm text-gray-400">Loading insights...</h2>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h2 className="text-4xl font-extrabold text-black text-center mb-8">
        All Campaigns
      </h2>
      <div
        className="flex flex-row flex-wrap gap-4 items-center justify-center"
        style={{ padding: "10px" }}
      >
        {campaigns.length > 0 ? (
          campaigns.map((item) => (
            <CampaignCard key={item.id} campaign={item} />
          ))
        ) : (
          <h2>No campaigns found</h2>
        )}
      </div>
    </>
  );
}

export default CampaignList;
