import React from "react";
function Button({
  onClick,
  Icon,
  loading,
  type,
  text,
  loadingText,
  className,
}) {
  return (
    <button
      type={type ? type : "button"}
      disabled={loading}
      onClick={onClick}
      className={`${className} flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white rounded cursor-pointer`}
    >
      {Icon && Icon}
      {loading ? (
        <>
          <span className="animate-spin h-3.5 w-3.5 border-2 border-t-transparent border-white rounded-full"></span>
          {loadingText}
        </>
      ) : (
        text
      )}
    </button>
  );
}

export default Button;
