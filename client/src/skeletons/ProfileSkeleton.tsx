// ----- react-skeleton-icons -----
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="flex items-center">
      <div>
        <Skeleton circle height={150} width={150} />
      </div>
      <div className="ml-2 w-full">
        <Skeleton height={25} borderRadius={25} />
        <Skeleton height={25} borderRadius={25} className="mt-2" />
        <Skeleton height={25} borderRadius={25} className="mt-2" />
        <Skeleton height={25} borderRadius={25} className="mt-2" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
