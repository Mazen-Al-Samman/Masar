import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';
import NavBox from "./NavBox";

export default function NavButton(props: { styles: any; source: any; width: any; height: any; alt: any; items: any; hasList: boolean; squareWidth: string, onShowList: (name: string) => void, shownList: string, listName: string, lang: string }) {
    const { styles, source, width, height, alt, items } = props;
    return (
        <div onClick={() => props.onShowList(props.listName)} className={styles.NavButton}>
            <Image src={source} alt={alt} width={width} height={height} />
            {props.shownList == props.listName && props.hasList &&
                <>
                    <div className={styles.triangle}></div>
                    <div className={`${styles.list} ${styles['list-' + props.lang]}`} style={{ width: props.squareWidth ?? '100px' }}>
                        {
                            items.map((item: { type: string; title: string; onClick: any; color: any, icon: string }, idx: number) => {
                                switch (item.type) {
                                    case 'button':
                                        return (
                                            <div key={uuidv4()} style={{ color: item.color ?? 'black' }}>
                                                <button onClick={item.onClick}>{item.title}</button>
                                                {idx != items.length - 1 ? <hr className={styles.hr} /> : ''}
                                            </div>
                                        );
                                    case 'text':
                                        return (
                                            <div key={uuidv4()}>
                                                <p>{item.title}</p>
                                                {idx != items.length - 1 ? <hr className={styles.hr} /> : ''}
                                            </div>
                                        );
                                    case 'box':
                                        return (<NavBox key={uuidv4()} onClick={item.onClick} text={item.title} icon={item.icon ?? 'test.svg'}></NavBox>);
                                    default: return '';
                                }
                            })
                        }
                    </div>
                </>
            }
        </div>
    );
}