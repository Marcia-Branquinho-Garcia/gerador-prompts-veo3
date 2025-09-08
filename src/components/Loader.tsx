
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-12 h-12 border-4 border-slate-600 border-t-sky-400 rounded-full animate-spin"></div>
    </div>
  );
};
