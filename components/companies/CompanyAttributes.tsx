import Image from "next/image";
import {CompanyView} from "../../pages/super-admin/companies/[id]";
import {Col, Container, Row} from 'react-bootstrap';

interface PageData {
    data: CompanyView
}

const CompanyAttributes = ({data}: PageData) => {
    return (
        <Container style={{marginBottom: '24px'}}>
            <Row style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0px 20px 50px rgba(4, 37, 46, 0.08)',
                borderRadius: '12px',
                padding: '32px',
                height: '125px',
                display: "flex",
                justifyContent: 'space-between'
            }}>
                <Col lg={3} style={{display: 'flex', justifyContent: 'center', columnGap: '20px'}}>
                    <div>
                        <Image src={`/icons/location.svg`} width={56} height={56}></Image>
                    </div>
                    <div>
                        <p style={{fontSize: '18px', fontWeight: '600'}}>Location</p>
                        <p style={{
                            fontSize: '16px',
                            fontWeight: '400',
                            color: '#04252E',
                            marginTop: '-10px'
                        }}>{`${data.city}, ${data.country}`}</p>
                    </div>
                </Col>

                <Col lg={3} style={{display: 'flex', justifyContent: 'center', columnGap: '20px'}}>
                    <div>
                        <Image src={`/icons/employee.svg`} width={56} height={56}></Image>
                    </div>
                    <div>
                        <p style={{fontSize: '18px', fontWeight: '600'}}>Employee</p>
                        <p style={{
                            fontSize: '16px',
                            fontWeight: '400',
                            color: '#04252E',
                            marginTop: '-10px'
                        }}>{data.number_of_employees} Employee</p>
                    </div>
                </Col>

                <Col lg={3} style={{display: 'flex', justifyContent: 'center', columnGap: '20px'}}>
                    <div>
                        <Image src={`/icons/manager.svg`} width={56} height={56}></Image>
                    </div>
                    <div>
                        <p style={{fontSize: '18px', fontWeight: '600'}}>User</p>
                        <p style={{
                            fontSize: '16px',
                            fontWeight: '400',
                            color: '#04252E',
                            marginTop: '-10px'
                        }}>{data.numberOfUsers} Users</p>
                    </div>
                </Col>

                <Col lg={3} style={{display: 'flex', justifyContent: 'center', columnGap: '20px'}}>
                    <div>
                        <Image src={`/icons/company.svg`} width={56} height={56}></Image>
                    </div>
                    <div>
                        <p style={{fontSize: '18px', fontWeight: '600'}}>Department</p>
                        <p style={{
                            fontSize: '16px',
                            fontWeight: '400',
                            color: '#04252E',
                            marginTop: '-10px'
                        }}>{data.numberOfDepartments} Departments</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default CompanyAttributes;