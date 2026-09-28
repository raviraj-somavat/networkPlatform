import React from 'react'

const Nav = () => {
  return (
    <div>
        <nav className="flex items-center justify-between py-4 px-6 bg-[#06261d] text-white">
            <div className="text-lg font-semibold">
                <img src="/logo.png" alt="Zarre Logo" className="h-8 w-auto object-contain" />
            </div>
            <div className="space-x-4">
                <a heref='/profile' className="hover:text-[#dfb76c] transition">Profile</a>
                <a href="/settings" className="hover:text-[#dfb76c] transition">Settings</a>
                <a href="/logout" className="hover:text-[#dfb76c] transition">Logout</a>
            </div>
        </nav>
    </div>
  )
}

export default Nav