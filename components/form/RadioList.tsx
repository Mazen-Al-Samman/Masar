import {FormLabel} from "react-bootstrap";
import styles from "../../components/styles/form.module.css";
import Image from 'next/image';
import {v4 as uuidV4} from 'uuid';
import {useState, useEffect, useRef} from "react";

export interface Config {
    id: string,
    name: string,
    placeHolder: string,
    label: string,
    list: RadioListConfig,
    onFocus?: Function,
    validation?: string,
    onChange?: Function,
    selected?: string
}

export interface RadioListConfig {
    title: string,
    data: SingleObject[]
}

export interface SingleObject {
    id?: string,
    title?: string,
}

const RadioList = ({id, name, placeHolder, label, list, onFocus, validation, selected, onChange}: Config) => {
    const [show, setShow] = useState(false);
    // Check the value for the selected
    let selectedObject = list && list.data.filter(item => item.id == selected);
    const [value, setValue] = useState(selectedObject ? selectedObject[0]?.title : '');
    const ref = useRef(null);

    const toggleList = () => {
        setShow(!show);
    }

    const handleChange = (e: any) => {
        let newValue = e.target.id;
        onFocus && onFocus(name);
        onChange && onChange(name, e.target.value);
        setValue(newValue);
    }

    const closeLists = () => {
        setShow(false);
    }

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            // @ts-ignore
            if (ref.current && !ref.current.contains(event.target)) {
                closeLists();
            }
        };
        document.addEventListener('mousedown', handleClickOutside, true);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, [ref]);

    return (
        <div className={styles.item} ref={ref}>
            <FormLabel style={{fontSize: '12px', fontWeight: '600'}}>{label}</FormLabel>
            <br/>
            <div style={{
                width: '348px',
                height: '48px',
                border: '1px solid #E6E9EA',
                borderRadius: '8px',
                position: 'relative'
            }}>
                <input disabled className={styles.form} value={value} id={id} name={name} placeholder={placeHolder}
                       style={{
                           width: '100%',
                           height: '100%',
                           border: 'none',
                           borderRadius: '8px',
                           paddingInlineStart: '16px',
                           backgroundColor: 'white'
                       }} type="text"/>
                <span className={styles.listIcon} onClick={toggleList}>
                    <Image className={styles.searchIcon} src={`/icons/down-arrow.svg`} alt="Arrow Icon" width={20}
                           height={20}/>
                </span>
            </div>

            {
                show &&
                <div className={styles.list}>
                    <div className={styles.scroll}>
                        {
                            list && list.data.map(item => {
                                return (
                                    <div key={uuidV4()} className={styles.listItem}>
                                        <input type="radio" id={item.title} name={name} value={item.id}
                                               onChange={handleChange} checked={item.title == value}/>
                                        <label htmlFor={item.title}>{item.title}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
            <p style={{
                position: 'absolute',
                color: 'red',
                textAlign: 'center',
                marginTop: '5px',
                fontSize: '12px',
                letterSpacing: '1px'
            }}>{validation && validation}</p>
        </div>
    )
}

export default RadioList;