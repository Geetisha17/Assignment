import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

function CampaignDetail(){
    const {id} = useParams<{id:string}>();
    const [campaign,setCampaign] = useState<Campaign | null>(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const fetchCampaignDetails = async()=>{
            try {
                const res = await axios.get(`${BASE_URL}/campaigns/${id}`);
                setCampaign(res.data.campaign);
            } catch (error) {
                console.log(error);
            }finally
            {
                setLoading(false);
            }
        }
        fetchCampaignDetails();
    },[id]);

    if(loading) return <h2>Loading....</h2>
    if(!campaign) return <p>No campaigns</p>

    return(
        <div>
            <h3>{campaign.name}</h3>
            <p><strong>Status: </strong>{campaign.status}</p>
            <p><strong>Budget: </strong>${campaign.budget}</p>
            <p><strong>Daily Budget: </strong>${campaign.daily_budget}</p>
            <p><strong>Platforms: </strong>{campaign.platforms.join(' ,')}</p>
        </div>
    )
};
export default CampaignDetail;