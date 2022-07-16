import {FormLabel} from "react-bootstrap";
import styles from "../../components/styles/form.module.css";


interface Config {
    id: string,
    name: string,
    placeHolder: string,
    label: string
}

const TextArea = ({id, name, placeHolder, label}: Config) => {
    return (
        <div className={styles.item}>
            <FormLabel style={{fontSize: '12px', fontWeight: '600'}}>{label}</FormLabel>
            <br/>
            <textarea className={styles.form} id={id} name={name} placeholder={placeHolder} style={{
                width: '752px',
                height: '96px',
                border: '1px solid #E6E9EA',
                borderRadius: '8px',
                paddingInlineStart: '16px',
                resize: 'none',
                paddingTop: '12px'
            }}></textarea>
        </div>
    )
}

export default TextArea;