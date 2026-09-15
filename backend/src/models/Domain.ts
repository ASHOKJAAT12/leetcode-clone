import mongoose from "mongoose";

const DomainSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    icon: { type: String },
    enabled: { type: Boolean, default: true },
    commonSkills: [{ type: String }],
    commonScenarios: [{ type: String }]
}, { timestamps: true });

export default mongoose.models.Domain || mongoose.model("Domain", DomainSchema);
