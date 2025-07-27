import { useEffect, useState, useRef } from 'react';
import { fetchUsers } from '../api/users';
import { User } from '../types';
import { Table } from '../components/Table/Table';
import { TableSettings } from '../components/Table/TableSettings';
import { Pagination } from '../components/Table/Pagination';
import { colsConfig } from './UsersPage/colsConfig';

export function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [cols, setCols] = useState<string[]>([]);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            fetchUsers({ page, limit, search }).then(({ users, total }) => {
                setUsers(users);
                setTotal(total);
            });
        }, 500);

        return () => {
            timeoutRef.current && clearTimeout(timeoutRef.current);
        };
    }, [page, limit, search]);

    return (
        <div className="p-4">
            <div className="flex justify-between mb-4 relative z-2">
                <input
                    type="search"
                    placeholder="Search users..."
                    onChange={e => setSearch(e.target.value)}
                    className="border rounded px-2 py-1"
                />
                <TableSettings setCols={setCols} />
            </div>
            {users.length
                ? (<>
                    <Table
                        users={users}
                        columns={colsConfig.filter(c => cols.includes(c.key))}
                    />

                    <Pagination
                        page={page}
                        total={total}
                        limit={limit}
                        onPageChange={setPage}
                        onLimitChange={l => {
                            setLimit(l);
                            setPage(1);
                        }}
                    />
                </>)
                : <p className='text-center my-20 text-lg'>No users found</p>
            }
        </div>
    );
}