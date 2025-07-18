import React from "react";
import TabButton from "@/components/molecules/TabButton";
import { motion } from "framer-motion";

const TabNavigation = ({ activeTab, onTabChange, user }) => {
  const tabs = [
    { id: "generate", label: "Generate Offer", icon: "Wand2" },
    { id: "structure", label: "Structure Offer", icon: "Building2" },
    { id: "copy", label: "Sales Copy", icon: "FileText" },
    { id: "checklist", label: "MVP Checklist", icon: "CheckSquare" },
    { id: "promo", label: "Promo Kit", icon: "Megaphone" },
    { id: "oracle", label: "Offer Oracle", icon: "Crystal" },
  ];

  const isTabDisabled = (tabId) => {
    if (!user) return true;
    if (user.tier === "free") {
      return ["checklist", "promo", "oracle"].includes(tabId);
    }
    return false;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface/50 backdrop-blur-sm rounded-xl p-2 border border-primary/20"
    >
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            icon={tab.icon}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
            disabled={isTabDisabled(tab.id)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default TabNavigation;