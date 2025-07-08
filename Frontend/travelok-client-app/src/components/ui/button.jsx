import React from "react";

// Utility to combine class names conditionally
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Define styles manually
const VARIANT_CLASSES = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 bg-white hover:bg-gray-100 text-gray-800",
  secondary: "bg-gray-600 text-white hover:bg-gray-700",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-800",
  link: "text-blue-600 underline hover:no-underline",
};

const SIZE_CLASSES = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3 text-sm",
  lg: "h-11 px-6 text-lg",
  icon: "h-10 w-10 flex items-center justify-center",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none";

// Props type
export function Button({
  children,
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.default;
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.default;

  return (
    <button
      className={classNames(BASE_CLASSES, variantClass, sizeClass, className)}
      {...props}
    >
      {children}
    </button>
  );
}
