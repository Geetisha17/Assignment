import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Campaign } from "../types/type";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const useFetchCampaignId = () => {
  const { id } = useParams<{ id: string }>();
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

  return { campaign, loading };
};