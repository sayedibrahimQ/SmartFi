import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String },
  age: { type: String },
  occupation: { type: String },
  phone: { type: String },
  monthlyIncome: { type: String },
  monthlyExpenses: { type: String },
  existingSavings: { type: String },
  monthlyInvestmentCapacity: { type: String },
  primaryGoal: { type: String },
  riskTolerance: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
