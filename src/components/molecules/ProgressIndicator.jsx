import React from "react";
import { cn } from "@/utils/cn";

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center text-sm",
              index < currentStep ? "text-secondary" : 
              index === currentStep ? "text-white" : "text-muted"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mr-2",
                index < currentStep ? "bg-secondary text-black" :
                index === currentStep ? "bg-primary text-white" :
                "bg-surface border border-muted text-muted"
              )}
            >
              {index + 1}
            </div>
            <span className="hidden sm:inline">{step}</span>
          </div>
        ))}
      </div>
      <div className="w-full bg-surface rounded-full h-2">
        <div
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;