import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TabButton = ({ icon, label, isActive, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "tab-button flex items-center space-x-2 text-sm",
        isActive && "tab-active",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <ApperIcon name={icon} size={16} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export default TabButton;