import Details from "../../../components/companies/Details";
import {HandleRequestSSR} from "../../api/Handler";
import {Col, Container, Row} from 'react-bootstrap';
import {useLayoutEffect} from "react";
import MainProps from "../../../interfaces/MainProps";

interface PageProps {
    filtersData: object
}

const Companies = ({data, setButtons, filtersData, setFilter}: (MainProps & PageProps)) => {
    useLayoutEffect(() => {
        setButtons(['search', 'language', 'filter', 'logout']);
        setFilter(filtersData);
    }, []);

    return (
        <div>
            <Container  style={{display: 'flex', justifyContent: 'center'}}>
                <Row>
                    <Col lg={5} style={{margin: '0 50px 20px 14px'}}>
                        <Details type={`new`}></Details>
                    </Col>
                    {
                        data &&
                        data.map((company: any) => {
                            const {title, description, number_of_employees, country, city, logo} = company;
                            return (
                                <Col lg={5} style={{margin: '0 50px 20px 14px'}}>
                                    <Details type={`company`} data={
                                        {
                                            title,
                                            description,
                                            number_of_employees,
                                            country,
                                            city,
                                            logo,
                                        }
                                    }></Details>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </div>
    )
}

export async function getServerSideProps(ctx: any) {
    const companiesFilter = HandleRequestSSR({
        url: '/filter?type=1',
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    })

    const [filters] = await Promise.all([
        companiesFilter
    ]);

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
            data: companies?.data,
            filtersData: filters?.data
        }
    };
};

export default Companies;