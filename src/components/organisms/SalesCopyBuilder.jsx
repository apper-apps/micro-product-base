import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import { toast } from "react-toastify";

const SalesCopyBuilder = ({ currentOffer, currentStructure, onSalesCopyGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [salesCopy, setSalesCopy] = useState(null);

  useEffect(() => {
    if (currentOffer && !salesCopy) {
      generateSalesCopy();
    }
  }, [currentOffer]);

  const generateSalesCopy = async () => {
    if (!currentOffer) {
      toast.error("Please generate an offer first");
      return;
    }

    setIsGenerating(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const copy = {
        socialPost: generateSocialPost(currentOffer),
        ctaOneLiner: generateCTAOneLiner(currentOffer),
        miniSalesPage: generateMiniSalesPage(currentOffer, currentStructure)
      };

      setSalesCopy(copy);
      onSalesCopyGenerated(copy);
      toast.success("Sales copy generated!");
    } catch (error) {
      toast.error("Failed to generate sales copy. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateSocialPost = (offer) => {
    const hooks = [
      "Stop letting [PAIN] steal your dreams.",
      "The secret that [AUDIENCE] don't want you to know:",
      "Warning: This will change how you think about [NICHE]",
      "Finally, a solution to [PAIN] that actually works."
    ];

    const hook = hooks[Math.floor(Math.random() * hooks.length)]
      .replace("[PAIN]", offer.painPoint.toLowerCase())
      .replace("[AUDIENCE]", "successful people")
      .replace("[NICHE]", offer.niche.toLowerCase());

    return `${hook}

${offer.name} gives you ${offer.promise.toLowerCase()}.

✨ ${offer.deliverable}

Get it here: [link]

#${offer.niche.replace(/\s+/g, '')} #DigitalProducts #Productivity`;
  };

  const generateCTAOneLiner = (offer) => {
    const templates = [
      `Transform ${offer.painPoint.toLowerCase()} into your superpower`,
      `Get ${offer.name.toLowerCase()} and change everything`,
      `Stop struggling with ${offer.painPoint.toLowerCase()} - start winning`,
      `The ${offer.format} that solves ${offer.painPoint.toLowerCase()} forever`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  };

  const generateMiniSalesPage = (offer, structure) => {
    const price = structure?.pricing?.main || 19;
    
    return `# The Problem That's Costing You Everything

${offer.painPoint} isn't just frustrating - it's stealing your potential, your time, and your peace of mind.

Every day you wait is another day of missed opportunities.

## What if there was a better way?

${offer.name} isn't just another ${offer.format}. It's a proven system that ${offer.promise.toLowerCase()}.

### What You Get:
- ${offer.deliverable}
- Step-by-step implementation guide
- Real-world examples and case studies
- 30-day money-back guarantee

**Normal Price: $${price * 2}**
**Your Price Today: $${price}**

Stop letting ${offer.painPoint.toLowerCase()} control your life. 

Get ${offer.name} now and start your transformation today.

[GET INSTANT ACCESS - $${price}]

*Join hundreds of people who've already transformed their lives*`;
  };

  if (!currentOffer) {
    return (
      <div className="text-center py-12">
        <div className="bg-primary/10 p-6 rounded-full inline-block mb-4">
          <ApperIcon name="FileText" size={48} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-3">No Offer to Write Copy For</h3>
        <p className="text-muted">Generate an offer first to create sales copy</p>
      </div>
    );
  }

  if (isGenerating) {
    return <Loading text="Crafting persuasive sales copy..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold mb-3">Sales Copy Builder</h2>
        <p className="text-muted">Convert browsers into buyers with proven copy</p>
      </div>

      {salesCopy && (
        <div className="space-y-8">
          {/* Social Media Post */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <ApperIcon name="Share2" size={20} className="mr-2 text-primary" />
              Social Media Post
            </h3>

            <div className="bg-background/50 p-4 rounded-lg mb-4">
              <pre className="whitespace-pre-wrap text-sm font-mono">{salesCopy.socialPost}</pre>
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(salesCopy.socialPost);
                  toast.success("Social post copied!");
                }}
              >
                <ApperIcon name="Copy" size={14} className="mr-2" />
                Copy Post
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                onClick={generateSalesCopy}
              >
                <ApperIcon name="RefreshCw" size={14} className="mr-2" />
                Regenerate
              </Button>
            </div>
          </div>

          {/* CTA One-Liner */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <ApperIcon name="Zap" size={20} className="mr-2 text-secondary" />
              CTA One-Liner
            </h3>

            <div className="bg-gradient-to-r from-secondary/20 to-amber-500/20 p-4 rounded-lg mb-4 border border-secondary/30">
              <p className="text-lg font-semibold text-center">{salesCopy.ctaOneLiner}</p>
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(salesCopy.ctaOneLiner);
                  toast.success("CTA copied!");
                }}
              >
                <ApperIcon name="Copy" size={14} className="mr-2" />
                Copy CTA
              </Button>
            </div>
          </div>

          {/* Mini Sales Page */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <ApperIcon name="FileText" size={20} className="mr-2 text-accent" />
              Mini Sales Page
            </h3>

            <div className="bg-background/50 p-6 rounded-lg mb-4 max-h-96 overflow-y-auto">
              <div className="prose prose-invert max-w-none">
                {salesCopy.miniSalesPage.split('\n').map((line, index) => {
                  if (line.startsWith('#')) {
                    return <h2 key={index} className="text-xl font-bold mb-4 text-white">{line.replace('#', '').trim()}</h2>;
                  }
                  if (line.startsWith('##')) {
                    return <h3 key={index} className="text-lg font-semibold mb-3 text-secondary">{line.replace('##', '').trim()}</h3>;
                  }
                  if (line.startsWith('###')) {
                    return <h4 key={index} className="text-base font-semibold mb-2 text-primary">{line.replace('###', '').trim()}</h4>;
                  }
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={index} className="font-bold mb-2">{line.replace(/\*\*/g, '')}</p>;
                  }
                  if (line.startsWith('[') && line.endsWith(']')) {
                    return (
                      <div key={index} className="my-6 text-center">
                        <div className="bg-gradient-to-r from-secondary to-amber-600 text-black font-bold py-3 px-6 rounded-lg inline-block">
                          {line.replace(/[\[\]]/g, '')}
                        </div>
                      </div>
                    );
                  }
                  if (line.startsWith('*')) {
                    return <p key={index} className="text-muted text-center italic mb-2">{line.replace('*', '').trim()}</p>;
                  }
                  if (line.trim() === '') {
                    return <div key={index} className="mb-4"></div>;
                  }
                  return <p key={index} className="mb-3">{line}</p>;
                })}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(salesCopy.miniSalesPage);
                  toast.success("Sales page copied!");
                }}
              >
                <ApperIcon name="Copy" size={14} className="mr-2" />
                Copy Sales Page
              </Button>
            </div>
          </div>

          {/* Copy All */}
          <div className="text-center">
            <Button 
              variant="secondary"
              onClick={() => {
                const allCopy = `
SOCIAL MEDIA POST:
${salesCopy.socialPost}

CTA ONE-LINER:
${salesCopy.ctaOneLiner}

MINI SALES PAGE:
${salesCopy.miniSalesPage}
                `.trim();

                navigator.clipboard.writeText(allCopy);
                toast.success("All sales copy copied to clipboard!");
              }}
            >
              <ApperIcon name="Download" size={16} className="mr-2" />
              Copy All Sales Copy
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SalesCopyBuilder;