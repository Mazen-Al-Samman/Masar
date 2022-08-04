import {newCompanyConfig} from "../pages/super-admin/companies/new";

interface MainProps {
    Component: any,
    pageProps: any,
    lang: string,
    token: string,
    data: newCompanyConfig[],
    selected: string[],
    filters: object,
    search: string,
    showFailed: Function,
    showSuccess: Function,
    setButtons: Function,
    showNav: Function,
    setPadding: Function,
    setFilter: Function,
    setSelected: Function,
    setSuccessData: Function
}

export default MainProps;