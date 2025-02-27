import { DBVideoQuality } from "../db/db";

export type ErrorMessage = {
    message: string;
    field: string;
};

export const validateTitle = (title: string): ErrorMessage[] => {
    const errorsMessages: ErrorMessage[] = [];

    if (typeof title !== "string") {
        errorsMessages.push({
            message: "Title должен быть строкой",
            field: "title",
        });
    } else if (title.trim().length === 0) {
        errorsMessages.push({
            message: "Title не может быть пустым",
            field: "title",
        });
    } else if (title.length > 40) {
        errorsMessages.push({
            message: "Title не может быть длиннее 40 символов",
            field: "title",
        });
    }

    return errorsMessages;

};

export const validateAuthor = (author: string): ErrorMessage[] => {
    const errorsMessages: ErrorMessage[] = [];

    if (typeof author !== "string") {
        errorsMessages.push({
            message: "Author должен быть строкой",
            field: "author",
        });
    } else if (author.trim().length === 0) {
        errorsMessages.push({
            message: "Author не может быть пустым",
            field: "author",
        });
    } else if (author.length > 20) {
        errorsMessages.push({
            message: "Author не может быть длиннее 20 символов",
            field: "author",
        });
    }

    return errorsMessages;

};

export const validateVideoQuality = (qualities: string[]): ErrorMessage[] => {
    const errorsMessages: ErrorMessage[] = [];
    if (!Array.isArray(qualities)) {
        errorsMessages.push({
            message: "AvailableResolutions должен быть массивом",
            field: "title",
        });
    } else if (Array.isArray(qualities) && qualities.length === 0) {
        errorsMessages.push({
            message: "AvailableResolutions обязательно к заполнению",
            field: "title",
        });
    } else if (Array.isArray(qualities)) {
        const validQualities = Object.values(DBVideoQuality);
        for (let quality of qualities) {
            if (!validQualities.includes(quality as DBVideoQuality)) {
                errorsMessages.push({
                    message: 'Недопустимое значение в массиве',
                    field: "videoQuality",
                });
                break
            }
        }
    }

    return errorsMessages;
}
