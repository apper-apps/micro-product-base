import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-red-500/10 p-4 rounded-full mb-4">
        <ApperIcon name="AlertTriangle" size={32} className="text-red-400" />
      </div>
      <h3 className="text-lg font-semibold mb-2">The Forge Encountered an Issue</h3>
      <p className="text-muted mb-6 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <ApperIcon name="RefreshCw" size={16} className="mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;