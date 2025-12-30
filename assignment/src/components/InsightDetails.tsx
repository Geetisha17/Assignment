import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Insight={
    campaign_id:string;
    timestamp: string;
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
    ctr: number;
    cpc: number;
    conversion_rate: number;
}
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const InsightDetails = ()=>{
    const {id} = useParams<{id:string}>();
    const [insight,setInsight] = useState<Insight | null>(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const fetchInsightDetails = async()=>{
            try {
                const response = await axios.get(`${BASE_URL}/campaigns/${id}/insights`);
                console.log(response.data.insights);
                setInsight(response.data.insights);
            } catch (error) {
                console.log(error);
            }
            finally{
                setLoading(false);
            }
        };
        fetchInsightDetails();
    },[id])

    if(loading) return <h2>Loading...</h2>
    if(!insight) return <h2>Error fetching Insights</h2>

    return(
        <div>
            <h2>Insights Details</h2>
            <p><strong>Impressions: </strong>{insight.impressions}</p>
            <p><strong>Clicks: </strong>{insight.clicks}</p>
            <p><strong>Conversions: </strong>{insight.conversions}</p>
            <p><strong>Spend: </strong>{insight.spend}</p>
            <p><strong>CTR: </strong>{insight.ctr}</p>
            <p><strong>CPC: </strong>{insight.cpc}</p>
            <p><strong>Conversion Rate: </strong>{insight.conversion_rate}</p>
        </div>
    )
}
export default InsightDetails;