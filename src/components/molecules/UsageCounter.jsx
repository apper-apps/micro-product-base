import React from "react";
import ApperIcon from "@/components/ApperIcon";

const UsageCounter = ({ current, limit, tier }) => {
  const percentage = limit ? (current / limit) * 100 : 0;
  
  return (
    <div className="bg-surface/50 rounded-lg p-4 border border-primary/20">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Zap" size={16} className="text-secondary" />
          <span className="text-sm text-muted">Products Created</span>
        </div>
        <span className="text-sm font-semibold">
          {current}{limit ? ` / ${limit}` : ""}
        </span>
      </div>
      
      {limit && (
        <div className="w-full bg-background rounded-full h-2">
          <div
            className="bg-gradient-to-r from-secondary to-amber-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      )}
      
      <div className="mt-2 text-xs text-muted">
        {tier === "free" && current >= 1 && "Upgrade to create more products"}
        {tier === "paid" && limit && current >= limit * 0.8 && "Consider upgrading to unlimited"}
      </div>
    </div>
  );
};

export default UsageCounter;