import {FormLabel} from "react-bootstrap";
import styles from "../../components/styles/form.module.css";


interface Config {
    id: string,
    name: string,
    placeHolder: string,
    label: string,
    width: number,
    height: number,
    onChange?: Function,
    onFocus?: Function,
    type?: string
}

const Text = ({id, name, placeHolder, label, width, height, onChange, type, onFocus}: Config) => {
    return (
        <div className={styles.item}>
            <FormLabel style={{fontSize: '12px', fontWeight: '600'}}>{label}</FormLabel>
            <br/>
            <input className={styles.form} id={id} name={name} placeholder={placeHolder} style={{
                width: `${width}px`,
                height: `${height}px`,
                border: '1px solid #E6E9EA',
                borderRadius: '8px',
                paddingInlineStart: '16px'
            }} type={`${type && type}`} onChange={(e: any) => {
                onChange && onChange(e.target.value)
            }}
                   onFocus={(e: any) => {
                       onFocus && onFocus(e.target.name)
                   }}
            />
        </div>
    )
}

export default Text;