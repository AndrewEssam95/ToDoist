import { useState } from "react";
import { MdOutlineFormatListBulleted, MdOutlineGridOn } from "react-icons/md";
import GridItems from "./GridItems";
import ListItems from "./ListItems";
import AddTaskBar from "./AddTaskBar";

const Content = ({ currentCategory }: { currentCategory: string }) => {
  const [viewType, setViewType] = useState<"list" | "grid">("list");

  const handleViewType = (type: "grid" | "list") => {
    setViewType(type);
  };

  return (
    <div className="bg-white w-[63%] md:w-[68%] lg:w-[70%] h-[100%] rounded-md p-4 space-y-5">
      <div className="bg-[#f2f2f2] w-full rounded-md p-2 flex items-center justify-between">
        <AddTaskBar />
        <div className="bg-white border-[1px] border-gray-300 flex items-center justify-between p-1 rounded-xl gap-1">
          <div
            className={`p-1 rounded-lg cursor-pointer ${
              viewType === "list" ? "bg-blue-400 text-white" : ""
            }`}
            onClick={() => {
              handleViewType("list");
            }}>
            <MdOutlineFormatListBulleted size={22} />
          </div>
          <div
            className={`p-1 rounded-lg cursor-pointer ${
              viewType === "grid" ? "bg-blue-400 text-white" : ""
            }`}
            onClick={() => {
              handleViewType("grid");
            }}>
            <MdOutlineGridOn size={22} />
          </div>
        </div>
      </div>
      {viewType === "grid" ? (
        <GridItems currentCategory={currentCategory} />
      ) : (
        <ListItems currentCategory={currentCategory} />
      )}
    </div>
  );
};

export default Content;
