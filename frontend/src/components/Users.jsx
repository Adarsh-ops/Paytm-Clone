import { Button } from "./Button"
import { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export const Users = () => {
    const [users, setUsers] = useState([])
    const [filter,setFilter]=useState('')

    useEffect(()=>{
        axios.get('http://localhost:4004/api/v1/user/bulk?filter='+filter,{
            headers: { 'Authorization': 'Bearer '+localStorage.getItem('token') }
        })
        .then((response)=>{
            setUsers(response.data.user)
        })
    },[filter])

    return <div>
        <div className="font-bold p-2 text-lg my-2">
            Users
        </div>
        <div className="my-2 mb-7">
            <input type="text" placeholder="Search users..." className="w-full rounded-md p-1 border-2" onChange={(e)=>{
                setFilter(e.target.value)
            }}/>
        </div>

        {/* <div className="bg-purple-400 p-1 rounded-full flex justify-center font-medium cursor-pointer mr-2 h-10 w-10 text-xl">
                    A
                </div>
                <div className="font-medium text-xl">
                    Adarsh Nagar
                </div> */}
        <div>
            {users.map(user => <User user={user} />)}
        </div>

    </div>
}

function User({ user }) {
    const navigate=useNavigate();
    return <div className="flex justify-between items-center">
        <div className="flex">
            <div className="bg-purple-400 p-1 rounded-full flex justify-center font-medium cursor-pointer mr-2 h-10 w-10 text-xl">
                {user.firstName[0]}
            </div>
            <div className="font-medium text-xl">
                {user.firstName} {user.lastName}
            </div>
        </div>
        <div>
            <Button onClick={(e)=>{
                navigate('/send?id='+user._id+"&name="+user.firstName)
            }} label={'Send Money'} />
        </div>
    </div>
}