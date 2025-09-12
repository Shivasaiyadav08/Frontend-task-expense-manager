import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { resetPassword } from "../api/api"; // <-- adjust path if needed

const ResetPassword: React.FC = () => {
  // Tell TypeScript that params include "token"
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Guard: token may be undefined
    if (!token) {
      setMessage("Invalid or missing reset token");
      return;
    }

    try {
      await resetPassword(token, password);
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || "Failed to reset password");
      } else {
        setMessage("Unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        {message && <p className="text-red-500 mb-2">{message}</p>}

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
