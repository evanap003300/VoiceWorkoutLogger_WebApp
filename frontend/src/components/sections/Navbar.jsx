import AuthButton from '../buttons/AuthButton.jsx'
import Logo from '../../assets/sheet_logo.svg'
import PrimaryButton from '../buttons/PrimaryButton.jsx'

export default function Navbar({ session }) {
    return (
        <nav className="flex justify-between items-center p-4 text-gray-900 text-sm font-semibold border-b border-gray-400 sticky top-0 bg-white z-50">
            {/* Left: Logo */}
            <a href="/">
                <img src={Logo} alt="Sheet Logo" className="h-10 cursor-pointer ml-4 sm:ml-6 md:ml-8 lg:ml-12" />
            </a>

            {/* Right: Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mr-4 sm:mr-6 md:mr-8 lg:mr-12">
                <PrimaryButton>Workout Logs</PrimaryButton>
                <AuthButton session={session} />
            </div>
        </nav>
    )
}