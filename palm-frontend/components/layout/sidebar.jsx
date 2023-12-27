import { useRouter } from "next/router";
import { useState } from "react";
import classNames from "classnames";

import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

import Link from "next/link";

import logo from "@/public/assets/img/logo.png";

import { BsUiChecksGrid, BsPeople, BsCurrencyDollar, BsPerson } from "react-icons/bs";
import { SlBriefcase, SlLogout, SlArrowDown, SlMap, SlSettings, SlArrowRight } from "react-icons/sl";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { GrContact } from "react-icons/gr";
import { AiOutlineMail } from "react-icons/ai";

const Sidebar = (props) => {
    const { sidebarOpen } = props;
    const router = useRouter();

    return (
        <Card className={`fixed h-full px-3 pb-4 overflow-y-scroll bg-transparent simple-scroller bg-[#002254] rounded-none ${sidebarOpen ? "!min-w-[18rem]" : "w-full sm:w-auto sm:!min-w-[6rem]"}`}>
            <Link href="/"
                className={`flex items-center justify-center py-1.5 my-7 rounded-lg ${sidebarOpen ? "" : "flex-col"}`}>
                <img
                    src={logo.src}
                    width={108}
                    height={60}
                    style={{}}
                    className={sidebarOpen ? 'h-[60px]' : 'h-[60px] sm:h-[30px] sm:w-[54px] sm:mt-4'}
                    alt="Simpleruns Logo"
                />
            </Link>

            <div className={`relative flex flex-col justify-between h-full ${sidebarOpen ? "left-5" : ""}`}>
                <List className={`mt-10 mb-10 p-0 ${sidebarOpen ? "!min-w-[16.5rem]" : "!min-w-[4.5rem]"}`}>
                    <Link className={`flex items-center ${!sidebarOpen ? "mx-auto" : ""}`} href="/">
                        <ListItem className={`px-3 py-0 sm:px-3 sm:py-3 flex items-center w-full font-normal text-[#E7E7E7] transition duration-75 rounded-lg group text-xl`}>
                            <ListItemPrefix className={`${!sidebarOpen ? "sm:mx-auto" : ""}`}>
                                <BsUiChecksGrid
                                    size={24}
                                    className={`${!sidebarOpen ? "mx-auto my-3" : ""}`}
                                />
                            </ListItemPrefix>
                            <span className={`flex-1 text-left whitespace-nowrap ${!sidebarOpen ? 'sm:hidden' : ''}`}>Dashboard</span>
                        </ListItem>
                    </Link>

                    <Link className={`flex items-center ${!sidebarOpen ? "mx-auto" : ""}`} href="/accounts">
                        <ListItem className={`px-3 py-0 sm:px-3 sm:py-3 flex items-center w-full font-normal text-[#E7E7E7] transition duration-75 rounded-lg group text-xl`}>
                            <ListItemPrefix className={`${!sidebarOpen ? "sm:mx-auto" : ""}`}>
                                <BsPeople
                                    size={24}
                                    className={`${!sidebarOpen ? "mx-auto my-3" : ""}`}
                                />
                            </ListItemPrefix>
                            <span className={`flex-1 text-left whitespace-nowrap ${!sidebarOpen ? 'sm:hidden' : ''}`}>Accounts</span>
                        </ListItem>
                    </Link>

                    <Link className={`flex items-center ${!sidebarOpen ? "mx-auto" : ""}`} href="/buckets">
                        <ListItem className={`px-3 py-0 sm:px-3 sm:py-3 flex items-center w-full font-normal text-[#E7E7E7] transition duration-75 rounded-lg group text-xl`}>
                            <ListItemPrefix className={`${!sidebarOpen ? "sm:mx-auto" : ""}`}>
                                <BsCurrencyDollar
                                    size={24}
                                    className={`${!sidebarOpen ? "mx-auto my-3" : ""}`}
                                />
                            </ListItemPrefix>
                            <span className={`flex-1 text-left whitespace-nowrap ${!sidebarOpen ? 'sm:hidden' : ''}`}>Buckets</span>
                        </ListItem>
                    </Link>

                    <Link className={`flex items-center ${!sidebarOpen ? "mx-auto" : ""}`} href="/reports">
                        <ListItem className={`px-3 py-0 sm:px-3 sm:py-3 flex items-center w-full font-normal text-[#E7E7E7] transition duration-75 rounded-lg group text-xl`}>
                            <ListItemPrefix className={`${!sidebarOpen ? "sm:mx-auto" : ""}`}>
                                <HiOutlineDocumentReport
                                    size={24}
                                    className={`${!sidebarOpen ? "mx-auto my-3" : ""}`}
                                />
                            </ListItemPrefix>
                            <span className={`flex-1 text-left whitespace-nowrap ${!sidebarOpen ? 'sm:hidden' : ''}`}>Reports</span>
                        </ListItem>
                    </Link>
                </List>

                <List className={`mt-10 mb-5 p-0 ${sidebarOpen ? "!min-w-[16.5rem]" : "!min-w-[4.5rem]"}`}>
                    <Link className={`flex items-center ${!sidebarOpen ? "mx-auto" : ""}`} href="/profile">
                        <ListItem className="px-3 py-0 sm:px-3 sm:py-3 flex items-center w-full text-md font-normal text-[#E7E7E7] transition duration-75 rounded-lg group text-xl">
                            <ListItemPrefix className={`${!sidebarOpen ? "sm:mx-auto" : ""}`}>
                                <BsPerson
                                    size={24}
                                    className={`${!sidebarOpen ? "mx-auto my-3" : ""}`}
                                />
                            </ListItemPrefix>
                            <span className={`flex-1 text-left whitespace-nowrap ${!sidebarOpen ? 'sm:hidden' : ''}`}>Profile</span>
                        </ListItem>
                    </Link>

                    <Link className={`flex items-center ${!sidebarOpen ? "mx-auto" : ""}`} href="/settings">
                        <ListItem className="px-3 py-0 sm:px-3 sm:py-3 flex items-center w-full text-md font-normal text-[#E7E7E7] transition duration-75 rounded-lg group text-xl">
                            <ListItemPrefix className={`${!sidebarOpen ? "sm:mx-auto" : ""}`}>
                                <SlSettings
                                    size={24}
                                    className={`${!sidebarOpen ? "mx-auto my-3" : ""}`}
                                />
                            </ListItemPrefix>
                            <span className={`flex-1 text-left whitespace-nowrap ${!sidebarOpen ? 'sm:hidden' : ''}`}>Settings</span>
                        </ListItem>
                    </Link>

                    <Link className={`flex items-center ${!sidebarOpen ? "mx-auto" : ""}`} href="/contact">
                        <ListItem className="px-3 py-0 sm:px-3 sm:py-3 flex items-center w-full text-md font-normal text-[#E7E7E7] fill-[#E7E7E7] transition duration-75 rounded-lg group text-xl">
                            <ListItemPrefix className={`${!sidebarOpen ? "sm:mx-auto" : ""}`}>
                                <AiOutlineMail
                                    size={24}
                                    className={`${!sidebarOpen ? "mx-auto my-3" : ""}`}
                                />
                            </ListItemPrefix>
                            <span className={`flex-1 text-left whitespace-nowrap ${!sidebarOpen ? 'sm:hidden' : ''}`}>Contact</span>
                        </ListItem>
                    </Link>
                </List>
            </div>
        </Card>
    );
}

export default Sidebar;