import {FormLabel} from "react-bootstrap";
import styles from "../../components/styles/form.module.css";


interface Config {
    id: string,
    name: string,
    placeHolder: string,
    label: string,
    onFocus?: Function,
    validation?: string,
    onChange?: Function,
    value?: string
}

const TextArea = ({id, name, placeHolder, label, onFocus, validation, value, onChange}: Config) => {

    const handleChange = (event: any) => {
        const attributeName = event.target.name;
        onFocus && onFocus(attributeName);
        onChange && onChange(name, event.target.value);
    }

    return (
        <div className={styles.item}>
            <FormLabel style={{fontSize: '12px', fontWeight: '600'}}>{label}</FormLabel>
            <br/>
            <textarea className={styles.form} id={id} value={value} name={name}
                      placeholder={placeHolder}
                      style={{
                          width: '348px',
                          height: '96px',
                          border: '1px solid #E6E9EA',
                          borderRadius: '8px',
                          paddingInlineStart: '16px',
                          resize: 'none',
                          paddingTop: '12px'
                      }}

                      onFocus={(e: any) => {
                          onFocus && onFocus(name)
                      }}

                      onChange={(e: any) => {
                          onChange && onChange(name, e.target.value)
                      }}
            ></textarea>
            {
                validation &&
                <p style={{
                    position: 'absolute',
                    color: 'red',
                    textAlign: 'center',
                    marginTop: '-2px',
                    fontSize: '12px',
                    letterSpacing: '1px'
                }}>{validation}</p>
            }
        </div>
    )
}

export default TextArea;