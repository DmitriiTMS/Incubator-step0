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
            field: "availableResolutions",
        });
    } else if (Array.isArray(qualities) && qualities.length === 0) {
        errorsMessages.push({
            message: "AvailableResolutions обязательно к заполнению",
            field: "availableResolutions",
        });
    } else if (Array.isArray(qualities)) {
        const validQualities = Object.values(DBVideoQuality);
        for (let quality of qualities) {
            if (!validQualities.includes(quality as DBVideoQuality)) {
                errorsMessages.push({
                    message: 'Недопустимое значение в массиве',
                    field: "availableResolutions",
                });
                break
            }
        }
    }

    return errorsMessages;
}

export const validationCanBeDownloaded = (canBeDownloaded: unknown): ErrorMessage[] => {
    const errorsMessages: ErrorMessage[] = [];

    if (canBeDownloaded === '') {
        errorsMessages.push({
            message: "CanBeDownloaded не может быть пустым",
            field: "canBeDownloaded",
        });
    } else if (typeof canBeDownloaded !== "boolean") {
        errorsMessages.push({
            message: "CanBeDownloaded должен быть true|false",
            field: "canBeDownloaded",
        });
    }

    return errorsMessages;
}

export const validateMinAgeRestriction = (minAgeRestriction: number | null): ErrorMessage[] => {
    const errorsMessages: ErrorMessage[] = [];

    if (minAgeRestriction !== null) {
        if (typeof minAgeRestriction !== "number" || !Number.isInteger(minAgeRestriction)) {
            errorsMessages.push({
                message: "minAgeRestriction должен быть не пустым и целым числом",
                field: "minAgeRestriction",
            });
        } else if (minAgeRestriction < 1 || minAgeRestriction > 18) {
            errorsMessages.push({
                message: "MinAgeRestriction должен быть в диапазоне от 1 до 18",
                field: "minAgeRestriction",
            });
        }
    }

    return errorsMessages;
}

export const validatePublicationDate = (publicationDate: string): ErrorMessage[] => {
    const errorsMessages: ErrorMessage[] = [];

    if (!publicationDate) {
        errorsMessages.push({
            message: "PublicationDate обязательно для заполнения",
            field: "publicationDate",
        });
    } else if (isNaN(Date.parse(publicationDate))) {
        errorsMessages.push({
            message: "publicationDate должен быть в формате ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)",
            field: "publicationDate",
        });
    }

    return errorsMessages;
};
