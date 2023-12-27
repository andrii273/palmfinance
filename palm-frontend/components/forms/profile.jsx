import { instance } from "@/helpers/axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import * as Yup from 'yup';

import Link from "next/link";

import Cookies from "js-cookie";

const ProfileForm = (props) => {
    const { data, user } = props;
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: data.name,
            email: data.email,
            password: data.password
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            const formData = new FormData();
            
            try {
                formData.append('name', values.name);
                formData.append('email', values.email);

                await saveEditedSettings(formData);
            } catch (error) {
                console.log(error.message);
            } finally {
                setSubmitting(false);
            }
        }
    });

    const saveEditedSettings = async (data) => {
        instance.put(`/settings/user/profile/${user}`, data)
            .then((res) => {
                if (res.data == 'The email is already in use.')
                    alert('The email is already in use.')
                else
                    router.push('/auth/login');
            }).catch(error => {
                console.log(error.message);
            });
    }

    function logoutHandler(e) {
        e.preventDefault();
        Cookies.remove('token');
        Cookies.remove('rememberMe');
        router.push('/auth/login');
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="w-full">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Name</label>
                <input
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white text-black"
                    type="text"
                    name="name"
                    id="name"
                    value={formik.values.name} 
                    placeholder={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500 text-xs mt-1 ml-1.5 font-medium">{formik.errors.name}</div>
                ) : null}
            </div>

            <div className="w-full mt-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email</label>
                <input
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white text-black"
                    type="text"
                    name="email"
                    id="email"
                    value={formik.values.email} 
                    placeholder={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-xs mt-1 ml-1.5 font-medium">{formik.errors.email}</div>
                ) : null}
            </div>

            <div className="w-full mt-4 text-black">
                <Link
                    className="text-xs font-light"
                    href="/auth/forgot"
                >
                    Reset Password?
                </Link>
            </div>

            <button
                type="submit"
                className="linear bg-black mt-5 rounded-xl py-[12px] px-5 text-base font-medium text-white transition duration-200">
                Update
            </button>

            <div className="w-full mt-4">
                <button
                    onClick={logoutHandler}
                    className="linear bg-red-500 mt-5 rounded-xl py-[12px] px-5 text-base font-medium text-white transition duration-200">
                    Logout
                </button>
            </div>
        </form>
    )
}

export default ProfileForm;