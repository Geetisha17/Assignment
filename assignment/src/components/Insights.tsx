import axios from "axios";
import React, { useEffect, useState } from "react";

type Insight={
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
}
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const Insights =()=>{
    const [insights,setInsights] = useState<Insight | null>(null);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        const fetchInsights = async()=>{
            try {
                const response = await axios.get(`${BASE_URL}/campaigns/insights`);
                console.log(response.data.insights);
                setInsights(response.data.insights);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetchInsights();
    },[])

    if(loading) return <h2>Loading....</h2>
    if(!insights) return <h2>No insights</h2>

    return(
        <div>
            <h2>Campaign Insights Summary</h2>

            <div>
                <h3>Campaign Counts</h3>
                <p><strong>Total: </strong>{insights.total_campaigns}</p>
                <p><strong>Active: </strong>{insights.active_campaigns}</p>
                <p><strong>Paused: </strong>{insights.paused_campaigns}</p>
                <p><strong>Completed: </strong>{insights.completed_campaigns}</p>
            </div>

            <div>
                <h3>Performace</h3>
                <p><strong>Impressions: </strong>{insights.total_impressions}</p>
                <p><strong>Clicks: </strong>{insights.total_clicks}</p>
                <p><strong>Conversions: </strong>{insights.total_conversions}</p>
                <p><strong>Spend: </strong>{insights.total_spend}</p>
            </div>

            <div>
                <h3>Averages</h3>
                <p><strong>CTR: </strong>{insights.avg_ctr}</p>
                <p><strong>CRC: </strong>{insights.avg_cpc}</p>
                <p><strong>Conversion Rate:</strong> {insights.avg_conversion_rate}</p>
            </div>
        </div>
    )
}
export default Insights;