import Image from "next/image";
import style from './style.module.css';

interface PageData {
    showFailed: Function,
}

const Failed = ({showFailed}: PageData) => {

    const redirect = (e: any) => {
        e.preventDefault();
        showFailed(false)
    }

    return (
        <div className={`${style.mainDiv}`}>
            <div className={style.img}>
                <Image src={`/icons/error.svg`} alt="Success Image" layout='fill' objectFit='contain'></Image>
            </div>
            <p className={`${style.mainMsg} text-danger`}>Something wrong</p>
            <p className={`${style.subMsg}`}>Please try again</p>
            <button onClick={redirect} className={style.redirectBtn}>Try again</button>
        </div>
    )
}
export default Failed;