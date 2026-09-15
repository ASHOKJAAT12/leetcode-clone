import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./config/database";

import User from "./models/User";
import Language from "./models/Language";
import Domain from "./models/Domain";
import Tag from "./models/Tag";
import Category from "./models/Category";

dotenv.config();

const users = [
    { _id: new mongoose.Types.ObjectId("60c72b2f9b1d8b001c8e4b7a"), name: "Demo User", username: "demouser", email: "demo@realcode.example.com", passwordHash: "hashedpassword", role: "ADMIN" }
];

const languages = [
    { name: "Python", slug: "python", monacoLanguage: "python", displayOrder: 1 },
    { name: "C++", slug: "cpp", monacoLanguage: "cpp", displayOrder: 2 },
    { name: "JavaScript", slug: "javascript", monacoLanguage: "javascript", displayOrder: 3 },
    { name: "Java", slug: "java", monacoLanguage: "java", displayOrder: 4 },
    { name: "C", slug: "c", monacoLanguage: "c", displayOrder: 5 },
    { name: "C#", slug: "csharp", monacoLanguage: "csharp", displayOrder: 6 },
    { name: "Go", slug: "go", monacoLanguage: "go", displayOrder: 7 }
];

const domains = [
    { name: "E-Commerce", slug: "ecommerce", description: "Customer orders, inventory, discounts.", icon: "shopping-bag", commonSkills: ["hash-maps", "sorting", "database", "api-design"] },
    { name: "Banking & Finance", slug: "banking", description: "Ledgers, transactions, rate limits.", icon: "building", commonSkills: ["database", "hash-maps", "optimization", "backend"] },
    { name: "Healthcare", slug: "healthcare", description: "Patient queues, scheduling, medical data.", icon: "heart", commonSkills: ["queue", "sorting", "data-processing"] },
    { name: "Smart City", slug: "smart-city", description: "Traffic, parking, civic resources.", icon: "map", commonSkills: ["graph", "arrays", "optimization"] },
    { name: "Social Media", slug: "social-media", description: "News feeds, followers, graphing.", icon: "users", commonSkills: ["graph", "tree", "caching", "system-design"] },
    { name: "Logistics & Delivery", slug: "logistics", description: "Routing, inventory tracking, ETAs.", icon: "truck", commonSkills: ["graph", "optimization", "hash-maps"] }
];

const importData = async () => {
    try {
        await connectDB();

        console.log("Seeding started. Overwriting master data tables (Languages, Domains, Tags)...");

        // Idempotent sync for Users
        for (const u of users) {
            await User.updateOne({ _id: u._id }, { $set: u }, { upsert: true });
        }

        // Idempotent sync for Languages
        for (const l of languages) {
            await Language.updateOne({ slug: l.slug }, { $set: l }, { upsert: true });
        }

        // Idempotent sync for Domains
        for (const d of domains) {
            await Domain.updateOne({ slug: d.slug }, { $set: d }, { upsert: true });
        }

        console.log("Data Seeded Successfully.");
        process.exit();
    } catch (error) {
        console.error(`Error with data import: ${error}`);
        process.exit(1);
    }
};

importData();
