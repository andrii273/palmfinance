import { useFormik } from "formik";
import { useState } from "react";

const Settings = () => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);

    const formik = useFormik({
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            const formData = new FormData();

            try {
                formData.append('monthly', checked1);
                formData.append('newsletter', checked2);

            } catch (error) {
                console.log(error.message);
            } finally {
                setSubmitting(false);
            }
        }
    })

    return (
        <section className="">
            <div className="max-w-100 md:max-w-[50%] px-4 lg:py-16">
                <h2 className="mb-4 text-3xl font-bold text-black">
                    Notifications
                </h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="w-full">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                checked={checked1}
                                onChange={() => setChecked1(!checked1)}
                            />
                            <div className="w-11 h-6 bg-white peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-black after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                            <span className="ml-3 text-sm font-medium text-black">Update Accounts Monthly</span>
                        </label>
                    </div>

                    <div className="w-full mt-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                checked={checked2}
                                onChange={() => setChecked2(!checked2)}
                            />
                            <div className="w-11 h-6 bg-white peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-black after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                            <span className="ml-3 text-sm font-medium text-black">Newsletters</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="linear bg-black mt-5 rounded-xl py-[12px] px-5 text-base font-medium text-white transition duration-200 hidden">
                        Update
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Settings;