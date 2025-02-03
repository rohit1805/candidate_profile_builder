import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // user is not loged in send to login page
  if (!user) {
    navigate("/login");
    return null; // or a loading spinner can be returned while waiting for authentication
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome, {user.firstName} {user.lastName}
          </h2>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-700">
            User Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Contact:</strong> {user.contact}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>Hobbies:</strong> {user.hobby.join(", ")}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-700">Address</h3>
          <div className="space-y-2">
            <p>
              <strong>Country:</strong> {user.address.country}
            </p>
            <p>
              <strong>State:</strong> {user.address.state}
            </p>
            <p>
              <strong>City:</strong> {user.address.city}
            </p>
            <p>
              <strong>Address Line 1:</strong> {user.address.address1}
            </p>
            <p>
              <strong>Address Line 2:</strong> {user.address.address2}
            </p>
            <p>
              <strong>Nearby:</strong> {user.address.nearby}
            </p>
            <p>
              <strong>Zipcode:</strong> {user.address.zipcode}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-700">Education</h3>
          <div className="space-y-4">
            {user.education.map((edu, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p>
                  <strong>{edu.educationType}</strong>
                </p>
                <p>
                  <strong>School/College:</strong> {edu.schoolCollege}
                </p>
                <p>
                  <strong>Passing Year:</strong> {edu.passingYear}
                </p>
                <p>
                  <strong>Percentage:</strong> {edu.percentage}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
