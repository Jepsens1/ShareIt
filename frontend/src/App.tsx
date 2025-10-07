import SideNavbar from "./components/SideNavbar.tsx";
import PostList from "./components/PostList.tsx";

function App() {

  return (
      <div className="flex">
          <SideNavbar/>
          <div className="flex-1 lg:ml-16 h-screen bg-slate-200 overflow-auto transition-all duration-300">
              <PostList/>
          </div>
      </div>
  )
}

export default App
