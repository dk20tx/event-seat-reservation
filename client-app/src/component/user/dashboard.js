import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import url from '../../baseUrl/baseURL'
function Dashboard() {
    const [data,setData] = useState([])
    useEffect(()=>{
        axios({
            method: 'get',
            url: url + "/getLocations",
            withCredentials: true 
        }).then((res)=>{
            if(res.status === 200){
                setData(res.data.data)
            }else{
                console.log(res)
            }
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    return (
        <div>
            <div className='container'>
                <h5 className='mt-3 mb-3'>Events this week</h5>
                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
                    
                    {
                        data && data.map((value, i) => {
                            return (
                                <div className='col col-md-3 g-3' key={i}   >
                                    <div className="card shadow-sm" >
                                         <img src={value.imgUrl} className="card-img-top" alt="..." style={{height: 200,margin:"auto", border:"1px"}}/>
                                        <span className="card-body">
                                            <h5 className="card-title text-capitalize" style={{ color: "#083144" }}>{value.location}</h5>
                                            <p className="card-text">{value.desc}</p>
                                            <Link to={{
                                                pathname: "/Booking",
                                            }} className="btn btn-md text-white" style={{backgroundColor: "#083144"}} onClick={()=>localStorage.setItem('data',JSON.stringify(value))}>Booking</Link>
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard