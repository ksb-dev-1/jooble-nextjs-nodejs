// ----- react-skeleton-icons -----
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const KeySkillsSkeleton = () => {
  return (
    <div className="mt-8 flex items-center">
      <Skeleton width={100} height={41.6} borderRadius={25} />
      <Skeleton width={100} height={41.6} borderRadius={25} className="ml-2" />
      <Skeleton width={100} height={41.6} borderRadius={25} className="ml-2" />
      <Skeleton width={100} height={41.6} borderRadius={25} className="ml-2" />
    </div>
  );
};

export default KeySkillsSkeleton;
