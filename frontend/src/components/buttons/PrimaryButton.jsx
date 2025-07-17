export default function PrimaryButton({ children }) {
    return (
        <button
            type="button"
            className="cursor-pointer text-white bg-[#BCB0FF] hover:bg-[#D5CCFF] font-medium rounded-lg text-sm px-5 py-2.5"
        >
            {children}
        </button>
    )
}