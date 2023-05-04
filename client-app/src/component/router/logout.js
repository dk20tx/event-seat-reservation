import axios from 'axios';
import React, { useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import URL from '../../baseUrl/baseURL';
import { user } from '../../redux/action/reduxAction';
import "./navbar.css";
import { useDetectOutsideClick } from "./useDetectOutsideClick";


function Logout() {
    
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

    const dispatch = useDispatch()
    const useData = useSelector(state => state.addUser)
    const history = useHistory()
    function logout() {
        axios({
            method: 'get',
            url: URL+'/logout',
            withCredentials: true
        }).then(() => {
            dispatch(user({
                loginStatus: false,
                role: null
            }))
            history.push("/login")
        }, (error) => {
            console.log(error);
        });
    }
    return (
        <div className='justify-content-right'>
            <div className="menu-container">
                <button onClick={onClick} className="menu-trigger">
                    <i class="fas fa-user-circle fa-3x"></i>
                </button>
                
                
                <nav ref={dropdownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
                    <ul>
                        <li className="border-bottom">
                            <div className='fw-bold dropdown-it border-0 dd-color'>Hi, {useData.loginUser.firstName}</div>
                        </li>
                        <li>
                            <Link to="/settings" className="text-dark">
                                <div  className="border-0 dropdown-item dd-color">                                
                                    <i class="fas fa-user-cog"></i> Account Settings                                
                                </div>
                            </Link>
                        </li>
                        <li>
                            <div className="border-0 dropdown-item dd-color"><i class="fas fa-comment-alt-lines"></i> Messages</div>
                        </li>
                        
                        <li className="border-top">
                            <div href='#' className='mt-2 mb-2 fw-bold dropdown-item dd-color' onClick={logout}><i class="fas fa-sign-out-alt"></i> Logout</div>
                        </li>
                    </ul>
                </nav>
            </div>
            
            
        </div>
    )
}

export default Logout