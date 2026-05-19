const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="
          border border-gray-300
          rounded-lg
          px-4 py-2
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />
    </div>
  );
};

export default Input;