import { useRouteError, useNavigate } from "react-router";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-violet-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-600/50 shadow-2xl text-center">
          {/* Error Icon */}
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
              <svg 
                className="w-12 h-12 text-red-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-white mb-4">
            Oops! Something went wrong
          </h1>
          
          <p className="text-purple-200 text-lg mb-2">
            We encountered an unexpected error
          </p>

          {/* Error Details */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
              <p className="text-red-300 text-sm font-mono">
                {error.statusText || error.message}
              </p>
              {error.status && (
                <p className="text-red-400 text-xs mt-1">
                  Error Code: {error.status}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoBack}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all duration-300 border border-purple-500 hover:border-purple-400 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
            
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-all duration-300 border border-violet-500 hover:border-violet-400 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </button>
          </div>

          {/* Support Text */}
          <div className="mt-8 pt-6 border-t border-purple-600/30">
            <p className="text-purple-300 text-sm">
              If the problem persists, please contact support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;