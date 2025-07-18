import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import oracleService from "@/services/api/oracleService";
import { toast } from "react-toastify";

const OfferOracle = ({ user, onOracleDrawn }) => {
  const [drawnCard, setDrawnCard] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [error, setError] = useState(null);

  const drawCard = async () => {
    setIsDrawing(true);
    setError(null);

    try {
      const card = await oracleService.getRandomCard();
      setDrawnCard(card);
      onOracleDrawn && onOracleDrawn(card);
      toast.success("The Oracle has spoken! ✨");
    } catch (err) {
      setError(err.message);
      toast.error("The Oracle is temporarily unavailable");
    } finally {
      setIsDrawing(false);
    }
  };

  if (user?.tier === "free") {
    return (
      <div className="text-center py-12">
        <div className="bg-accent/10 p-8 rounded-full inline-block mb-6">
          <ApperIcon name="Crystal" size={64} className="text-accent animate-pulse" />
        </div>
        <h3 className="text-2xl font-display font-bold mb-4">The Oracle Awaits</h3>
        <p className="text-muted mb-8 max-w-md mx-auto">
          Unlock mystical offer inspiration with gamified product generation. 
          The Oracle reveals trending micro-product ideas based on cosmic market forces.
        </p>
        <Button variant="secondary" size="lg">
          <ApperIcon name="Crown" size={20} className="mr-3" />
          Unlock the Oracle
        </Button>
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={drawCard} />;
  }

  if (isDrawing) {
    return <Loading text="Consulting the cosmic forces..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <div className="bg-gradient-to-br from-accent via-purple-500 to-primary p-6 rounded-full inline-block mb-6 animate-float">
          <ApperIcon name="Crystal" size={48} className="text-white" />
        </div>
        <h2 className="text-3xl font-display font-bold mb-3">🎲 Offer Oracle™</h2>
        <p className="text-muted">Summon divine inspiration for your next micro-product</p>
      </div>

      <div className="max-w-2xl mx-auto">
        {!drawnCard ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-8"
          >
            <div className="oracle-card min-h-[300px] flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-32 h-48 bg-gradient-to-br from-accent via-purple-600 to-primary rounded-xl shadow-oracle mb-6 flex items-center justify-center">
                  <ApperIcon name="Sparkles" size={48} className="text-white animate-pulse" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-accent via-purple-500 to-primary rounded-xl opacity-30 animate-pulse"></div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">The Mystical Deck Awaits</h3>
              <p className="text-muted mb-6">
                Draw a card to reveal a themed micro-offer idea based on digital trends and pain point archetypes
              </p>
              
              <Button 
                onClick={drawCard}
                size="lg"
                className="bg-gradient-to-r from-accent to-purple-600 hover:from-purple-600 hover:to-accent shadow-oracle"
              >
                <ApperIcon name="Sparkles" size={20} className="mr-3" />
                Draw from the Oracle
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full h-24 bg-gradient-to-br from-surface to-purple-900/30 rounded-lg border border-accent/20 animate-pulse"></div>
              ))}
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={drawnCard.Id}
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="oracle-card bg-gradient-to-br from-accent/20 via-purple-900/30 to-primary/20 border-accent/50">
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-accent to-purple-600 text-white px-4 py-2 rounded-full inline-block mb-4">
                    <span className="font-semibold text-sm">{drawnCard.archetype}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3 bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
                    {drawnCard.title}
                  </h3>
                </div>

                <div className="bg-background/50 rounded-lg p-6 mb-6">
                  <p className="text-lg leading-relaxed text-center">{drawnCard.description}</p>
                </div>

                <div className="flex items-center justify-center space-x-2 mb-6">
                  <ApperIcon name="Target" size={16} className="text-accent" />
                  <span className="text-sm text-muted">Pain Category: {drawnCard.painCategory}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      const cardText = `${drawnCard.title}\n\nArchetype: ${drawnCard.archetype}\nDescription: ${drawnCard.description}\nPain Category: ${drawnCard.painCategory}`;
                      navigator.clipboard.writeText(cardText);
                      toast.success("Oracle wisdom copied!");
                    }}
                  >
                    <ApperIcon name="Copy" size={16} className="mr-2" />
                    Copy Inspiration
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      setDrawnCard(null);
                      setTimeout(drawCard, 500);
                    }}
                    className="bg-gradient-to-r from-accent to-purple-600"
                  >
                    <ApperIcon name="RefreshCw" size={16} className="mr-2" />
                    Draw Another
                  </Button>
                </div>
              </div>

              <div className="card bg-surface/30">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <ApperIcon name="Lightbulb" size={20} className="mr-2 text-secondary" />
                  Oracle's Guidance
                </h4>
                <div className="space-y-3 text-sm">
                  <p>💡 <strong>Implementation:</strong> Create a {drawnCard.title.toLowerCase()} as a PDF guide or checklist</p>
                  <p>🎯 <strong>Target Audience:</strong> People struggling with {drawnCard.painCategory}</p>
                  <p>💰 <strong>Pricing:</strong> Start at $19-$39 for quick validation</p>
                  <p>📈 <strong>Next Step:</strong> Use this inspiration in the Offer Generator</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default OfferOracle;