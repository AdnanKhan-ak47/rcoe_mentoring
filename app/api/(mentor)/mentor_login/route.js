import { NextResponse } from 'next/server'
import pool from '@/app/db/db'
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')

export async function POST(request) {
    try{
        const body = await request.json();
        const { mentor_email, mentor_password } = body;
        console.log( mentor_email)

        const user = await pool.query('SELECT * FROM mentor WHERE mentor_email = $1', [mentor_email])
        // console.log(user)
        if(user.rows.length == 0){
            return NextResponse.json({error: "User does not Exists."}, {status: 400})
        }
        // console.log(user.rows[0]['mentor_password'])
        const decrypted_pass = CryptoJS.AES.decrypt(user.rows[0]['mentor_password'], process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)

        if(decrypted_pass != mentor_password){
            return NextResponse.json({error: "Incorrect Password! Try again!"}, {status: 400})
        }

        const data = {
            user: {
                id: user.rows[0]['mentor_id']
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);


        return NextResponse.json(
            {
                success: true,
                message: "User Logged in Successfully",
                status: 200,
                authtoken
            }
        )
    }
    catch(error){
        // console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}