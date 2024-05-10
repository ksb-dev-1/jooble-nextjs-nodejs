// ----- react-skeleton-icons -----
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const QuickLinksSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 h-fit custom-shadow-1 bg-white w-full md:flex md:flex-wrap md:flex-col rounded-[var(--r1)] md:w-[250px] md:sticky top-[6.5rem]">
      <Skeleton borderRadius={25} className="mt-2 py-2 px-4" />
      <Skeleton borderRadius={25} className="mt-2 py-2 px-4" />
      <Skeleton borderRadius={25} className="mt-2 py-2 px-4" />
      <Skeleton borderRadius={25} className="mt-2 py-2 px-4" />
    </div>
  );
};

export default QuickLinksSkeleton;
