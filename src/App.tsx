import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { UserProvider } from './redux/store/providers/user.provider'
import ContentManagementPage from './pages/ContentManagement'
import FileUploadForm from './components/content/FileUploadForm'
import SubscriptionPage from './pages/Subscription'
import AdminPage from './pages/Admin'
import UsersPage from './pages/ShowUsersPage'
import Payouts from './pages/Payouts'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home />}/> 
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/content-management' element={<ContentManagementPage/>} />
            <Route path='/content-upload' element={<FileUploadForm/>} />
            <Route path='/subscription' element={<SubscriptionPage/>} />
            <Route path='/admin' element={<AdminPage/>} />
            <Route path='/admin/users/:id?' element={<UsersPage/>} />
            <Route path='/payouts/:subpage?' element={<Payouts/>} />
            <Route path='*' element={<NotFound/>} />
          </Route>
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
