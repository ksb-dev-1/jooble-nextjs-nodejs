// ----- react-skeleton-icons -----
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="flex items-center">
      <div>
        <Skeleton height={165.6} width={150} borderRadius={0} />
      </div>
      <div className="ml-4 w-full">
        <Skeleton height={25} borderRadius={0} />
        <Skeleton height={25} borderRadius={0} className="mt-2" />
        <Skeleton height={25} borderRadius={0} className="mt-2" />
        <Skeleton height={25} borderRadius={0} className="mt-2" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
