// ----- react-skeleton-icons -----
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const QuickLinksSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:flex md:flex-wrap md:flex-col bg-white rounded-[var(--r1)] p-4 lg:p-8 w-full md:w-[225px] md:sticky top-[6.5rem] h-fit shadow-1">
      <Skeleton
        height={40}
        borderRadius={25}
        className="font-bold hidden md:block mt-2"
      />
      <Skeleton height={25} borderRadius={25} className="mt-2" />
      <Skeleton height={25} borderRadius={25} className="mt-2" />
      <Skeleton height={25} borderRadius={25} className="mt-2" />
      <Skeleton height={25} borderRadius={25} className="mt-2" />
      {/* <Skeleton height={25} borderRadius={25} />
      <Skeleton height={25} borderRadius={25} /> */}
    </div>
  );
};

export default QuickLinksSkeleton;
