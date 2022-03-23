import { Link } from "react-router-dom"

const Landing = () => {
    return (
        <div className="h-screen bg-image">
            <div className="pt-56 text-center font-bold text-gray-300 xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style={{ lineHeight: '1.2' }}>
                Are you looking for <span className="text-green-500">employees</span> or <br /> do you want to become one of them?
                <div>
                    <span className="text-green-500">Jobstify</span> will help you.
                </div>
            </div>
            <div className="flex justify-center items-center mt-8 space-x-5">
                <Link to='/profiles' className="px-6 py-2 bg-green-800 text-gray-300 font-bold rounded text-lg hover:opacity-80 transition duration-150 active:-translate-y-2">
                    View Candidates
                </Link>
                <Link to='/login' className="px-6 py-2 bg-green-800 text-gray-300 font-bold rounded text-lg hover:opacity-80 transition duration-150 active:-translate-y-2">
                    Log in to become a candidate
                </Link>
            </div>
        </div>
    )
}

export default Landing
