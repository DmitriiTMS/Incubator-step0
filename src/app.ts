import express from 'express'
import { SETTINGS } from './settings/settings'
import { videoRouter } from './router/video-router'
import { testRouter } from './router/test-router'

export const app = express()
app.use(express.json())

app.use(SETTINGS.PATH.VIDEOS, videoRouter)
app.use(SETTINGS.PATH.TEST, testRouter)

