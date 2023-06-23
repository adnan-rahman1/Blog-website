import ArticleIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import FaceIcon from "@mui/icons-material/Face";
import PostAddIcon from '@mui/icons-material/PostAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import StyleIcon from '@mui/icons-material/Style';
import CategoryIcon from '@mui/icons-material/Category';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';

const generalRoutes = [
    { label: "Home", to: "/", ico: <HomeIcon /> },
    { label: "Blog", to: "/blog", ico: <ArticleIcon /> },
    { label: "Project", to: "/project", ico: <AccountTreeIcon/> },
    { label: "About", to: "/about", ico: <FaceIcon/> },
];


const protectedRoutes = [
    { label: "Dashboard", to: "/dashboard", ico: <DashboardIcon />, componentName: "Dashboard" },
    { label: "Posts", to: "/dashboard/posts", ico: <PostAddIcon />, componentName: "Posts" },
    { label: "Categories", to: "/dashboard/categories", ico: <CategoryIcon />, componentName: "Categories" },
    { label: "Tags", to: "/dashboard/tags", ico: <StyleIcon />, componentName: "Tags" },
    { label: "Projects", to: "/dashboard/projects", ico: <AccountTreeIcon/>, componentName: "Projects" },
    { label: "Photos", to: "/dashboard/photos", ico: <PhotoSizeSelectActualIcon />, componentName: "Photos" },
    { label: "Profile", to: "/dashboard/profile", ico: <AccountBoxIcon />, componentName: "Profile" },
]


export {
    generalRoutes,
    protectedRoutes
}