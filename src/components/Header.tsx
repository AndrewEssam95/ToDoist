const Header = () => {
  return (
    <div className="bg-white px-2 py-1 rounded-md flex items-center justify-between">
      <div className="flex items-center cursor-pointer">
        <div className="w-12 h-12 overflow-hidden flex items-center justify-center -mx-2">
          <img src="/todoist.png" alt="ToDoist" />
        </div>
        <span className="text-[#e34432] text-sm font-medium">ToDoist</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold">Hello, Andrew Essam</span>
        <div className="w-10 h-10 overflow-hidden rounded-full border-2 border-gray-500 cursor-pointer">
          <img src="/public/Profile Picture.png" alt="Andrew Essam" />
        </div>
      </div>
    </div>
  );
};

export default Header;
