import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import { toast } from "react-toastify";

const MVPChecklist = ({ currentOffer, user }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [checklist, setChecklist] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(new Set());

  useEffect(() => {
    if (currentOffer && user?.tier !== "free" && !checklist) {
      generateChecklist();
    }
  }, [currentOffer, user]);

  const generateChecklist = async () => {
    if (!currentOffer) {
      toast.error("Please generate an offer first");
      return;
    }

    setIsGenerating(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const tasks = generateTasks(currentOffer);
      setChecklist(tasks);
      toast.success("48-hour launch checklist generated!");
    } catch (error) {
      toast.error("Failed to generate checklist. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateTasks = (offer) => {
    const baseTasks = [
      {
        id: 1,
        phase: "Day 1 - Creation (Hours 1-8)",
        tasks: [
          { id: 1, task: "Create the main product content", timeEstimate: "3-4 hours", priority: "high" },
          { id: 2, task: "Design or source cover/thumbnail image", timeEstimate: "1 hour", priority: "medium" },
          { id: 3, task: "Write product description and benefits", timeEstimate: "1 hour", priority: "high" },
          { id: 4, task: "Set up payment processing (Stripe/PayPal)", timeEstimate: "2 hours", priority: "high" },
          { id: 5, task: "Create simple landing page", timeEstimate: "2-3 hours", priority: "high" }
        ]
      },
      {
        id: 2,
        phase: "Day 1 - Setup (Hours 9-16)",
        tasks: [
          { id: 6, task: "Test purchase and download process", timeEstimate: "30 mins", priority: "high" },
          { id: 7, task: "Create social media graphics", timeEstimate: "1-2 hours", priority: "medium" },
          { id: 8, task: "Write email sequence (3-5 emails)", timeEstimate: "2 hours", priority: "medium" },
          { id: 9, task: "Set up basic analytics tracking", timeEstimate: "30 mins", priority: "low" },
          { id: 10, task: "Prepare launch announcement", timeEstimate: "1 hour", priority: "high" }
        ]
      },
      {
        id: 3,
        phase: "Day 2 - Launch (Hours 17-24)",
        tasks: [
          { id: 11, task: "Send launch email to your list", timeEstimate: "15 mins", priority: "high" },
          { id: 12, task: "Post on all social media platforms", timeEstimate: "30 mins", priority: "high" },
          { id: 13, task: "Share in relevant communities/groups", timeEstimate: "1 hour", priority: "medium" },
          { id: 14, task: "Reach out to potential affiliate partners", timeEstimate: "1 hour", priority: "low" },
          { id: 15, task: "Monitor and respond to feedback", timeEstimate: "Ongoing", priority: "high" }
        ]
      },
      {
        id: 4,
        phase: "Day 2 - Optimization",
        tasks: [
          { id: 16, task: "A/B test pricing if needed", timeEstimate: "30 mins", priority: "low" },
          { id: 17, task: "Gather first customer testimonials", timeEstimate: "1 hour", priority: "medium" },
          { id: 18, task: "Create urgency/scarcity if appropriate", timeEstimate: "30 mins", priority: "low" },
          { id: 19, task: "Plan first upsell or bonus", timeEstimate: "1 hour", priority: "low" },
          { id: 20, task: "Celebrate your first sale! 🎉", timeEstimate: "Priceless", priority: "high" }
        ]
      }
    ];

    return baseTasks;
  };

  const toggleTask = (taskId) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
      toast.success("Task completed! 🎉");
    }
    setCompletedTasks(newCompleted);
  };

  const getProgressStats = () => {
    if (!checklist) return { completed: 0, total: 0, percentage: 0 };
    
    const total = checklist.reduce((sum, phase) => sum + phase.tasks.length, 0);
    const completed = completedTasks.size;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { completed, total, percentage };
  };

  if (user?.tier === "free") {
    return (
      <div className="text-center py-12">
        <div className="bg-secondary/10 p-6 rounded-full inline-block mb-4">
          <ApperIcon name="Crown" size={48} className="text-secondary" />
        </div>
        <h3 className="text-xl font-semibold mb-3">Upgrade to Access MVP Checklist</h3>
        <p className="text-muted mb-6">Get your 48-hour launch plan with premium features</p>
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
          <ApperIcon name="CheckSquare" size={48} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-3">No Offer to Create Checklist For</h3>
        <p className="text-muted">Generate an offer first to get your MVP checklist</p>
      </div>
    );
  }

  if (isGenerating) {
    return <Loading text="Creating your 48-hour launch plan..." />;
  }

  const stats = getProgressStats();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold mb-3">48-Hour MVP Launch Checklist</h2>
        <p className="text-muted">Your step-by-step roadmap to launch success</p>
      </div>

      {checklist && (
        <>
          {/* Progress Overview */}
          <div className="card bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Launch Progress</h3>
              <span className="text-3xl font-bold text-secondary">{stats.percentage}%</span>
            </div>
            
            <div className="w-full bg-background/50 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-secondary to-amber-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${stats.percentage}%` }}
              />
            </div>
            
            <div className="flex justify-between text-sm text-muted">
              <span>{stats.completed} of {stats.total} tasks completed</span>
              <span>{stats.total - stats.completed} remaining</span>
            </div>
          </div>

          {/* Checklist Phases */}
          <div className="space-y-6">
            {checklist.map((phase, phaseIndex) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: phaseIndex * 0.1 }}
                className="card"
              >
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <div className="bg-primary p-2 rounded-lg mr-3">
                    <ApperIcon name="Clock" size={20} className="text-white" />
                  </div>
                  {phase.phase}
                </h3>

                <div className="space-y-3">
                  {phase.tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                        completedTasks.has(task.id)
                          ? "border-secondary bg-secondary/10"
                          : "border-surface bg-surface/30 hover:border-primary/50"
                      }`}
                      onClick={() => toggleTask(task.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                          completedTasks.has(task.id)
                            ? "border-secondary bg-secondary"
                            : "border-muted"
                        }`}>
                          {completedTasks.has(task.id) && (
                            <ApperIcon name="Check" size={12} className="text-black" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className={`font-medium ${
                              completedTasks.has(task.id) ? "line-through text-muted" : ""
                            }`}>
                              {task.task}
                            </p>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                task.priority === "high" ? "bg-red-500/20 text-red-400" :
                                task.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                                "bg-green-500/20 text-green-400"
                              }`}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted">Est. time: {task.timeEstimate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Export Actions */}
          <div className="text-center">
            <Button 
              variant="secondary"
              onClick={() => {
                const checklistText = checklist.map(phase => {
                  const phaseTasks = phase.tasks.map(task => 
                    `${completedTasks.has(task.id) ? '✅' : '⬜'} ${task.task} (${task.timeEstimate})`
                  ).join('\n');
                  return `${phase.phase}\n${phaseTasks}`;
                }).join('\n\n');

                navigator.clipboard.writeText(`48-HOUR MVP LAUNCH CHECKLIST\n\n${checklistText}`);
                toast.success("Checklist copied to clipboard!");
              }}
            >
              <ApperIcon name="Download" size={16} className="mr-2" />
              Export Checklist
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default MVPChecklist;