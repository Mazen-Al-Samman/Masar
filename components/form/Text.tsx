import {FormLabel} from "react-bootstrap";
import styles from "../../components/styles/form.module.css";
import Parser from 'html-react-parser';

interface Config {
    id: string,
    name: string,
    placeHolder: string,
    label?: string,
    width?: number | string,
    height?: number,
    onChange?: Function,
    onFocus?: Function,
    type?: string,
    validation?: string,
    value?: string
}

const Text = ({id, name, placeHolder, label, width, height, onChange, type, onFocus, validation, value}: Config) => {
    return (
        <div style={{width: '100%'}} className={styles.item}>
            {
                label &&
                <>
                    <FormLabel style={{fontSize: '12px', fontWeight: '600'}}>{Parser(label)}</FormLabel>
                    <br/>
                </>
            }
            <input className={styles.form} id={id} name={name} value={value} placeholder={placeHolder} style={{
                width: typeof width == "string" ? width : `${width}px`,
                height: `${height}px`,
                border: '1px solid #E6E9EA',
                borderRadius: '8px',
                paddingInlineStart: '16px'
            }} type={`${type && type}`} onChange={(e: any) => {
                onChange && onChange(name, e.target.value)
            }} onFocus={(e: any) => {
                onFocus && onFocus(e.target.name)
            }}
            />
            {
                validation && <p style={{
                    position: 'absolute',
                    color: 'red',
                    textAlign: 'center',
                    marginTop: '5px',
                    fontSize: '10px',
                    letterSpacing: '1px'
                }}>{validation}</p>
            }
        </div>
    )
}

export default Text;