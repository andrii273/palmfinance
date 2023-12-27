import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import * as Yup from 'yup';

import authImg from "@/public/assets/img/auth-login.png";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { instance } from "@/helpers/axios";

const Register = () => {
    const router = useRouter();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid Email').required('Email is required'),
        password: Yup.string().min(6, 'Passwrod must be at least 6 characters').required('Passwrod is required'),
        confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords does not match').required('Password is required')
    });

    // get functions to build form with useForm() hook
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        instance.post('/users', data)
            .then((res) => {
                if (res.data == 'The email is already in use.')
                    alert('The email is already in use.')
                else
                    // console.log(res.data);
                    // alert('Account created!');
                    instance.post('/users/login', { email: res.data.email, passowrd: res.data.password });
                // router.push('/auth/login');
            })
            .catch((err) => { console.log(err); });
    }

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    function toggleConfirmVisibility() {
        setIsConfirmVisible((prevState) => !prevState);
    }

    return (
        <div className="relative float-right h-full min-h-screen w-full bg-white text-black">
            <main className="mx-auto min-h-screen">
                <div className='flex absolute'>
                    <Image className='object-cover' src="/assets/img/logo-dark.png" width={173} height={157} alt='logo' />
                </div>
                <div className="relative flex">
                    <div className="mx-auto flex w-full justify-start pt-12 min-h-screen md:pt-0 xl:px-0 pl-0 no-scrollbar">
                        <div className="flex flex-col lg:max-w-[46%] w-full xl:max-w-full">

                            <div className="flex h-full w-full md:w-[50vw] xl:w-[40vw] items-center justify-center px-2 md:mx-0 md:px-0">
                                <div className="w-full max-w-full flex-col items-center pl-8 pr-8 pt-10 pb-10 lg:max-w-[420px] xl:max-w-[580px] shadow-lg border rounded-md">
                                    <h4 className="mb-4 text-xl">
                                        Welcome!
                                    </h4>
                                    <h4 className="mb-2.5 text-3xl font-bold">
                                        Sign up
                                    </h4>
                                    <p className="ml-1 text-base">
                                        Take control of your finances!
                                    </p>

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid gap-4">
                                            <div className="mt-2">
                                                <label className="text-sm font-medium">
                                                    Email*
                                                </label>

                                                <input type="email" name="email" placeholder="mail@palm.com" {...register('email')} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white" />

                                                {errors.email && <p className='text-red-500 text-xs mt-1 ml-1.5 font-medium'>{errors.email.message}</p>}
                                            </div>

                                            <div className="mt-2">
                                                <label className="text-sm font-medium">
                                                    Name*
                                                </label>

                                                <input type="text" name="name" placeholder="Enter your name" {...register('name')} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white" />

                                                {errors.name && <p className='text-red-500 text-xs mt-1 ml-1.5 font-medium'>{errors.name.message}</p>}
                                            </div>

                                            <div className="mt-2">
                                                <label className="text-sm font-medium mt-6">
                                                    Password*
                                                </label>

                                                <div className="relative">
                                                    <input
                                                        type={isPasswordVisible ? "text" : "password"} name="password" placeholder="Enter your password" {...register('password')} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white" />

                                                    <button
                                                        type="button"
                                                        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 top-[10px]"
                                                        onClick={togglePasswordVisibility}
                                                    >
                                                        {isPasswordVisible ? (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={1.5}
                                                                stroke="currentColor"
                                                                className="w-5 h-5"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                                />
                                                            </svg>
                                                        ) : (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={1.5}
                                                                stroke="currentColor"
                                                                className="w-5 h-5"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                                {errors.password && <p className='text-red-500 text-xs mt-1 ml-1.5 font-medium'>{errors.password.message}</p>}
                                            </div>

                                            <div className="mt-2">
                                                <label className="text-sm font-medium mt-6">
                                                    Confirm*
                                                </label>

                                                <div className="relative">
                                                    <input type={isConfirmVisible ? "text" : "password"} name="confirm" placeholder="Confirm your password" {...register('confirm')} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white" />

                                                    <button
                                                        type="button"
                                                        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 top-[10px]"
                                                        onClick={toggleConfirmVisibility}
                                                    >
                                                        {isConfirmVisible ? (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={1.5}
                                                                stroke="currentColor"
                                                                className="w-5 h-5"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                                />
                                                            </svg>
                                                        ) : (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={1.5}
                                                                stroke="currentColor"
                                                                className="w-5 h-5"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                                {errors.confirm && <p className='text-red-500 text-xs mt-1 ml-1.5 font-medium'>{errors.confirm.message}</p>}
                                            </div>
                                        </div>

                                        <div className="flex mt-5">
                                            <button type='submit' className="linear bg-black mt-2 w-full rounded-xl py-[12px] text-base font-medium text-white transition duration-200">Create
                                                Account</button>
                                        </div>
                                    </form>

                                    <div className="mt-6 px-2 text-center">
                                        <span className="text-sm font-light mr-4">
                                            Already have an Account?
                                        </span>
                                        <Link
                                            href="/auth/login"
                                            className="ml-1 text-sm font-bold transition">
                                            Sign in
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute right-0 hidden h-full min-h-screen md:block w-[50vw] xl:w-[60vw]">
                                <div
                                    className="absolute flex h-full w-full items-end justify-center bg-center bg-no-repeat"
                                    style={{ backgroundImage: `url(${authImg.src})` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Register;