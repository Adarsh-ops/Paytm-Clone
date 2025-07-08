import axios from "axios"
import { useEffect, useState } from "react"

export const AppBar = () => {
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');

    useEffect(()=>{
        axios.get('http://localhost:4004/api/v1/user/getName',{
            headers:{'Authorization':'Bearer '+localStorage.getItem('token')}
        })
        .then(response=>{
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
        })
    },[firstName,lastName])

    return <div className="shadow h-10 flex justify-between p-2 items-center">
        <div className="font-bold">
            Paytm Cash App
        </div>
        <div className="flex items-center">
            <div className="font-medium">
                {firstName}{' '+lastName}
            </div>
            <div>
                <div className="bg-purple-400 rounded-full flex justify-center cursor-pointer p-3 py-1 font-medium ml-1.5">
                    {firstName[0]}
                </div>
            </div>
        </div>
    </div>
}