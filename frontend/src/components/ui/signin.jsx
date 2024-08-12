import React from 'react'
import "./signup.css"
function Signin() {
    return (
        <>
            <div className='w-screen h-screen flex flex-col items-center gap-2 pt-3 '>
                <form action="" className='shadow-lg flex flex-col gap-5 p-9 w-[350px] border '>
                    <div className='my-4 flex flex-col'>
                        <div className=' p-3 logo self-center'></div>
                        <p className='text-slate-600 font-semibold text-center mt-2'>Sign up to see photos and videos from your friends.</p>
                    </div>
                    <div>
                        <input type="text" name="username" id="" className=' my-2  focus-visible:border-gray-600 outline-none border-[1.6px] border-gray-400 w-full py-1.5 px-1.5 font-thin placeholder:font-normal placeholder:text-xs' placeholder='Mobile no or email address' />
                        <input type="password" name="password" id="" className=' my-2  focus-visible:border-gray-600 outline-none border-[1.6px] border-gray-400 w-full py-1.5 px-1.5 font-thin placeholder:font-normal placeholder:text-xs' placeholder='Password' />

                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-thin text-xs text-center'>
                            People who use our service may have uploaded your contact information to Instagram. <span className='text-blue-700'>Learn more</span>
                        </p>
                        <p className='font-thin text-xs text-center'>
                            By signing up, you agree to our <span className='text-blue-700'>Terms, Privacy Policy </span> and  <span className='text-blue-700'>Cookies Policy.</span>
                        </p>

                    </div>
                    <button className='btn bg-blue-400 py-1 rounded-lg text-white'>Log in</button>
                </form>

                <div className='shadow-lg flex flex-col gap-5 p-8 w-[350px] border'>
                    <h5 className='text-center text-md'>Have an account? <span className='text-blue-600 hover:cursor-pointer'>Sign up</span></h5>
                </div>
                <div className='flex flex-col gap-5 pt-2 w-[350px]'>
                    <p className='font-normal text-md text-center'>Get the app.</p>
                    <div className='flex gap-2 justify-center'>
                        <img src="/public/asset 2.png" alt="" className='w-[40%] h-15' />
                        <img src="/public/asset 3.png" alt="" className='w-[40%] h-15' />
                    </div>
                </div>
                <div className='gap-3 font-thin text-xs flex-wrap flex mt-3 justify-center'>
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

export default Signin;