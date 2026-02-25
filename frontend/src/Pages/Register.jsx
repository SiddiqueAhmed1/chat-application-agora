// Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import agoraLogo from "../../public/agora-logo.png";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsRegistering(true);

    try {
      const inputData = {
        email,
        password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/register`,
        inputData,
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.message);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <section className="h-screen flex items-center bg-neutral-100 flex-col xl:pt-16 lg:pt-0 text-green-700 font-semibold font-sans">
      <div>
        <img className="w-24 h-24 object-contain" src={agoraLogo} alt="" />
      </div>
      <div className="card mx-auto bg-white p-8 rounded-lg shadow-lg w-[500px]">
        <h1 className="text-3xl text-center mb-6 font-semibold pb-3">
          Create Account
        </h1>
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-semibold block mb-2" htmlFor="email">
              Email Address
            </label>

            <input
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              disabled={isRegistering}
              className="w-full p-3 border rounded focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password (min 6 characters)"
              disabled={isRegistering}
              className="w-full p-3 border rounded focus:outline-none focus:border-green-500"
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={isRegistering || !email.trim() || !password.trim()}
            className={`w-full p-3 rounded text-white font-semibold ${
              isRegistering || !email.trim() || !password.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isRegistering ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
