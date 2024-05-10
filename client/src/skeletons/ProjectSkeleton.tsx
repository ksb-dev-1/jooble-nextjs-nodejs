// ----- react-skeleton-icons -----
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProjectSkeleton = () => {
  return (
    <div className="mt-4 sm:mt-8 bg-white rounded-[var(--r1)] p-4 sm:p-8 custom-shadow-1">
      <div className="flex items-center justify-between">
        <Skeleton width={100} height={25} borderRadius={25} />
        <Skeleton width={50} height={25} borderRadius={25} />
      </div>
      <div className="mt-8">
        <div className="custom-border-1 p-8 rounded-[var(--r1)] mt-8">
          <div className="flex items-center">
            <Skeleton width={100} height={25} borderRadius={25} />
            <Skeleton width={30} height={30} circle className="mx-4" />
            <Skeleton width={30} height={30} circle />
          </div>
          <div className="mt-4">
            <Skeleton height={41.6} borderRadius={25} />
          </div>
          <div className="mt-4 flex items-center">
            <Skeleton height={30} width={50} borderRadius={25} />
            <Skeleton
              height={30}
              width={50}
              borderRadius={25}
              className="ml-2"
            />
          </div>
        </div>
      </div>
      {/* <div className="flex items-center justify-between w-full">
        <Skeleton width={100} height={25} borderRadius={25} />
        <Skeleton width={50} height={25} borderRadius={25} />
      </div>
      <div className="custom-border-1 p-8 rounded-[var(--r1)] mt-8">
        <div className="flex items-center">
          <Skeleton
            height={25}
            width={100}
            borderRadius={25}
            className="mt-2"
          />

          <Skeleton circle height={30} width={30} className="mx-4" />
          <Skeleton circle height={30} width={30} />
        </div>

        <Skeleton height={47.6} borderRadius={25} className="mt-4" />

        <div className="mt-4 flex items-center">
          <Skeleton height={40} width={69.08} borderRadius={25} />
          <Skeleton
            height={40}
            width={69.08}
            borderRadius={25}
            className="ml-2"
          />
        </div>
      </div> */}
    </div>
  );
};

export default ProjectSkeleton;
