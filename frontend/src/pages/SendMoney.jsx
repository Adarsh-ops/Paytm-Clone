import { useState } from "react";
import { InputBox } from "../components/InputBox"
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const [amount, setAmount] = useState(0)
    const navigate=useNavigate();

    return <div className="bg-blue-400 h-screen">
        <div className="flex justify-center py-25">
            <div className="bg-white rounded-xl px-7 py-7">
                <div className="flex justify-center pt-3 pb-10 font-bold text-4xl">
                    Send Money
                </div>
                <div className="flex m-2">
                    <div className="bg-green-400 rounded-full font-semibold pt-1 text-white flex justify-center h-8 w-8 mr-2">
                        {name[0].toUpperCase()}
                    </div>
                    <div className="font-bold text-xl">
                        {name}
                    </div>
                </div>
                <div>
                    <div className="py-0.5">
                        <div className="text-sm font-bold p-1">{'Amount(in Rs.)'}</div>
                        <div className="rounded-md">
                            <input onChange={(e) => {
                                setAmount(e.target.value)
                            }} type="text" id={'Amount (in Rs.)'} placeholder={'Enter Amount'} className="w-full border-2 rounded-lg p-1" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center pt-4">
                    <button onClick={async() => {
                        try {
                            await axios.post('http://localhost:4004/api/v1/account/transfer', {
                                amount: amount,
                                to: id
                            }, {
                                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
                            })
                            alert('Transfer Success!')
                        }catch (error) {
                            alert(error.response.data.message)
                        }
                        

                    }} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 m-2 cursor-pointer">Initiate Transfer</button>
                    <div className="flex justify-center">
                        <button type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 cursor-pointer" onClick={()=>{
                            navigate('/dashboard')
                        }}>Go to Dashboard</button>
                    </div>
                </div>

            </div>


        </div>
    </div>
}