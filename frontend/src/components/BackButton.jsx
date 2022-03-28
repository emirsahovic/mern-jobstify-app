import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <div className="flex w-full justify-start">
            <button onClick={() => navigate(-1)} className="px-4 py-1 bg-gray-300 rounded-lg hover:opacity-80">Go Back</button>
        </div>
    )
}

export default BackButton;
