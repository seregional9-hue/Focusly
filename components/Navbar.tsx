'use client';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200 py-4 px-6 flex justify-between items-center transition-all duration-300">
      {/* Logo */}
      <div className="text-2xl font-black tracking-tighter text-gray-900">
        FOCUSLY<span className="text-indigo-600">TEENS</span>
      </div>

      {/* Botón Hamburguesa */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-50 transition-transform duration-300 hover:scale-105"
      >
        <span className={`block w-6 h-0.5 bg-gray-900 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-900 transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-900 transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Menú Fullscreen */}
      <div className={`fixed inset-0 bg-white flex flex-col items-center justify-center transition-opacity duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <ul className="text-center space-y-8">
          <li><a href="/" className="text-4xl font-bold text-gray-900 hover:text-indigo-600 transition" onClick={() => setIsOpen(false)}>Inicio</a></li>
          <li><a href="/misiones" className="text-4xl font-bold text-gray-900 hover:text-indigo-600 transition" onClick={() => setIsOpen(false)}>Misiones</a></li>
          <li><a href="/perfil" className="text-4xl font-bold text-gray-900 hover:text-indigo-600 transition" onClick={() => setIsOpen(false)}>Tutoría</a></li>
        </ul>
      </div>
    </nav>
  );
}