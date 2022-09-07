import {FormLabel} from "react-bootstrap";
import styles from "../../components/styles/form.module.css";
import {v4 as uuidV4} from 'uuid';
import {useState, useEffect, useRef} from "react";
import {IListUser} from "../../interfaces/common/MainInterfaces";

export interface Config {
    id: string,
    name: string,
    placeHolder: string,
    label: string,
    list: IListUser[],
    onFocus?: Function,
    validation?: string,
    onChange?: Function,
    selected?: string,
    withIcon?: boolean
}

const colors = ['#034732', '#009FB7', '#E3D7FF', '#C33149', '#CFE8EF', '#715AFF', '#FE9158', '#1D2D44', '#AEF78E', '#443850'];
const RadioList = ({
                       id,
                       name,
                       placeHolder,
                       label,
                       list,
                       onFocus,
                       validation,
                       selected,
                       onChange,
                       withIcon = true
                   }: Config) => {
    const [show, setShow] = useState(false);
    const [filtered, setFiltered] = useState(list);
    // Check the value for the selected
    let selectedObject = list && list.filter(item => item.id == selected);
    const [value, setValue] = useState(selectedObject ? selectedObject[0]?.username : '');
    const ref = useRef(null);

    const toggleList = () => {
        setFiltered(list);
        if (!show) {
            setValue('');
            onChange && onChange(name, -1);
        }
        setShow(!show);
    }

    const handleChange = (e: any) => {
        let newValue = e.target.id;
        onFocus && onFocus(name);
        onChange && onChange(name, e.target.value);
        setValue(newValue);
        setShow(false);
    }

    const filterResult = (event: any) => {
        const searchValue = event.target.value;
        let allData = [...list];
        setFiltered(allData);
        // @ts-ignore
        let filteredList = allData.filter((item) => item.username?.toLowerCase().includes(searchValue.toLowerCase()));
        if (!filteredList.length) {
            filteredList = [{id: -1, username: 'No Data'}];
        }
        allData = filteredList;
        setFiltered(allData);
        setValue(searchValue);
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
                height: '48px',
                border: '1px solid #E6E9EA',
                borderRadius: '8px',
                position: 'relative'
            }}>
                <input autoComplete="off" onFocus={toggleList} onChange={filterResult} className={styles.form}
                       value={value} id={id} name={name}
                       placeholder={placeHolder}
                       style={{
                           width: '100%',
                           height: '100%',
                           border: 'none',
                           borderRadius: '8px',
                           paddingInlineStart: '16px',
                           backgroundColor: 'white'
                       }} type="text"/>
            </div>

            {
                show &&
                <div className={`${styles.list} ${styles.users}`}>
                    <div className={styles.scroll}>
                        {
                            filtered && filtered?.length > 0 ? filtered.map((item, idx) => {
                                    const matches = item.username?.match(/\b(\w)/g);
                                    const slug = matches?.join('').substring(0, 2).toUpperCase();
                                    return (
                                        <div key={uuidV4()}
                                             className={`${styles.listItem} d-flex justify-content-start gap-3`}>
                                            {
                                                item.id != -1 ?
                                                    <>
                                                        <input type="radio"
                                                               name={name}
                                                               value={item.id}
                                                               onChange={handleChange}
                                                               id={item.username}/>

                                                        {
                                                            withIcon &&
                                                            <p
                                                                className={styles.circle}
                                                                style={{backgroundColor: colors[idx % 10]}}>{slug}
                                                            </p>
                                                        }
                                                        <label
                                                            className="noStyle"
                                                            htmlFor={item.username}>
                                                            {item.username}
                                                            <p
                                                                style={{
                                                                    fontSize: '12px',
                                                                    fontWeight: '400',
                                                                    color: '#365158'
                                                                }}
                                                            >
                                                                {item.position}
                                                            </p>
                                                        </label>
                                                    </> :
                                                    <>
                                                        <label>{item.username}</label>
                                                    </>
                                            }
                                        </div>
                                    )
                                }) :
                                <label>No Data</label>
                        }
                    </div>
                </div>
            }
            <p style={{
                position: 'absolute',
                color: 'red',
                textAlign: 'center',
                marginTop: '5px',
                fontSize: '10px',
                letterSpacing: '1px'
            }}>{validation}</p>
        </div>
    )
}

export default RadioList;