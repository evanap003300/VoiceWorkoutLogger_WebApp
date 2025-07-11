import AuthButton from './AuthButton.jsx'

export default function Navbar({ session }) {
    return (
    <nav className="flex justify-end items-center p-4 bg-gray-100 text-gray-100 text-sm font-semibold">
        <AuthButton session={session} />
    </nav>
    )
  }