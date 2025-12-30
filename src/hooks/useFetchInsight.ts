import { useEffect, useState } from "react";
import axios from "axios";
import { InsightDetail } from "../types/type";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const useFetchInsights = () => {
  const [insights, setInsights] = useState<InsightDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${BASE_URL}/campaigns/insights`);
        setInsights(data.insights);
      } catch (err) {
        setError("Failed to load insights");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  return { insights, loading, error };
};
