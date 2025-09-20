import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    introduction: {
      title: String,
      slogan: String,
      summary: String,
    },
    about: {
      name: String,
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
      Programming: [String],
      Backend: [String],
      Frontend: [String],
      Databases: [String],
      "DevOps & Tools": [String],
      Architecture: [String],
    },
    experience: [
      {
        role: String,
        company: String,
        period: String,
        tasks: [String],
        latest: Boolean,
      },
    ],
    education: [
      {
        degree: String,
        school: String,
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
    resumebase64: String,
  },
  { collection: "portfolio" }
);

export default mongoose.model("Portfolio", portfolioSchema);
