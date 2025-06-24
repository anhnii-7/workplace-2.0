export type User = {
    id: string
    email: string
    name: string
    lastName: string
    role : "new" | "old" | "mentor",
    password: string
    hobby: string[]
    job: string
    createdAt?: Date
    updatedAt?: Date
}

export type JobTitle = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
}

export type Department = {
    id: string
}