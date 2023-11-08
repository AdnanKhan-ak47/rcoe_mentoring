import { NextResponse } from 'next/server'
import pool from '@/app/db/db'
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')


export async function POST(request) {
    try{
        const body = await request.json();
        const { mentee_email, mentee_password } = body;
        console.log(body)
        console.log( mentee_email)

        const user = await pool.query('SELECT * FROM mentee WHERE mentee_email = $1', [mentee_email])
        console.log(user)
        if(user.rows.length == 0){
            return NextResponse.json({error: "User does not Exists."}, {status: 400})
        }
        // console.log(user.rows[0]['mentee_password'])
        const decrypted_pass = CryptoJS.AES.decrypt(user.rows[0]['mentee_password'], process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)

        if(decrypted_pass != mentee_password){
            return NextResponse.json({error: "Incorrect Password! Try again!"}, {status: 400})
        }
        const isMentorAssigned = (user.rows[0]['mentor_id'] == null) ? false : true ;

        const data = {
            user: {
                id: user.rows[0]['mentee_id'],
                email: user.rows[0]['mentee_email'],
                name: user.rows[0]['mentee_name']
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);

        
        return NextResponse.json(
            {
                success: true,
                message: "User Logged in Successfully",
                status: 200,
                authtoken,
                user: {
                    name: user.rows[0]['mentee_name'],
                    email: user.rows[0]['mentee_email'],
                    isMentorAssigned: isMentorAssigned
                }
            }
        )
    }
    catch(error){
        // console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}