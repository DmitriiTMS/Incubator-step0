enum DBVideoQuality {
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160 = "P2160"
}

export type DBVideo = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: DBVideoQuality[]
}

type DBType = {
    videos: DBVideo[]
}

export const DB: DBType = {
    videos: [
        {
            id: Date.now() + Math.random(),
            title: "video 1",
            author: "author 1",
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: [
                DBVideoQuality.P144
            ]
        },
        {
            id: Date.now() + Math.random(),
            title: "video 2",
            author: "author 2",
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: [
                DBVideoQuality.P144, DBVideoQuality.P1440, DBVideoQuality.P2160
            ]
        },
    ],
}
