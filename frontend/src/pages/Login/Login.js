import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isShowPassword, setIsShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    const validateEmail = (email) => {
        const regex = /^[[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email)
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!validateEmail(email)) {
            setError('Enter a valid email address')
            return
        }

        if (!password) {
            setError('Enter a password')
            return
        }

        setError("")
    }

    return (
        <>
            <Navbar />

            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={handleLogin}>
                        <h4 className="text-2xl mb-7">Login</h4>

                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className="input-box" />

                        <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type={isShowPassword ? 'text' : 'password'} placeholder='Password' className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none" />

                            {isShowPassword ? <FaRegEye size={22} onClick={toggleShowPassword} className="text-primary cursor-pointer" /> : <FaRegEyeSlash size={22} onClick={toggleShowPassword} className="text-slate-400 cursor-pointer" />}
                        </div>

                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                        <button type='submit' className="btn-primary">Login</button>

                        <p className="text-sm text-center mt-4">Not registered yet? {" "}<Link to="/signUp" className="font-medium text-primary underline">Create an account</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login