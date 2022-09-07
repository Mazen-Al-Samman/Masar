import {createContext} from "react";

export interface IContext {
    data: object;
    setData: (value: any) => void;
}

const AppContext = createContext<IContext>({
    data: {}, setData: () => {
    }
});
export default AppContext;