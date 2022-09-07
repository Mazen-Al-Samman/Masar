import {IContext} from "../components/AppContext";

export const isClientSide = () => {
    return typeof window !== "undefined";
}

export const generateSlug = (text: string, maxNumOfLetters = 2) => {
    const matches = text?.match(/\b(\w)/g);
    return matches?.join('').substring(0, 2).toUpperCase();
}

export const emptyContext = (context: IContext) => {
    return Object.keys(context.data).length === 0;
}

export const getObjectKeyArray = (array: any[], key: string) => {
    return array?.map(value => {
        if (isNaN(value[key])) return value[key];
        return Number(value[key]);
    });
}