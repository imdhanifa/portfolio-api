import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    introduction: {
      title: String,
      slogan: String,
      summary: String,
    },
    about: {
      title: String,
      slogan: String,
      summaries: [String],
    },
    projects: [
      {
        title: String,
        description: String,
        link: String,
      },
    ],
    skills: {
      programming: [String],
      backend: [String],
      frontend: [String],
      databases: [String],
      devOps_tools: [String],
      architecture: [String],
    },
    experience: [
      {
        role: String,
        organization: String,
        period: String,
        tasks: [String],
        latest: Boolean,
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        period: String,
        description: String,
        latest: Boolean,
      },
    ],
    contact: {
      location: String,
      email: String,
      phone: String,
      github: String,
      linkedin: String,
    },
    githubProfile: String,
    resume: String,
  },
  { collection: "portfolio" }
);

export default mongoose.model("Portfolio", portfolioSchema);
