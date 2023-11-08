'use client'
import React, { useContext, useEffect, useState } from 'react'
import ProblemItem from '../../_components/problem_item'
import ProblemContext from '../../_context/problems/problemContext'
import AddProblem from '../../_components/AddProblem'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Problems = () => {
    const context = useContext(ProblemContext)
    const { problems, getProblems, update } = context
    const router = useRouter()
    const user = JSON.parse(localStorage.getItem('user'))
    const isMentorAssigned = user.user.isMentorAssigned
    // console.log(user.user.isMentorAssigned)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        if (user) {
            getProblems()
        }
        else {
            router.push('/login')
        }
    }, [update])

    const check_mentor_assigned = () => {

    }

    const [showModal, setSetshowModal] = useState(false);

    return (
        <>
            {!isMentorAssigned ?
                <div className='flex flex-col justify-center items-center'>
                    <h3>Mentor Not Assigned YEt!</h3>
                    <div>
                        <label htmlFor="mentor_code">Enter Mentor Code: </label>
                        <input name='mentor_code' type="text" />
                    </div>
                </div>
                :
                <div>
                    <AddProblem isVisible={showModal} onClose={() => setSetshowModal(false)} />
                    <div className='flex flex-row justify-end mt-2'>
                        <button onClick={() => setSetshowModal(true)} type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
                            Add Problem
                        </button>
                    </div>
                    <div className='pt-5'>
                        {problems.map((problem) => {
                            return (
                                <Link href={`${process.env.NEXT_PUBLIC_HOST}/problems/${problem.problem_id}`} key={problem.problem_id}>
                                    <ProblemItem id={problem.problem_id} title={problem.problem_title} description={problem.problem_description} date_start={problem.date_start} is_solved={problem.is_solved} />
                                </Link>
                            )
                        })}
                    </div>
                </div>}
        </>
    )
}

export default Problems