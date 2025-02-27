import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ["stock", "gold"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add index for faster queries
assetSchema.index({ userId: 1, type: 1 });

// Update the updatedAt timestamp before saving
assetSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Calculate current value
assetSchema.virtual("currentValue").get(function () {
  return this.quantity * this.value;
});

// Calculate profit/loss
assetSchema.virtual("profitLoss").get(function () {
  return (this.value - this.purchasePrice) * this.quantity;
});

// Calculate profit/loss percentage
assetSchema.virtual("profitLossPercentage").get(function () {
  return ((this.value - this.purchasePrice) / this.purchasePrice) * 100;
});

export const Asset =
  mongoose.models.Asset || mongoose.model("Asset", assetSchema);

// Type for TypeScript
export interface IAsset extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  value: number;
  quantity: number;
  purchasePrice: number;
  purchaseDate: Date;
  type: "stock" | "gold";
  createdAt: Date;
  updatedAt: Date;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
}
