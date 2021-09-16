interface Badge {
    _id: string;
    name: string;
    avatar?: string;
}
interface Park {
    _id: string;
    visited: boolean;
}
export interface User {
    _id: string;
    username: string;
    role: string;
    password: string;
    avatar?: string;
    bio?: string;
    parks_visited: number,
    parks?: Park[],
    badges?: Badge[]
}