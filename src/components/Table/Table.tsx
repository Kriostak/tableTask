
import { ColumnConfig, User } from '../../types';
import clsx from 'clsx';

interface TableProps {
    users: User[];
    columns: ColumnConfig<User>[];
}

export function Table({ users, columns }: TableProps) {
    return (
        <div className="overflow-auto max-h-[calc(100vh-125px)]">
            <table className="min-w-full border-collapse">
                <thead className="bg-gray-100 relative z-1">
                    <tr>
                        {columns.map(col => (
                            <th
                                key={col.key}
                                className={clsx(
                                    'py-2 px-4 text-left sticky top-0 bg-gray-100 min-w-[200px]',
                                    col.stickyFirst && 'left-0 z-1'
                                )}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="relative z-0">
                    {users.map(u => (
                        <tr key={u.id}>
                            {columns.map(col => (
                                <td
                                    key={col.key}
                                    className={clsx(
                                        'py-2 px-4 min-w-[200px]',
                                        col.stickyFirst && 'sticky left-0 bg-white z-1'
                                    )}
                                >
                                    {col.render && col.render(u)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}