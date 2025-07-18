import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No Products Yet", 
  description = "Your forge awaits. Create your first micro-product to begin your journey.",
  actionLabel = "Start Creating",
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-primary/10 p-6 rounded-full mb-6">
        <ApperIcon name="Sparkles" size={48} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted mb-8 max-w-md">{description}</p>
      {onAction && (
        <Button onClick={onAction}>
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;