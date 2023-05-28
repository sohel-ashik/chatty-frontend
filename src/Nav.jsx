import {Link} from 'react-router-dom'

export default function SimpleNav({setApproval}){
    return(
        <div className='simple-nav'>
            <Link to='/chat'>Inbox</Link>
            <div>|</div>
            <Link to='/admin'>Users</Link>
            <div>|</div>
            <Link to='/login' onClick={()=>setApproval(false)}>Logout</Link>
        </div>
    )
}
