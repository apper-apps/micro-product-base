import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import ProgressIndicator from "@/components/molecules/ProgressIndicator";
import ApperIcon from "@/components/ApperIcon";

const OnboardingWizard = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    niche: "",
    painPoint: "",
    format: ""
  });

  const steps = ["Pick Niche", "Pain Point", "Format"];

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
    { value: "pdf", label: "PDF Guide", icon: "FileText", description: "Step-by-step written guide" },
    { value: "checklist", label: "Checklist", icon: "CheckSquare", description: "Actionable task list" },
    { value: "template", label: "Template", icon: "Layout", description: "Fill-in-the-blank framework" },
    { value: "audio", label: "Audio Course", icon: "Headphones", description: "Recorded lessons" },
    { value: "video", label: "Video Series", icon: "Video", description: "Visual tutorials" },
    { value: "worksheet", label: "Worksheet", icon: "Edit", description: "Interactive exercises" }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return formData.niche.length > 0;
      case 1: return formData.painPoint.length > 0;
      case 2: return formData.format.length > 0;
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold mb-2">Choose Your Niche</h2>
              <p className="text-muted">Which market do you want to serve?</p>
            </div>
            
            <FormField
              label="Select Your Niche"
              component="select"
              value={formData.niche}
              onChange={(e) => updateFormData("niche", e.target.value)}
            >
              <option value="">Choose a niche...</option>
              {niches.map((niche) => (
                <option key={niche} value={niche}>{niche}</option>
              ))}
            </FormField>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold mb-2">Identify the Pain Point</h2>
              <p className="text-muted">What's the biggest frustration your audience faces?</p>
            </div>
            
            <FormField
              label="Main Pain Point"
              component="textarea"
              value={formData.painPoint}
              onChange={(e) => updateFormData("painPoint", e.target.value)}
              placeholder="e.g., Can't find time to exercise with a busy schedule..."
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold mb-2">Choose Your Format</h2>
              <p className="text-muted">How do you want to deliver your solution?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => updateFormData("format", format.value)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    formData.format === format.value
                      ? "border-primary bg-primary/10 shadow-glow"
                      : "border-primary/20 bg-surface/50 hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      formData.format === format.value ? "bg-primary text-white" : "bg-primary/20 text-primary"
                    }`}>
                      <ApperIcon name={format.icon} size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{format.label}</h3>
                      <p className="text-sm text-muted">{format.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-background via-purple-900/10 to-pink-900/10 flex items-center justify-center p-4"
    >
      <div className="max-w-2xl w-full">
        <div className="card mb-8">
          <ProgressIndicator 
            currentStep={currentStep}
            totalSteps={steps.length}
            steps={steps}
          />
        </div>

        <div className="card">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-8">
            <div className="flex space-x-3">
              {currentStep > 0 && (
                <Button variant="outline" onClick={handleBack}>
                  <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
                  Back
                </Button>
              )}
              <Button variant="ghost" onClick={onSkip}>
                Skip Setup
              </Button>
            </div>

            <Button 
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <ApperIcon name="Sparkles" size={16} className="mr-2" />
                  Enter the Forge
                </>
              ) : (
                <>
                  Next
                  <ApperIcon name="ArrowRight" size={16} className="ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OnboardingWizard;