import Details from "../../../components/companies/Details";
import {HandleRequestSSR} from "../../api/Handler";
import {Col, Container, Row} from 'react-bootstrap';

const Companies = ({data}: any) => {
    return (
        <div>
            <Container  style={{display: 'flex', justifyContent: 'center'}}>
                <Row>
                    <Col lg={5} style={{margin: '0 50px 30px 14px'}}>
                        <Details type={`new`}></Details>
                    </Col>
                    {
                        data &&
                        data.map((company: any) => {
                            const {title, description, number_of_employees, country, city, logo} = company;
                            return (
                                <Col lg={5} style={{margin: '0 50px 30px 14px'}}>
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