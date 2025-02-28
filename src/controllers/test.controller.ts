import { Request, Response } from "express";
import { SETTINGS } from "../settings/settings";
import { DB } from "../db/db";

export const clearDB = (req: Request, res: Response) => {
    DB.videos = []
    res.status(SETTINGS.STATUS.NO_CONTENT).json()
};
