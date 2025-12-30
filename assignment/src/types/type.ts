export type Insight={
    campaign_id:string;
    timestamp: string;
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
    ctr: number;
    cpc: number;
    conversion_rate: number;
};
export type RealtimeInsight = {
  campaign_id: string;
  timestamp: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cpc: number;
  conversion_rate: number;
};
export type Campaign ={
    id:string;
    name:string;
    brand_id:string;
    status: string;
    budget: number;
    daily_budget: number;
    platforms: string[];
};
