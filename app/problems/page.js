'use client'
import React, { useContext, useEffect, useState } from 'react'
import ProblemItem from '../_components/problem_item'
import ProblemContext from '../_context/problems/problemContext'
import AddProblem from '../_components/AddProblem'

const Problems = () => {
    const context = useContext(ProblemContext)
    const { problems, getProblems, update } = context
    useEffect(() => {
        getProblems()
        console.log(problems)
    }, [update])

    const [showModal, setSetshowModal] = useState(false);

    return (
        <>
            <AddProblem isVisible={showModal} onClose={() => setSetshowModal(false)} />
            <div className='flex flex-row justify-end mt-2'>
                <button onClick={() => setSetshowModal(true)} type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
                    Add Problem
                </button>
            </div>
            <div className='pt-5'>
                {problems.map((problem) => {
                    return <ProblemItem key={problem.problem_id} id={problem.problem_id} title={problem.problem_title} description={problem.problem_description} date_start={problem.date_start} is_solved={problem.is_solved} />
                })}
            </div>
        </>
    )
}

export default Problems