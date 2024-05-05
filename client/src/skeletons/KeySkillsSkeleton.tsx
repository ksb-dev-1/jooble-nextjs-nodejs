// ----- react-skeleton-icons -----
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const KeySkillsSkeleton = () => {
  return (
    <div className="flex flex-col bg-white rounded-[var(--r1)] p-4 sm:p-8 shadow-1">
      <div className="flex items-center justify-between w-full">
        <Skeleton width={100} height={25} borderRadius={25} />
        <Skeleton width={50} height={25} borderRadius={25} />
      </div>
      <div className="mt-8 flex items-center">
        <Skeleton width={100} height={41.6} borderRadius={25} />
        <Skeleton
          width={100}
          height={41.6}
          borderRadius={25}
          className="ml-2"
        />
        <Skeleton
          width={100}
          height={41.6}
          borderRadius={25}
          className="ml-2"
        />
        <Skeleton
          width={100}
          height={41.6}
          borderRadius={25}
          className="ml-2"
        />
      </div>
    </div>
  );
};

export default KeySkillsSkeleton;
