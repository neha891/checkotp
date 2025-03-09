import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(""); // Store OTP input
  const [isOtpSent, setIsOtpSent] = useState(false); // Track OTP status
  const [isOtpVerified, setIsOtpVerified] = useState(false); // Track OTP verification
  const navigate = useNavigate();

  // 📌 Step 1: Send OTP to Email
  const sendOtp = async () => {
    const formattedEmail = email.trim().toLowerCase(); // Convert email to lowercase
    if (!formattedEmail.endsWith("@gcek.ac.in")) {
      alert("Please use your college email to register.");
      return;
    }

    try {
      console.log("Sending OTP to:", formattedEmail);
      await axios.post("http://localhost:5000/api/otp/send-otp", { email: formattedEmail });
      setEmail(formattedEmail); // Update email state with formatted version
      setIsOtpSent(true);
      alert("OTP sent to your email. Please check your inbox.");
    } catch (error) {
      alert(error.response?.data?.message || "Error sending OTP.");
    }
  };

  // 📌 Step 2: Verify OTP
  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/otp/verify-otp", {
        email,
        otp,
      });

      alert(response.data.message);
      setIsOtpVerified(true); // OTP is verified, move to password entry
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed.");
    }
  };

  // 📌 Step 3: Register User
  const registerUser = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });

      alert(response.data.message);
      navigate("/"); // Redirect to login page
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        {!isOtpSent ? (
          // 📌 Step 1: Enter Email & Send OTP
          <>
            <input
              type="email"
              placeholder="College Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
              required
            />
            <button onClick={sendOtp} className="w-full bg-blue-500 text-white p-2 rounded">
              Send OTP
            </button>
          </>
        ) : !isOtpVerified ? (
          // 📌 Step 2: Enter OTP
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
              required
            />
            <button onClick={verifyOtp} className="w-full bg-yellow-500 text-white p-2 rounded">
              Verify OTP
            </button>
          </>
        ) : (
          // 📌 Step 3: Register User After OTP Verification
          <form onSubmit={registerUser}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
              required
            />
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
              Register
            </button>
          </form>
        )}

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
