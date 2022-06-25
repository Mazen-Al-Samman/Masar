import Image from 'next/image';
export function SearchBox(props: { lang: string; translation: any; styles: any; }) {
    const { lang, translation, styles } = props;
    return (
        <div className={`${styles.searchBox} ${styles['searchBox-' + lang]} ${styles['font-' + lang]}`}>
            <Image className={styles.searchIcon} src="/icons/search.svg" alt="Search Icon" width={20} height={20} />
            <input type="search" placeholder={translation.search} />
        </div>
    );
}

export function NavButton(props: { styles: any; source: any; width: any; height: any; alt: any; items: any; }) {
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
                                    <div>
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