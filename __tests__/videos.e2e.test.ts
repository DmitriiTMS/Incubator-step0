import request from 'supertest';
import { app } from '../src/app';
import { SETTINGS } from '../src/settings/settings';
import { DBVideoQuality } from '../src/db/db';

// {
//     id: Date.now() + Math.random(),
//     title: "video 1",
//     author: "author 1",
//     canBeDownloaded: true,
//     minAgeRestriction: null,
//     createdAt: new Date().toISOString(),
//     publicationDate: new Date().toISOString(),
//     availableResolutions: [
//         DBVideoQuality.P144
//     ]
// },

describe('/videos', () => {

    beforeAll(async () => {
        await request(app).delete(SETTINGS.PATH.TEST)
    })

    it('проверка получение всех видео', async () => {
        await request(app)
            .get(SETTINGS.PATH.VIDEOS)
            .expect(SETTINGS.STATUS.OK, [])
    })

    it('проверка получение одного видео', async () => {
        await request(app)
            .get(`${SETTINGS.PATH.VIDEOS}/1`)
            .expect(SETTINGS.STATUS.NOT_FOUND)
    })

    it('проверка создания видео если title пустая строка', async () => {
        await request(app)
            .post(SETTINGS.PATH.VIDEOS)
            .send({
                title: "",
                author: "author 1",
                availableResolutions: ["P2160"]
            })
            .expect(SETTINGS.STATUS.BAD_REQUEST, {
                errorsMessages: [{
                    message: "Title не может быть пустым",
                    field: "title",
                }]
            })
        await request(app)
            .get(SETTINGS.PATH.VIDEOS)
            .expect(SETTINGS.STATUS.OK, [])
    })

    it('проверка создания видео если title НЕ типа данных string', async () => {
        await request(app)
            .post(SETTINGS.PATH.VIDEOS)
            .send({
                title: 1,
                author: "author 1",
                availableResolutions: ["P2160"]
            })
            .expect(SETTINGS.STATUS.BAD_REQUEST, {
                errorsMessages: [{
                    message: "Title должен быть строкой",
                    field: "title",
                }]
            })

        await request(app)
            .get(SETTINGS.PATH.VIDEOS)
            .expect(SETTINGS.STATUS.OK, [])
    })

    it('проверка создания видео если title больше 40 смиволов', async () => {
        let title40 = ""
        for (let i = 0; i < 41; i++) {
            title40 += "1"
        }

        await request(app)
            .post(SETTINGS.PATH.VIDEOS)
            .send({
                title: title40,
                author: "author 1",
                availableResolutions: ["P2160"]
            })
            .expect(SETTINGS.STATUS.BAD_REQUEST, {
                errorsMessages: [{
                    message: "Title не может быть длиннее 40 символов",
                    field: "title",
                }]
            })

        await request(app)
            .get(SETTINGS.PATH.VIDEOS)
            .expect(SETTINGS.STATUS.OK, [])
    })

    let createdVideo: any = null;
    let createdAtDate: any = null;
    let publicationDateDate: any = null;

    it('проверка создания видео', async () => {
        const response = await request(app)
            .post(SETTINGS.PATH.VIDEOS)
            .send({
                title: "title 1",
                author: "author 1",
                availableResolutions: ["P2160"]
            })
            .expect(SETTINGS.STATUS.GREATED);

        createdVideo = response.body;

        expect(createdVideo.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
        expect(createdVideo.publicationDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);

        createdAtDate = new Date(createdVideo.createdAt);
        publicationDateDate = new Date(createdVideo.publicationDate);
        expect(publicationDateDate.getTime()).toBeGreaterThan(createdAtDate.getTime());


        expect(createdVideo).toEqual({
            id: expect.any(Number),
            title: "title 1",
            author: "author 1",
            canBeDownloaded: expect.any(Boolean),
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: [
                DBVideoQuality.P2160
            ]
        });

        await request(app)
            .get(SETTINGS.PATH.VIDEOS)
            .expect(SETTINGS.STATUS.OK, [createdVideo])
    });

    // it('проверка обновления видео', async () => {
    //     console.log( createdVideo.createdAt);
    //     // 2025-03-01T14:27:51.141Z
        
    //     await request(app)
    //         .put(SETTINGS.PATH.VIDEOS)
    //         .send({
    //             title: "title 1111111111",
    //             author: "string 11111111",
    //             availableResolutions: [
    //                 "P144"
    //             ],
    //             canBeDownloaded: true,
    //             minAgeRestriction: 12,
    //             createdAt: createdAtDate,
    //             publicationDate: publicationDateDate
    //         })
    //         .expect(SETTINGS.STATUS.NO_CONTENT);



    //     expect(createdVideo).toEqual({
    //         id: expect.any(Number),
    //         title: "title 1111111111",
    //         author: "string 11111111",
    //         canBeDownloaded: expect.any(Boolean),
    //         minAgeRestriction: 12,
    //         createdAt: expect.any(String),
    //         publicationDate: expect.any(String),
    //         availableResolutions: [
    //             DBVideoQuality.P144
    //         ]
    //     });

    //     // await request(app)
    //     //     .get(`${SETTINGS.PATH.VIDEOS}/${createdVideo.id}`)
    //     //     .expect(SETTINGS.STATUS.OK)
    // });

    it('проверка удаления одного видео', async () => {
        await request(app)
            .delete(`${SETTINGS.PATH.VIDEOS}/${createdVideo.id}`)
            .expect(SETTINGS.STATUS.NO_CONTENT)
    })


})