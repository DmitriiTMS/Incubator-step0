import { Request, Response } from "express";
import { SETTINGS } from "../settings/settings";
import { DB } from "../db/db";

export const getAllVideos =  (req: Request, res: Response) => {
    res.status(SETTINGS.STATUS.OK).json(DB.videos)
}

export const createVideo = (req: Request, res: Response) => {
    const { title, author, availableResolutions } = req.body;
    const newVideo = {
        id: Date.now() + Math.random(),
        title,
        author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: [...availableResolutions]
    }
    DB.videos.push(newVideo)
    res.status(SETTINGS.STATUS.GREATED).json(newVideo)
}

export const getVideoById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const video = DB.videos.find((video) => video.id === id);
    if (video) {
        res.status(SETTINGS.STATUS.OK).json(video);
        return
    }
    res.status(SETTINGS.STATUS.NOT_FOUND).json({ message: "Video not found" });
}

export const updateVideo = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
    const video = DB.videos.find((video) => video.id === id);

    if (video) {
        video.title = title;
        video.author = author;
        video.canBeDownloaded = canBeDownloaded;
        video.minAgeRestriction = minAgeRestriction;
        video.publicationDate = publicationDate;
        video.availableResolutions = [...availableResolutions];
        res.status(SETTINGS.STATUS.NO_CONTENT).json({});
        return;
    }
    res.status(SETTINGS.STATUS.BAD_REQUEST).json({ message: "Video BAD_REQUEST" });
}

export const deleteVideo = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const findVideo = DB.videos.find((video) => video.id === id);
    if (findVideo) {
        DB.videos = DB.videos.filter((video) => video.id !== id);
        res.status(SETTINGS.STATUS.NO_CONTENT).json({});
        return
    } 

    res.status(SETTINGS.STATUS.NOT_FOUND).json({ message: "Video NOT_FOUN" });
}