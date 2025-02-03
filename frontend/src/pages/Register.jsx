// import { useState } from "react";
// import Stepper from "../components/Stepper";
// import Step1UserInfo from "../components/Step1UserInfo";
// import Step2AddressInfo from "../components/Step2AddressInfo";
// import Step3EducationInfo from "../components/Step3EducationInfo";
// import { registerUser } from "../api/auth";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [step, setStep] = useState(0);
//   const [formData, setFormData] = useState({});
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     try {
//       await registerUser(formData);
//       alert("Registration successful!");
//       navigate("/login");
//     } catch (error) {
//       alert("Error: " + error.response.data.message);
//     }
//   };

//   console.log("Form Data : ", formData);

//   const handleNext = () => {
//     let isValid = true;
//     let stepErrors = {};

//     if (step === 0) {
//       // validate step 1
//       stepErrors = validateStep1(formData);
//       if (Object.keys(stepErrors).length > 0) {
//         setErrors(stepErrors);
//         isValid = false;
//       }
//     } else if (step === 1) {
//       // validate step 2
//       stepErrors = validateStep2(formData);
//       if (Object.keys(stepErrors).length > 0) {
//         setErrors(stepErrors);
//         isValid = false;
//       }
//     } else if (step === 2) {
//       // validate step 3
//       stepErrors = validateStep3(formData);
//       if (Object.keys(stepErrors).length > 0) {
//         setErrors(stepErrors);
//         isValid = false;
//       }
//     }

//     if (isValid) {
//       setStep(step + 1);
//     } else {
//       alert("Please fill in all required fields.");
//     }
//   };

//   const handleBack = () => {
//     setStep(step - 1);
//   };

//   const validateStep1 = (data) => {
//     const errors = {};
//     if (!data.firstName) errors.firstName = "First name is required.";
//     if (!data.lastName) errors.lastName = "Last name is required.";
//     if (!data.email) errors.email = "Email is required.";
//     if (!data.contact) errors.contact = "Contact number is required.";
//     if (!data.password) errors.password = "Password is required.";
//     if (data.password !== data.confirmPassword) {
//       errors.confirmPassword = "Passwords do not match.";
//     }
//     if (!data.gender) errors.gender = "Gender is required.";
//     if (data.hobby && data.hobby.length === 0) {
//       errors.hobby = "At least one hobby is required.";
//     }

//     return errors;
//   };

//   const validateStep2 = (data) => {
//     const errors = {};
//     if (!data.addressLine1) errors.addressLine1 = "Address line 1 is required.";
//     if (!data.city) errors.city = "City is required.";
//     if (!data.state) errors.state = "State is required.";
//     if (!data.postalCode) errors.postalCode = "Postal code is required.";

//     return errors;
//   };

//   const validateStep3 = (data) => {
//     const errors = {};
//     if (!data.education || data.education.length < 3) {
//       errors.education = "At least 3 education entries are required.";
//     } else {
//       data.education.forEach((entry, index) => {
//         if (!entry.educationType)
//           errors[`educationType${index}`] = "Education type is required.";
//         if (!entry.institution)
//           errors[`institution${index}`] = "Institution is required.";
//         if (!entry.passingYear)
//           errors[`passingYear${index}`] = "Passing year is required.";
//         if (!entry.percentage)
//           errors[`percentage${index}`] = "Percentage is required.";
//       });
//     }

//     return errors;
//   };

//   return (
//     <div className="p-8 max-w-4xl mx-auto relative">
//       {/* login link*/}
//       <div className="absolute top-4 right-4">
//         <p className="text-gray-600">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-500 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>

//       <Stepper step={step} />
//       {step === 0 && (
//         <Step1UserInfo
//           setFormData={setFormData}
//           formData={formData}
//           errors={errors}
//         />
//       )}
//       {step === 1 && (
//         <Step2AddressInfo
//           setFormData={setFormData}
//           formData={formData}
//           errors={errors}
//         />
//       )}
//       {step === 2 && (
//         <Step3EducationInfo
//           setFormData={setFormData}
//           formData={formData}
//           errors={errors}
//         />
//       )}

//       <div className="flex justify-end gap-5 mt-8">
//         {step > 0 && (
//           <button
//             onClick={handleBack}
//             className="px-6 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-100 transition"
//           >
//             Back
//           </button>
//         )}
//         {step < 2 ? (
//           <button
//             onClick={handleNext}
//             className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//           >
//             Next
//           </button>
//         ) : (
//           <button
//             onClick={handleSubmit}
//             className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
//           >
//             Submit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Register;

////////////////////////////////////////////////////////////////////

import { useState } from "react";
import Stepper from "../components/Stepper";
import Step1UserInfo from "../components/Step1UserInfo";
import Step2AddressInfo from "../components/Step2AddressInfo";
import Step3EducationInfo from "../components/Step3EducationInfo";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await registerUser(formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert(
        "Error: " + error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    let isValid = true;
    let stepErrors = {};

    if (step === 0) {
      stepErrors = validateStep1(formData);
    } else if (step === 1) {
      stepErrors = validateStep2(formData);
    } else if (step === 2) {
      stepErrors = validateStep3(formData);
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      alert("Please fill in all required fields.");
      isValid = false;
    }

    if (isValid) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const validateStep1 = (data) => {
    const errors = {};
    if (!data.firstName) errors.firstName = "First name is required.";
    if (!data.lastName) errors.lastName = "Last name is required.";
    if (!data.email) errors.email = "Email is required.";
    if (!data.contact) errors.contact = "Contact number is required.";
    if (!data.password) errors.password = "Password is required.";
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    if (!data.gender) errors.gender = "Gender is required.";
    if (data.hobby && data.hobby.length === 0) {
      errors.hobby = "At least one hobby is required.";
    }

    return errors;
  };

  const validateStep2 = (data) => {
    const errors = {};
    if (!data.addressLine1) errors.addressLine1 = "Address line 1 is required.";
    if (!data.city) errors.city = "City is required.";
    if (!data.state) errors.state = "State is required.";
    if (!data.postalCode) errors.postalCode = "Postal code is required.";

    return errors;
  };

  const validateStep3 = (data) => {
    const errors = {};
    if (!data.education || data.education.length < 3) {
      errors.education = "At least 3 education entries are required.";
    } else {
      data.education.forEach((entry, index) => {
        if (!entry.educationType)
          errors[`educationType${index}`] = "Education type is required.";
        if (!entry.institution)
          errors[`institution${index}`] = "Institution is required.";
        if (!entry.passingYear)
          errors[`passingYear${index}`] = "Passing year is required.";
        if (!entry.percentage)
          errors[`percentage${index}`] = "Percentage is required.";
      });
    }

    return errors;
  };

  return (
    <div className="p-8 max-w-4xl mx-auto relative">
      <div className="absolute top-4 right-4">
        <p className="text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>

      <Stepper step={step} />
      {step === 0 && (
        <Step1UserInfo
          setFormData={setFormData}
          formData={formData}
          errors={errors}
        />
      )}
      {step === 1 && (
        <Step2AddressInfo
          setFormData={setFormData}
          formData={formData}
          errors={errors}
        />
      )}
      {step === 2 && (
        <Step3EducationInfo
          setFormData={setFormData}
          formData={formData}
          errors={errors}
        />
      )}

      <div className="flex justify-end gap-5 mt-8">
        {step > 0 && (
          <button
            onClick={handleBack}
            className="px-6 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-100 transition"
          >
            Back
          </button>
        )}
        {step < 2 ? (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-6 py-2 flex items-center justify-center text-white rounded-md transition ${
              loading
                ? "bg-green-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
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
              "Submit"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Register;
