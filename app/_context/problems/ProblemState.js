'use client'
import React, { useState } from 'react'
import ProblemContext from './problemContext'
import { Noto_Sans_Anatolian_Hieroglyphs } from 'next/font/google'
const jwt = require('jsonwebtoken')



const ProblemState = (props) => {
    const host = process.env.NEXT_PUBLIC_HOST

    const [problems, setProblems] = useState([])
    const [update, setUpdate] = useState(false)

    const getProblems = async () => {
        const response = await fetch(`${host}/api/mentee_problems`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "token": JSON.parse(localStorage.getItem('user')).token
            },
        });

        const res = await response.json()
        console.log(res.problems)
        setProblems(res.problems)
    }

    const addProblem = async (title, description) => {
        const token = JSON.parse(localStorage.getItem('user')).token

        const response = await fetch(`${host}/api/add_problem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({problem_title: title, problem_description: description, token: token})
        })
    }

    return (
        <ProblemContext.Provider value={{ update, setUpdate, problems, getProblems, addProblem }}>
            {props.children}
        </ProblemContext.Provider>
    )
}

export default ProblemState