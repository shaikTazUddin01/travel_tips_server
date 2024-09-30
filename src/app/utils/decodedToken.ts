import jwt from 'jsonwebtoken'
import config from '../config'


export const decodedToken=(token:string)=>{
    return jwt.verify(token,config.accessToken_Secret as string)
}