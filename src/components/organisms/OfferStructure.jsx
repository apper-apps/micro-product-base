import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import { toast } from "react-toastify";

const OfferStructure = ({ currentOffer, onStructureGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [structure, setStructure] = useState(null);

  useEffect(() => {
    if (currentOffer && !structure) {
      generateStructure();
    }
  }, [currentOffer]);

  const generateStructure = async () => {
    if (!currentOffer) {
      toast.error("Please generate an offer first");
      return;
    }

    setIsGenerating(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const generatedStructure = {
        pricing: generatePricing(currentOffer),
        bonuses: generateBonuses(currentOffer),
        upsells: generateUpsells(currentOffer),
        offerStack: generateOfferStack(currentOffer)
      };

      setStructure(generatedStructure);
      onStructureGenerated(generatedStructure);
      toast.success("Offer structure generated!");
    } catch (error) {
      toast.error("Failed to generate structure. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePricing = (offer) => {
    const basePrices = {
      pdf: 19,
      checklist: 9,
      template: 29,
      audio: 39,
      video: 49,
      worksheet: 19
    };

    const basePrice = basePrices[offer.format] || 19;
    
    return {
      main: basePrice,
      suggested: Math.floor(basePrice * 1.5),
      premium: Math.floor(basePrice * 2.5),
      strategy: `Start at $${basePrice} for quick validation, then test $${Math.floor(basePrice * 1.5)} after first 10 sales`
    };
  };

  const generateBonuses = (offer) => {
    const bonusTemplates = {
      pdf: [
        "Quick Reference Cheat Sheet",
        "30-Day Implementation Calendar",
        "Troubleshooting FAQ Guide"
      ],
      checklist: [
        "Progress Tracking Worksheet",
        "Success Metrics Dashboard",
        "Common Mistakes Avoider"
      ],
      template: [
        "Customization Guide",
        "Industry-Specific Examples",
        "Advanced Variations"
      ]
    };

    const templates = bonusTemplates[offer.format] || bonusTemplates.pdf;
    return templates.slice(0, 2);
  };

  const generateUpsells = (offer) => {
    return [
      {
        title: "1-on-1 Implementation Call",
        price: 97,
        description: "30-minute personalized strategy session"
      },
      {
        title: "Advanced Mastery Course",
        price: 197,
        description: "Deep-dive training with case studies"
      }
    ];
  };

  const generateOfferStack = (offer) => {
    const pricing = generatePricing(offer);
    const bonuses = generateBonuses(offer);
    
    return {
      totalValue: pricing.main + 47 + 27,
      yourPrice: pricing.main,
      savings: 47 + 27,
      components: [
        { item: offer.name, value: pricing.main },
        { item: bonuses[0], value: 47 },
        { item: bonuses[1], value: 27 }
      ]
    };
  };

  if (!currentOffer) {
    return (
      <div className="text-center py-12">
        <div className="bg-primary/10 p-6 rounded-full inline-block mb-4">
          <ApperIcon name="Building2" size={48} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-3">No Offer to Structure</h3>
        <p className="text-muted">Generate an offer first to see its structure</p>
      </div>
    );
  }

  if (isGenerating) {
    return <Loading text="Structuring your irresistible offer..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold mb-3">Structure Your Offer</h2>
        <p className="text-muted">Turn your idea into an irresistible package</p>
      </div>

      {structure && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pricing Strategy */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <ApperIcon name="DollarSign" size={20} className="mr-2 text-secondary" />
              Pricing Strategy
            </h3>

            <div className="space-y-4">
              <div className="bg-background/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted">Validation Price</span>
                  <span className="text-2xl font-bold text-secondary">${structure.pricing.main}</span>
                </div>
                <p className="text-sm text-muted">Start here for quick market validation</p>
              </div>

              <div className="bg-background/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted">Optimized Price</span>
                  <span className="text-2xl font-bold text-primary">${structure.pricing.suggested}</span>
                </div>
                <p className="text-sm text-muted">Test after first 10 sales</p>
              </div>

              <div className="bg-background/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted">Premium Price</span>
                  <span className="text-2xl font-bold text-accent">${structure.pricing.premium}</span>
                </div>
                <p className="text-sm text-muted">With bonuses and positioning</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
              <h4 className="font-semibold text-secondary mb-2">Strategy</h4>
              <p className="text-sm">{structure.pricing.strategy}</p>
            </div>
          </div>

          {/* Offer Stack */}
          <div className="card bg-gradient-to-br from-surface via-purple-900/20 to-pink-900/20 border-accent/30">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <ApperIcon name="Package" size={20} className="mr-2 text-accent" />
              Complete Offer Stack
            </h3>

            <div className="space-y-3 mb-6">
              {structure.offerStack.components.map((component, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-background/30 rounded-lg">
                  <span>{component.item}</span>
                  <span className="font-semibold">${component.value}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-accent/20 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted">Total Value:</span>
                <span className="line-through text-muted">${structure.offerStack.totalValue}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-bold">Your Price:</span>
                <span className="text-3xl font-bold text-secondary">${structure.offerStack.yourPrice}</span>
              </div>
              <div className="text-center">
                <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Save ${structure.offerStack.savings}
                </span>
              </div>
            </div>
          </div>

          {/* Bonuses */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <ApperIcon name="Gift" size={20} className="mr-2 text-primary" />
              Irresistible Bonuses
            </h3>

            <div className="space-y-4">
              {structure.bonuses.map((bonus, index) => (
                <div key={index} className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary p-2 rounded-lg">
                      <ApperIcon name="Gift" size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{bonus}</h4>
                      <p className="text-sm text-muted">Bonus #{index + 1}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upsells */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <ApperIcon name="TrendingUp" size={20} className="mr-2 text-secondary" />
              Revenue Boosters
            </h3>

            <div className="space-y-4">
              {structure.upsells.map((upsell, index) => (
                <div key={index} className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{upsell.title}</h4>
                    <span className="text-xl font-bold text-secondary">${upsell.price}</span>
                  </div>
                  <p className="text-sm text-muted">{upsell.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {structure && (
        <div className="text-center">
          <Button 
            variant="secondary"
            onClick={() => {
              const structureText = `
OFFER STRUCTURE FOR: ${currentOffer.name}

PRICING STRATEGY:
- Validation Price: $${structure.pricing.main}
- Optimized Price: $${structure.pricing.suggested}
- Premium Price: $${structure.pricing.premium}

BONUSES:
${structure.bonuses.map(bonus => `- ${bonus}`).join('\n')}

UPSELLS:
${structure.upsells.map(upsell => `- ${upsell.title}: $${upsell.price}`).join('\n')}

OFFER STACK VALUE: $${structure.offerStack.totalValue}
YOUR PRICE: $${structure.offerStack.yourPrice}
SAVINGS: $${structure.offerStack.savings}
              `.trim();

              navigator.clipboard.writeText(structureText);
              toast.success("Offer structure copied to clipboard!");
            }}
          >
            <ApperIcon name="Copy" size={16} className="mr-2" />
            Copy Complete Structure
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default OfferStructure;