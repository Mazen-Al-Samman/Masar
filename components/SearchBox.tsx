import Image from "next/image";

interface SearchData {
    lang: string,
    placeholder: string,
    styles: any,
    search: string,
    setSearch: Function
}

export default function SearchBox({lang, placeholder, styles, search, setSearch}: SearchData) {
    return (
        <div className={`${styles.searchBox} ${styles['searchBox-' + lang]}`}>
            <Image className={styles.searchIcon} src="/icons/search.svg" alt="Search Icon" width={20} height={20}/>
            <input onChange={(e) => setSearch(e.target.value)} value={search} type="search" placeholder={placeholder}/>
        </div>
    );
}