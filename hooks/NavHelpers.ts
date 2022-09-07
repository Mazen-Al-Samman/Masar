import {isSuperAdmin} from "./User";
import {useTheme} from "./theme";

export const defaultNavItems = () => {
    const {translation} = useTheme();
    if (isSuperAdmin()) {
        return [
            {
                title: translation.home,
                link: '/super-admin'
            },
            {
                title: translation.allCompanies,
                link: '/super-admin/companies'
            }
        ];
    }

    return [
        {
            title: translation.home,
            link: '/admin'
        },
        {
            title: 'Departments',
            link: '/admin/departments'
        },
        {
            title: 'Risk',
            link: '/admin/risk'
        },
        {
            title: 'Auditing',
            link: '/admin'
        },
        {
            title: 'Strategy',
            link: '/admin/strategy'
        },
        {
            title: 'Users',
            link: '/admin/users'
        }
    ]
}