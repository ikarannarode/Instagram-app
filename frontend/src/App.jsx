import './App.css'
import Login from './components/ui/login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/ui/signup';
import MainLayout from './components/ui/MainLayout';
import Home from './components/ui/Home';
import Profile from './components/ui/Profile';
const browserRouter = createBrowserRouter([{
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/profile",
      element: <Profile />
    }

  ]
},
{
  path: "/login",
  element: <Login />
},
{
  path: "/signup",
  element: <Signup />
}



]);
function App() {

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App
