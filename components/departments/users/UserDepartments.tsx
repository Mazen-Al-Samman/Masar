import Image from "next/image";
import {Col, Container, Row} from 'react-bootstrap';
import Link from "next/link";
import {IDepartment} from "../../../interfaces/common/MainInterfaces";

interface PageData {
    data: IDepartment,
    usersCount: number
}

const DepartmentUserMainData = ({data, usersCount}: PageData) => {
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
                        <Image src={`/icons/employee.svg`} layout='fill' objectFit='contain' alt={data.title}></Image>
                    </div>
                </Col>

                <Col lg={8}>
                    <p style={{fontSize: '32px', fontWeight: '700'}}>Users Details</p>
                    <p style={{marginTop: '-10px', color: '#365158'}}>{`Department: ${data.title}`}</p>
                    <p style={{marginTop: '-10px', color: '#365158'}}>{`${usersCount} Users`}</p>
                </Col>

                <Col lg={2} sm={4} md={4} xs={4}>
                    <Link href={`/admin/users/new`}>
                        <p className="d-flex justify-content-center align-items-center" style={{
                            height: '45px',
                            backgroundColor: '#E6E9EA',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}>
                            + User
                        </p>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}
export default DepartmentUserMainData;