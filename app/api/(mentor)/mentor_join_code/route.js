import { NextResponse } from 'next/server'
import pool from '@/app/db/db'

// assign mentor to the mentee using mentor's unique id

export async function PUT(request) {
    try{
        const body = await request.json()
        const {mentor_email, new_code} = body
        let user = await pool.query("UPDATE mentor SET join_code = $1 WHERE mentor_email = $2", [new_code, mentor_email])

        return NextResponse.json(
            {
                success: true,
                message: "Joining Code Updated Successfully",
                status: 200,
                user
            }
        )
    }
    catch(error){
        // console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}