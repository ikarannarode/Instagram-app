import React, { useState } from 'react'
import "./signup.css"
import { toast } from 'sonner';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './button';
import { Loader2 } from 'lucide-react';
function Login() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const changeEventHanlder = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:8000/api/v1/user/login", input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/");
                setInput({
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className='w-screen h-screen flex flex-col items-center gap-2 pt-3 '>
                <form onSubmit={loginHandler} className='shadow-lg flex flex-col gap-5 p-8 w-[350px] border '>
                    <div className='my-4 flex flex-col'>
                        <div className=' p-3 logo self-center'></div>
                    </div>
                    <div>
                        <input type="email" name="email" id="" value={input.email} onChange={changeEventHanlder} className=' my-2  focus-visible:border-gray-600 outline-none border-[1.6px] border-gray-400 w-full py-2.5 px-1.5 text-xs font-medium placeholder:font-normal placeholder:text-xs' placeholder='Mobile no or email address' />
                        <input type="password" name="password" value={input.password} onChange={changeEventHanlder} id="" className=' my-2  focus-visible:border-gray-600 outline-none border-[1.6px] border-gray-400 w-full py-2.5 px-1.5 font-medium text-xs placeholder:font-normal placeholder:text-xs' placeholder='Password' />

                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-thin text-xs text-center'>
                            People who use our service may have uploaded your contact information to Instagram. <span className='text-blue-700'>Learn more</span>
                        </p>
                        <p className='font-thin text-xs text-center'>
                            By signing up, you agree to our <span className='text-blue-700'>Terms, Privacy Policy </span> and  <span className='text-blue-700'>Cookies Policy.</span>
                        </p>

                    </div>
                    {
                        loading ? (
                            <Button className="bg-blue-300 hover:bg-blue-500 py-1.5 rounded-md">
                                <Loader2 className='mr-2 h-4 animate-spin' />
                                Loading...
                            </Button>
                        ) : (
                            <button className='btn bg-blue-400 py-1 rounded-md text-white hover:bg-blue-500'>Login</button>
                        )
                    }
                </form>

                <div className='shadow-lg flex flex-col gap-5 p-8 w-[350px] border'>
                    <h5 className='text-center'>Don't have an account? <Link to="/signup"><span className='text-blue-600 hover:cursor-pointer'>Sign up</span></Link></h5>
                </div>
                <div className='flex flex-col gap-5 pt-2 w-[350px]'>
                    <p className='font-normal text-center'>Get the app.</p>
                    <div className='flex gap-2 justify-center'>
                        <img src="/asset 2.png" alt="" className='w-[40%] h-15' />
                        <img src="/asset 3.png" alt="" className='w-[40%] h-15' />
                    </div>
                </div>
                <div className='gap-3 font-thin text-xs flex-wrap flex mt-5 justify-center '>
                    <p>Meta</p>
                    <p>About</p>
                    <p>Blog</p>
                    <p>Jobs</p>
                    <p>Help</p>
                    <p>API</p>
                    <p>Privacy</p>
                    <p>Terms</p>
                    <p>Locations</p>
                    <p>Instagram Lite</p>
                    <p>Threads</p>
                    <p>Contact uploading and non-users</p>
                    <p>Meta Verified</p>
                </div>
                <div className='gap-3 font-thin text-xs flex-wrap flex mt-3 justify-center pb-4'>


                    <span>English (UK)</span>
                    <span>© 2024 Instagram from Meta</span>
                </div>
            </div>
        </>
    )
}

export default Login;