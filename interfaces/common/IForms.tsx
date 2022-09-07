export interface IDepartmentForm {
    id?: string | number;
    title_en?: string;
    title_ar?: string;
    owner_id?: number;
    company_id?: string | number | null;
}

export interface IProcessForm {
    id?: string | number;
    owner_id?: string;
    department_id?: string | number;
    title_en?: string;
    title_ar?: string;
    narrative_en?: string;
    narrative_ar?: string;
    policy_en?: string;
    policy_ar?: string;
}