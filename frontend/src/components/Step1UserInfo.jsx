import { useState } from "react";
import Select from "react-select";

const Step1UserInfo = ({ setFormData, formData, errors }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: formData.firstName || "",
    lastName: formData.lastName || "",
    email: formData.email || "",
    contact: formData.contact || "",
    password: formData.password || "",
    confirmPassword: formData.confirmPassword || "",
    gender: formData.gender || "",
    hobby: formData.hobby || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    setFormData({ ...formData, [name]: value });
  };

  const handleHobbyChange = (selectedOptions) => {
    setUserInfo({
      ...userInfo,
      hobby: selectedOptions.map((option) => option.value),
    });
    setFormData({
      ...formData,
      hobby: selectedOptions.map((option) => option.value),
    });
  };

  const hobbyOptions = [
    { value: "Reading", label: "Reading" },
    { value: "Gaming", label: "Gaming" },
    { value: "Traveling", label: "Traveling" },
    { value: "Cooking", label: "Cooking" },
    { value: "Music", label: "Music" },
  ];

  return (
    <div className="p-4 space-y-6">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={userInfo.firstName}
        onChange={handleChange}
        className="input-field"
      />
      {errors.firstName && (
        <div className="text-red-500">{errors.firstName}</div>
      )}

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={userInfo.lastName}
        onChange={handleChange}
        className="input-field"
      />
      {errors.lastName && <div className="text-red-500">{errors.lastName}</div>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userInfo.email}
        onChange={handleChange}
        className="input-field"
      />
      {errors.email && <div className="text-red-500">{errors.email}</div>}

      <input
        type="text"
        name="contact"
        placeholder="Contact Number"
        value={userInfo.contact}
        onChange={handleChange}
        className="input-field"
      />
      {errors.contact && <div className="text-red-500">{errors.contact}</div>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={userInfo.password}
        onChange={handleChange}
        className="input-field"
      />
      {errors.password && <div className="text-red-500">{errors.password}</div>}

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={userInfo.confirmPassword}
        onChange={handleChange}
        className="input-field"
      />
      {errors.confirmPassword && (
        <div className="text-red-500">{errors.confirmPassword}</div>
      )}

      <div className="space-y-2">
        <label>Gender</label>
        <select
          name="gender"
          value={userInfo.gender}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <div className="text-red-500">{errors.gender}</div>}
      </div>

      {/* <div className="space-y-2">
        <label className="block">Hobbies</label>
        <select
          multiple
          name="hobby"
          value={userInfo.hobby}
          onChange={handleHobbyChange}
          className="input-field resize-y h-24 md:h-36"
        >
          <option value="Reading">Reading</option>
          <option value="Gaming">Gaming</option>
          <option value="Traveling">Traveling</option>
          <option value="Cooking">Cooking</option>
          <option value="Music">Music</option>
        </select>
        {errors.hobby && <div className="text-red-500">{errors.hobby}</div>}
      </div> */}
      <div className="space-y-2">
        <label className="block">Hobbies</label>
        <Select
          isMulti
          name="hobby"
          options={hobbyOptions}
          value={hobbyOptions.filter((option) =>
            userInfo.hobby.includes(option.value)
          )}
          onChange={handleHobbyChange}
          className="input-field"
        />
        {errors.hobby && <div className="text-red-500">{errors.hobby}</div>}
      </div>
    </div>
  );
};

export default Step1UserInfo;
