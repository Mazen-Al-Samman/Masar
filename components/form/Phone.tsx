import {FormLabel} from "react-bootstrap";
import styles from "../../components/styles/form.module.css";
import Image from 'next/image';
import {v4 as uuidv4} from 'uuid';
import {useState, useEffect, useRef} from "react";


interface Config {
    id: string,
    name: string,
    placeHolder: string,
    label: string,
    list: Item[]
}

interface Item {
    title: string,
    isChecked: boolean,
    flag: string,
    code: string
}

const Phone = ({id, name, placeHolder, label, list}: Config) => {
    const [show, setShow] = useState(false);
    const [country, setCountry] = useState({flag: 'jordan', code: '00962'});
    const ref = useRef(null);

    const toggleList = () => {
        setShow(!show);
    }

    const selectCountry = (e: any) => {
        // Remove bold class from all countries
        let elements = document.querySelectorAll("[data-idx]");
        elements.forEach((element) => {
            element.classList.remove(styles.bold);
        })

        // Prepare objects
        let selectedCountryElement = e.target.closest('[data-idx]');
        let selectedCountryIdx = selectedCountryElement.getAttribute('data-idx');
        let selectedCountryObject = list[selectedCountryIdx];
        selectedCountryElement.classList.add(styles.bold);
        setCountry({flag: selectedCountryObject.flag, code: selectedCountryObject.code});
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
            <div>
                <div style={{
                    width: '104px',
                    height: '48px',
                    border: '1px solid #E6E9EA',
                    borderRadius: '8px',
                    position: 'absolute'
                }}>
                    <div className={styles.selectedFlag}>
                        <Image id='select-country-flag' src={`/icons/${country.flag}.svg`} alt="Selected flag"
                               width={24}
                               height={45}/>
                    </div>

                    <span className={styles.listIcon} onClick={toggleList}>
                        <Image className={styles.searchIcon} src={`/icons/down-arrow.svg`} alt="Arrow Icon" width={20}
                               height={20}/>
                    </span>
                </div>

                <div style={{
                    marginInlineStart: '16px',
                    display: 'flex',
                    width: '228px',
                    height: '48px',
                    border: '1px solid #E6E9EA',
                    borderRadius: '8px',
                    justifyContent: 'left',
                    padding: '0 16px',
                    fontSize: '14px',
                    marginLeft: '120px'
                }}
                >
                    <p style={{padding: '13px 0', letterSpacing: '1px'}}>{country.code}</p>
                    <input className={styles.form} id={id} name={name} placeholder={placeHolder} style={{
                        width: '70%',
                        border: 'none',
                        paddingTop: '3px',
                        marginLeft: '8px',
                        letterSpacing: '1px',
                        outline: 'none'
                    }} autoComplete="off" type="text"/>
                </div>
            </div>

            {
                show &&
                <div className={styles.list}>
                    <div className={styles.scroll}>
                        {
                            list.map((item, idx) => {
                                return (
                                    <div onClick={selectCountry} data-idx={idx} key={uuidv4()}
                                         className={styles.listItem}>
                                        <p style={{display: 'flex', justifyContent: 'left', cursor: 'pointer'}}>
                                            <Image style={{position: 'absolute', top: '1000px'}}
                                                   className={styles.searchIcon} src={`/icons/${item.flag}.svg`}
                                                   alt="Jordan Icon" width={24} height={24}/>
                                            <span style={{
                                                marginInlineStart: '16px',
                                                fontSize: '14px',
                                                marginTop: '2px'
                                            }}>{item.title}</span>
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Phone;