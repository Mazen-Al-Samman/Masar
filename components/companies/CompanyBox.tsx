import Image from "next/image";

export interface config {
    description?: string,
    title?: string,
    logo?: string,
    number_of_employees?: string,
    city?: string,
    country?: string,
    owner?: string,
    id?: number | string
}

const styles = {
    mainDiv: {
        padding: '24px',
        display: 'flex',
        justifyContent: 'left'
    },
    span: {
        color: '#04252E',
        marginInlineStart: '8px',
        fontSize: '14px',
        letterSpacing: '1px',
        marginTop: '3px'
    }
}

const CompanyBox = ({logo, description, title, country, city, number_of_employees}: config) => {
    return (
        <div style={styles.mainDiv}>
            <div style={{width: '75px', position: 'relative'}}>
                <Image
                    src={logo ?? '/icons/employee.svg'}
                    layout='fill' objectFit='contain'></Image>
            </div>
            <div style={{marginInlineStart: '24px', width: '80%'}}>
                <h1 style={{fontSize: '16px', fontWeight: '700'}}>{title}</h1>
                <p style={{fontSize: '14px', fontWeight: '400', color: '#4F666D', marginTop: '8px'}}>{`${description?.substring(0, 100)}...`}</p>

                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', justifyContent: 'left'}}>
                        <Image src={`/icons/employee.svg`} width={24} height={24}></Image>
                        <span style={styles.span}>{`${number_of_employees} Employee`}</span>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'left', marginInlineStart: '28px'}}>
                        <Image src={`/icons/location.svg`} width={24} height={24}></Image>
                        <span style={styles.span}>{`${country}, ${city}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CompanyBox;