import React, { useState, useEffect } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { AlertCircle, CheckCircle } from "lucide-react";

const BackendStatus = () => {
  const [isOnline, setIsOnline] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await axiosInstance.get("/health");
        setIsOnline(res.status === 200);
      } catch (error) {
        setIsOnline(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (isChecking) return null;

  if (!isOnline) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <div className="flex-1">
            <p className="text-sm text-red-700 font-medium">
              Backend server is not running
            </p>
            <p className="text-xs text-red-600 mt-1">
              Please start the backend server on port 4500 to use authentication and other features.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-4">
      <div className="flex items-center">
        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
        <p className="text-xs text-green-700">
          Backend server is running
        </p>
      </div>
    </div>
  );
};

export default BackendStatus;