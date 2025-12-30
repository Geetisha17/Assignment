import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RealtimeInsight } from "../types/type";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const useFetchRealtime = () => {
  const { id } = useParams<{ id: string }>();
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

  return { realtimeData, latest, loading };
}