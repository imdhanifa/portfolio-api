import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  viewedClients: { type: [String], default: [] },
  likedClients: { type: [String], default: [] },
});

export default mongoose.model("Portfolio", portfolioSchema);
