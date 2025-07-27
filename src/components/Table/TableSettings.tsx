import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import { ColumnConfig, User } from '../../types';

const ALL_COLUMNS: ColumnConfig<User>[] = [
    { key: 'firstName', label: 'FIRST NAME', disabled: true },
    { key: 'lastName', label: 'LAST NAME', disabled: true },
    { key: 'maidenName', label: 'MAIDEN NAME', disabled: true },
    { key: 'email', label: 'EMAIL', disabled: true },
    { key: 'username', label: 'USERNAME', disabled: true },
    { key: 'university', label: 'UNIVERSITY' },
    { key: 'birthDate', label: 'BIRTH DATE' },
    { key: 'ein', label: 'EIN' },
    { key: 'eyeColor', label: 'EYE COLOR' },
    { key: 'gender', label: 'GENDER' },
    { key: 'phone', label: 'PHONE' },
    { key: 'role', label: 'ROLE' },
];

export function TableSettings(
    { setCols }:
        { setCols: (cols: string[]) => void }
) {
    const ref = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');

    const [selected, setSelected] = useLocalStorage<string[]>('cols', ALL_COLUMNS.map(c => c.key));

    useEffect(() => {
        function onClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', onClick)
        return () => document.removeEventListener('mousedown', onClick)
    }, [])


    useEffect(() => {
        setCols(selected);
    }, [selected, setCols]);

    const filtered = ALL_COLUMNS.filter(opt =>
        opt.label.toLowerCase().includes(query.toLowerCase())
    )


    function toggleOption(key: string) {
        if (selected.includes(key)) {
            setSelected(selected.filter((k: string) => k !== key));
        } else {
            setSelected([...selected, key]);
        }
    }


    return (
        <div className="relative inline-block text-left" ref={ref}>
            <button
                className="px-3 py-1 bg-white border rounded text-sm cursor-pointer"
                onClick={() => setIsOpen(open => !open)}
            >
                Settings
            </button>

            {isOpen && (
                <div className="absolute top-100% right-0 mt-1 bg-white border rounded shadow max-h-60 overflow-auto min-w-[150px]">

                    <div className="sticky top-0 bg-white px-2 pt-2 pb-1">
                        <input
                            type="text"
                            className="w-full border-b border-gray-200 pb-1 text-sm focus:outline-none"
                            placeholder="Search..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onFocus={() => setIsOpen(true)}
                        />
                    </div>

                    <ul>
                        {filtered.map(opt => (
                            <li
                                key={opt.key}
                                onClick={() => !opt.disabled && toggleOption(opt.key)}
                                className={clsx(
                                    'px-2 py-1 flex justify-between items-center',
                                    opt.disabled && 'text-gray-400 cursor-not-allowed',
                                    !opt.disabled && 'cursor-pointer',
                                    selected.includes(opt.key) && 'bg-blue-100'
                                )}
                            >
                                <span>{opt.label}</span>
                            </li>
                        ))}

                        {filtered.length === 0 && (
                            <li className="px-2 py-1 text-gray-500">No results</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )

};