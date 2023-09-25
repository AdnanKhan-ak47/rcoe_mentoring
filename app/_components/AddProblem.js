import React, { useContext, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProblemContext from '../_context/problems/problemContext';

const AddProblem = ({ isVisible, onClose }) => {

    const context = useContext(ProblemContext)
    const {setUpdate} = context

    const addProblem = async (title, description) => {
        const token = JSON.parse(localStorage.getItem('user')).token

        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/add_problem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ problem_title: title, problem_description: description, token: token })
        })


        if (response.success) {
            console.log(response)
            toast.success('Problem Added!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        // else {
        //     toast.error('Incorrect Credentials!', {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "dark",
        //     });
        // }

        setUpdate((prevState) => !prevState)
    }

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const handleChange = (e) => {
        if (e.target.name == 'title') {
            setTitle(e.target.value)
        }
        else if (e.target.name == 'description') {
            setDescription(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addProblem(title, description)
        refClose.current.click()
        setTitle("")
        setDescription("")
    }

    const refClose = useRef(null)


    if (!isVisible) return null;
    return (
        <>
            <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
                <div className='w-[600px] flex flex-col'>
                    <button ref={refClose} className='text-white text-xl place-self-end' onClick={() => onClose()}>X</button>
                    <div className='bg-white p-2 rounded'>
                        <div className='m-10'>
                            <form onSubmit={handleSubmit}>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input value={title} onChange={handleChange} type="text" name="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Problem Title</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input value={description} type="text" onChange={handleChange} name="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Problem Description</label>
                                </div>
                                {/* <div className="relative z-0 w-full mb-6 group">
                                <input type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                            </div> */}
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProblem