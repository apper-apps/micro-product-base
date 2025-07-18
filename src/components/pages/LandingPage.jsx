import React from "react";
import HeroSection from "@/components/organisms/HeroSection";

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen">
      <HeroSection onGetStarted={onGetStarted} />
    </div>
  );
};

export default LandingPage;