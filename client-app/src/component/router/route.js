import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { user } from '../../redux/action/reduxAction';
import AdminDasboard from '../admin/adminDash';
import AddArea from '../admin/areas';
import Login from '../login/login';
import Signup from '../signup/signup';
import Dashboard from '../user/dashboard';
import Settings from '../user/settings';
import ViewBooking from '../user/viewbooking';
import url from './../../baseUrl/baseURL';
import Booking from './../user/booking';
import Footer from './footer';
import Navbar from './navbar';




function RouterConfig() {

    const useData = useSelector((state) => state.addUser)
    const dispatch = useDispatch()
    useEffect(() => {
        axios({
            method: "get",
            url: url + `/profile`,
            withCredentials: true
        })
            .then((res) => {
                if (res.data.status === 200) {
                    dispatch(user({
                        loginUser: res.data.profile,
                        loginStatus: true,
                        role: res.data.profile.role
                    }));
                }
            })
            .catch((err) => {
                if (err) {
                    dispatch(user({ loginStatus: false }));
                }
            });
        return () => {
            console.log("cleanup");
        };
    }, [dispatch]);

    if (useData.loginUser === null) {
        return (
            <div className='container'>
                <div className="d-flex align-items-center justify-content-center " style={{ width: "100%", height: "100vh" }}>
                    <div className="spinner-border " role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
    return (

        <Router>
            {useData.loginStatus === false ?
                <div>
                    <Switch>
                        <Route exact path="/" component={Signup} />
                        <Route path="/login" component={Login} />
                        <Route path="*" >
                            <Redirect to="/" />
                        </Route >
                    </Switch>
                </div> : null}

            {useData.role === 'user' ?
                <>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/booking" component={Booking} />
                        <Route path="/viewbooking" component={ViewBooking} />
                        <Route path="/settings" component={Settings} /> 

                        <Route path="*" >
                            <Redirect to="/" />
                        </Route >
                    </Switch>
                    <Footer />
                </> : null
            }
            {useData.role === 'admin' ?
                <>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={AdminDasboard} />
                        <Route path="/addarea" component={AddArea} />
                        <Route path="/settings" component={Settings} /> 
                        <Route path="*" >
                            <Redirect to="/" />
                        </Route >
                    </Switch>
                    <Footer />
                </> : null
                
            }
            
        </Router>
    )
}
export default RouterConfig