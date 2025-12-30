import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Campaign } from "../types/type";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function CampaignDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/campaigns/${id}`);
        setCampaign(res.data.campaign);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 bg-gray-950">
        <p className="text-sm text-gray-400">Loading campaign...</p>
      </div>
    );

  if (!campaign)
    return (
      <div className="flex items-center justify-center h-64 bg-gray-950">
        <p className="text-sm text-red-400">Campaign not found</p>
      </div>
    );

  return (
    <div className="bg-gray-950 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-2xl font-semibold text-white">
            {campaign.name}
          </h3>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-400 hover:underline"
          >
            ← Back
          </button>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Detail label="Status" value={campaign.status} />
          <Detail label="Budget" value={`$${campaign.budget}`} />
          <Detail label="Daily Budget" value={`$${campaign.daily_budget}`} />
          <Detail
            label="Platforms"
            value={campaign.platforms.join(", ")}
          />
        </div>
      </div>
    </div>
  );
}

type DetailProps = {
  label: string;
  value: string | number;
};

const Detail = ({ label, value }: DetailProps) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <p className="text-white font-medium">{value}</p>
  </div>
);

export default CampaignDetail;
