import React, { useEffect } from 'react';
import { LuCheck } from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';

function Toast({ isshown, message, type, onClose }) {
  useEffect(() => {
    if (isshown) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 3000);

    
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isshown, onClose]);

  return (
    <div
      className={`fixed top-10 right-10 transition-opacity duration-400 ${
    isshown ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full ${
          type === 'delete' ? 'after:bg-red-500' : 'after:bg-green-500'
        }`}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === 'delete' ? 'bg-red-50' : 'bg-green-50'
            }`}
          >
            {type === 'delete' ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>
          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Toast;