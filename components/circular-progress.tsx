// components/CircularProgress.js
export default function CircularProgress() {
    return (
      <div className="w-32 h-32 relative">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
          <path
            className="text-gray-200"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.8"
          />
          <path
            className="text-green-500"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.8"
            strokeDasharray="60, 100"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xl">Jan 2024</span>
      </div>
    );
  }
  