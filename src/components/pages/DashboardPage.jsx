import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import TabNavigation from "@/components/organisms/TabNavigation";
import OfferGenerator from "@/components/organisms/OfferGenerator";
import OfferStructure from "@/components/organisms/OfferStructure";
import SalesCopyBuilder from "@/components/organisms/SalesCopyBuilder";
import MVPChecklist from "@/components/organisms/MVPChecklist";
import PromoKit from "@/components/organisms/PromoKit";
import OfferOracle from "@/components/organisms/OfferOracle";
import userService from "@/services/api/userService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { toast } from "react-toastify";

const DashboardPage = ({ initialData = {}, onUpgrade }) => {
  const [activeTab, setActiveTab] = useState("generate");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Product creation state
  const [currentOffer, setCurrentOffer] = useState(null);
  const [currentStructure, setCurrentStructure] = useState(null);
  const [currentSalesCopy, setCurrentSalesCopy] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userData = await userService.getCurrentUser();
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOfferGenerated = async (offerData) => {
    setCurrentOffer(offerData);
    
    // Increment user's product count
    if (user) {
      try {
        const updatedUser = await userService.incrementProductCount(user.Id);
        setUser(updatedUser);
        
        // Check for upgrade prompts
        if (updatedUser.tier === "free" && updatedUser.productsCreated >= 1) {
          setTimeout(() => {
            toast.info("🚀 Ready to create more? Upgrade to unlock unlimited products!");
          }, 2000);
        }
      } catch (err) {
        console.error("Failed to update product count:", err);
      }
    }
  };

  const handleStructureGenerated = (structureData) => {
    setCurrentStructure(structureData);
  };

  const handleSalesCopyGenerated = (copyData) => {
    setCurrentSalesCopy(copyData);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "generate":
        return (
          <OfferGenerator 
            onOfferGenerated={handleOfferGenerated}
            initialData={initialData}
          />
        );
      case "structure":
        return (
          <OfferStructure 
            currentOffer={currentOffer}
            onStructureGenerated={handleStructureGenerated}
          />
        );
      case "copy":
        return (
          <SalesCopyBuilder 
            currentOffer={currentOffer}
            currentStructure={currentStructure}
            onSalesCopyGenerated={handleSalesCopyGenerated}
          />
        );
      case "checklist":
        return <MVPChecklist currentOffer={currentOffer} user={user} />;
      case "promo":
        return <PromoKit currentOffer={currentOffer} user={user} />;
      case "oracle":
        return <OfferOracle user={user} />;
      default:
        return <OfferGenerator onOfferGenerated={handleOfferGenerated} />;
    }
  };

  if (loading) {
    return <Loading text="Initializing the forge..." />;
  }

  if (error) {
    return <Error message={error} onRetry={loadUser} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onUpgrade={onUpgrade} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <TabNavigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            user={user}
          />
          
          <div className="min-h-[600px]">
            {renderActiveTab()}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;