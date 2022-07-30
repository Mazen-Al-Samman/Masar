import Image from "next/image";
import {v4 as uuidv4} from 'uuid';
import NavBox from "./NavBox";
import FilterBox from '../components/FilterBox'

interface NavConfig {
    styles: any,
    source: any,
    width: any,
    height: any,
    alt: any,
    items: any,
    hasList: boolean,
    squareWidth: string,
    onShowList: (name: string) => void,
    shownList: string,
    listName: string,
    lang: string,
    token?: string,
}

const NavButton = ({
                       styles,
                       source,
                       width,
                       height,
                       alt,
                       items,
                       hasList,
                       squareWidth,
                       onShowList,
                       shownList,
                       listName,
                       lang
                   }: NavConfig) => {

    if (!Array.isArray(items)) items = [items];
    return (
        <div onClick={() => onShowList(listName)} className={styles.NavButton}>
            <Image src={source} alt={alt} width={width} height={height}/>
            {shownList == listName && hasList &&
                <>
                    <div className={styles.triangle}></div>
                    <div className={`${styles.list} ${styles['list-' + lang]}`}
                         style={{width: squareWidth ?? '100px'}}>
                        {
                            items.map((item: { type: string; title: string; onClick: any; color: any, icon: string, data: object }, idx: number) => {
                                switch (item.type) {
                                    case 'button':
                                        return (
                                            <div key={uuidv4()} style={{color: item.color ?? 'black'}}>
                                                <button onClick={item.onClick}>{item.title}</button>
                                                {idx != items.length - 1 ? <hr className={styles.hr}/> : ''}
                                            </div>
                                        );
                                    case 'text':
                                        return (
                                            <div key={uuidv4()}>
                                                <p>{item.title}</p>
                                                {idx != items.length - 1 ? <hr className={styles.hr}/> : ''}
                                            </div>
                                        );
                                    case 'box':
                                        return (<NavBox key={uuidv4()} onClick={item.onClick} text={item.title}
                                                        icon={item.icon ?? 'test.svg'}></NavBox>);
                                    case 'filter-box':
                                        return (<FilterBox data={item.data}></FilterBox>);
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