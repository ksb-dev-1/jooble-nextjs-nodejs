// ----- react-skeleton-icons -----
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BasicDetailsSkeleton: React.FC = () => {
  return (
    <div className="max-w-[1280px] w-full p-4 sm:p-8 rounded-[var(--r1)] bg-white custom-shadow-1 mb-4 sm:mb-8">
      <div className="flex items-center">
        <div>
          <Skeleton height={163.9} width={150} borderRadius={25} />
        </div>
        <div className="ml-4 w-full">
          <Skeleton height={25} borderRadius={25} />
          <Skeleton height={25} borderRadius={25} className="mt-2" />
          <Skeleton height={25} borderRadius={25} className="mt-2" />
          <Skeleton height={25} borderRadius={25} className="mt-2" />
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsSkeleton;
