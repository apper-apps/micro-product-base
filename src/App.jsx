import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingPage from "@/components/pages/LandingPage";
import DashboardPage from "@/components/pages/DashboardPage";
import OnboardingWizard from "@/components/organisms/OnboardingWizard";

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [onboardingData, setOnboardingData] = useState({});

  const handleGetStarted = () => {
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = (data) => {
    setOnboardingData(data);
    setShowOnboarding(false);
    setShowDashboard(true);
  };

  const handleSkipOnboarding = () => {
    setShowOnboarding(false);
    setShowDashboard(true);
  };

  const handleUpgrade = () => {
    // In a real app, this would navigate to pricing/upgrade flow
    console.log("Upgrade flow triggered");
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              showOnboarding ? (
                <OnboardingWizard 
                  onComplete={handleOnboardingComplete}
                  onSkip={handleSkipOnboarding}
                />
              ) : showDashboard ? (
                <DashboardPage 
                  initialData={onboardingData}
                  onUpgrade={handleUpgrade}
                />
              ) : (
                <LandingPage onGetStarted={handleGetStarted} />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;