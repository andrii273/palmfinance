import ProfileForm from "@/components/forms/profile";
import { idAtom } from "@/helpers/authorize";
import { instance } from "@/helpers/axios";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Profile = () => {
    const [user, __] = useAtom(idAtom);
    const [data, setData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        user && instance.get(`/settings/user/${user}`)
            .then((res) => {
                setData({
                    name: res.data.name,
                    email: res.data.email,
                    password: res.data.password,
                });
            })
            .catch(error => {
                console.log("er", error.message);
            });
    }, [router, user]);

    return (
        <>
            <section className="">
                <div className="max-w-100 md:max-w-[50%] px-4 lg:py-16">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-3xl font-bold text-black">
                            Welcome, {(user && data) && data.name}
                        </h2>
                    </div>
                    {
                        (user && data) ?
                            <ProfileForm data={data} user={user} /> :
                            <div>Loading...</div>
                    }
                </div>
            </section>
        </>
    );
}

export default Profile;