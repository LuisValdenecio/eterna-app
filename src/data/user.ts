"use server";
import { db } from "@/lib/db";

export const getUserByEmail = async (email : string) => {
   
    const user = await db.user.findUnique({
        where : {
            email 
        }
    });

    if (user) {
        return user
    } 

    return null
   
}