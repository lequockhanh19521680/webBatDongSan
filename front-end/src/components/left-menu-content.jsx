import React from "react";
import post from "../assests/admin_LeftMenu/post.png";
import b_post from "../assests/admin_LeftMenu/b_post.png";
import w_post from "../assests/admin_LeftMenu/w_post.png";
import account from "../assests/admin_LeftMenu/account.png";
import b_account from "../assests/admin_LeftMenu/b_account.png";
import w_account from "../assests/admin_LeftMenu/w_account.png";
import news from "../assests/admin_LeftMenu/news.png";
import b_news from "../assests/admin_LeftMenu/b_news.png";
import w_news from "../assests/admin_LeftMenu/w_news.png";
import info from "../assests/admin_LeftMenu/info.png";
import b_info from "../assests/admin_LeftMenu/b_info.png";
import w_info from "../assests/admin_LeftMenu/w_info.png";
import person from "../assests/admin_LeftMenu/person.png";
import b_person from "../assests/admin_LeftMenu/b_person.png";
import w_person from "../assests/admin_LeftMenu/w_person.png";
import like from "../assests/admin_LeftMenu/like.png";
import b_like from "../assests/admin_LeftMenu/b_like.png";
import w_like from "../assests/admin_LeftMenu/w_like.png";
import lock from "../assests/admin_LeftMenu/lock.png";
import b_lock from "../assests/admin_LeftMenu/b_lock.png";
import w_lock from "../assests/admin_LeftMenu/w_lock.png";
import setting from "../assests/admin_LeftMenu/setting.png";
import b_setting from "../assests/admin_LeftMenu/b_setting.png";
import w_setting from "../assests/admin_LeftMenu/w_setting.png";
import NotFound from "../components/not-found";
import NotFoundAdmin from "./not-found-admin";
import OnDevelopingAdmin from "./on-developing-admin";
const MainPage = React.lazy(() => import("./main-page.jsx"));
const Content = React.lazy(() => import("./main-admin/content.jsx"));
const Accounts = React.lazy(() => import("./main-admin/accounts.jsx"));
const Posts = React.lazy(() => import("./main-admin/posts.jsx"));
const News = React.lazy(() => import("./main-admin/news.jsx"));
const Information = React.lazy(() => import("./main-admin/information.jsx"));
const Profile = React.lazy(() => import("./main-admin/profile/profile.jsx"));
const Favourite = React.lazy(() => import("./main-admin/favourite.jsx"));
const Password = React.lazy(() => import("./main-admin/password.jsx"));

const Setting = React.lazy(() => import("./main-admin/setting.jsx"));

const userService = [
    {
        name: "Qu???n l?? b??i ????ng",
        icon: post,
        hover: b_post,
        focus: w_post,
        link: "/admin/posts",
        Component: Posts,
    },
]

const adminService = [
    ...userService,
    {
        name: "Qu???n l?? t??i kho???n",
        icon: account,
        hover: b_account,
        focus: w_account,
        link: "/admin/accounts",
        Component: Accounts,
    },
    {
        name: "Qu???n l?? tin t???c",
        icon: news,
        hover: b_news,
        focus: w_news,
        link: "/admin/news",
        Component: News,
    },
    {
        name: "Qu???n l?? th??ng tin",
        icon: info,
        hover: b_info,
        focus: w_info,
        link: "/admin/information",
        Component: Information,
    },

]

const sectionContent = [
    {        
        flag: true,
        title: "QU???N L?? D???CH V???",
        option: userService,
    },
    {
        flag: true,
        title: "QU???N L?? NG?????I D??NG",
        option: [
            {               
                name: "Th??ng tin c?? nh??n",
                icon: person,
                hover: b_person,
                focus: w_person,
                link: "/admin/profile",
                Component: Profile,
            },
            {
                name: "Y??u th??ch",
                icon: like,
                hover: b_like,
                focus: w_like,
                link: "/admin/favourite",
                Component: Favourite,
            },
            {
                name: "?????i m???t kh???u",
                icon: lock,
                hover: b_lock,
                focus: w_lock,
                link: "/admin/password",
                Component: Password,
            },
        ],
    },
    {
        flag: true,
        title: "C??I ?????T",
        option: [
            {
                name: "C??i ?????t",
                icon: setting,
                hover: b_setting,
                focus: w_setting,
                link: "/admin/setting",
                Component: OnDevelopingAdmin,
            },
        ],
    },
    {
        flag: false,
        title: "Not Found",
        option: [
            {
                name: "Not Found",
                link: "/admin/*",
                Component: NotFoundAdmin,
            },
        ],
    },
];


export { userService, adminService, sectionContent }