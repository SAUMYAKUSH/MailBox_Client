import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Inbox.css";
import { useDispatch, useSelector } from "react-redux";
import { selectReceivedMail, setReceivedMail } from "../Slice/emailSlice";
import { selectUser } from "../Slice/authSlice";
import { logout } from "../Slice/authSlice";
import useFetchEmails from "./Hooks/UserFetch";

const Inbox = () => {
    const userId = useSelector(selectUser)
    const receivedMail = useSelector(selectReceivedMail) || [];
    const [unreadCount, setUnreadCount] = useState(0);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useFetchEmails(
        userId,
        `https://react-https-45286-default-rtdb.firebaseio.com/mail/${userId}/Receive.json`,
        setReceivedMail
    )
  
    useEffect(() => {
      const unread = receivedMail.filter(email => !email.read);
      setUnreadCount(unread.length);
  }, [receivedMail]);

    const composeHandler = () => {
        navigate('/compose');
    };
    const markAsRead = async (id)=>{
        try {
            await axios.patch(`https://mailboxclient-a9282-default-rtdb.firebaseio.com/mail/${userId}/Receive/${id}.json`, {read: true});
            const updatedEmails = receivedMail.map(email=>{
                if(email.id === id){
                    return {...email, read:true};
                }
                return email;
            });
            dispatch(setReceivedMail(updatedEmails));
            setUnreadCount(prevCount => Math.max(0, prevCount - 1));
        } catch(error) {
            console.error("Error marking email as read:", error);
        }
    };

    const handleRecipientClick = (email) => {
        setSelectedEmail(prevSelectedEmail => {
            return prevSelectedEmail === email ? null : email;
        });
    };
  
    const deleteEmail = async (event, id) => {
        event.stopPropagation()
        try {
            await axios.delete(`https://mailboxclient-a9282-default-rtdb.firebaseio.com/mail/${userId}/Receive/${id}.json`);
  
  
            dispatch(setReceivedMail(receivedMail.filter(email => email.id !== id)));
            if (selectedEmail && selectedEmail.id === id) {
                setSelectedEmail(null);
            }
        } catch (error) {
            console.error("Error deleting email:", error);
        }
    };
  
    const LogOutHandler = () => {
        dispatch(logout());
        navigate('/')
    }



    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        <Link className="list-group-item list-group-item-action active" to='/inbox'>
                            Inbox ({unreadCount} unread)
                        </Link>
                        <Link className="list-group-item list-group-item-action" to='/'>Sent </Link>
                        <p className="list-group-item list-group-item-action">Drafts</p>
                        <p className="list-group-item list-group-item-action">Trash</p>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-header">Message</div>

                        {selectedEmail && (
                            <div className="card-body" onClick={() => setSelectedEmail(null)}>
                                <h5 className="card-title">{selectedEmail.recipient}</h5>
                                <p className="mb-1">{selectedEmail.subject}</p>
                                <p className="card-text">{selectedEmail.content}</p>
                            </div>
                        )}

                        {!selectedEmail && (
                            <div className="list-group">
                                {receivedMail.map((email, index) => (
                                    <div key={index} className={`list-group-item list-group-item-action ${email.read ? '' : 'unread'}`} onClick={() => setSelectedEmail(email)}>
                                        <span className="dot"></span>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="mb-1">{email.sender}</h6>
                                                <p className="mb-1">{email.subject} </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <button className="btn btn-primary btn-sm rounded-circle" style={{ width: '50px', height: '40px' }} onClick={composeHandler}>
                <img src='https://i.pinimg.com/736x/f4/b9/3a/f4b93a502f60397fe92b663ddb9e683d.jpg' className="img-fluid rounded-circle" alt="Profile" />
            </button>
        </div>
    );
};

export default Inbox;