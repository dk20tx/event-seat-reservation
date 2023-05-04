import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import url from '../../baseUrl/baseURL';

function delt(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            
        }).then((result) => {
            if (result.isConfirmed) {
                axios({
                    method: 'post',
                    url: url + '/deleteLocation',
                    data: { id: id },
                    withCredentials: true
                    
                }).then((res) => {
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    window.location.reload(false);
                }).catch((err) => {
                    console.log(err)
                })
            } else if (

                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'File is safe ',
                    'error'
                )
            }
        })
    }
function GridLayout({data}) {

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    {
                        data.map((value, i) => {
                            return (
                                <div className='col-lg-3 col-sm-6 g-3' key={i} >
                                    <div className="card">
                                        <img src={value.imgUrl} className="card-img-top" alt="..." style={{height: 200,margin:"auto", border:"1px",padding:"0rem"}}/>
                                        <div className="card-body">
                                            
                                            <h5 className="card-title bold text-uppercase fw-bold"style={{ color: "#083144" }}>{value.location}</h5>
                                            
                                                <p>Slots {value.slots}</p>
                                                <div className="d-grid gap-2 d-md-block">
                                                    <div className='d-flex justify-content-center flex-nowrap'>
                                                        <button className="btn btn-danger btn-sm  me-md-2" onClick={() => delt(value._id)}>Delete</button>
                                                        <button className='btn btn-dark ml-8 btn-sm offset-1' onClick={() => {
                                                            return (
                                                                Swal.fire({
                                                                    title: value.location,
                                                                    text: value.desc,
                                                                    imageUrl: value.imgUrl,
                                                                    imageWidth: 300,
                                                                    imageHeight: 200,
                                                                    imageAlt: 'Custom image',                                          
                                                                })
                                                            )
                                                        }}>
                                                            Details
                                                        </button>
                                                    </div>                                                
                                            </div>
                                        </div>
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

export default GridLayout;