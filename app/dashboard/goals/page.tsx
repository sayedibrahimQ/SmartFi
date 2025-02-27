"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DashboardShell } from "@/components/dashboard-shell";
import ChatWindow from "@/app/components/ChatWindow";

interface Goal {
  id: number;
  text: string;
  completed: boolean;
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState("");

  const addGoal = () => {
    if (newGoal.trim() !== "") {
      setGoals([...goals, { id: Date.now(), text: newGoal, completed: false }]);
      setNewGoal("");
    }
  };

  const toggleGoal = (id: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return (
    <DashboardShell>
      <div className="w-full max-w-5xl mx-auto px-6">
        <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl my-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-4xl font-black mb-8 flex items-center justify-center">
            <span className="bg-[#CBFF00] px-6 py-2 rounded-xl inline-block transform -rotate-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              MY GOALS ✨
            </span>
          </h2>

          <div className="flex gap-4 mb-8">
            <Input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="What's your next goal?"
              className="flex-grow mr-2 border-2 border-black rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-[#CBFF00] focus:border-black outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              onKeyDown={(e) => e.key === 'Enter' && addGoal()}
            />
            <Button
              onClick={addGoal}
              className="bg-black text-[#CBFF00] hover:bg-[#CBFF00] hover:text-black border-2 border-black rounded-xl font-bold transition-all duration-200 px-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <Plus className="mr-2 h-5 w-5" /> Add Goal
            </Button>
          </div>

          <div className="space-y-4">
            {goals.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">No goals yet! Add your first goal above 🎯</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {goals.map((goal) => (
                  <li
                    key={goal.id}
                    className="group flex items-center justify-between p-4 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]"
                  >
                    <div className="flex items-center flex-grow">
                      <Checkbox
                        checked={goal.completed}
                        onCheckedChange={() => toggleGoal(goal.id)}
                        className="border-2 border-black rounded-lg w-6 h-6 mr-4 transition-all duration-200 
                          data-[state=checked]:bg-[#CBFF00] data-[state=checked]:border-black"
                      />
                      <span 
                        className={`text-lg ${
                          goal.completed 
                            ? "line-through text-gray-400 transition-all duration-200" 
                            : "text-black"
                        }`}
                      >
                        {goal.text}
                      </span>
                    </div>
                    <Button
                      onClick={() => deleteGoal(goal.id)}
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg p-2 transition-all duration-200 ml-2"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <ChatWindow />
      </div>
    </DashboardShell>
  );
}
