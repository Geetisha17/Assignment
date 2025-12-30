import React, { useEffect, useState } from "react";
import axios from "axios";
import { Campaign } from "../types/type";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
function useFetchCampaign() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/campaigns`);
        setCampaigns(response.data.campaigns);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("failed to fetch Error");
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);
  return { campaigns, loading, error };
}

export default useFetchCampaign;
