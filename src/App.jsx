import './App.css';
import Login from './login';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatMainPage from './chatPage/chatMainPage';
import AdminPage from './adminPage/adminPage';
import { Navigate, Route, Routes,BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from 'react';

function Error(){
    return(
        <div className='d-flex justify-content-center mt-lg-5'>
            <h1>Error! Not found</h1>
        </div>
    )
}

function App() {
    const [approval,setApproval] = useState(false);
    useEffect(()=>{
        console.log('here');
    },[approval])
    
  return (
    <div>
        <Router>
            <Routes>
                {console.log(approval)}
                <Route path="/" element={approval ? <Navigate to="/chat" />: <Navigate to='/login'/>} />
                <Route path="/chat" element={approval ? <ChatMainPage setApproval={setApproval}/>: <Error/>} />
                <Route path="/login" element={<Login setApproval={setApproval}/>} />
                <Route path="/admin" element={approval ? <AdminPage setApproval={setApproval}/> : <Error/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;