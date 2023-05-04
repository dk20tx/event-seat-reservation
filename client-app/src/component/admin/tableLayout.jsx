import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import url from '../../baseUrl/baseURL';

function TableLayout({data}) {
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

    return (
        <div>
            <div className='container'>
                <div className="row">
                    <table className="table">
                        <thead style={{ backgroundColor: "#083144", color: "#fff" }}>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Location</th>
                                <th scope="col">Slots</th>
                                <th scope="col">Description</th>
                                <th scope="col">Manage</th>
                            </tr>
                        </thead>
                        {
                        data.length === 0? <label>You have made no bookings</label>: 
                            data && data.map((value, i) => {
                                return (
                                    <tbody key={i}>
                                        <tr>
                                            <th scope="row">{i + 1}</th>
                                            <td className='text-capitalize'>{value.location}</td>
                                            <td className='text-lowercase'>{value.slots}</td>
                                            <td className='text-lowercase'>{value.desc}</td>
                                            <td className='text-capitalize'>
                                                <button className="btn btn-danger btn-sm me-md-2" onClick={() => delt(value._id)}>Delete</button>
                                                <button className='btn btn-dark ml-8 btn-sm' onClick={() => {
                                                return (
                                                    Swal.fire({
                                                        title: value.location,
                                                        text: value.desc,
                                                        imageUrl: value.imgUrl,
                                                        imageWidth: 400,
                                                        imageHeight: 200,
                                                        imageAlt: 'Custom image',                                           
                                                    })
                                                )
                                            }}>Details</button>
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TableLayout;