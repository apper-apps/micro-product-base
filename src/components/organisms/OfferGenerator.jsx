import React, { useState } from "react";
import { motion } from "framer-motion";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import { toast } from "react-toastify";

const OfferGenerator = ({ onOfferGenerated, initialData = {} }) => {
  const [formData, setFormData] = useState({
    niche: initialData.niche || "",
    painPoint: initialData.painPoint || "",
    format: initialData.format || ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOffer, setGeneratedOffer] = useState(null);

  const niches = [
    "Productivity & Time Management",
    "Health & Fitness",
    "Business & Entrepreneurship",
    "Personal Development",
    "Marketing & Sales",
    "Finance & Investing",
    "Parenting & Family",
    "Relationships & Dating",
    "Technology & Software",
    "Creative Arts & Design"
  ];

  const formats = [
    { value: "pdf", label: "PDF Guide" },
    { value: "checklist", label: "Checklist" },
    { value: "template", label: "Template" },
    { value: "audio", label: "Audio Course" },
    { value: "video", label: "Video Series" },
    { value: "worksheet", label: "Worksheet" }
  ];

  const generateOffer = async () => {
    if (!formData.niche || !formData.painPoint || !formData.format) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate AI generation with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const offer = {
        name: generateOfferName(formData),
        promise: generatePromise(formData),
        deliverable: generateDeliverable(formData)
      };

      setGeneratedOffer(offer);
      onOfferGenerated({ ...formData, ...offer });
      toast.success("Offer generated successfully!");
    } catch (error) {
      toast.error("Failed to generate offer. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateOfferName = (data) => {
    const nameTemplates = {
      "Productivity & Time Management": [
        "The 5-Minute Focus Formula",
        "Time Mastery Blueprint",
        "The Productivity Power Pack",
        "Focus Like a Laser System"
      ],
      "Health & Fitness": [
        "The 10-Minute Morning Energizer",
        "Busy Parent's Fitness Formula",
        "The Energy Activation Protocol",
        "Quick Fit Daily Routine"
      ],
      "Business & Entrepreneurship": [
        "The Solo Entrepreneur's Launch Kit",
        "Business Idea Validator",
        "The Revenue Rapid-Fire Method",
        "Startup Success Checklist"
      ]
    };

    const templates = nameTemplates[data.niche] || [
      "The Quick Solution Formula",
      "Problem Solver's Blueprint",
      "The Fast Track Method",
      "Success Accelerator Kit"
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  };

  const generatePromise = (data) => {
    const format = data.format === "pdf" ? "guide" : data.format;
    return `Transform ${data.painPoint.toLowerCase()} into your biggest strength with this proven ${format}`;
  };

  const generateDeliverable = (data) => {
    const deliverables = {
      pdf: "Step-by-step guide with actionable strategies and real-world examples",
      checklist: "Complete task list with priority rankings and time estimates",
      template: "Ready-to-use framework with fill-in-the-blank sections",
      audio: "Recorded lessons with downloadable worksheets and bonus materials",
      video: "Video tutorials with accompanying workbooks and action steps",
      worksheet: "Interactive exercises with guided prompts and success tracking"
    };

    return deliverables[data.format] || "Comprehensive solution with actionable steps";
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isGenerating) {
    return <Loading text="The forge is crafting your perfect offer..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold mb-3">Generate Your Micro-Product Offer</h2>
        <p className="text-muted">The forge will craft the perfect offer based on your inputs</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <ApperIcon name="Settings" size={20} className="mr-2 text-primary" />
            Offer Configuration
          </h3>

          <div className="space-y-6">
            <FormField
              label="Target Niche"
              component="select"
              value={formData.niche}
              onChange={(e) => updateFormData("niche", e.target.value)}
            >
              <option value="">Choose your niche...</option>
              {niches.map((niche) => (
                <option key={niche} value={niche}>{niche}</option>
              ))}
            </FormField>

            <FormField
              label="Main Pain Point"
              component="textarea"
              value={formData.painPoint}
              onChange={(e) => updateFormData("painPoint", e.target.value)}
              placeholder="Describe the biggest frustration your audience faces..."
            />

            <FormField
              label="Preferred Format"
              component="select"
              value={formData.format}
              onChange={(e) => updateFormData("format", e.target.value)}
            >
              <option value="">Choose format...</option>
              {formats.map((format) => (
                <option key={format.value} value={format.value}>{format.label}</option>
              ))}
            </FormField>

            <Button 
              onClick={generateOffer}
              className="w-full"
              disabled={!formData.niche || !formData.painPoint || !formData.format}
            >
              <ApperIcon name="Wand2" size={16} className="mr-2" />
              Generate My Offer
            </Button>
          </div>
        </div>

        {generatedOffer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card bg-gradient-to-br from-surface via-purple-900/20 to-pink-900/20 border-accent/30"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <ApperIcon name="Sparkles" size={20} className="mr-2 text-accent" />
              Your Generated Offer
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-secondary mb-2">Offer Name</h4>
                <p className="text-white bg-background/50 p-3 rounded-lg">{generatedOffer.name}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-secondary mb-2">Transformation Promise</h4>
                <p className="text-white bg-background/50 p-3 rounded-lg">{generatedOffer.promise}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-secondary mb-2">Core Deliverable</h4>
                <p className="text-white bg-background/50 p-3 rounded-lg">{generatedOffer.deliverable}</p>
              </div>

              <div className="pt-4 border-t border-accent/20">
<Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={async () => {
                    const textToCopy = `${generatedOffer.name}\n\n${generatedOffer.promise}\n\n${generatedOffer.deliverable}`;
                    
                    try {
                      // Modern Clipboard API with permission check
                      if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(textToCopy);
                        toast.success("Offer copied to clipboard!");
                        return;
                      }
                      
                      // Fallback to legacy method
                      const textArea = document.createElement('textarea');
                      textArea.value = textToCopy;
                      textArea.style.position = 'fixed';
                      textArea.style.left = '-999999px';
                      textArea.style.top = '-999999px';
                      document.body.appendChild(textArea);
                      textArea.focus();
                      textArea.select();
                      
                      const successful = document.execCommand('copy');
                      document.body.removeChild(textArea);
                      
                      if (successful) {
                        toast.success("Offer copied to clipboard!");
                      } else {
                        throw new Error('Copy command failed');
                      }
                    } catch (error) {
                      console.error('Copy failed:', error);
                      
                      // Final fallback - show the text for manual copying
                      const textArea = document.createElement('textarea');
                      textArea.value = textToCopy;
                      textArea.style.position = 'fixed';
                      textArea.style.left = '50%';
                      textArea.style.top = '50%';
                      textArea.style.transform = 'translate(-50%, -50%)';
                      textArea.style.width = '80%';
                      textArea.style.height = '200px';
                      textArea.style.zIndex = '9999';
                      textArea.style.background = '#1E1B4B';
                      textArea.style.color = '#FFFFFF';
                      textArea.style.border = '2px solid #7C3AED';
                      textArea.style.borderRadius = '8px';
                      textArea.style.padding = '16px';
                      textArea.readOnly = true;
                      
                      document.body.appendChild(textArea);
                      textArea.focus();
                      textArea.select();
                      
                      toast.info("Please manually copy the selected text (Ctrl+C)", {
                        autoClose: 5000
                      });
                      
                      // Remove after 10 seconds
                      setTimeout(() => {
                        if (document.body.contains(textArea)) {
                          document.body.removeChild(textArea);
                        }
                      }, 10000);
                    }
                  }}
                >
                  <ApperIcon name="Copy" size={16} className="mr-2" />
                  Copy Offer Details
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default OfferGenerator;