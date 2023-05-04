import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsGridFill, BsTable } from 'react-icons/bs';
import url from '../../baseUrl/baseURL';
import GridLayout from './gridLayout';
import { Button, Content, LayoutSwitch, Options } from './layoutSwitch';
import TableLayout from './tableLayout';

const LAYOUT_OPTIONS = Object.freeze({ table: 'table', grid: 'grid' });

function AdminDashboard() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: url + "/getLocations",
            withCredentials: true
        
        }).then((res) => {
            if (res.status === 200) {
                setData(res.data.data)
            } else {
                console.log(res)
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    
    return (
        <div>
            <div className='container'>
                
                {data !== null ? (
                     <LayoutSwitch defaultLayout={LAYOUT_OPTIONS.table}>
                        <Options>
                        <Button
                            layoutPreference={LAYOUT_OPTIONS.table}
                            title="Table Layout"
                        >
                            <BsTable />
                        </Button>
                        <Button
                            layoutPreference={LAYOUT_OPTIONS.grid}
                            title="Grid Layout"
                        >
                            <BsGridFill />
                        </Button>
                        </Options>
                        <Content>
                        
                        <TableLayout activeLayout={LAYOUT_OPTIONS.table} data={data} />
                        <GridLayout activeLayout={LAYOUT_OPTIONS.grid} data={data} />
                        </Content>
                    </LayoutSwitch>
                ) : (
                    <h3>No data Yet</h3>
                )}
            </div>
        </div>
    )
}

export default AdminDashboard;