import {getUserObjectViaContext} from "../../../hooks/User";
import {HandleRequestSSR} from "../../api/Handler";
import {Col, Container, Row} from "react-bootstrap";
import Image from "next/image";

interface IPageData {
    user: IUserData;
}

interface IUserData {
    id?: string;
    email?: string;
    username?: string;
    position?: string;
    phone_number?: string;
    department?: string;
    company?: string;
}

const User = ({user}: IPageData) => {
    const {id, email, username, position, phone_number, department, company} = user;
    return (
        <>
            <Container style={{marginBottom: '24px'}}>
                <Row style={{
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0px 20px 50px rgba(4, 37, 46, 0.08)',
                    borderRadius: '12px',
                    padding: '32px'
                }}>
                    <Col lg={2}>
                        <div style={{width: '100%', height: '100%', position: 'relative'}}>
                            <Image src={`/icons/manager.svg`} layout='fill' objectFit='contain' alt={`User`}></Image>
                        </div>
                    </Col>

                    <Col lg={7}>
                        <p style={{fontSize: '32px', fontWeight: '700'}}>{username}</p>
                        <p style={{marginTop: '-10px', color: '#365158'}}>{position}</p>
                        <p style={{marginTop: '-10px', color: '#365158'}}>{`ID: ${id}`}</p>
                    </Col>

                    <Col lg={3} sm={12} md={12} xs={12}>
                        <Row className="d-flex justify-content-end">
                            <Col lg={4} sm={6} md={6} xs={6}>
                                <div className="d-flex justify-content-center align-items-center" style={{
                                    height: '45px',
                                    backgroundColor: '#E6E9EA',
                                    borderRadius: '8px',
                                }}>
                                    <Image src={`/icons/edit.svg`} width={24} height={24} alt={`Edit`}></Image>
                                </div>
                            </Col>

                            <Col lg={4} sm={6} md={6} xs={6}>
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

            <Container>
                <Row style={{
                    boxShadow: '0px 20px 50px rgba(4, 37, 46, 0.08)',
                    borderRadius: '12px',
                    padding: '35px'
                }}>
                    <Col lg={4} sm={12} xs={12} md={12} className="d-flex justify-content-start justify-content-lg-center align-items-center gap-3">
                        <Image className="d-block" src={`/icons/department.svg`} width={80} height={80}></Image>
                        <article className="mt-3">
                            <p style={{fontSize: '20px', fontWeight: '600'}}>Department</p>
                            <p style={{fontSize: '16px', fontWeight: '400', color: '#04252E', marginTop: '-7px'}}>{department}</p>
                        </article>
                    </Col>

                    <Col lg={4} sm={12} xs={12} md={12} className="d-flex justify-content-start justify-content-lg-center align-items-center gap-3">
                        <Image className="d-block" src={`/icons/phone.svg`} width={80} height={80}></Image>
                        <article className="mt-3">
                            <p style={{fontSize: '20px', fontWeight: '600'}}>Phone</p>
                            <p style={{fontSize: '16px', fontWeight: '400', color: '#04252E', marginTop: '-7px', letterSpacing: '1px'}}>{phone_number}</p>
                        </article>
                    </Col>

                    <Col lg={4} sm={12} xs={12} md={12} className="d-flex justify-content-start justify-content-lg-center align-items-center gap-3">
                        <Image className="d-block" src={`/icons/email.svg`} width={80} height={80}></Image>
                        <article className="mt-3">
                            <p style={{fontSize: '20px', fontWeight: '600'}}>Email</p>
                            <p style={{fontSize: '16px', fontWeight: '400', color: '#04252E', marginTop: '-7px'}}>{email}</p>
                        </article>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export async function getServerSideProps(ctx: any) {
    let userId = ctx.query.id;
    const UserRequest = HandleRequestSSR({
        url: `/user/get-user-details?id=${userId}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    })

    const [user] = await Promise.all([
        UserRequest
    ]);

    if (user?.data?.redirect) {
        return {
            redirect: {
                permanent: false,
                destination: user?.data?.to || "/",
            }
        }
    }

    return {
        props: {
            user: user?.data,
        }
    };
}

export default User;