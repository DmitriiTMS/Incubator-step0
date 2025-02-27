import express, { Request, Response } from 'express'
import { SETTINGS } from './settings'
import { DB } from './db'


export const app = express()
app.use(express.json())


app.get(SETTINGS.PATH.VIDEOS, (req: Request, res: Response) => {
    res.status(SETTINGS.STATUS.OK).json(DB.videos)
})

app.post(SETTINGS.PATH.VIDEOS, (req: Request, res: Response) => {
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
})

app.get(`${SETTINGS.PATH.VIDEOS}/:id`, (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const video = DB.videos.find((video) => video.id === id);
    if (video) {
        res.status(SETTINGS.STATUS.OK).json(video);
        return
    }
    res.status(SETTINGS.STATUS.NOT_FOUND).json({ message: "Video not found" });
})

app.put(`${SETTINGS.PATH.VIDEOS}/:id`, (req: Request, res: Response) => {
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

})

app.delete(`${SETTINGS.PATH.VIDEOS}/:id`, (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const findVideo = DB.videos.find((video) => video.id === id);
    if (findVideo) {
        DB.videos = DB.videos.filter((video) => video.id !== id);
        res.status(SETTINGS.STATUS.NO_CONTENT).json({});
        return
    } 

    res.status(SETTINGS.STATUS.NOT_FOUND).json({ message: "Video NOT_FOUN" });
})

