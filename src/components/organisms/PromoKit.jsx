import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import { toast } from "react-toastify";

const PromoKit = ({ currentOffer, user }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [promoKit, setPromoKit] = useState(null);

  useEffect(() => {
    if (currentOffer && user?.tier !== "free" && !promoKit) {
      generatePromoKit();
    }
  }, [currentOffer, user]);

  const generatePromoKit = async () => {
    if (!currentOffer) {
      toast.error("Please generate an offer first");
      return;
    }

    setIsGenerating(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1800));

      const kit = {
        videoScripts: generateVideoScripts(currentOffer),
        socialPosts: generateSocialPosts(currentOffer)
      };

      setPromoKit(kit);
      toast.success("Promo kit generated!");
    } catch (error) {
      toast.error("Failed to generate promo kit. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateVideoScripts = (offer) => {
    return [
      {
        id: 1,
        title: "Problem/Solution Hook",
        duration: "30-60 seconds",
        script: `HOOK: "If you're struggling with ${offer.painPoint.toLowerCase()}, this is for you..."

PROBLEM: Show the pain and frustration
- Quick montage of the struggle
- Frustrated expressions
- "Sound familiar?"

SOLUTION: "${offer.name} changed everything for me"
- Show transformation
- Quick results
- Happy/confident demeanor

CTA: "Link in bio to get yours"

CAPTION: "The ${offer.format} that finally solved ${offer.painPoint.toLowerCase()} 🙌 #productivity #transformation"`
      },
      {
        id: 2,
        title: "Social Proof Testimonial",
        duration: "45-90 seconds",
        script: `HOOK: "I can't believe this actually worked..."

STORY: Share a success story
- "I used to struggle with ${offer.painPoint.toLowerCase()}"
- "Then I found ${offer.name}"
- "Now I'm [specific result]"

PROOF: Show before/after or results
- Screenshots
- Metrics
- Visual transformation

CTA: "Get the same results - link below"

CAPTION: "Real results from ${offer.name} ✨ Who else needs this? #success #transformation"`
      },
      {
        id: 3,
        title: "Quick Tip Preview",
        duration: "30-45 seconds",
        script: `HOOK: "Here's a quick tip from ${offer.name}..."

VALUE: Share one actionable tip
- Quick, implementable advice
- Show it in action
- "This is just one of [X] strategies inside"

TEASE: "But that's not all..."
- Hint at more value
- Build curiosity
- Create desire

CTA: "Full guide in my bio"

CAPTION: "Free tip from ${offer.name} 💡 Save for later! #tips #productivity"`
      }
    ];
  };

  const generateSocialPosts = (offer) => {
    return [
      {
        id: 1,
        platform: "Instagram/TikTok",
        type: "Story Hook",
        content: `POV: You finally found the solution to ${offer.painPoint.toLowerCase()} 

${offer.name} is literally a game-changer 🔥

Who else needs this? 👇

#productivity #transformation #digitalproducts`
      },
      {
        id: 2,
        platform: "Twitter/X",
        type: "Thread Starter",
        content: `🧵 Thread: How I went from ${offer.painPoint.toLowerCase()} to [desired outcome] in [timeframe]

The secret? ${offer.name}

Here's exactly what I learned... (1/7)`
      },
      {
        id: 3,
        platform: "LinkedIn",
        type: "Professional Angle",
        content: `${offer.painPoint} was costing me opportunities.

Every day I delayed addressing this issue was another day of lost potential.

Then I discovered ${offer.name}.

The transformation wasn't overnight, but it was undeniable.

${offer.promise}

Sometimes the best investment you can make is in solutions that eliminate your biggest friction points.

What's your biggest productivity challenge right now?`
      }
    ];
  };

  if (user?.tier === "free") {
    return (
      <div className="text-center py-12">
        <div className="bg-secondary/10 p-6 rounded-full inline-block mb-4">
          <ApperIcon name="Crown" size={48} className="text-secondary" />
        </div>
        <h3 className="text-xl font-semibold mb-3">Upgrade to Access Promo Kit</h3>
        <p className="text-muted mb-6">Get video scripts and social post templates</p>
        <Button variant="secondary">
          <ApperIcon name="Crown" size={16} className="mr-2" />
          Upgrade Now
        </Button>
      </div>
    );
  }

  if (!currentOffer) {
    return (
      <div className="text-center py-12">
        <div className="bg-primary/10 p-6 rounded-full inline-block mb-4">
          <ApperIcon name="Megaphone" size={48} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-3">No Offer to Promote</h3>
        <p className="text-muted">Generate an offer first to get your promo kit</p>
      </div>
    );
  }

  if (isGenerating) {
    return <Loading text="Creating your promotional arsenal..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold mb-3">Organic Traffic Jumpstart Kit</h2>
        <p className="text-muted">Video scripts and social posts to drive traffic</p>
      </div>

      {promoKit && (
        <div className="space-y-8">
          {/* Video Scripts */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <ApperIcon name="Video" size={20} className="mr-2 text-primary" />
              Video Scripts
            </h3>

            <div className="space-y-6">
              {promoKit.videoScripts.map((script, index) => (
                <motion.div
                  key={script.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-surface/50 rounded-lg p-6 border border-primary/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">{script.title}</h4>
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                      {script.duration}
                    </span>
                  </div>

                  <div className="bg-background/50 p-4 rounded-lg mb-4">
                    <pre className="whitespace-pre-wrap text-sm font-mono">{script.script}</pre>
                  </div>

                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(script.script);
                      toast.success(`${script.title} script copied!`);
                    }}
                  >
                    <ApperIcon name="Copy" size={14} className="mr-2" />
                    Copy Script
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social Posts */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <ApperIcon name="Share2" size={20} className="mr-2 text-secondary" />
              Social Media Posts
            </h3>

            <div className="grid gap-6">
              {promoKit.socialPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-surface/50 rounded-lg p-6 border border-secondary/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">{post.type}</h4>
                    <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm">
                      {post.platform}
                    </span>
                  </div>

                  <div className="bg-background/50 p-4 rounded-lg mb-4">
                    <p className="whitespace-pre-wrap">{post.content}</p>
                  </div>

                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(post.content);
                      toast.success(`${post.type} post copied!`);
                    }}
                  >
                    <ApperIcon name="Copy" size={14} className="mr-2" />
                    Copy Post
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Export All */}
          <div className="text-center">
            <Button 
              variant="secondary"
              onClick={() => {
                const allContent = `
VIDEO SCRIPTS:
${promoKit.videoScripts.map(script => `
${script.title} (${script.duration})
${script.script}
`).join('\n')}

SOCIAL MEDIA POSTS:
${promoKit.socialPosts.map(post => `
${post.type} - ${post.platform}
${post.content}
`).join('\n')}
                `.trim();

                navigator.clipboard.writeText(allContent);
                toast.success("Complete promo kit copied to clipboard!");
              }}
            >
              <ApperIcon name="Download" size={16} className="mr-2" />
              Export Complete Promo Kit
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PromoKit;