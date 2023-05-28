import React, { useEffect, useState } from 'react';
import SimpleNav from '../Nav';
import './adminPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';
import approvals from '../permissions/approval'

async function userDataSender(name,email,mobile,password,file,handleClose){
    const formData = new FormData();
    formData.append('name',name);
    formData.append('email',email);
    formData.append('mobile',mobile);
    formData.append('password',password);
    formData.append('file',file);

    const token = localStorage.getItem('token');
    formData.append('token',token);

    if(name && email && mobile && password && file)
    {
        try{
            const response = await fetch('http://localhost:8000/signup',{
                method: 'POST',
                body: formData
            })
            if(response.ok){
                const data = await response.json();
                alert(data.msg);
            } else{
                throw new Error("Problem")
            }
    
        } catch(err){
            console.log(err);
            alert("Someghing is wrong")
        }
        handleClose();

    } else{
        alert("Please put value to all of the field");
    }

}

async function deleteData(email,setReRender){
    const formData = new FormData();
    const token = localStorage.getItem('token');

    formData.append('email',email);
    formData.append('token',token);
    try{
        const response = await fetch('http://localhost:8000/signup',{
            method: 'DELETE',
            body: formData
        })
        if(response.ok){
            const data = await response.json();
            alert(data.msg);
            setReRender(pre => !pre);
        } else {
            alert('problem with delete');
        }
    }catch(err){
        alert("Something is wrong");        
    }
}


function IndividualUser(props) {
  const { name, mail, handleDeleteData, imgSource} = props;
  const [backgroundImage, setBackgroundImage] = useState(imgSource);

  return (
    <tr className="user-data">
      <td className="text-white">
        <div className='name-box'>
            <div className='id-pic' style={{backgroundImage: `url(${backgroundImage})`}}></div>
            <p>{name}</p>
        </div>
        
      </td>
      <td className="text-white pt-3">{mail}</td>
      <td className="text-danger">
        <FontAwesomeIcon className="user-delete pt-3"
            onClick={()=>handleDeleteData(mail)}
            icon={faTrashAlt} />
      </td>
    </tr>
  );
}



function ModalForm(props){
    const {
        name,setName,
        email,setEmail,
        phone,setPhone,
        password,setPassword,
        file,setFile
    } = props.allState;

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };
    
    return(
        <Form>
            <Form.Group  className='modal-input-group'>
                <Form.Control 
                    type="text" 
                    placeholder="name" 
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                />
            </Form.Group>

            <Form.Group  className='modal-input-group'>
                <Form.Control
                    type="email" 
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    placeholder="email" 
                />
            </Form.Group>

            <Form.Group  className='modal-input-group'>
                <Form.Control 
                    type="text" 
                    onChange={(e)=>setPhone(e.target.value)}
                    value={phone}
                    placeholder="Phone" 
                />
            </Form.Group>

            <Form.Group className='modal-input-group'>
                <Form.Control 
                    type="password" 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    value={password}
                    placeholder="password" 
                />
            </Form.Group>

            <Form.Group className='modal-input-group'>
                <Form.Control 
                    onChange={handleFileChange}
                    type='file'/>
            </Form.Group>            
        </Form>
    )
}

function AdminPage({setApproval}) {
    const [showModal, setShowModal] = useState(false);
    const [allUserData, setAlluserData] = useState([]);
    const [reRender,setReRender] = useState(false);

    useEffect(()=>{
        console.log(approvals.approval);
        const fetchImage = async (imgLink) =>{
            try{
                const response = await fetch(`http://localhost:8000/signup/image?image=${imgLink}`);
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                return imageUrl;
            } catch(err){
                console.log(err);
                return null;
            }
        }

        const fetchData = async () =>{
            try{
                const response = await fetch(`http://localhost:8000/signup`);
                const jsonData = await response.json();
                for(let ele  of jsonData){
                    ele.imageUrl = await fetchImage(ele.avatar);
                } console.log(jsonData);
                setAlluserData(jsonData);
                // console.log(jsonData);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[showModal,reRender])

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [file,setFile] = useState(null)


    const allState = {
        name,setName,
        email,setEmail,
        phone,setPhone,
        password,setPassword,
        file,setFile
    }

  const handleClose = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setShowModal(false);
  };
  const  handleDeleteData = async (email) =>{
    const result = window.confirm(`Do you want to delete ${email} ?`);
    if(result){
        deleteData(email,setReRender);
    } else {
        console.log('cancel');
    }
  }

  const handleShow = () => setShowModal(true);

  return (
    <div className="parent-container-chat-page d-flex justify-content-center">
      <SimpleNav setApproval={setApproval}/>
      <div className="main-container-chat-page  main-admin mt-2 d-flex flex-column align-items-center gap-2">
        <div className="admin-heading">Manage Users</div>
        <div className="user-add-btn" onClick={handleShow}>
          <FontAwesomeIcon icon={faUserPlus} />
        </div>

        <div className="table-container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mail</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {
                    allUserData.map((ele)=>{
                        return (
                            <IndividualUser name={ele.name}
                                mail={ele.email} 
                                handleDeleteData = {handleDeleteData}
                                imgSource = {ele.imageUrl}
                                />
                        )
                    })
                }
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton style={{color:'white'}} className='modal-header'>
          <Modal.Title style={{fontSize:'18px'}}>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
            <ModalForm allState = {allState}/>
        </Modal.Body>
        <Modal.Footer className='modal-footer'>
          <Button className='save-modal' onClick={()=>{
            userDataSender(name,email,phone,password,file,handleClose);
          }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminPage;