import mongoose from "mongoose";

const LanguageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    monacoLanguage: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
    description: { type: String }
}, { timestamps: true });

export default mongoose.models.Language || mongoose.model("Language", LanguageSchema);
