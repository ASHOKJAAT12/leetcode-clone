import { Request, Response, NextFunction } from "express";
import Language from "../models/Language";
import Domain from "../models/Domain";
import Tag from "../models/Tag";
import Category from "../models/Category";

export const getLanguages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const languages = await Language.find({ enabled: true }).sort({ displayOrder: 1 });
        res.json({ success: true, data: languages });
    } catch (error) {
        next(error);
    }
};

export const getDomains = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const domains = await Domain.find({ enabled: true }).sort({ name: 1 });
        res.json({ success: true, data: domains });
    } catch (error) {
        next(error);
    }
};

export const getTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tags = await Tag.find({ enabled: true }).sort({ name: 1 });
        res.json({ success: true, data: tags });
    } catch (error) {
        next(error);
    }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.find({ enabled: true }).sort({ name: 1 });
        res.json({ success: true, data: categories });
    } catch (error) {
        next(error);
    }
};
