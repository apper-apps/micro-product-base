import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { motion } from "framer-motion";

const HeroSection = ({ onGetStarted }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%237C3AED%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="bg-gradient-to-br from-primary to-accent p-6 rounded-full inline-block mb-8 shadow-glow-lg animate-float"
        >
          <ApperIcon name="Sparkles" size={64} className="text-white" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-white via-white to-secondary bg-clip-text text-transparent"
        >
          Create & Sell Your First Micro Product in 48 Hours
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl sm:text-2xl text-muted mb-8 max-w-3xl mx-auto"
        >
          Without Funnels or Overwhelm
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-surface/50 backdrop-blur-sm rounded-xl p-8 mb-8 border border-primary/20"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary/20 p-4 rounded-full inline-block mb-4">
                <ApperIcon name="Target" size={32} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Pick Your Niche</h3>
              <p className="text-muted">Choose your audience and their biggest pain point</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary/20 p-4 rounded-full inline-block mb-4">
                <ApperIcon name="Wand2" size={32} className="text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Generate Your Offer</h3>
              <p className="text-muted">AI creates your product, pricing, and sales copy</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/20 p-4 rounded-full inline-block mb-4">
                <ApperIcon name="Rocket" size={32} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Launch in 48 Hours</h3>
              <p className="text-muted">Follow your custom checklist to go live</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="text-xl px-8 py-4 shadow-glow-lg"
          >
            <ApperIcon name="Sparkles" size={20} className="mr-3" />
            Generate My Micro-Product
          </Button>
          
          <div className="text-center sm:text-left">
            <p className="text-sm text-secondary font-semibold">FREE TRIAL</p>
            <p className="text-xs text-muted">No credit card required</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-secondary to-amber-600 text-black px-4 py-2 rounded-full font-semibold text-sm animate-pulse-glow">
            <ApperIcon name="Timer" size={16} />
            <span>Limited Time: $299 Lifetime Deal</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;