import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { CiFolderOn } from "react-icons/ci";
import { MdFavoriteBorder, MdOutlinePassword, MdOutlinePolicy } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export const menuItems = [
  {
    id: "dashboard",
    name: "Overview",
    menuItems: [{ id: "dashboard", name: "Dashboard", href: "/dashboard", icon: AiOutlineDashboard }],
  },
  {
    id: "passwords",
    name: "Passwords",
    menuItems: [
      { id: "all-passwords", name: "All Passwords", href: "/passwords/all-passwords", icon: RiLockPasswordLine },
      { id: "favorites", name: "Favorites", href: "/passwords/favorites", icon: MdFavoriteBorder },
    ],
  },
  {
    id: "folders",
    name: "Folders",
    menuItems: [{ id: "all-folders", name: "All Folders", href: "/all-folders", icon: CiFolderOn }],
  },
  {
    id: "settings",
    name: "Settings",
    menuItems: [
      {
        id: "password-categories",
        name: "Password Categories",
        href: "/password-categories",
        icon: BiCategoryAlt,
      },
      {
        id: "password-policies",
        name: "Password Policies",
        href: "/password-policies",
        icon: MdOutlinePolicy,
      },
      {
        id: "change-master-password",
        name: "Change Master Password",
        href: "/change-master-password",
        icon: MdOutlinePassword,
      },
    ],
  },
];
