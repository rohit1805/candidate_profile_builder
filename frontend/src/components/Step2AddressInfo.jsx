import { useState } from "react";

const Step2AddressInfo = ({ setFormData, formData, errors }) => {
  const [addressInfo, setAddressInfo] = useState({
    addressLine1: formData.addressLine1 || "",
    addressLine2: formData.addressLine2 || "",
    city: formData.city || "",
    state: formData.state || "",
    postalCode: formData.postalCode || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressInfo({ ...addressInfo, [name]: value });
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-4 space-y-6">
      <input
        type="text"
        name="addressLine1"
        placeholder="Address Line 1"
        value={addressInfo.addressLine1}
        onChange={handleChange}
        className="input-field"
      />
      {errors.addressLine1 && (
        <div className="text-red-500">{errors.addressLine1}</div>
      )}

      <input
        type="text"
        name="addressLine2"
        placeholder="Address Line 2"
        value={addressInfo.addressLine2}
        onChange={handleChange}
        className="input-field"
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={addressInfo.city}
        onChange={handleChange}
        className="input-field"
      />
      {errors.city && <div className="text-red-500">{errors.city}</div>}

      <input
        type="text"
        name="state"
        placeholder="State"
        value={addressInfo.state}
        onChange={handleChange}
        className="input-field"
      />
      {errors.state && <div className="text-red-500">{errors.state}</div>}

      <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={addressInfo.postalCode}
        onChange={handleChange}
        className="input-field"
      />
      {errors.postalCode && (
        <div className="text-red-500">{errors.postalCode}</div>
      )}
    </div>
  );
};

export default Step2AddressInfo;
