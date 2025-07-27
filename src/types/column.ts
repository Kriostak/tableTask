
export interface ColumnConfig<T> {
    key: string;
    label: string;
    stickyFirst?: boolean;
    disabled?: boolean;
    render?: (item: T) => React.ReactNode;
}