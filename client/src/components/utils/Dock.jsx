import React from 'react';
import {
  House,
  UserCircle,
  Briefcase,
  ChatCircleDots,
  Gear,
  SignOut,
} from 'phosphor-react';

const icons = [
  { name: 'Home', icon: House },
  { name: 'Profile', icon: UserCircle },
  { name: 'Projects', icon: Briefcase },
  { name: 'Messages', icon: ChatCircleDots },
  { name: 'Settings', icon: Gear },
];

const Dock = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800/30 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-3 flex space-x-6 z-50 shadow-xl">
      {icons.map(({ name, icon: Icon }, idx) => (
        <div key={idx} className="group relative flex flex-col items-center justify-end">
          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 text-sm font-semibold text-white bg-black/80 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none scale-90 group-hover:scale-100">
            {name}
          </div>

          {/* Icon Button */}
          <button className="text-white p-2 rounded-full border border-white hover:scale-125 transition-transform duration-300">
            <Icon size={28} weight="duotone" />
          </button>
        </div>
      ))}

      {/* Logout Button */}
      <div className="group relative flex flex-col items-center justify-end">
        <div className="absolute bottom-full mb-2 text-sm font-semibold text-white bg-black/80 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none scale-90 group-hover:scale-100">
          Logout
        </div>
        <button className="text-red-500 p-2 rounded-full border border-red-500 hover:scale-125 transition-transform duration-300">
          <SignOut size={28} weight="duotone" />
        </button>
      </div>
    </div>
  );
};

export default Dock;
