import css from '../styles/Home.module.css';
import scroll from '../components/styles/form.module.css'
import {useState} from "react";
import {Container, Row, Col} from 'react-bootstrap';

const styles = {
    mainDiv: {
        padding: '24px',
        width: '304px',
        maxHeight: '338px',
        border: '1px solid #E6E9EA',
        borderRadius: '12px',
        paddingTop: '20px',
        textAlign: 'left' as 'left',
        marginBottom: '24px'
    },
    title: {
        fontSize: '16px',
        fontWeight: '700',
    },
    list: {
        maxHeight: '238px',
        overflowY: 'auto' as 'auto',
        marginTop: '28px'
    }
}

interface NavConfig {
    data: object
}

const FilterBox = ({data}: NavConfig) => {
    const [filter, setFilter] = useState(data);
    const [selected, setSelected] = useState({});
    let filtersKeys = filter && Object.keys(filter);

    const handleChange = (key: string, value: string) => {
        let currentSelected = {...selected};
        // @ts-ignore
        if (!currentSelected[key]) currentSelected[key] = [];
        // @ts-ignore
        currentSelected[key].push(value);
        setSelected(currentSelected)
    }

    return (
        <Container>
            <Row style={{padding: '24px', display: 'flex', justifyContent: 'space-between'}}>
                {
                    filtersKeys && filtersKeys.map((key) => {
                        // @ts-ignore
                        let object = filter[key];
                        return (
                            <Col lg={4} style={styles.mainDiv} className={css.form}>
                                <p style={styles.title}>{key}</p>
                                <div style={styles.list} className={scroll.scroll}>
                                    {
                                        object.map((item: any) => {
                                            return (
                                                <div key={item.title} className={css.formGroup}>
                                                    <input onChange={() => handleChange(key, item.id)} type="checkbox" id={item.title}/>
                                                    <label className={css.label} htmlFor={item.title}>
                                                    <span className={css.checkbox}>
                                                        <span className={css.check}></span>
                                                    </span>{item.title}
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default FilterBox;