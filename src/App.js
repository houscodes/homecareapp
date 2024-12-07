import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyNurse from './pages/ApplyNurse';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Nurses from './pages/admin/Nurses';
import Profile from './pages/nurse/Profile';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';
import NurseAppointments from './pages/nurse/NurseAppointments';
function App() {
  const {loading} =  useSelector(state => state.alerts);
  return (
 <>
  <BrowserRouter>
     {loading ? 
     (<Spinner/>):(
    <Routes>
      <Route path="/"
       element={
       <ProtectedRoute>
        <HomePage />
       </ProtectedRoute>
       }/>
      <Route path="/apply-nurse"
       element={
       <ProtectedRoute>
        <ApplyNurse />
       </ProtectedRoute>
       }/>
      <Route path="/notification"
       element={
       <ProtectedRoute>
        <NotificationPage/>
       </ProtectedRoute>
       }/>
      <Route path="/nurse/profile/:id"
       element={
       <ProtectedRoute>
        <Profile/>
       </ProtectedRoute>
       }/>
       <Route path="/admin/users"
       element={
       <ProtectedRoute>
        <Users/>
       </ProtectedRoute>
       }/>
      <Route path="/admin/nurses"
       element={
       <ProtectedRoute>
        <Nurses/>
       </ProtectedRoute>
       }/>
      <Route path="/nurse/book-appointment/:nurseId" element={
        <ProtectedRoute>
          <BookingPage/>
        </ProtectedRoute>
        } />         
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
        } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
        <Route path="/appointments" element={
        <ProtectedRoute>
          <Appointments/>
        </ProtectedRoute>
      } />
        <Route path="/nurse-appointments" element={
        <ProtectedRoute>
          <NurseAppointments/>
        </ProtectedRoute>
      } />
    </Routes>)}
  </BrowserRouter>
 </>
  );
}

export default App;