import Image from "next/image";
import Link from "next/link";

const NewCompany = () => {
    return (
        <div style={{
            fontSize: '24px',
            fontWeight: '700',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
        }}>
            <div style={{marginInlineEnd: '20px', marginTop: '2px'}}>
                <Image src={`/icons/plus.svg`} width={24} height={24}></Image>
            </div>
            <p>Add new Company</p>
        </div>
    )
}

export default NewCompany;