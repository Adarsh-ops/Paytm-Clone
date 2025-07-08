import axios from "axios";
import { useState, useEffect } from "react";


export const Balance=()=>{
    const [balance,setBalance]=useState()
    useEffect(()=>{
        axios.get('http://localhost:4004/api/v1/account/balance',{
        headers:{
            'Authorization':'Bearer '+localStorage.getItem('token')
        }
    })
    .then(response=>{
        setBalance(response.data.message)
    })
    },[balance])
    
    return <div className="font-bold pl-4 py-3">
        Your Balance is: Rs. {balance || 'Loading...'}
    </div>
}