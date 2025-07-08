import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Signup = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    return <div className='h-screen bg-blue-400 flex justify-center py-15'>
        <div className='flex flex-col shadow justtify-center'>
            <div className="rounded-lg bg-white p-2 px-4 h-max">
                <Heading label={'Sign up'} />
                <SubHeading label={'Enter your account information to create your account'} />
                <InputBox onChange={(e) => {
                    setFirstName(e.target.value);
                }} title={'First Name'} placeholder={'John'} />
                <InputBox onChange={(e) => {
                    setLastName(e.target.value)
                }} title={'Last Name'} placeholder={'Cena'} />
                <InputBox onChange={(e) => {
                    setUsername(e.target.value)
                }} title={'Email'} placeholder={'johncena@gmail.com'} />
                <InputBox onChange={(e) => {
                    setPassword(e.target.value)
                }} title={'Password(min 8 characters)'} placeholder={'12345678'} />
                <Button onClick={async () => {
                    try {
                        const response = await axios.post('http://localhost:4004/api/v1/user/signup', {
                            firstName,
                            lastName,
                            username,
                            password
                        })
                        localStorage.setItem('token', response.data.token)
                        navigate('/dashboard')
                    } catch (error) {
                        alert(error.response.data.message)
                    }

                }} label={'Sign up'}></Button>
                <BottomWarning label={'Already have an account? '} buttonText={'Sign in'} to={'/signin'} />
            </div>
        </div>
    </div>
}