import Image from "next/image";
export default function SearchBox(props: { lang: string; translation: any; styles: any; }) {
    const { lang, translation, styles } = props;
    return (
        <div className={`${styles.searchBox} ${styles['searchBox-' + lang]} ${styles['font-' + lang]}`}>
            <Image className={styles.searchIcon} src="/icons/search.svg" alt="Search Icon" width={20} height={20} />
            <input type="search" placeholder={translation.search} />
        </div>
    );
}