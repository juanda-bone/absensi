// components/Alert.js
import { useState } from "react";

const AlertModif = ({ message, type = "info" }) => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  const typeStyles = {
    info: "bg-blue-100 border-blue-400 text-blue-700",
    success: "bg-green-100 border-green-400 text-green-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    error: "bg-red-100 border-red-400 text-red-700 ",
  };

  const alertClass = typeStyles[type] || typeStyles.info;

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-sm ">
      <div
        className={`border-l-4 p-4 rounded shadow-lg ${alertClass}`}
        role="alert"
      >
        <div className="flex justify-between items-center">
          <div>
            <strong className="font-bold capitalize">{type} alert!</strong>
            <span className="block sm:inline"> {message}</span>
          </div>
          <button
            className="ml-4 text-lg font-bold"
            onClick={() => setShow(false)}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModif;
