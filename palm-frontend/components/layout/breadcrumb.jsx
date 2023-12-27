import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import {
    Typography,
} from "@material-tailwind/react";

const Breadcrumb = () => {
    const [pageTitle, setPageTitle] = useState('Home');
    const router = useRouter();

    useEffect(() => {
        var title = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
        title === '/' || title === '' ? setPageTitle('Dashboard') : setPageTitle(title);
    }, [router]);

    return (
        <div className="bg-cover bg-center bg-white mb-[20px] py-5 flex items-center justify-between page-header overflow-hidden relative">
            <div className="container mx-auto px-[20px] max-w-full z-10">
                <div className="flex items-center justify-between">
                    <Typography variant="h2" className="text-3xl text-black font-bold transition capitalize">{pageTitle}</Typography>
                    
                </div>
            </div>
        </div>
    );
}

export default Breadcrumb;