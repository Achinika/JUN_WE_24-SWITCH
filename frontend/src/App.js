import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Customer/SignUp';
import LogIn from './components/Customer/Login';
import EmployeeLogin from './components/Admin/EmployeeLogin';
import EmployeeSignUp from './components/Admin/EmployeeSignUp';
import ConsultantSignUp from './components/Admin/ConsultantSignUp';
import ConsultantLogin from './components/Admin/ConsultantLogin';
import BusinessLogin from './components/Admin/BusinessLogin';
import BusinessSignUp from './components/Admin/BusinessSignUp';
import BusinessForm from './components/Admin/BusinessForm';
import BusinessManage from './components/Admin/BusinessManage';
import ConsultantManage from './components/Admin/ConsultantManage';
import ConsultantChat from './components/Admin/ConsultantChat';
import EmployeeManage from './components/Admin/EmployeeManage';
import EmployeeForm from './components/Admin/EmployeeForm';
import HomePage from './components/Customer/HomePage';
import Jobs from './components/Customer/Jobs';
import Consultant from './components/Customer/Consultant';
import Chat from './components/Customer/Chat';
import Posts from './components/Customer/Posts';
import Feedback from './components/Customer/Feedback';
import RideShare from './components/Customer/RideShare';
import RideShareD from './components/Customer/RideShareD';
import RideShareP from './components/Customer/RideShareP';
import Links from './components/Customer/Links';
import LinkedU from './components/Customer/LinkedU';
import EmployeeEditForm from './components/Admin/EmployeeEditForm';

function App() {
  return (
    <Router>
      <Routes>        
        <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
        <Route path="/EmployeeSignUp" element={<EmployeeSignUp />} />
        <Route path="/ConsultantSignUp" element={<ConsultantSignUp />} />
        <Route path="/ConsultantLogin" element={<ConsultantLogin />} />
        <Route path="/BusinessSignUp" element={<BusinessSignUp />} />
        <Route path="/BusinessLogin" element={<BusinessLogin />} />
        <Route path="/BusinessForm" element={<BusinessForm />} />
        <Route path="/BusinessManage" element={<BusinessManage />} />
        <Route path="/ConsultantManage" element={<ConsultantManage />} />
        <Route path="/ConsultantChat" element={<ConsultantChat />} />
        <Route path="/EmployeeManage" element={<EmployeeManage />} />       
        <Route path="/EmployeeForm" element={<EmployeeForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LogIn />} />
        <Route path="/Register" element={<SignUp />} />        
        <Route path="/Jobs" element={<Jobs/>} />
        <Route path="/Consultant" element={<Consultant/>} />
        <Route path="/Chat" element={<Chat/>} />
        <Route path="/Posts" element={<Posts/>} />
        <Route path="/Feedback" element={<Feedback/>} />
        <Route path="/RideShare" element={<RideShare/>} />
        <Route path="/RideShareD" element={<RideShareD/>} />
        <Route path="/RideShareP" element={<RideShareP/>} />
        <Route path="/Links" element={<Links/>} />
        <Route path="/LinkedU" element={<LinkedU/>} />
        <Route path='/EmployeeEditForm' element={<EmployeeEditForm />} />
      </Routes>
    </Router>
  );
}

export default App;
