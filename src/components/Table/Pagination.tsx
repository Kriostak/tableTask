import clsx from "clsx";

interface PaginationProps {
    page: number;
    total: number;
    limit: number;
    onPageChange: (p: number) => void;
    onLimitChange: (l: number) => void;
}

export function Pagination({ page, total, limit, onPageChange, onLimitChange }: PaginationProps) {
    const totalPages = Math.ceil(total / limit);

    const start = total === 0 ? 0 : (page - 1) * limit + 1
    const end = Math.min(page * limit, total)

    return (
        <div className="flex items-center justify-between items-center mt-4">
            <div>
                <select
                    value={limit}
                    onChange={e => onLimitChange(Number(e.target.value))}
                    className="border rounded px-2"
                >
                    {[10, 20, 50].map(n => (
                        <option key={n} value={n}>
                            {n} per page
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-row gap-[10px] items-center">
                <span className="text-sm">
                    {start}-{end} of {total}
                </span>

                <button className={clsx("cursor-pointer border rounded px-[5px]", page <= 1 && 'opacity-50 cursor-not-allowed')} onClick={() => onPageChange(1)} disabled={page <= 1}>
                    first
                </button>
                <button className={clsx("cursor-pointer border rounded px-[5px]", page <= 1 && 'opacity-50 cursor-not-allowed')} onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
                    prev
                </button>

                <input
                    type="number"
                    value={page}
                    min={1}
                    max={totalPages}
                    onChange={e => {
                        const val = Number(e.target.value);
                        if (!isNaN(val)) {
                            const clamped = Math.min(Math.max(val, 1), totalPages);
                            onPageChange(clamped);
                        }

                    }}
                    className="w-16 text-center border rounded"
                />

                <span>
                    of {totalPages}
                </span>

                <button className={clsx("cursor-pointer border rounded px-[5px]", page >= totalPages && 'opacity-50 cursor-not-allowed')} onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
                    next
                </button>
                <button className={clsx("cursor-pointer border rounded px-[5px]", page >= totalPages && 'opacity-50 cursor-not-allowed')} onClick={() => onPageChange(totalPages)} disabled={page >= totalPages}>
                    last
                </button>
            </div>
        </div>
    );
}