export default function PrimaryButton({ children, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="cursor-pointer text-white bg-[#BCB0FF] hover:bg-[#D5CCFF] font-medium rounded-lg text-sm px-5 py-2.5"
        >
            {children}
        </button>
    )
}