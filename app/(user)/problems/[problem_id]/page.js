import pool from "@/app/db/db"
import { stringify } from "postcss";


async function getProblem(params) {
    const problem = await pool.query('SELECT * from problem WHERE problem_id = $1', [params.problem_id])
    return problem.rows[0];
}

const Problem = async ({ params }) => {
    const problem = await getProblem(params)
    console.log(problem)
    const date_start = Date(problem.date_start)
    return (
        <>
            <div className="m-5">
                <h1 className="text-3xl">{problem.problem_title}</h1>
                <p>{problem.problem_description}</p>
                <p>By {problem.mentor_id} on {date_start}</p>
            </div>
        </>
    )
}




export default Problem