import Image from "next/image";

export interface config {
    id?: number | string,
    title?: string,
    owner?: string
}

const styles = {
    mainDiv: {
        padding: '24px',
        display: 'flex',
        justifyContent: 'left',
        gap: '44px',
        alignItems: 'center',
        width: '100%'
    }
}

const DepartmentDetails = ({title, owner, id}: config) => {
    return (
        <div style={styles.mainDiv}>
            <Image
                src={'/icons/department.svg'}
                width={100} height={100}></Image>
            <div className="mt-3">
                <h1 style={{fontSize: '24px', fontWeight: '700'}}>{title?.toUpperCase()}</h1>
                <p style={{fontSize: '18px', fontWeight: '400', color: '#365158'}}>Owner: {owner}</p>
            </div>
        </div>
    )
}
export default DepartmentDetails;