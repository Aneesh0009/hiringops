const Modal = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0
        bg-black/50
        flex items-center justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-xl
          p-6
          min-w-[400px]
        "
      >
        <button
          onClick={onClose}
          className="mb-4 text-red-500"
        >
          Close
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;