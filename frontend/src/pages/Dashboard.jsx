import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome, {user?.firstName || "User"} {user?.lastName || ""}
          </h2>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
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
              <strong>Email:</strong> {user?.email || "N/A"}
            </p>
            <p>
              <strong>Contact:</strong> {user?.contact || "N/A"}
            </p>
            <p>
              <strong>Gender:</strong> {user?.gender || "N/A"}
            </p>
            <p>
              <strong>Hobbies:</strong> {user?.hobby?.join(", ") || "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-700">Address</h3>
          <div className="space-y-2">
            <p>
              <strong>Country:</strong> {user?.address?.country || "N/A"}
            </p>
            <p>
              <strong>State:</strong> {user?.address?.state || "N/A"}
            </p>
            <p>
              <strong>City:</strong> {user?.address?.city || "N/A"}
            </p>
            <p>
              <strong>Address Line 1:</strong>{" "}
              {user?.address?.address1 || "N/A"}
            </p>
            <p>
              <strong>Address Line 2:</strong>{" "}
              {user?.address?.address2 || "N/A"}
            </p>
            <p>
              <strong>Nearby:</strong> {user?.address?.nearby || "N/A"}
            </p>
            <p>
              <strong>Zipcode:</strong> {user?.address?.zipcode || "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-700">Education</h3>
          <div className="space-y-4">
            {user?.education?.length > 0 ? (
              user.education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <p>
                    <strong>{edu?.educationType || "N/A"}</strong>
                  </p>
                  <p>
                    <strong>School/College:</strong>{" "}
                    {edu?.schoolCollege || "N/A"}
                  </p>
                  <p>
                    <strong>Passing Year:</strong> {edu?.passingYear || "N/A"}
                  </p>
                  <p>
                    <strong>Percentage:</strong>{" "}
                    {edu?.percentage ? `${edu.percentage}%` : "N/A"}
                  </p>
                </div>
              ))
            ) : (
              <p>No education details available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
