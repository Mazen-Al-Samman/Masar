import Image from "next/image";
import {Col, Container, Row} from 'react-bootstrap';
import {useRouter} from "next/router";
import {IDepartment} from "../../interfaces/common/MainInterfaces";

interface PageData {
    data: IDepartment;
    usersCount: number;
}

const DepartmentMainData = ({data, usersCount}: PageData) => {
    const router = useRouter();
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
                        <Image src={`/icons/department.svg`} layout='fill' objectFit='contain' alt={data.title}></Image>
                    </div>
                </Col>

                <Col lg={7}>
                    <p style={{fontSize: '32px', fontWeight: '700'}}>{data.title?.toUpperCase()}</p>
                    <p style={{marginTop: '-10px', color: '#365158'}}>{`Owner: ${data.owner}`}</p>
                    <p style={{marginTop: '-10px', color: '#365158'}}>{`${usersCount} Users`}</p>
                </Col>

                <Col lg={3}>
                    <Row className="d-flex justify-content-end gx-2">
                        <Col onClick={() => router.push(`/admin/departments/update/${data.id}`)} lg={3} sm={4} md={4} xs={4}>
                            <div className="d-flex justify-content-center align-items-center" style={{
                                height: '45px',
                                backgroundColor: '#E6E9EA',
                                borderRadius: '8px',
                            }}>
                                <Image src={`/icons/edit.svg`} width={24} height={24} alt={`Edit`}></Image>
                            </div>
                        </Col>

                        <Col lg={3} sm={4} md={4} xs={4}>
                            <div className="d-flex justify-content-center align-items-center" style={{
                                height: '45px',
                                backgroundColor: '#E6E9EA',
                                borderRadius: '8px',
                            }}>
                                <Image src={`/icons/print.svg`} width={24} height={24} alt={`Print`}></Image>
                            </div>
                        </Col>

                        <Col lg={3} sm={4} md={4} xs={4}>
                            <div className="d-flex justify-content-center align-items-center" style={{
                                height: '45px',
                                backgroundColor: '#FDEEEE',
                                borderRadius: '8px',
                            }}>
                                <Image src={`/icons/delete.svg`} width={24} height={24} alt={`Delete`}></Image>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
export default DepartmentMainData;