import './chatMainPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip,faMagnifyingGlass,faTrashCan } from '@fortawesome/free-solid-svg-icons';
import SimpleNav from '../Nav'

const arr = [1,2,3,4,2,3,23,45,2,34,45,54,2,5];

function Individual(){
    return(
        <div className='individual'>
            <div className='individual-picture-frame'>
                <div className='individual-picture'></div>
            </div>
            <div className='indi-frame'>
                <div className='individual-details'>
                    <div className='individual-name-time'>
                        <div className='individual-name'>Sohel Asik</div>
                        <div className='individual-msg-time'>Apr 19</div>
                    </div>
                    <div className='individual-current-msg'>Hello, are you there?</div>
                </div>
            
            </div>
        </div>
    )
}


function SingleMessage(props){
    return(
        <div className={`single-msg-parent ${props.who}`}>
            <div className={`single-msg-inside ${props.who}`}>
                <div className='main-msg-body'>
                    {props.msg}
                </div>
                <div className='msg-sending-time'>
                    12:22, 9 Apr
                </div>
            </div>
        </div>
    )
}


function ChatMainPage({setApproval}){
    return (
      <div className="parent-container-chat-page d-flex justify-content-center">
            <SimpleNav setApproval={setApproval}/>

          <div className="main-container-chat-page mt-2 d-flex flex-row">
            <div className='accounts'>
                
                <div className='search-panel d-flex justify-content-center'>
                    <div className='inside-search-panel d-flex'>
                        <div className='search-icon'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                        <input type="text" className='search-box' placeholder='search'/>
                    </div>
                </div>
                
                <div className='all-accounts'>
                    {arr.map((ele)=>{return <Individual/>})}
                </div>

            </div>

            <div className='main-chat-box'>
                <div className='user-id-active d-flex justify-content-between align-items-center p-2'>
                    <div className='main-user-name'>Ashik</div>
                    <div className='clear-msg'>
                        <FontAwesomeIcon icon={faTrashCan}/>
                    </div>
                </div>

                <div className='message-box'>
                    <SingleMessage
                        msg="you wanna say something?"
                        who="he"
                    />
                    <SingleMessage 
                        msg="Yes im here."
                        who="he"
                    />
                    <SingleMessage 
                        msg="hey how are you?"
                        who="me"
                    />
                </div>

                <div className='sending-msg-option '>
                    <div className='attachment-btn'>
                        <FontAwesomeIcon icon={faPaperclip}/>
                    </div>
                    <input type="text" class="send-msg-input-box form-control" placeholder="Send a message"></input>
                </div>

            </div>
          </div>
      </div>
    )
  }
  
export default ChatMainPage;