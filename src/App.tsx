import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CampaignDetail from "./components/CampaignDetail";
import Campaigns from "./pages/Campaign";
import InsightDetails from "./pages/InsightDetails";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Campaigns />} />
          <Route path="/campaign/:id" element={<CampaignDetail />} />
          <Route path="/campaign/:id/insights" element={<InsightDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
