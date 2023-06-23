import {
  useEffect,
  useMemo,
  useState,
  createContext,
  Suspense,
  lazy,
} from "react";
import CustomHeader from "./header/CustomHeader";
import CustomFooter from "./footer/CustomFooter";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Pages Start
const Home = lazy(() => import("./body/pages/Home"));
const Blog = lazy(() => import("./body/pages/Blog"));
const PostDetails = lazy(() => import("./body/pages/blog/PostDetails"));
const Project = lazy(() => import("./body/pages/Project"));
const About = lazy(() => import("./body/pages/About"));
const Signin = lazy(() => import("./body/pages/Signin"));
const Signup = lazy(() => import("./body/pages/Signup"));
const ForgetPassword = lazy(() => import("./utils/ForgetPassword"));

// Pages Required Authentication Start
const DashboardDrawer = lazy(() => import("./utils/DashboardDrawer"));
const Dashboard = lazy(() => import("./admin-portal/Dashboard"));
const Posts = lazy(() => import("./admin-portal/Posts"));
const Projects = lazy(() => import("./admin-portal/Projects"));
const Categories = lazy(() => import("./admin-portal/Categories"));
const Tags = lazy(() => import("./admin-portal/Tags"));
const Profile = lazy(() => import("./admin-portal/Profile"));
const Photos = lazy(() => import("./admin-portal/Photos"));
// Pages Required Authentication End

const PrivacyPolicy = lazy(() => import("./body/pages/others/PrivacyPolicy"));
const CookiesPolicy = lazy(() => import("./body/pages/others/Cookiespolicy"));
const TermsConditions = lazy(() => import("./body/pages/others/TermsConditions"));
const Disclaimer = lazy(() => import("./body/pages/others/Disclaimer"));
// Pages End

import { getCurrentUser } from "../api/user";
import { authUser } from "../redux/actions/authUserAciton";
import getUserChoiceTheme from "./ui/Theme";

import bgImg from "../assets/animated-shape.svg";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";
import CircularProgress from "@mui/material/CircularProgress";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ParentGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
  minWidth: "100%",
  backgroundImage: `url(${bgImg})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  [theme.breakpoints.down("md")]: {
    backgroundAttachment: "initial",
  },
}));

const App = () => {
  const dispatch = useDispatch();
  const { authenticated, token } = useSelector((rs) => rs.userReducer);
  const { currentRoute } = useSelector((rs) => rs.pathReducer);

  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getUserChoiceTheme(mode)), [mode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [window.location.pathname]);

  const checkAuthentication = async () => {
    const rememberMe = localStorage.getItem("remember-me");
    const tkn = rememberMe != "" ? rememberMe : token;
    const res = await getCurrentUser(tkn);
    if (res.status == 200) {
      dispatch(
        authUser({
          authenticated: res.data.authenticated,
          user: res.data.user,
          token: tkn,
        })
      );
    }
  };

  useEffect(() => {
    if (!authenticated && token == "") {
      checkAuthentication();
    }
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ParentGrid>
          <BrowserRouter basename="/">
            {currentRoute.split("/")[1] === "dashboard" &&
              !authenticated &&
              token === "" && <Navigate to="/" />}

            <CustomHeader toggleColorMode={colorMode.toggleColorMode} />

            <Suspense
              fallback={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                  }}
                >
                  <CircularProgress />
                </div>
              }
            >
              {authenticated &&
              token != "" &&
              currentRoute.split("/")[1] == "dashboard" ? (
                <DashboardDrawer />
              ) : null}

              <Routes>
                {authenticated && token !== "" && (
                  <>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/posts" element={<Posts />} />
                    <Route path="/dashboard/projects" element={<Projects />} />
                    <Route
                      path="/dashboard/categories"
                      element={<Categories />}
                    />
                    <Route path="/dashboard/tags" element={<Tags />} />
                    <Route path="/dashboard/photos" element={<Photos />} />
                    <Route path="/dashboard/profile" element={<Profile />} />
                  </>
                )}
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id/:slug" element={<PostDetails />} />
                <Route path="/project" element={<Project />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookies-policy" element={<CookiesPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
              </Routes>
            </Suspense>
            {currentRoute.split("/")[1] != "dashboard" &&
            currentRoute != "/forget-password" &&
            currentRoute != "/signin" &&
            currentRoute != "/signup" ? (
              <CustomFooter />
            ) : null}
          </BrowserRouter>
        </ParentGrid>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
export default App;
