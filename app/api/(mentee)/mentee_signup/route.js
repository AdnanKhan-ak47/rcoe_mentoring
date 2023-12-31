import { NextResponse } from 'next/server'
import pool from '@/app/db/db'
const CryptoJS = require("crypto-js")

export async function POST(request) {
    try{
        const body = await request.json();
        const { email, password, fullName, department, year } = body;
        console.log(email, password, fullName, department, year)
        let user = await pool.query('Select mentee_email from mentee WHERE mentee_email = $1', [email]);
        console.log(user)
        if(user.rows.length > 0){
            return NextResponse.json({error: "User already Exists."}, {status: 400})
        }
        const hashed_pass = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString()

        const new_user = await pool.query('INSERT INTO mentee(mentee_email, mentee_password, mentee_name, mentee_department, mentee_year) VALUES ($1, $2, $3, $4, $5)', [email, hashed_pass, fullName, department, year])

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