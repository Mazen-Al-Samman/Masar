import {Col, Container} from "react-bootstrap";
import TopHeader from "../../../components/common/TopHeader";
import {HandleRequestSSR} from "../../api/Handler";
import {getUserObjectViaContext} from "../../../hooks/User";

interface IPageData {
    data: IStrategy;
}

interface IStrategy {
    id: string | number;
    company_id: string | number;
    vision: string;
    mission: string;
    values: string;
    goals: IGoal[];
}

interface IGoal {
    id: string
    company_id: string
    strategy_id: string
    title: string
    description: string
}

const View = ({data}: IPageData) => {
    return (
        <Container>
            <Col lg={12} className="mt-3">
                <TopHeader
                    mainTitle={`Strategy Details `}
                    icon={{
                        path: '/icons/strategy.svg',
                        width: 150,
                        height: 150,
                        style: {marginTop: '-10px !important'}
                    }}
                    buttons={[
                        {
                            icon: '/icons/edit.svg',
                        },
                        {
                            icon: '/icons/print.svg',
                        },
                    ]}
                ></TopHeader>
            </Col>

            <Col className="p-4 mt-4" style={{
                boxShadow: '0px 20px 50px rgba(4, 37, 46, 0.08)',
                borderRadius: '12px'
            }} lg={12}>
                <div className="p-3" style={{
                    border: '1px solid #E6E9EA',
                    borderRadius: '8px'
                }}>
                    <div>
                        <p style={{fontSize: '18px', fontWeight: '600'}}>Vision</p>
                        <p className="m-0" style={{
                            fontSize: '16px',
                            fontWeight: '400',
                            color: '#04252E',
                            marginTop: '-10px'
                        }}>{data.vision}</p>
                    </div>

                    <div className="mt-4">
                        <p style={{fontSize: '18px', fontWeight: '600'}}>Mission</p>
                        <p className="m-0" style={{
                            fontSize: '16px',
                            fontWeight: '400',
                            color: '#04252E',
                            marginTop: '-10px'
                        }}>{data.mission}</p>
                    </div>

                    <div className="mt-4">
                        <p style={{fontSize: '18px', fontWeight: '600'}}>Values</p>
                        <p className="m-0" style={{
                            fontSize: '16px',
                            fontWeight: '400',
                            color: '#04252E',
                            marginTop: '-10px'
                        }}>{data.values}</p>
                    </div>
                </div>

                <p className="mt-4" style={{fontSize: '18px', fontWeight: '600'}}>Goals</p>
                <div className="p-3" style={{
                    border: '1px solid #E6E9EA',
                    borderRadius: '8px'
                }}>
                    {
                        data.goals?.map((goal, index) => {
                            return (
                                <div>
                                    <p style={{fontSize: '18px', fontWeight: '600'}}>{`${index + 1}- ${goal.title}`}</p>
                                    <p className="m-0" style={{
                                        fontSize: '16px',
                                        fontWeight: '400',
                                        color: '#04252E',
                                        marginTop: '-10px'
                                    }}>{goal.description}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </Col>
        </Container>
    )
}

export async function getServerSideProps(ctx: any) {
    const userData = getUserObjectViaContext(ctx);
    const strategyReq = HandleRequestSSR({
        url: `/strategy/${userData?.company_id}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    });

    const [strategy] = await Promise.all([
        strategyReq
    ]);

    return {
        props: {
            // @ts-ignore
            data: strategy.data,
        }
    };
}

export default View;