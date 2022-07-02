import MainProps from '../../interfaces/MainProps';
import Box from '../../components/Box';

export default function Home({ lang }: MainProps) {
    return (
        <div style={{ padding: '0px 156px', display: 'flex', justifyContent: 'space-between' }}>
            <Box width='264px' height='349px' type='text'></Box>
            <Box width='408px' height='349px' type='text'></Box>
            <Box width='408px' height='349px' type='text'></Box>
        </div>
    );
}