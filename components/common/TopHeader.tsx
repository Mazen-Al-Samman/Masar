import Image from "next/image";
import {Col, Container, Row} from "react-bootstrap";

interface IComponent {
    mainTitle?: string;
    subTitle?: string;
    icon?: IIcon;
    buttons?: IButton[]
}

interface IButton {
    text?: string;
    icon?: string;
    classNames?: string;
    styles?: object;
    onClick?: any;
}

interface IIcon {
    path: string;
    width: number;
    height: number;
    style?: object
}

const TopHeader = ({mainTitle, subTitle, icon, buttons}: IComponent) => {
    return (
        <Container>
            <Row style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0px 20px 50px rgba(4, 37, 46, 0.08)',
                borderRadius: '12px',
                padding: '32px'
            }}>

                <Col lg={8} className="d-flex justify-content-start align-items-center gap-5">
                    {
                        icon &&
                        <Image
                            style={icon.style ?? {}}
                            src={icon.path}
                            width={icon.width}
                            height={icon.height}
                            alt={mainTitle}></Image>
                    }

                    <div className="w-100">
                        {
                            mainTitle &&
                            <p style={{fontSize: '32px', fontWeight: '700'}}>{mainTitle}</p>
                        }

                        {
                            subTitle &&
                            <p style={{marginTop: '-10px', color: '#365158'}}>{subTitle}</p>
                        }
                    </div>
                </Col>

                <Col lg={4}>
                    <Row className="d-flex justify-content-end gx-2">
                        {
                            buttons?.map((button, index) => {
                                const numOfColumns = parseInt((12 / buttons.length).toString());
                                return (
                                    <Col key={index} lg={numOfColumns} sm={numOfColumns} md={numOfColumns}
                                         xs={numOfColumns}>
                                        <div
                                            onClick={button.onClick}
                                            className={`d-flex justify-content-center align-items-center ${button.classNames}`}
                                            style={{
                                                height: '45px',
                                                backgroundColor: '#E6E9EA',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                ...button.styles
                                            }}>
                                            {
                                                button.icon &&
                                                <Image src={button.icon} width={24} height={24}
                                                       alt={button.text}></Image>
                                            }

                                            {
                                                button.text ?? ''
                                            }
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
export default TopHeader;