import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Signin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    return <div className='h-screen bg-blue-400 flex justify-center pt-30'>
        <div className='flex flex-col justtify-center'>
            <div className="rounded-lg bg-white p-2 px-4 ">
                <Heading label={'Sign in'} />
                <SubHeading label={'Enter your credentials to access your account!'} />
                <InputBox onChange={(e) => {
                    setUsername(e.target.value);
                }} title={'Email'} placeholder={'johncena@gmail.com'} />
                <InputBox onChange={(e) => {
                    setPassword(e.target.value)
                }} title={'Password'} placeholder={'12345678'} />
                <Button onClick={async () => {
                    try {
                        const response = await axios.post('http://localhost:4004/api/v1/user/signin', {
                            username,
                            password
                        })
                        localStorage.setItem('token', response.data.token)
                        navigate('/dashboard')
                    } catch (error) {
                        alert(error.response.data.message)
                    }

                }} label={'Sign in'}></Button>
                <BottomWarning label={"Don't have an account? "} buttonText={'Sign up'} to={'/signup'} />
            </div>
        </div>
    </div>
}