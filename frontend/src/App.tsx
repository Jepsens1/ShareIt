import SideNavbar from "./components/SideNavbar.tsx";
import SignIn from "./pages/signin.tsx";
import {Route, Routes} from "react-router";
import PostList from "./components/PostList.tsx";
import SignUp from "./pages/signup.tsx";
import CreatePost from "./pages/create-post.tsx";
import PostDetail from "./pages/postdetail.tsx";
import ProfilePage from "./pages/profile-page.tsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.tsx";

function App() {

  return (
      <div className="flex">
          <SideNavbar/>
          <div className="flex-1 lg:ml-16 h-screen bg-slate-200 overflow-auto transition-all duration-300">
              <main>
                  <Routes>
                      <Route path="/" element={<PostList/>}/>
                      <Route path="/signin" element={<SignIn/>}/>
                      <Route path="/signup" element={<SignUp/>}/>
                      <Route path="post/:postId" element={<PostDetail/>}/>
                      <Route element={<ProtectedRoutes/>}>
                          <Route path="/create-post" element={<CreatePost/>}/>
                          <Route path="/profile" element={<ProfilePage/>}/>
                      </Route>
                      <Route path="*" element={<div className="flex items-center justify-center h-screen w-full">Page not Found</div>}/>
                  </Routes>
              </main>
          </div>
      </div>
  )
}

export default App
