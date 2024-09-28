
export interface IUSER{
    name:string;
    email:string;
    password:string;
    image:string;
    address:string;
    gender:'Male'|'Female'|'Other';
    role:'USER'|"ADMIN";
    phoneNumber:string;
}