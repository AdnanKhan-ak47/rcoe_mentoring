import { NextResponse } from 'next/server'
import pool from '@/app/db/db'
const CryptoJS = require("crypto-js")

export async function POST(request) {
    try{
        const body = await request.json();
        const { mentor_email, mentor_password, fullName } = body;
        console.log( mentor_email, fullName, mentor_password)
        let user = await pool.query('Select mentor_email from mentor WHERE mentor_email = $1', [mentor_email]);
        console.log(user)
        if(user.rows.length > 0){
            return NextResponse.json({error: "User already Exists."}, {status: 400})
        }
        const hashed_pass = CryptoJS.AES.encrypt(mentor_password, process.env.SECRET_KEY).toString()

        const new_user = await pool.query('INSERT INTO mentor(mentor_email, mentor_password, mentor_name) VALUES ($1, $2, $3)', [mentor_email, hashed_pass, fullName])

        // console.log("success")

        return NextResponse.json(
            {
                success: true,
                message: "User Created Successfully",
                status: 200,
                new_user
            }
        )
    }
    catch(error){
        // console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}