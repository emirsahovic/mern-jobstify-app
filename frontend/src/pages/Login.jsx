import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, reset } from '../actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const { isErrorLogin, isSuccess, message } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address format').required('Required'),
            password: Yup.string().required('Required')
        }),
        onSubmit: (values, { resetForm }) => {
            const { email, password } = values;
            const userData = {
                email,
                password
            }
            dispatch(loginUser(userData));
            if (isSuccess) {
                resetForm({ values: '' });
            }
        }
    })

    useEffect(() => {
        if (isSuccess) {
            navigate('/profile');
        }
    }, [isSuccess, navigate])

    return (
        <>
            <div className="flex justify-center min-h-screen login-image">
                <div className="px-8 py-6 mx-4 text-left bg-gray-100 rounded shadow-xl md:w-1/3 lg:w-1/3 sm:w-1/3 h-3/4 mt-16">
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
                    <h3 className="text-2xl font-bold text-center">Sign In</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mt-4">
                            <div className="mt-4">
                                <label className="block" htmlFor="email">Email</label>
                                <input type="email" placeholder="Email"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && <p className='mt-1 text-red-600 font-bold'>{formik.errors.email}</p>}
                            </div>
                            <div className="mt-4">
                                <label className="block">Password</label>
                                <input type="password" placeholder="Password"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.password && formik.errors.password && <p className='mt-1 text-red-600 font-bold'>{formik.errors.password}</p>}
                            </div>
                            <div className="flex">
                                <button type='submit' className="w-full px-6 py-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-700 transition duration-200">
                                    Sign In
                                </button>
                            </div>
                            {isErrorLogin && <p id='hideMe' className='text-white bg-red-500 py-2 text-center font-bold mt-3'>{message}</p>}
                            <div className="mt-6 text-grey-dark">
                                <span className="mr-2">Don't have an account?</span>
                                <Link to='/register' className="text-green-600 hover:underline font-bold">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}

export default Login;