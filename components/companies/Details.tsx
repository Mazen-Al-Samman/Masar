import NewCompany from "./NewCompany";

interface Config {
    type: string
}

const Details = ({type}: Config) => {
    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            width: '552px',
            height: '185px',
            borderRadius: '12px',
            boxShadow: '0px 20px 50px rgba(4, 37, 46, 0.08)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {renderBlock(type)}
        </div>
    )
}

function renderBlock(type: string) {
    switch (type) {
        case 'new': return <NewCompany></NewCompany>;
    }
}

export default Details;