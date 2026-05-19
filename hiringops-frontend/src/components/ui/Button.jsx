const variants = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white",

  secondary:
    "bg-gray-200 hover:bg-gray-300 text-black",

  danger:
    "bg-red-600 hover:bg-red-700 text-white",
};

const Button = ({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg
        font-medium
        transition-all duration-200
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;