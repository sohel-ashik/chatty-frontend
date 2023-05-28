import { useEffect, useState } from 'react';
import './login.css';
import {Link} from 'react-router-dom'

import {useNavigate} from 'react-router-dom';

async function loginDataSender(email,password,navigate,setApproval){
    const formData = new FormData();
    formData.append('email',email);
    formData.append('password',password);
    try{
        const response = await fetch('http://localhost:8000/login',{
            method:'POST',
            body: formData
        })
        if (response.ok){
            const data = await response.json();
            if(data && data.pass){
                console.log(data.msg);
                localStorage.setItem('token',data.msg);
                setApproval(true);
                navigate('/chat')
            }else {
                console.log('something is wrong')
            }
        } else {
            console.log('something is wrong with fetching')
        }
    }catch(err){
        console.log(err);
    }
}

function Login({setApproval}){
    const [mail, setMail] = useState('');
    const [pass,setPass] = useState('');
    const navigate = useNavigate();

    return(
        <div className="parent-container-login d-flex justify-content-center">
            <div className="login-container-main">
                <h4 className='text-center mb-5'>Chatty</h4>

                <form className="inputs-container" onSubmit={(e)=>e.preventDefault()}>
                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" value={mail} onChange={(e)=>{setMail(e.target.value)}} placeholder="ashik@gmail.com"/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" id="inputPassword5" value={pass} onChange={(e)=>{setPass(e.target.value)}} class="form-control" aria-labelledby="passwordHelpBlock"/>
                    </div>
                    <div className='d-flex justify-content-center'>
                        
                        <button 
                            value='submit'
                            onClick={()=>{
                                loginDataSender(mail,pass,navigate,setApproval);
                            }}
                            class="login-btn btn btn-success">Login</button>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;