import Details from "../../../components/companies/Details";
import {HandleRequestSSR} from "../../api/Handler";

const Companies = ({data}: any) => {
    console.log("data", data)
    return (
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Details type={`new`}></Details>
            {
                data &&
                data.map((company: any) => {
                    const {title, description, number_of_employees, country, city, logo} = company;
                    return <Details type={`company`} data={
                        {
                            title,
                            description,
                            number_of_employees,
                            country,
                            city,
                            logo,
                        }
                    }></Details>
                })
            }
        </div>
    )
}

export async function getServerSideProps(ctx: any) {
    const companiesDataReq = HandleRequestSSR({
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