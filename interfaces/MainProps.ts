import {newCompanyConfig} from "../pages/super-admin/companies/new";

interface MainProps {
    lang: string,
    Component: any,
    pageProps: any,
    token: string,
    setButtons: Function,
    showNav: Function,
    setPadding: Function,
    data: newCompanyConfig
}

export default MainProps;