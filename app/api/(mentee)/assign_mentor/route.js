import { NextResponse } from 'next/server'
import pool from '@/app/db/db'

// assign mentor to the mentee using mentor's unique id

export async function POST(request) {
    try{
        const body = await request.json()
        const {mentee_email, join_code} = body

        const assign_mentor = await pool.query("UPDATE mentee SET mentor_id = (SELECT mentor_id from mentor WHERE join_code = $1) WHERE mentee_email = $2", [join_code, mentee_email])

        return NextResponse.json(
            {
                success: true,
                message: "Mentor Assigned Successfully",
                status: 200,
                assign_mentor
            }
        )
    }
    catch(error){
        // console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}