const Stepper = ({ step }) => {
  return (
    <div className="flex justify-between p-4">
      {["User Info", "Address", "Education"].map((label, index) => (
        <div
          key={index}
          className={`p-2 ${
            index === step ? "text-blue-500 font-bold" : "text-gray-400"
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
