import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import UsageCounter from "@/components/molecules/UsageCounter";
import { motion } from "framer-motion";

const Header = ({ user, onUpgrade }) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface/30 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg">
              <ApperIcon name="Sparkles" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold">Micro-Product Forge</h1>
              <p className="text-xs text-muted">The YES-Summoner for Digital Creators</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="hidden sm:block">
                  <UsageCounter 
                    current={user.productsCreated || 0}
                    limit={user.tier === "free" ? 1 : user.tier === "paid" ? 10 : null}
                    tier={user.tier}
                  />
                </div>
                
                {user.tier !== "lifetime" && (
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={onUpgrade}
                    className="relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      <ApperIcon name="Crown" size={16} className="mr-2" />
                      Upgrade
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary via-amber-500 to-secondary animate-shimmer"></div>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;