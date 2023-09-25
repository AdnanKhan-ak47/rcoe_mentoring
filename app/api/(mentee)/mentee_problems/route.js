import { NextResponse } from 'next/server'
import pool from '@/app/db/db'
import { headers } from 'next/headers'
const jwt = require('jsonwebtoken')

// assign mentor to the mentee using mentor's unique id

export async function GET(request) {
    try {
        const head = headers()
        const token = head.get('token')
        const user = jwt.verify(token, process.env.JWT_SECRET).user

        console.log(user.id)
        const problems = (await pool.query('SELECT * FROM problem WHERE mentee_id = $1', [user.id])).rows
        
        return NextResponse.json(
            {
                success: true,
                message: "Problems Fetched!",
                status: 200,
                problems
            }
        )
    }
    catch (error) {
        // console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}