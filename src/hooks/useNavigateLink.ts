import { useNavigate } from "react-router-dom";
import { Campaign } from "../types/type";

type Props = {
  campaign: Campaign;
};
export const useNavigateLink = ({ campaign }: Props) => {
  const navigate = useNavigate();

  const showDetails = () => {
    navigate(`/campaign/${campaign.id}`);
  };

  const showInsights = () => {
    navigate(`/campaign/${campaign.id}/insights`);
  };

  return { showDetails, showInsights };
};
