import { ColumnConfig, User } from "../../types";

export const colsConfig: ColumnConfig<User>[] = [
    {
        key: 'id',
        label: 'ID',
    },
    {
        key: 'firstName',
        label: 'First Name',
        render: (item) => item.firstName,
        stickyFirst: true,
    },
    {
        key: 'lastName',
        label: 'Last Name',
        render: (item) => item.lastName
    },
    {
        key: 'maidenName',
        label: 'Maiden Name',
        render: (item) => item.maidenName
    },
    {
        key: 'email',
        label: 'Email',
        render: (item) => item.email
    },
    {
        key: 'username',
        label: 'Username',
        render: (item) => item.username
    },
    {
        key: 'birthDate',
        label: 'Birth Date',
        render: (item) => item.birthDate
    },
    {
        key: 'university',
        label: 'University',
        render: (item) => item.university
    },
    {
        key: 'ein',
        label: 'EIN',
        render: (item) => item.ein
    },
    {
        key: 'eyeColor',
        label: 'Eye Color',
        render: (item) => item.eyeColor
    },
    {
        key: 'gender',
        label: 'Gender',
        render: (item) => item.gender
    },
    {
        key: 'phone',
        label: 'Phone',
        render: (item) => item.phone
    },
    {
        key: 'role',
        label: 'Role',
        render: (item) => item.role
    },
];