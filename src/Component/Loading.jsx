
import { FcMoneyTransfer } from "react-icons/fc";
const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-base-100 text-center px-4">
            {/* Animated Money icon */}
            <div className="animate-bounce text-primary text-6xl mb-4">
                <FcMoneyTransfer />
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Hang tight! We're Transfering your Money...
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mt-2">
                Our system is carefully processing your delivery information.
            </p>

            <span className="loading loading-spinner loading-lg text-primary mt-6"></span>
        </div>
    );
};

export default Loading;