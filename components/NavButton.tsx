import Image from "next/image";
import {v4 as uuidV4} from 'uuid';
import NavBox from "./NavBox";
import FilterBox from '../components/FilterBox'
import {useState, useEffect, useRef} from "react";

interface NavConfig {
    styles: any,
    source: any,
    width: any,
    height: any,
    alt: any,
    items: any,
    hasList: boolean,
    squareWidth: string,
    lang: string,
    token?: string,
    selected?: string[],
    setSelected?: Function,
}

const NavButton = ({styles, source, width, height, alt, items, hasList, squareWidth, lang, selected, setSelected}: NavConfig) => {
    const [show, setShow] = useState(false);
    const ref = useRef(null);
    if (!Array.isArray(items)) items = [items];

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
        <div onClick={() => setShow(true)} className={styles.NavButton} ref={ref}>
            <Image src={source} alt={alt} width={width} height={height}/>
            {show && hasList &&
                <>
                    <div className={styles.triangle}></div>
                    <div className={`${styles.list} ${styles['list-' + lang]}`}
                         style={{width: squareWidth ?? '100px'}}>
                        {
                            items.map((item: { type: string; title: string; onClick: any; color: any, icon: string, data: object }, idx: number) => {
                                switch (item.type) {
                                    case 'button':
                                        return (
                                            <div key={uuidV4()} style={{color: item.color ?? 'black'}}>
                                                <button onClick={item.onClick}>{item.title}</button>
                                                {idx != items.length - 1 ? <hr className={styles.hr}/> : ''}
                                            </div>
                                        );
                                    case 'text':
                                        return (
                                            <div key={uuidV4()}>
                                                <p>{item.title}</p>
                                                {idx != items.length - 1 ? <hr className={styles.hr}/> : ''}
                                            </div>
                                        );
                                    case 'box':
                                        return (<NavBox key={uuidV4()} onClick={item.onClick} text={item.title}
                                                        icon={item.icon ?? 'test.svg'}></NavBox>);
                                    case 'filter-box':
                                        return (<FilterBox key={uuidV4()} selected={selected} setSelected={setSelected} data={item.data}></FilterBox>);
                                    default:
                                        return '';
                                }
                            })
                        }
                    </div>
                </>
            }
        </div>
    );
}

export default NavButton;