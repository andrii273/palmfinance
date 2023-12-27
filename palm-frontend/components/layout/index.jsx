import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Breadcrumb from "./breadcrumb";

import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import logo from "@/public/assets/img/logo.png";
const Layout = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [transitionSidebar, setTransitionSidebar] = useState(false);
    const router = useRouter();

    function toggleSidebarHandler(e) {
        e.preventDefault();
        setSidebarOpen(!sidebarOpen);
    }

    function checkWindowSize() {
        window.innerWidth < 991 ? setSidebarOpen(false) : setSidebarOpen(true);
    }

    useEffect(() => {
        checkWindowSize();
        window.addEventListener('reside', checkWindowSize);
        return () => {
            window.removeEventListener('resize', checkWindowSize);
        }
    }, []);

    return (
        <>
            <div className="sm:flex h-full w-full bg-white overflow-hidden">
                <aside id="logo-sidebar" className={`${!transitionSidebar ? "-translate-x-full sm:translate-x-0" : ""} transition-all sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white shadow-2xl shadow-white/5 transition-all md:!z-50 lg:!z-50 overflow-visible simple-scroller ${sidebarOpen ? "!min-w-[18rem]" : "w-full sm:w-auto sm:!min-w-[6rem]"}`} aria-label="Sidebar">
                    <Sidebar sidebarOpen={sidebarOpen} />

                    <div className={`fixed ${sidebarOpen ? "!min-w-[18rem]" : "w-full sm:w-auto sm:!min-w-[6rem]"}`}>
                        <div className={`relative sm:top-5 flex items-center justify-center text-white hover:cursor-pointer translate-x-1/2 !z-50 md:!z-50 lg:!z-50 xl:!z-10 ${sidebarOpen ? "right-5" : "right-5"}`}>
                            {
                                sidebarOpen ?
                                    <button onClick={toggleSidebarHandler}>
                                        <BsArrowLeftShort size={20} />
                                    </button>
                                    : <div>
                                        <button onClick={toggleSidebarHandler}>
                                            <BsArrowRightShort className="hidden sm:block" size={20} />
                                        </button>

                                        <a href="#" onClick={(e) => { e.preventDefault(); setTransitionSidebar(false); }} className="text-5xl sm:hidden">
                                            ×
                                        </a>
                                    </div>
                            }
                        </div>
                    </div>
                </aside>

                <div className={`h-full w-full bg-[#D9D9D9] min-h-screen pb-6 ${sidebarOpen ? "sm:pl-[6rem] lg:pl-[18rem]" : "sm:pl-[6rem]"}`}>
                    <div className="flex items-center justify-between sm:hidden bg-primary px-2">
                        <img
                            src={logo.src}
                            width={108}
                            height={60}
                            className="h-[60px]"
                            alt="Palm Logo"
                        />

                        <a href="#" onClick={(e) => { e.preventDefault(); setTransitionSidebar(true); setSidebarOpen(false); }}>
                            <svg width="30" height="25" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0V5H40V0H0ZM0 14.85V19.85H40V14.85H0ZM0 29.85V34.85H40V29.85H0Z" fill="#E7E7E7" />
                            </svg>
                        </a>
                    </div>
                    <Breadcrumb />

                    <main className="mx-[20px] h-full flex-none transition-all">
                        <div className="h-full">
                            {props.children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Layout;