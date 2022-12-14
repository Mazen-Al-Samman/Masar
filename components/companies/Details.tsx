import NewCompany from "./NewCompany";
import CompanyBox from "./CompanyBox";
import {config} from "./CompanyBox";
import styles from "../styles/box.module.css";
import DepartmentDetails from "../departments/DepartmentDetails";
import ProcessDetails from "../ProcessDetails";

interface Config {
    type: string,
    data?: config
}

const Details = ({type, data}: Config) => {
    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            width: '100%',
            minHeight: '185px',
            borderRadius: '12px',
            boxShadow: '0px 20px 50px rgba(4, 37, 46, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }} className={styles.company}>
            {renderBlock(type, data)}
        </div>
    )
}

function renderBlock(type: string, data: config | undefined) {
    switch (type) {
        case 'new':
            return <NewCompany data={{title: data?.title}}></NewCompany>;
        case 'company':
            return <CompanyBox {...data}></CompanyBox>
        case 'department':
            return <DepartmentDetails {...data}></DepartmentDetails>
        case 'process':
            return <ProcessDetails {...data}></ProcessDetails>
    }
}

export default Details;