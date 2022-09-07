import Image from "next/image";
import {CompanyView} from "../../pages/super-admin/companies/[id]";
import {Col, Container, Row} from 'react-bootstrap';

interface PageData {
    data: CompanyView
}

const CompanyMainData = ({data}: PageData) => {
    return (
        <Container style={{marginBottom: '24px'}}>
            <Row style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0px 20px 50px rgba(4, 37, 46, 0.08)',
                borderRadius: '12px',
                padding: '32px'
            }}>
                <Col lg={2}>
                    <div style={{width: '100%', height: '100%', position: 'relative'}}>
                        <Image src={data.logo} layout='fill' objectFit='contain' alt={data.title}></Image>
                    </div>
                </Col>

                <Col lg={7}>
                    <p style={{fontSize: '32px', fontWeight: '700'}}>{data.title}</p>
                    <p>{data.description}</p>
                </Col>

                <Col lg={3}>
                    <Row className="gx-1">
                        <Col lg={6}>
                            <div style={{
                                width: '100%',
                                height: '45px',
                                backgroundColor: '#E6E9EA',
                                textAlign: 'center',
                                lineHeight: '45px',
                                borderRadius: '8px'
                            }}>22-5-2022
                            </div>
                        </Col>

                        <Col lg={6} className="mt-2 mt-lg-0">
                            <div style={{
                                width: '100%',
                                height: '45px',
                                backgroundColor: '#E6E9EA',
                                textAlign: 'center',
                                lineHeight: '45px',
                                borderRadius: '8px',
                            }}>
                                #{data.id}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
export default CompanyMainData;