import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../actions/authActions';
import { GrFormView } from 'react-icons/gr';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { isErrorRegister, isSuccess, message } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, 'Name must contain at least 3 characters').required('Required'),
            email: Yup.string().email('Invalid email address format').required('Required'),
            password: Yup.string().min(6, 'Password must contain at least 6 characters').required('Required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
        }),
        onSubmit: (values, { resetForm }) => {
            const { name, email, password } = values;
            const userData = {
                name,
                email,
                password
            }
            dispatch(registerUser(userData));
            if (isSuccess) {
                resetForm({ values: '' });
            }
        }
    })

    useEffect(() => {
        if (isSuccess) {
            navigate('/my-profile');
        }

    }, [isSuccess, navigate])

    return (
        <>
            <div className="flex justify-center min-h-screen login-image">
                <div className="px-8 py-6 mx-4 text-left bg-gray-100 shadow-lg rounded md:w-1/3 lg:w-1/3 sm:w-1/3 h-3/4 mt-16">
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-green-600" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path
                                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-center">Sign Up</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mt-4">
                            <div>
                                <label className="block" htmlFor="Full Name">Full Name</label>
                                <input type="text"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name && formik.errors.name && <p className='mt-1 text-red-600 text-sm'>{formik.errors.name}</p>}
                            </div>
                            <div className="mt-4">
                                <label className="block" htmlFor="email">Email Address</label>
                                <input type="email"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && <p className='mt-1 text-red-600 text-sm'>{formik.errors.email}</p>}
                            </div>
                            <div className="mt-4">
                                <label className="block">Password</label>
                                <div className='relative'>
                                    <input type={showPassword ? 'text' : 'password'}
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.password && formik.errors.password && <p className='mt-1 text-red-600 text-sm'>{formik.errors.password}</p>}
                                    <GrFormView className='absolute text-3xl bottom-1 right-3 cursor-pointer' onClick={() => setShowPassword(prevState => !prevState)} />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block">Confirm Password</label>
                                <div className='relative'>
                                    <input type={showConfirmPassword ? 'text' : 'password'}
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                        name="confirmPassword"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className='mt-1 text-red-600 text-sm'>{formik.errors.confirmPassword}</p>}
                                    <GrFormView className='absolute text-3xl bottom-1 right-3 cursor-pointer' onClick={() => setShowConfirmPassword(prevState => !prevState)} />
                                </div>
                            </div>
                            <div className="flex">
                                <button type='submit' className="w-full px-6 py-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-700 transition duration-200">
                                    Create Account
                                </button>
                            </div>
                            {isErrorRegister && <p id='hideMe' className='text-white bg-red-500 py-2 text-center text-sm mt-3'>{message}</p>}
                            <div className="mt-6 text-grey-dark">
                                <span className="mr-2">Already have an account?</span>
                                <Link to='/login' className="text-green-600 hover:underline font-bold">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}

export default Register;
