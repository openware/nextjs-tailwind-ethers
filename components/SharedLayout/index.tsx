import { Layout } from '@openware/react-opendax';
import React, { FC } from 'react';
// import {
//     FOOTER_OPTIONS,
//     NAVIGATIONS,
//     LOGO_ICON,
//     DEFAULT_USER_MENU,
//     MOBILE_LOGO_ICON,
// } from './constants';

interface SharedLayoutProps {
    children: React.ReactNode;
}

const FooterProps = {
    // options: FOOTER_OPTIONS,
    className: "bg-main-background-color",
    dropdownBlockClassName: "absolute z-50 bottom-8 w-40 bg-white rounded shadow r-2 select-none",
    dropdownOptionClassName: "block text-gray-400 hover:text-gray-500 hover:bg-gray-50 rounded px-4 py-2",
    optionClassName: "text-gray-400 hover:text-gray-500 px-5 relative",
    socialOptionClassName: "text-gray-400 hover:text-gray-500 px-2 opacity-60 hover:opacity-100 delay-200",
    socialMoreButtonClassName: "self-center ml-2 relative bg-gray-100 rounded flex py-1 px-2 cursor-pointer",
    socialMoreTextClassName: "self-center text-gray-500 text-sm font-bold",
    socialMoreClassName: "absolute flex flex-wrap flex-row flex-row bottom-8 right-0 w-52 z-50 p-4 bg-white rounded shadow r-2",
}

export const SharedLayout: FC<SharedLayoutProps> = (props: SharedLayoutProps) => {
    const SidebarProps = {
        // navigations: NAVIGATIONS,
        // logo: LOGO_ICON,
        // logoIcon: MOBILE_LOGO_ICON,
        isLoggedin: false,
        userMenu: {
            userInfo: {
                uid: 'test',
                username: 'test',
            },
            // userMenuProps: {
            //     userMenu: DEFAULT_USER_MENU(),
            // }
        }
    };
    
    return (
        <Layout
            footerProps={FooterProps}
            sidebarProps={SidebarProps}
        >
            <main className="px-10 py-7 relative overflow-auto max-h-94">
                {props.children}
            </main>
        </Layout>
    );
};
