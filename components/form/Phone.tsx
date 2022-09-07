import {FormLabel} from "react-bootstrap";
import styles from "../../components/styles/form.module.css";
import Image from 'next/image';
import {v4 as uuidV4} from 'uuid';
import {useState, useEffect, useRef} from "react";
import {Country} from "../../pages/super-admin/companies/new";


interface Config {
    id: string,
    name: string,
    placeHolder: string,
    label: string,
    list: Item[],
    lang: string,
    onFocus?: Function,
    validation?: string,
    onChange?: Function,
    value?: string
    country: Country,
    setCountry: Function
}

interface Item {
    title_en: string,
    title_ar: string,
    flag: string,
    code: string
}

const Phone = ({id, name, placeHolder, label, list, lang, onFocus, validation, onChange, value, country, setCountry}: Config) => {
    const [show, setShow] = useState(false);
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
                        <div style={{marginTop: '11px'}}>
                            <Image id='select-country-flag' src={`/icons/${country.flag.toLowerCase()}.svg`}
                                   alt="Selected flag"
                                   width={24}
                                   height={24}/>
                        </div>
                    </div>

                    <span className={styles.listIcon} onClick={toggleList}>
                        <Image className={styles.searchIcon} src={`/icons/down-arrow.svg`} alt="Arrow Icon" width={20}
                               height={20}/>
                    </span>
                </div>

                <div style={{
                    marginInlineStart: '16px',
                    display: 'flex',
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
                    <input className={styles.form} id={id} name={name} placeholder={placeHolder}
                           autoComplete="off" type="text"
                           style={{
                               width: '70%',
                               border: 'none',
                               paddingTop: '3px',
                               marginLeft: '8px',
                               letterSpacing: '1px',
                               outline: 'none'
                           }}
                           value={value}
                           onChange={(e: any) => {
                               onChange && onChange(name, e.target.value)
                           }}
                           onFocus={(e: any) => {
                               onFocus && onFocus(e.target.name)
                           }}
                    />
                </div>
                {
                    validation &&
                    <p style={{
                        position: 'absolute',
                        color: 'red',
                        textAlign: 'center',
                        marginTop: '5px',
                        fontSize: '10px',
                        letterSpacing: '1px'
                    }}>{validation}</p>
                }
            </div>

            {
                show &&
                <div className={styles.list}>
                    <div className={styles.scroll}>
                        {
                            list.map((item, idx) => {
                                // @ts-ignore
                                const title = item[`title_${lang}`];
                                return (
                                    <div onClick={selectCountry} data-idx={idx} key={uuidV4()}
                                         className={styles.listItem}>
                                        <p style={{display: 'flex', justifyContent: 'left', cursor: 'pointer'}}>
                                            <Image style={{position: 'absolute', top: '1000px'}}
                                                   className={styles.searchIcon}
                                                   src={`/icons/${item.flag.toLowerCase()}.svg`}
                                                   alt="Jordan Icon" width={24} height={24}/>
                                            <span style={{
                                                marginInlineStart: '16px',
                                                fontSize: '14px',
                                                marginTop: '2px'
                                            }}>{title + ` (${item.code.replace("00", "+")})`}</span>
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