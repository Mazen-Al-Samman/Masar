import Details from "../../../components/companies/Details";
import {HandleRequestSSR} from "../../api/Handler";
import {Col, Container, Row} from 'react-bootstrap';
import {useLayoutEffect} from "react";
import MainProps from "../../../interfaces/MainProps";
import {v4 as uuidV4} from 'uuid';
import Image from "next/image";

interface PageProps {
    filtersData: object
}

const Companies = ({data, setButtons, filtersData, setFilter, selected, setSelected}: (MainProps & PageProps)) => {
    // @ts-ignore
    let filteredCompanies = [...data];
    for (let selectedFilter in selected) {
        if (!selected[selectedFilter].length) {
            filteredCompanies = data;
            continue;
        }
        let filterValues = selected[selectedFilter];
        // @ts-ignore
        filteredCompanies = filteredCompanies.filter((company) => filterValues.includes(company[selectedFilter]));
    }

    // @ts-ignore
    let indexedFilterArray = [];
    for (let filterKey in filtersData) {
        // @ts-ignore
        indexedFilterArray[filtersData[filterKey]['filter_key']] = filtersData[filterKey]['data'];
    }

    useLayoutEffect(() => {
        setButtons(['search', 'language', 'filter', 'logout']);
        setFilter(filtersData);
    }, []);

    const removeSelected = (key: string, value: string) => {
        let selectedValues = {...selected};
        // @ts-ignore
        let selectedKeyValues = selectedValues[key];
        selectedKeyValues = selectedKeyValues && selectedKeyValues.filter((item: string) => item != value);
        // @ts-ignore
        selectedValues[key] = selectedKeyValues;
        setSelected(selectedValues);
    }

    return (
        <div>
            <Container>
                <Row style={{display: 'flex', justifyContent: 'center'}}>
                    <Col lg={12}
                         style={{marginBottom: '10px', display: 'flex', justifyContent: 'left'}}>
                        {
                            selected && Object.keys(selected).map((filter) => {
                                // @ts-ignore
                                return selected[filter].map((item: string) => {
                                    // @ts-ignore
                                    return <div key={uuidV4()} style={{
                                        border: '1px solid #E6E9EA',
                                        padding: '9px 16px',
                                        borderRadius: '100px',
                                        marginInline: '10px',
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        letterSpacing: '1px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        height: '40px',
                                        minWidth: '120px'
                                    }}>
                                        <p style={{marginRight: '10px', marginTop: '1px'}}>
                                            {
                                                // @ts-ignore
                                                indexedFilterArray && indexedFilterArray[filter].filter((filterItem) => filterItem.id == item)[0]?.title
                                            }
                                        </p>
                                        <Image onClick={() => removeSelected(filter, item)} src={'/icons/clear.svg'}
                                               width={22}
                                               height={22} alt='Clear Filter'></Image>
                                    </div>
                                })
                            })
                        }
                    </Col>

                    <Col lg={6} style={{marginBottom: '24px'}}>
                        <Details type={`new`}></Details>
                    </Col>
                    {
                        filteredCompanies &&
                        filteredCompanies.map((company: any) => {
                            const {title, description, number_of_employees, country, city, logo} = company;
                            return (
                                <Col key={uuidV4()} lg={6} sm={12} md={12} style={{marginBottom: '24px'}}>
                                    <Details type={`company`} data={
                                        {
                                            title,
                                            description,
                                            number_of_employees,
                                            country,
                                            city,
                                            logo,
                                        }
                                    }></Details>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </div>
    )
}

export async function getServerSideProps(ctx: any) {
    const companiesFilter = HandleRequestSSR({
        url: '/filter?type=1',
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    })

    const [filters] = await Promise.all([
        companiesFilter
    ]);

    const companiesDataReq = HandleRequestSSR({
        url: '/company',
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    })

    const [companies] = await Promise.all([
        companiesDataReq
    ]);

    return {
        props: {
            data: companies?.data,
            filtersData: filters?.data
        }
    };
};

export default Companies;