import React, { useEffect, useState } from "react";
import CampaignCard from "./CampaignCard";
import axios from "axios";
import { Campaign } from "../types/type";

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

    if(loading) return (
      <div className="flex items-center justify-center h-64 bg-gray-950">
        <h2 className="text-sm text-gray-400">Loading insights...</h2>
      </div>
    );
    if(error) return <p>Error: {error}</p>

    return(
        <div >
            <h2 className="text-4xl font-extrabold text-black text-center mb-8">
                All Campaigns
            </h2>
            <div className="flex flex-row flex-wrap gap-4 items-center justify-center" 
            style={{"padding":"10px"}}
            >
            {   
                campaigns.length>0?
                campaigns.map((item)=>(
                    <CampaignCard key={item.id} campaign={item} />
                )): 
                    <h2>No campaigns found</h2>
            }
            </div>
        </div>
    )
}

export default CampaignList;