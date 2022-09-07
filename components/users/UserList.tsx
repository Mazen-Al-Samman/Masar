import Image from "next/image";
import styles from "../../styles/Home.module.css";
import scroll from "../../components/styles/scroll.module.css";
import {useTheme} from "../../hooks/theme";
import {useRouter} from "next/router";
import {useState} from "react";
import {Col, Row} from "react-bootstrap";
import {IListUser} from "../../interfaces/common/MainInterfaces";


interface IComponentData {
    users: IListUser[];
    height?: string
}

const colors = ['#009FB7', '#FE9158', '#715AFF', '#034732', '#009FB7', '#E3D7FF', '#C33149', '#CFE8EF', '#715AFF', '#FE9158', '#1D2D44', '#AEF78E', '#443850'];
const UserList = ({users, height}: IComponentData) => {
    const [filtered, setFiltered] = useState([...users]);
    const handleUserSearch = (search: string) => {
        if (!search) {
            setFiltered([...users]);
            return;
        }
        let filteredUsers = users.filter(user => user.username && user.username.toLowerCase().includes(search.toLowerCase()));
        setFiltered(filteredUsers);
    }
    const {lang} = useTheme();
    const router = useRouter();
    const redirectTo = (url?: string) => {
        return router.push(url ?? '/admin');
    }
    return (
        <div className="p-5 pt-4 pb-3" style={{
            boxShadow: '0px 20px 50px rgba(4, 37, 46, 0.08)',
            borderRadius: '12px',
            letterSpacing: '1px',
            height: height ?? ''
        }}>
            <Row className="mb-4">
                <Col className="d-flex justify-content-start mt-1 text-center" lg={6} sm={12} md={12}>
                    <p style={{fontSize: '20px', fontWeight: '600'}}>All Users</p>
                </Col>
                <Col className="d-flex justify-content-end" lg={6} sm={12} md={12}>
                    <div className={`${styles.searchBox} ${styles['searchBox-' + lang]}`}>
                        <Image className={styles.searchIcon} src="/icons/search.svg" alt="Search Icon" width={20}
                               height={20}/>
                        <input type="search" onChange={(e: any) => handleUserSearch(e.target.value)}
                               placeholder={`Search for users`}/>
                    </div>
                </Col>
            </Row>
            <div className={scroll.scroll} style={{
                maxHeight: '400px',
                overflowY: 'auto'
            }}>
                {
                    filtered && filtered.map((user, idx) => {
                        const matches = user.username?.match(/\b(\w)/g);
                        const slug = matches?.join('').substring(0, 2).toUpperCase();
                        const color = colors[idx % colors.length];
                        return (
                            <>
                                <div onClick={() => redirectTo(`/admin/users/${user.id}`)}
                                     className="d-flex justify-content-between align-items-center">
                                    <section className="d-flex justify-content-left gap-3">
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            backgroundColor: `${color}`,
                                            borderRadius: '50px',
                                            fontSize: '16px',
                                            fontWeight: '700',
                                            color: 'white'
                                        }} className="d-flex justify-content-center align-items-center">{slug}</div>
                                        <article>
                                            <p style={{fontSize: '16px', fontWeight: '600'}}>{user.username}</p>
                                            <p style={{
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                marginTop: '-10px',
                                                color: '#365158'
                                            }}>{user.position}</p>
                                        </article>
                                    </section>
                                    <div style={{marginTop: '-10px'}}>
                                        <Image src={`/icons/rightArrow.svg`} width={10} height={14}
                                               alt={`Right Arrow`}></Image>
                                    </div>
                                </div>
                                {
                                    idx != filtered.length - 1 ?
                                        <hr style={{
                                            marginTop: '-2px',
                                            color: '#E6E9EA',
                                            borderTop: '2px solid #E6E9EA'
                                        }}/> : ''
                                }
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default UserList;