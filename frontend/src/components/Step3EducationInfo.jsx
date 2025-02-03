import { useState } from "react";

const Step3EducationInfo = ({ setFormData, formData, errors }) => {
  const [educationEntries, setEducationEntries] = useState(
    formData.education || [
      { educationType: "", institution: "", passingYear: "", percentage: "" },
    ]
  );

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newEducationEntries = [...educationEntries];
    newEducationEntries[index][name] = value;
    setEducationEntries(newEducationEntries);
    setFormData({ ...formData, education: newEducationEntries });
  };

  const addEducationEntry = () => {
    setEducationEntries([
      ...educationEntries,
      { educationType: "", institution: "", passingYear: "", percentage: "" },
    ]);
  };

  const removeEducationEntry = (index) => {
    const newEducationEntries = [...educationEntries];
    newEducationEntries.splice(index, 1);
    setEducationEntries(newEducationEntries);
    setFormData({ ...formData, education: newEducationEntries });
  };

  return (
    <div className="p-4 space-y-6">
      {educationEntries.map((entry, index) => (
        <div
          key={index}
          className="education-entry p-4 border border-gray-300 rounded-lg space-y-4"
        >
          <select
            name="educationType"
            value={entry.educationType}
            onChange={(e) => handleChange(e, index)}
            className="input-field"
          >
            <option value="">Select Education Type</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="Graduation">Graduation</option>
            <option value="PostGraduation">Post Graduation</option>
          </select>
          {errors[`educationType${index}`] && (
            <div className="text-red-500">
              {errors[`educationType${index}`]}
            </div>
          )}

          <input
            type="text"
            name="institution"
            value={entry.institution}
            placeholder="Institution Name"
            onChange={(e) => handleChange(e, index)}
            className="input-field"
          />
          {errors[`institution${index}`] && (
            <div className="text-red-500">{errors[`institution${index}`]}</div>
          )}

          <input
            type="text"
            name="passingYear"
            value={entry.passingYear}
            placeholder="Passing Year"
            onChange={(e) => handleChange(e, index)}
            className="input-field"
          />
          {errors[`passingYear${index}`] && (
            <div className="text-red-500">{errors[`passingYear${index}`]}</div>
          )}

          <input
            type="text"
            name="percentage"
            value={entry.percentage}
            placeholder="Percentage"
            onChange={(e) => handleChange(e, index)}
            className="input-field"
          />
          {errors[`percentage${index}`] && (
            <div className="text-red-500">{errors[`percentage${index}`]}</div>
          )}

          <button
            type="button"
            onClick={() => removeEducationEntry(index)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addEducationEntry}
        className="px-4 py-2 bg-gray-200 text-black rounded-lg mt-4"
      >
        Add Education Entry
      </button>
    </div>
  );
};

export default Step3EducationInfo;
