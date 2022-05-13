import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CustomerList from '../Todo/List/CustomerList'
import { baseUrl } from '../../environments'

function Customer(props) {

    const URL = `${baseUrl}/customer`
    const [Customers, setCustomers] = useState([])




    useEffect(() => {
        getCustomers()
    }, [])

    const getCustomers = () => {
        axios.get(`${URL}`)
        .then((response) => {
            setCustomers(response.data)
        })
    }

    const deleteCustomer = (id) => {
        axios.delete(`${URL}/${id}`)
        .then((response) => {
            getCustomers()
        })
    }

    
    const editDescription = (costumer) => {
        if (costumer.name === '' && costumer.age === '' && costumer.document === ''
            && costumer.tel === '' && costumer.state === '' ) {
            return
        }

        axios.put(`${URL}/${costumer.id}`, costumer)
        .then((response) => {
            getCustomers()
        })
    }

    return(
        <>
            <CustomerList Customers={Customers}
                delete={deleteCustomer}
                editDescription={editDescription}
            />

        </>
    )
}

export default Customer