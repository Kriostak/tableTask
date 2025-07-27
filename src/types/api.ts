
export interface ApiResponse<T> {
    users: T[]
    total: number
    page: number
    limit: number
}


export interface GetUsersParams {
    page: number
    limit: number
    search?: string
}