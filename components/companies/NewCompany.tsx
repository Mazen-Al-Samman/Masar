import Image from "next/image";
import Link from "next/link";

const NewCompany = () => {
    return (
        <div style={{
            fontSize: '24px',
            fontWeight: '700',
            display: 'flex',
            justifyContent: 'space-between',
            width: '50%'
        }}>
            <Image src={`/icons/plus.svg`} width={24} height={24}></Image>
            <Link href={`companies/new`}>Add new Company</Link>
        </div>
    )
}

export default NewCompany;