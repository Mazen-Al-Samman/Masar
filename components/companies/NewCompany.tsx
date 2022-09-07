import Image from "next/image";

interface config {
    data: ConfigData
}

interface ConfigData {
    title?: string;
}

const NewCompany = ({data}: config) => {
    const {title} = data;
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
            <p>{title}</p>
        </div>
    )
}

export default NewCompany;