export interface IDepartment {
    id: number | string;
    title: string;
    owner: string;
    owner_id: number | string;
    company: string;
    company_id: number | string;
}

export interface IListUser {
    id?: string | number;
    username?: string;
    position?: string;
}

export interface IKpiStatus {
    grp: string;
    count: string | number;
}

export interface IKpiStatusDetails {
    id: string | number;
    target: string;
    actual: string;
    note: string;
    status_id: string | number;
    strategic_goal_id: string | number;
    process_id: string | number;
    kpi_status: string;
    kpi_strategic_goal: string;
}

export interface IChart {
    counts?: string | number;
    percentage?: string | number;
    rating_title?: string;
}