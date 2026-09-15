import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String }, // e.g., 'skill', 'topic'
    enabled: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Tag || mongoose.model("Tag", TagSchema);
