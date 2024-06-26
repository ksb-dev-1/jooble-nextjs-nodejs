// ----- react-skeleton-icons -----
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BasicDetailsSkeleton: React.FC = () => {
  return (
    <div className="max-w-[1280px] w-full p-4 sm:p-8 rounded-[var(--r1)] custom-shadow-1 mb-4 sm:mb-8 bg-white">
      <div className="flex items-center">
        <div>
          <Skeleton height={150} width={150} circle />
        </div>
        <div className="ml-8 w-full">
          <Skeleton height={30} borderRadius={25} />
          <Skeleton height={30} borderRadius={25} className="mt-2" />
          <Skeleton height={30} borderRadius={25} className="mt-2" />
          <Skeleton height={30} borderRadius={25} className="mt-2" />
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsSkeleton;

// const BasicDetailsSkeleton: React.FC = () => {
//   return (
//     <div className="max-w-[1280px] w-full p-4 sm:p-8 rounded-[var(--r1)] bg-white custom-shadow-1 mb-4 sm:mb-8">
//       <div className={style.container_1}>
//         <div className={style.inner_container_1}>
//           <div>
//             <Skeleton height={150} width={150} circle />
//           </div>

//           <div className="ml-4 flex flex-col flex-grow">
//             <div>
//               <Skeleton height={24} width={100} borderRadius={25} />
//               <Skeleton height={24} width={250} borderRadius={25} />
//             </div>
//             <div className="grid grid-cols-2 gap-2 mt-4">
//               <div className="grid gap-2">
//                 <Skeleton height={30} borderRadius={25} />
//                 <Skeleton height={30} borderRadius={25} />
//               </div>
//               <div className="grid gap-2">
//                 <Skeleton height={30} borderRadius={25} />
//                 <Skeleton height={30} borderRadius={25} />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={style.container_2}>
//           <Skeleton height={100} borderRadius={25} />
//           <Skeleton height={41.6} borderRadius={25} className="mt-2" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BasicDetailsSkeleton;
