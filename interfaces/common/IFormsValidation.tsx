export interface IDepartmentValidations {
    title_en?: string;
    title_ar?: string;
    owner_id?: string;
}

export interface IProcessValidation {
    owner_id?: string;
    department_id?: string;
    title_en?: string;
    title_ar?: string;
    narrative_en?: string;
    narrative_ar?: string;
    policy_en?: string;
    policy_ar?: string;
}