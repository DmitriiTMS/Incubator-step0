import { Router } from "express";
import { createVideo, deleteVideo, getAllVideos, getVideoById, updateVideo } from "../controllers/videos.controller";

export const videoRouter = Router();

videoRouter.get('/', getAllVideos)
videoRouter.post('/', createVideo)
videoRouter.get('/:id', getVideoById)
videoRouter.put('/:id', updateVideo)
videoRouter.delete('/:id', deleteVideo)



