
function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    className = '',
    textColor = 'text-white',
    ...props
}) {
    return (
        <button
            type={type}
            className={`${bgColor} ${textColor} ${className} py-2 px-4 rounded-md hover:opacity-80 transition duration-300`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button