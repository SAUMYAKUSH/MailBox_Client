import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Inbox.css"; 
import { useDispatch, useSelector } from "react-redux";
import { setSendMail } from "../Slice/emailSlice";
import { selectUser } from "../Slice/authSlice";
import useFetchEmails from "./Hooks/UserFetch";


const SentMail = () => {
    const userId = useSelector(selectUser)
    const sendMail = useSelector(state =>state.email.sendMail) || []
    const [unreadCount, setUnreadCount] = useState(0);
    const [selectedEmail, setSelectedEmail] = useState(null); 
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    useFetchEmails(
        userId,
        `https://mailboxclient-a9282-default-rtdb.firebaseio.com/mail/${userId}/Send.json`,
        setSendMail
    );
   


    const composeHandler = () => {
        navigate('/compose');
    };


    const handleRecipientClick = (email) => {
        setSelectedEmail(prevSelectedEmail => {
            return prevSelectedEmail === email ? null : email;
        });
    };

    const deleteEmail = async (event, id) => {
        event.stopPropagation();
        try {
            await axios.delete(`https://mailboxclient-a9282-default-rtdb.firebaseio.com/mail/${userId}/Send/${id}.json`);
            dispatch(setSendMail(sendMail.filter(email => email.id !== id)));
            if (selectedEmail && selectedEmail.id === id) {
                setSelectedEmail(null);
            }
        } catch (error) {
            console.error("Error deleting email:", error);
        }
    };


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        <Link className="list-group-item list-group-item-action " to='/inbox'>
                            Inbox ({unreadCount} unread)
                        </Link>
                        <Link className="list-group-item list-group-item-action active" to='/sent'>Sent </Link>
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
                                <p className="card-text">{selectedEmail.body}</p>
                            </div>
                        )}
                        {!selectedEmail && (
                            <div className="list-group">
                                {sendMail.map((email, index) => (
                                    <p key={index}  className={`list-group-item list-group-item-action ${email.read ? '' : 'unread'}`} onClick={() => { handleRecipientClick(email)}}>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="mb-1">{email.recipient}</h6>
                                                <p className="mb-1">{email.subject}</p>
                                            </div>
                                            <button className="btn btn-danger btn-sm" onClick={(event) => deleteEmail(event,email.id)}>Delete</button>
                                        </div>
                                    </p>
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

export default SentMail;