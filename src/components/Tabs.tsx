import clsx from "clsx";
import { Category } from "../../types/schema";

const Tabs = ({
  categories,
  handleCategoryClick,
  activeIndex,
}: {
  categories: Category[];
  handleCategoryClick: (index: number) => void;
  activeIndex: number;
}) => {
  return (
    <div className="overflow-hidden scrollbar-hide">
      <div className="flex text-sm font-medium border-b border-gray-100">
        {categories.map((category, index) => (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(index)}
            className={clsx("p-4 -mb-px border-b border-current", {
              "text-cyan-500": activeIndex === index,
            })}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
