import axios from "axios";

const BASE_URL= 'https://mixo-fe-backend-task.vercel.app';

export const getAllCampaign = async()=>{
    const res = await axios.get(`${BASE_URL}/campaigns`);
    return res.data;
}