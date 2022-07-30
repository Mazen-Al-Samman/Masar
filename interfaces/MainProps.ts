import {newCompanyConfig} from "../pages/super-admin/companies/new";

interface MainProps {
    Component: any,
    pageProps: any,
    lang: string,
    token: string,
    data: newCompanyConfig[],
    filters: object,
    setButtons: Function,
    showNav: Function,
    setPadding: Function,
    setFilter: Function
}

export default MainProps;