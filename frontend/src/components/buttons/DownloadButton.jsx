export default function DownloadButton() {
    return (
        <div>
            <button className="cursor-pointer group relative flex gap-1.5 px-8 py-4 bg-[#BCB0FF] bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24px" width="24px">
                    <g id="SVGRepo_iconCarrier">
                        <g id="Interface / Download">
                            <path
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2"
                                stroke="#f1f1f1"
                                d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                                id="Vector"
                            />
                        </g>
                    </g>
                </svg>
                Download
            </button>
        </div>
    );
}