import { Request, Response } from "express";
import { SETTINGS } from "../settings/settings";
import { DB } from "../db/db";
import { validateAuthor, validateMinAgeRestriction,
        validatePublicationDate, validateTitle,
        validateVideoQuality, validationCanBeDownloaded } from "../validation/validation";

export const getAllVideos = (req: Request, res: Response) => {
    res.status(SETTINGS.STATUS.OK).json(DB.videos);
};

export const createVideo = (req: Request, res: Response) => {
    const { title, author, availableResolutions } = req.body;

    const errors = [];
    const checkTitle = validateTitle(title);
    const checkAuthor = validateAuthor(author);
    const checkValidateVideoQuality = validateVideoQuality(availableResolutions);

    if (checkTitle.length > 0) errors.push(...checkTitle);
    if (checkAuthor.length > 0) errors.push(...checkAuthor);
    if (checkValidateVideoQuality.length > 0) errors.push(...checkValidateVideoQuality);

    if (errors.length > 0) {
        res.status(SETTINGS.STATUS.BAD_REQUEST).json(errors);
        return;
    }

    let createdAt = new Date().toISOString();
    let createdDate = new Date(createdAt);
    createdDate.setDate(createdDate.getDate() + 1);
    let publicationDate = createdDate.toISOString();

    const newVideo = {
        id: Date.now() + Math.random(),
        title,
        author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt,
        publicationDate,
        availableResolutions: [...availableResolutions],
    };
    DB.videos.push(newVideo);
    res.status(SETTINGS.STATUS.GREATED).json(newVideo);
};

export const getVideoById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const video = DB.videos.find((video) => video.id === id);
    if (video) {
        res.status(SETTINGS.STATUS.OK).json(video);
        return;
    }
    res.status(SETTINGS.STATUS.NOT_FOUND).json();
};

export const updateVideo = (req: Request, res: Response) => {

    const id = Number(req.params.id);
    const video = DB.videos.find((video) => video.id === id);

    if (!video) {
        res.status(SETTINGS.STATUS.NOT_FOUND).json();
        return;
    }

    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, createdAt, publicationDate } = req.body;

    const errors = [];
    const checkTitle = validateTitle(title);
    const checkAuthor = validateAuthor(author);
    const checkValidateVideoQuality = validateVideoQuality(availableResolutions);
    const checkCanBeDownloaded = validationCanBeDownloaded(canBeDownloaded);
    const checkMinAgeRestriction = validateMinAgeRestriction(minAgeRestriction);
    const checkPublicationDate = validatePublicationDate(publicationDate);

    if (checkTitle.length > 0) errors.push(...checkTitle);
    if (checkAuthor.length > 0) errors.push(...checkAuthor);
    if (checkValidateVideoQuality.length > 0) errors.push(...checkValidateVideoQuality);
    if (checkCanBeDownloaded.length > 0) errors.push(...checkCanBeDownloaded);
    if (checkMinAgeRestriction.length > 0) errors.push(...checkMinAgeRestriction);
    if (checkPublicationDate.length > 0) errors.push(...checkPublicationDate);


    if (errors.length > 0) {
        res.status(SETTINGS.STATUS.BAD_REQUEST).json(errors);
        return;
    }

    video.title = title;
    video.author = author;
    video.canBeDownloaded = canBeDownloaded;
    video.minAgeRestriction = minAgeRestriction;
    video.createdAt = createdAt;
    video.publicationDate = publicationDate;
    video.availableResolutions = [...availableResolutions];
    res.status(SETTINGS.STATUS.NO_CONTENT).json();

};

export const deleteVideo = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const findVideo = DB.videos.find((video) => video.id === id);
    if (findVideo) {
        DB.videos = DB.videos.filter((video) => video.id !== id);
        res.status(SETTINGS.STATUS.NO_CONTENT).json()
        return;
    }

    res.status(SETTINGS.STATUS.NOT_FOUND).json()

};
