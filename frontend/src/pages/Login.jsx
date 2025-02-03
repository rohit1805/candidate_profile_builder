// import { useState, useContext } from "react";
// import { loginUser } from "../api/auth";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { getUserDetails } from "../api/auth";

// const Login = () => {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const { setUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await loginUser(credentials);
//       const token = res.data.token;

//       localStorage.setItem("token", token);

//       const userRes = await getUserDetails(token);
//       const fullUserData = userRes.data;

//       localStorage.setItem("user", JSON.stringify(fullUserData));
//       setUser(fullUserData);

//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6">
//         <h2 className="text-3xl font-semibold text-center text-gray-700">
//           Login
//         </h2>

//         {error && (
//           <div className="bg-red-200 text-red-700 p-2 rounded-md text-center">
//             {error}
//           </div>
//         )}

//         <div className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={credentials.email}
//             onChange={(e) =>
//               setCredentials({ ...credentials, email: e.target.value })
//             }
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={credentials.password}
//             onChange={(e) =>
//               setCredentials({ ...credentials, password: e.target.value })
//             }
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           onClick={handleLogin}
//           className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
//         >
//           Login
//         </button>

//         <div className="text-center mt-4">
//           <span className="text-gray-600">Don't have an account? </span>
//           <a href="/" className="text-blue-500 hover:underline cursor-pointer">
//             Sign Up
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState, useContext } from "react";
import { loginUser, getUserDetails } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await loginUser(credentials);
      const token = res.data.token;
      localStorage.setItem("token", token);

      const userRes = await getUserDetails(token);
      const fullUserData = userRes.data;

      localStorage.setItem("user", JSON.stringify(fullUserData));
      setUser(fullUserData);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-700">
          Login
        </h2>

        {error && (
          <div className="bg-red-200 text-red-700 p-2 rounded-md text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 flex items-center justify-center text-white rounded-lg transition duration-300 ${
            loading
              ? "bg-blue-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? (
            <svg
              className="w-5 h-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <circle
                className="opacity-75"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="40"
                strokeDashoffset="10"
              ></circle>
            </svg>
          ) : (
            "Login"
          )}
        </button>

        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <a href="/" className="text-blue-500 hover:underline cursor-pointer">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
