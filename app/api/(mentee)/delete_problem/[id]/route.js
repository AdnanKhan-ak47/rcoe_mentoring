import { NextResponse } from 'next/server'
import pool from '@/app/db/db'
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')

export async function DELETE(request, {params}) {
    try{
        const id = params.id
        const del_problem = await pool.query("DELETE FROM problem WHERE problem_id = $1",[id])

        return NextResponse.json(
            {
                success: true,
                message: "Problem Deleted!!",
                status: 200,
                del_problem
            }
        )
    }
    catch(error){
        // console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}