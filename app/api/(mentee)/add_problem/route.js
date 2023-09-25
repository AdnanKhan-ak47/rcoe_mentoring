import { NextResponse } from 'next/server'
import pool from '@/app/db/db'
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')

export async function POST(request) {
    try{
        const body = await request.json()
        const {problem_title, problem_description, token} = body

        const mentee_id = jwt.verify(token, process.env.JWT_SECRET).user.id

        const date = new Date()
        const date_start = date.toLocaleDateString("en-GB")

        const new_problem = await pool.query("INSERT INTO problem (problem_title, problem_description, date_start, is_solved, mentee_id, mentor_id) VALUES($1, $2, $3, $4, $5, ( SELECT mentor_id FROM mentee WHERE mentee_id = $5))",
        [problem_title, problem_description, date_start, false, mentee_id])


        return NextResponse.json(
            {
                success: true,
                message: "Mentee Problem Created Successfully",
                status: 200,
                new_problem
            }
        )
    }
    catch(error){
        // console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}