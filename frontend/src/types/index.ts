export interface User{
    username:string,
    email:string
}
export interface contentItem{
    title:string,
    description?:string,
    link:string,
    tags:string[],
    contentType:"youtube"|"twitter"|"link",
    createdAt:string
}