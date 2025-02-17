import React from 'react';
import SwapForm from './components/SwapForm';

const App: React.FC = () => {
  return (
    <div className="aurora flex items-center justify-center min-h-screen">
      <div className="w-2/3 mx-auto p-5 text-center space-x-3">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-medium mb-7 text-white *:text-transparent *:bg-clip-text *:bg-gradient-to-r *:from-purple-400 *:to-pink-500">
          Swap whenever and wherever <span>works best for you</span>
        </h1>
        <div className='max-w-xl mx-auto text-center'>  
          <SwapForm />
        </div>
      </div>
    </div>
  );
};

export default App;
