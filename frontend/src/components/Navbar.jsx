import AuthButton from './AuthButton.jsx'

export default function Navbar({ session }) {
    return (
    <nav className="flex justify-end items-center p-4 bg-gray-900 text-gray-100 text-sm font-semibold">
        <AuthButton session={session} />
    </nav>
    )
  }