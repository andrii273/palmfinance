import { instance } from "@/helpers/axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from 'yup';
import Image from "next/image";
import Link from "next/link";

import authImg from "@/public/assets/img/auth-login.png";

const ResetPasswordToken = () => {
    const router = useRouter();
    const { token } = router.query;

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const email = await verifyResetPasswordToken({ token: token });
                await resetPassword({ email: email, password: values.password });
                // router.push('/auth/success');
                // setSuccess(true);
            } catch (error) {
                console.log(error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const verifyResetPasswordToken = async (data) => {
        try {
            const res = await instance.post('/users/verify', data);
            return res.data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    const resetPassword = async (data) => {
        instance.post('/users/update_password', data)
            .then((res) => {

            }).catch(error => {
                console.log(error.message);
            });
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
                                    <h4 className="mb-2.5 text-3xl font-bold">
                                        Input your new Password
                                    </h4>

                                    <form onSubmit={formik.handleSubmit}>
                                        <label className="text-sm font-medium">
                                            New password*
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="text-red-500 text-xs mt-1 ml-1.5 font-light">{formik.errors.password}</div>
                                        ) : null}

                                        <button
                                            type="submit"
                                            className="linear bg-black mt-5 w-full rounded-xl py-[12px] text-base font-medium text-white transition duration-200" disabled={formik.isSubmitting}>
                                            Reset password
                                        </button>
                                    </form>

                                    <div className="mt-4 px-2 text-center">
                                        <Link
                                            href="/auth/login"
                                            className="ml-1 text-sm font-medium text-brand-300 hover:text-brand-600 dark:text-white transition"
                                        >
                                            Back to Login
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
    );
}

export default ResetPasswordToken;