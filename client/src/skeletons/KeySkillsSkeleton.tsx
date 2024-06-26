// ----- react-skeleton-icons -----
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const KeySkillsSkeleton = () => {
  return (
    <div className="flex flex-col bg-white rounded-[var(--r1)] p-4 sm:p-8 custom-shadow-1">
      <div className="flex items-center justify-between w-full">
        <Skeleton width={100} height={24} borderRadius={25} />
        <Skeleton width={50} height={24} borderRadius={25} />
      </div>

      <div className="mt-8 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 lg:flex items-center flex-wrap">
        <div className="hidden lg:flex">
          <Skeleton
            height={41.6}
            width={100}
            borderRadius={25}
            className="lg:mr-2 lg:mb-2"
          />
        </div>
        <div className="hidden lg:flex">
          <Skeleton
            height={41.6}
            width={100}
            borderRadius={25}
            className="lg:mr-2 lg:mb-2"
          />
        </div>
        <div className="hidden lg:flex">
          <Skeleton
            height={41.6}
            width={100}
            borderRadius={25}
            className="lg:mr-2 lg:mb-2"
          />
        </div>
        <div className="hidden lg:flex">
          <Skeleton
            height={41.6}
            width={100}
            borderRadius={25}
            className="lg:mr-2 lg:mb-2"
          />
        </div>
        <Skeleton height={41.6} borderRadius={25} />
        <Skeleton height={41.6} borderRadius={25} />
        <Skeleton height={41.6} borderRadius={25} />
        <Skeleton height={41.6} borderRadius={25} />
      </div>
    </div>
  );
};

export default KeySkillsSkeleton;
