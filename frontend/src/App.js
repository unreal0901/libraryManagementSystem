import React from "react";
import { ToastContainer } from "react-toastify";
// import Signup from "./components/SignupForm/Signup";
import Login from "../src/components/Login/Login";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RequireUser from "../src/components/Auth/RequireUser";

// Front Page for layout [shared layout]
import SideWallpaper from "../src/components/SideWallpaper/SideWallpaper";

// Shared layout for main page it acts as top navbar
import Topnav from "../src/components/Topnav/Topnav";

import { ChakraProvider } from "@chakra-ui/react";
// import theme from "./theme";
import Profile from "../src/components/Profile/Profile";
import Dashboard from "../src/components/Dashboard/Dashboard";
import Books from "./components/Books/Books";
import LibraryBooks from "./components/LibraryBooks/LibraryBooks";
import Students from "./components/Student/Students";
import RoleBased from "./components/Auth/RoleBased";
import IssuedBooks from "./components/Books/IssuedBooks/IssuedBooks";
// import Editors from "./Editors";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<SideWallpaper />}>
        <Route index element={<Login />} />
        {/* <Route path="register" element={<Signup />} /> */}
        <Route path="login" element={<Login />} />
      </Route>
      <Route
        path="/app"
        element={
          <RequireUser>
            <Topnav />
          </RequireUser>
        }
      >
        <Route
          path="dashboard"
          element={
            <RequireUser>
              <Dashboard />
            </RequireUser>
          }
        />

        <Route
          path="add-books"
          element={
            <RequireUser>
              <Books />
            </RequireUser>
          }
        />

        <Route
          path="books"
          element={
            <RequireUser>
              <LibraryBooks />
            </RequireUser>
          }
        />

        <Route
          path="students"
          element={
            <RequireUser>
              <RoleBased role="admin">
                <Students />
              </RoleBased>
            </RequireUser>
          }
        />

        <Route
          path="issuedBooks"
          element={
            <RequireUser>
              <RoleBased role="admin">
                <IssuedBooks />
              </RoleBased>
            </RequireUser>
          }
        />

        <Route
          index
          element={
            <RequireUser>
              <Profile />
            </RequireUser>
          }
        />
      </Route>
      {/* For checking the editor of draftjs */}
      {/* <Route path="editor" element={<Editors />} /> */}
    </Route>
  )
);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
      <div id="modal-root"></div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ChakraProvider>
  );
}

export default App;
