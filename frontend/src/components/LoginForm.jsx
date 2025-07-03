import { useState } from 'react'
import { loginUser } from '../apis/user.api'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/slice/authSlice'
import { useNavigate } from '@tanstack/react-router'

export const LoginForm = ({ state }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log(auth)

    const handleSubmit = async () => {
        setError('')
        setLoading(true)

        try {
            const data = await loginUser(email, password)
            dispatch(login(data.user))
            // Redirect or update state on successful login
            // window.location.href = '/' // Simple redirect
            navigate({ to: "/dashboard" })
            console.log(auth)
            console.log('signing success')
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid Credentials')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <form className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder='example@email.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder='************'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <div className="mt-4 text-center text-sm">
                <p>
                    Don't have an account?{' '}
                    <span onClick={() => state(false)} className="curser:pointer text-blue-500 hover:text-blue-700">
                        Register
                    </span>
                </p>
            </div>
        </div>
    )
}