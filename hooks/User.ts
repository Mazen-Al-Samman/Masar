import Cookies from 'universal-cookie';

const cookies = new Cookies();
const encryptConfig = require('object-encrypter');
const engine = encryptConfig('batman');

export interface IUserObject {
    id: string | null;
    auth_key: string;
    company: string | null;
    company_id: string | null;
    department: string | null;
    department_id: string | null;
    email: string | null;
    phone_number: string | null;
    position: string | null;
}

export const login = (userData: IUserObject) => {
    try {
        cookies.set('user', hashUserObject(userData));
        return true;
    } catch (error) {
        console.log("LOGIN ERROR", error);
        return false;
    }
}

export const hashUserObject = (userData: IUserObject) => {
    return engine.encrypt(userData);
}

export const getUser = () => {
    const userHash = cookies.get('user');
    if (!userHash) return false;
    return <IUserObject>engine.decrypt(userHash);
}

export const isLoggedIn = () => {
    const user = getUser();
    return user && user.auth_key;
}

export const getToken = () => {
    const user = getUser();
    return user ? user.auth_key : null;
}

export const getTokenFromObject = (userHash: IUserObject) => {
    if (!userHash) return false;
    const userObject = <IUserObject>engine.decrypt(userHash);
    return userObject.auth_key;
}

export const getUserFromObject = (userHash: IUserObject) => {
    if (!userHash) return null;
    return <IUserObject>engine.decrypt(userHash);
}

export const getUserObjectViaContext = (context: any) => {
    const {user} = context.req.cookies;
    return getUserFromObject(user);
}

export const getUserAttribute = (attribute: "id" | "auth_key" | "company" | "company_id" | "department" | "department_id" | "email" | "phone_number" | "position", defaultValue: string | number) => {
    const user = getUser();
    if (!user || !user[attribute]) return defaultValue;
    return user[attribute]
}

export const isSuperAdmin = () => {
    const companyId = getUserAttribute('company_id', 0);
    return !companyId && companyId === 0;
}