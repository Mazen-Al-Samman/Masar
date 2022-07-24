import NewCompany from "./NewCompany";
import CompanyBox from "./CompanyBox";
import {config} from "./CompanyBox";
import styles from "../styles/box.module.css";

interface Config {
    type: string,
    data?: config
}

const Details = ({type, data}: Config) => {
    console.log("data", data)
    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            width: '552px',
            height: '185px',
            borderRadius: '12px',
            boxShadow: '0px 20px 50px rgba(4, 37, 46, 0.08)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginInlineStart: '24px',
        }} className={styles.company}>
            {renderBlock(type, data)}
        </div>
    )
}

function renderBlock(type: string, data: config | undefined) {
    switch (type) {
        case 'new':
            return <NewCompany></NewCompany>;
        case 'company':
            return <CompanyBox {...data}></CompanyBox>
    }
}

export default Details;