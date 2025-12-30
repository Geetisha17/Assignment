import React from "react";
import { useNavigate } from "react-router-dom";

type Campaign ={
    id:string;
    name:string;
    brand_id:string;
    status: string;
    budget: number;
    daily_budget: number;
    platforms: string[];
}

type props ={
    campaign: Campaign;
}

function CampaignCard({campaign}:props){
    const navigate = useNavigate();

    const showDetails=()=>{
        navigate(`/campaign/${campaign.id}`);
    }
    const showInsights = ()=>{
        navigate(`/campaign/${campaign.id}/insights`);
    }
    return(
        <div>
            <h3>{campaign.name}</h3>
            <p><strong>Status: </strong>{campaign.status}</p>
            <p><strong>Budget: </strong>${campaign.budget}</p>
            <p><strong>Daily Budget: </strong>${campaign.daily_budget}</p>
            <p><strong>Platforms: </strong>{campaign.platforms.join(' ,')}</p>
            <button onClick={showDetails}>
                <strong>View Details</strong></button>
            <button>
                <strong onClick={showInsights}>View Insights</strong>
            </button>
        </div>
    )
}

export default CampaignCard;