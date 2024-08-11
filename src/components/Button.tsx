interface ButtonProps {
    label: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({label, onClick}) => {
    return (
        <button
        className={`bg-blue-600 text-white py-2 px-4 w-full rounded hover:bg-blue-700 transition-colors`}
        onClick={onClick}
        >
            {label}
        </button>
    )
}

export default Button