import Details from "../../../components/companies/Details";
import HandleRequest from "../../api/Handler";

const Companies = ({data}: any) => {
    console.log(data)
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Details type={`new`}></Details>
        </div>
    )
}

export async function getServerSideProps(ctx: any) {
    const companiesDataReq = HandleRequest({
        url: '/company',
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    })

    const [companies] = await Promise.all([
        companiesDataReq
    ]);

    return {
        props: {
            data: companies.data,
        }
    };
};

export default Companies;