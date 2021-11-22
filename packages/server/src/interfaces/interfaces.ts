export interface person{
    _id:string,
    password:string,
    fullName: fullName,
    age:number,
    posts:[post],
    description:string
}
interface fullName{
    firstName: string,
    lastName: string
}

export interface post{
title:string,
content:string,
link:string,
keyword:[string],
averageLikes:number,
comments:[Comment]
}

export interface Comment{
    name:string,
    email:string,
    content:string,
}