import React from 'react';
import { GraduationCap } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <GraduationCap className="h-16 w-16 text-blue-600 animate-bounce mx-auto" />
        <div className="mt-4">
          <div className="h-2 w-24 bg-blue-200 rounded-full overflow-hidden">
            <div className="h-full w-full bg-blue-600 animate-[loading_1s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;