import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const BASE_URL_API = 'http://localhost:5000/api';

const AddNewCategory = ({ handleCloseClick, refreshAction }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const resetFormValuesDefault = () => {
        setName('');
        setDescription('');
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (name !== '' && description !== '') {
            const json = JSON.stringify({ name, description });
            try {
                const res = await axios.post(`${BASE_URL_API}/categories`, json, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (res.status < 300) {
                    toast.success(`Successfully added ${name}!`);
                    refreshAction();
                    resetFormValuesDefault();
                }
            } catch (error) {
                console.error(error);
                toast.error('An error occurred');
            }
        } else {
            toast.error('Content cannot be empty!');
        }
    };

    return (
        <div className='bg-blackOverlay z-20 h-screen w-screen absolute flex flex-row justify-center items-center'>
            <Toaster position='bottom-center' reverseOrder={false} />
            <div className='bg-white h-min relative px-8 py-7 w-1/3'>
                <button
                    onClick={handleCloseClick}
                    aria-label='Close'
                    className='absolute rounded-full w-fit h-fit right-2 top-2'
                >
                    <Image src='/assets/icons/closeButton.png' alt='Close button' width={24} height={24} />
                </button>
                <h4 className='text-blackDark font-bold text-[22px]'>Add new Category</h4>
                <form onSubmit={handleSubmitForm} className='flex flex-col gap-2 mt-4'>
                    <label htmlFor='name'>Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='mx-1 border-2 px-2 py-1 text-blackPrimary border-[rgba(29, 36, 46, 1)] focus:outline-none'
                        type='text'
                        placeholder='Category name'
                        name='name'
                        id='name'
                    />
                    <label htmlFor='description'>Description:</label>
                    <textarea
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='mx-1 border-2 px-2 py-1 text-blackPrimary border-[rgba(29, 36, 46, 1)] focus:outline-none'
                        placeholder='Category description'
                        name='description'
                        id='description'
                    />
                    <input
                        className='cursor-pointer mt-4 text-white w-fit px-6 py-2 bg-orange'
                        type='submit'
                        value='Add category'
                    />
                </form>
            </div>
        </div>
    );
};

export default AddNewCategory;

export default AddNewCategory
