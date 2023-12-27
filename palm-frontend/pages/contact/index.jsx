import { idAtom } from "@/helpers/authorize";
import { instance } from "@/helpers/axios";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from 'yup';

const Contact = () => {
    const [user, __] = useAtom(idAtom);
    const router = useRouter();

    const [email, setEmail] = useState(null);

    useEffect(() => {
        user && instance.get(`/settings/user/${user}`)
            .then((res) => {
                setEmail(res.data.email);
            })
            .catch(error => {
                console.log(error.message);
            });
    }, [router]);

    const formik = useFormik({
        initialValues: {
            message: '',
        },
        validationSchema: Yup.object({
            message: Yup.string().required('Message is required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            const formData = new FormData();

            try {
                formData.append('email', email);
                formData.append('message', values.message);

                await sendMessage(formData);
            } catch (error) {
                console.log(error.message);
            } finally {
                setSubmitting(false);
                values.message = "";
            }
        }
    });

    const sendMessage = async (data) => {
        instance.post('/settings/contact', data)
            .then((res) => {
                alert('Your feedback has been sent');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <section className="">
            <div className="max-w-100 md:max-w-[50%] px-4 py-8 lg:py-16">
                <h3 className="mb-4 text-2xl font-bold text-black">Your feedback is important to us!</h3>
                <p className="mb-5 text-sm text-black">Fill out the form below and a customer support representative will contact you within 24 hours.</p>

                <form onSubmit={formik.handleSubmit}>
                    <div className="w-full">
                        <textarea
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white text-black"
                            name="message"
                            id="name"
                            value={formik.values.message}
                            placeholder={formik.values.message}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.message && formik.errors.message ? (
                            <div className="text-red-500 text-xs mt-1 ml-1.5 font-medium">{formik.errors.message}</div>
                        ) : null}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="linear bg-[#F9AC17] mt-5 rounded-xl py-[12px] px-5 text-base font-medium text-black transition duration-200">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Contact;