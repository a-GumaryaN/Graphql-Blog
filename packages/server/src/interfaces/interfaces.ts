export interface person {
    _id: string,//id is username
    password: string,
    firstName: string,
    lastName: string,
    age: number,
    posts: [post],
    description: string
}

export interface post {
    title: string,
    content: string,
    link: string,
    ownerUsername: string,
    averageLikes: number,
    comments: [Comment]
}

export interface Comment {
    name: string,
    email: string,
    content: string,
}