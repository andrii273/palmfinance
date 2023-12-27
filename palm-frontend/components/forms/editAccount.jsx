import { instance } from "@/helpers/axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from 'yup';

const EditAccountForm = (props) => {
    const { data, id, handleMessage, handleModalCancel, handleDeleteMessageClicked } = props;
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            accountName: data.accountName,
            accountBalance: data.accountBalance,
            accountModifiedAt: data.accountModifiedAt,
        },
        validationSchema: Yup.object({
            accountName: Yup.string().required('Account name is required'),
            accountBalance: Yup.number()
                .typeError('Balance must be a number')
                .required('Balance is required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            const formData = new FormData();
            const today = new Date(),
                date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

            formData.append('accountName', values.accountName);
            formData.append('accountBalance', values.accountBalance);
            formData.append('accountModifiedAt', date);

            try {
                await updateAccount(formData);
                handleModalCancel();
            } catch (error) {
                console.log(error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const updateAccount = async (data) => {
        instance.put(`/accounts/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                router.push('/accounts');
            }).catch(error => {
                console.log(error.message);
            });
    }

    return (
        <form onSubmit={formik.handleSubmit}>

            <div className="px-4 pt-4 pb-4 sm:p-6 border-y">
                <div className="w-full">
                    <div className="mt-3 sm:mt-0">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg leading-6 font-medium text-black" id="modal-title">
                                Update Accounts
                            </h3>
                            <h4
                                className="text-md text-red-500 underline hover:cursor-pointer"
                                onClick={handleDeleteMessageClicked}
                            >
                                Delete Account
                            </h4>
                        </div>
                        <div className="mt-2 text-black">

                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium ">Name</label>
                                <input
                                    type="text"
                                    name="accountName"
                                    id="accountName"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
                                    value={formik.values.accountName}
                                    placeholder={formik.values.accountName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                {formik.touched.accountName && formik.errors.accountName ? (
                                    <div className="text-red-500 text-xs mt-1 ml-1.5 font-medium">{formik.errors.accountName}</div>
                                ) : null}
                            </div>

                            <div className="w-full mt-4">
                                <label className="block mb-2 text-sm font-medium">Balance</label>
                                <div className="relative">
                                    <span className="absolute left-[6px] top-[9px]">$</span>
                                    <input
                                        type="number"
                                        name="accountBalance"
                                        id="accountBalance"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
                                        value={formik.values.accountBalance}
                                        placeholder={formik.values.accountBalance}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        required
                                    />
                                </div>
                                {formik.touched.accountBalance && formik.errors.accountBalance ? (
                                    <div className="text-red-500 text-xs mt-1 ml-1.5 font-medium">{formik.errors.accountBalance}</div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-3 sm:px-6 sm:flex sm:justify-between">
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-sm border border-[#989898] shadow-sm px-4 py-2 bg-white text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleMessage}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="mt-3 w-full inline-flex justify-center rounded-sm border border-[#989898] shadow-sm px-4 py-2 bg-[#F9AC17] text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                    Update
                </button>
            </div>
        </form>
    )
}

export default EditAccountForm;