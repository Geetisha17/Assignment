import React, { useEffect, useState } from "react";
import CampaignCard from "./CampaignCard";
import axios from "axios";

type Campaign ={
    id:string;
    name:string;
    brand_id:string;
    status: string;
    budget: number;
    daily_budget: number;
    platforms: string[];
}
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
function CampaignList()
{
    const [campaigns,setCampaigns] = useState<Campaign[]>([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState<string  | null>(null);

    useEffect(()=>{
        const fetchCampaigns = async()=>{
            try {
                const response = await axios.get(`${BASE_URL}/campaigns`);
                setCampaigns(response.data.campaigns);
            } catch (err) {
                if(err instanceof Error)
                    setError(err.message);
                else
                    setError("failed to fetch Error");
            }
            finally{
                setLoading(false);
            }
        }
        fetchCampaigns();
    },[]);

    if(loading) return <p>Loading campaigns.....</p>
    if(error) return <p>Error: {error}</p>

    return(
        <div>
            <h2>All Campaigns</h2>
            {
                campaigns.length>0?
                campaigns.map((item)=>(
                    <CampaignCard key={item.id} campaign={item} />
                )): 
                <h2>No campaigns found</h2>
            }
        </div>
    )
}

export default CampaignList;