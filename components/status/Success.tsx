import Image from "next/image";
import style from './style.module.css';
import {useRouter} from "next/router";

interface PageData {
    title: string,
    subTitle: string,
    buttonLink: string,
    buttonText: string,
    showSuccess: Function,
}

const Success = ({title, subTitle, buttonLink, buttonText, showSuccess}: PageData) => {

    const router = useRouter();
    const redirect = (e: any) => {
        e.preventDefault();
        return router.push(buttonLink).then(
            showSuccess(false)
        );
    }

    return (
        <div className={`${style.mainDiv}`}>
            <div className={style.img}>
                <Image src={`/icons/success.svg`} alt="Success Image" layout='fill' objectFit='contain'></Image>
            </div>
            <p className={`${style.mainMsg}`}>{title}</p>
            <p className={`${style.subMsg}`}>{subTitle}</p>
            <button onClick={redirect} className={`${style.redirectBtn} p-3`}>{buttonText}</button>
        </div>
    )
}
export default Success;