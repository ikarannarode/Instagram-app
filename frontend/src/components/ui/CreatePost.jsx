import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from './dialog';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import { Textarea } from './textarea';
import { Button } from './button';

import { readFileAsDataURL } from '@/lib/utils';
import { CloudCog, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

function CreatePost({ open, setOpen }) {
    const imageRef = useRef();
    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);

    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const dataUrl = await readFileAsDataURL(file);
            setImagePreview(dataUrl)
        }
    }
    const createPostHandler = async (e) => {
        const formData = new FormData();
        formData.append("caption", caption);
        if (imagePreview) formData.append("image", file)
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8000/api/v1/user/profile/edit', formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <Dialog open={open} className="outline-none border-0">
            <DialogContent onInteractOutside={() => setOpen(false)} className="outline-none border-0">
                <DialogHeader className='text-center font-semibold'>
                    Create New Post
                </DialogHeader>
                <div className='flex gap-3 items-center'>
                    <Avatar>
                        <AvatarImage src="" alt="img" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className='font-semibold text-xs'>Username</h1>
                        <span className='text-gray-600 text-xs'>Bio here...</span>
                    </div>
                </div>
                <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className='focus-visible:ring-transparent border-none' placeholder='Write a caption...' />
                {
                    imagePreview && (<div className='w-full h-64 flex items-center justify-center'>
                        <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md' />
                    </div>)
                }
                <input type="file" ref={imageRef} className='hidden' onChange={fileChangeHandler} />

                <Button onClick={() => imageRef.current.click()} className='w-fit mx-auto bg-[#0095F6] hover:bg-[#0081d8] py-2'>Select from Computer</Button>
                {
                    imagePreview && (
                        loading ? (
                            <Button>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Loading...
                            </Button>
                        ) : (
                            <Button onClick={createPostHandler} type="submit" className="w-full py-2 bg-cyan-500 hover:bg-cyan-600">Post</Button>
                        )
                    )
                }
            </DialogContent>
        </Dialog>
    )
}

export default CreatePost;