import { Link } from "react-router-dom"

const Landing = () => {
    return (
        <div className="h-screen bg-image">
            <div className="pt-56 text-center font-bold text-gray-300 xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                Are you looking for <span className="text-green-500">employees</span>?
                <div className="mt-3">
                    <span className="text-green-500">Jobstify</span> will help you.
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-8">
                <Link to='/profiles' className="px-6 py-2 bg-green-800 text-gray-300 font-bold rounded text-lg hover:opacity-80 transition duration-150 active:-translate-y-2">
                    View Candidates
                </Link>
            </div>
        </div>
    )
}

export default Landing
