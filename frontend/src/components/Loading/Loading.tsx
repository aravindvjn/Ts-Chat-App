const Loading = () => {
  return (
    <div className="fixed right-0 left-0 top-0 bottom-0 flex items-center justify-center min-h-screen backdrop-blur-sm  bg-black/50 z-30">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"></div>
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce animation-delay-400"></div>
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce animation-delay-800"></div>
      </div>
    </div>
  );
};

export default Loading;
