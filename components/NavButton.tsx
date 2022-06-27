import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';
export default function NavButton(props: { styles: any; source: any; width: any; height: any; alt: any; items: any; }) {
    const { styles, source, width, height, alt, items } = props;
    return (
        <div className={styles.NavButton}>
            <Image src={source} alt={alt} width={width} height={height} />
            <div className={styles.triangle}></div>
            <div className={styles.list}>
                {
                    items.map((item: { type: string; title: string; onClick: any }, idx: number) => {
                        switch (item.type) {
                            case 'button':
                                return (
                                    <div key={uuidv4()}>
                                        <button onClick={item.onClick}>{item.title}</button>
                                        {idx != items.length - 1 ? <hr className={styles.hr} /> : ''}
                                    </div>
                                )
                            default: return '';
                        }
                    })
                }
            </div>
        </div>
    );
}