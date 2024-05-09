// ----- react-skeleton-icons -----
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeaderSkeleton = () => {
  return (
    <div className="max-w-[1280px] w-full h-[4.5rem] mx-auto flex items-center justify-between transition duration-300">
      <div className="flex items-center  w-full justify-start md:w-[33.33%]">
        <Skeleton height={30} width={75} borderRadius={25} />
      </div>

      <div className="hidden sm:flex items-center justify-center ml-4 md:w-[33.33%]">
        <Skeleton height={30} width={50} borderRadius={25} />
        <Skeleton height={30} width={50} borderRadius={25} className="ml-2" />
        <Skeleton height={30} width={50} borderRadius={25} className="ml-2" />
      </div>
      <div className="md:w-[33.33%] flex items-center justify-end">
        <Skeleton height={30} width={75} borderRadius={25} className="ml-2" />
      </div>
    </div>
  );
};

export default HeaderSkeleton;
