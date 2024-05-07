import { AvailableToJoinProps } from "./UpdateBasicDetailsForm";

const AvailableToJoin: React.FC<AvailableToJoinProps> = ({
  available_to_join,
  values,
  setValues,
}) => {
  return (
    <>
      {available_to_join === values.available_to_join ? (
        <span className=" py-2 rounded-[var(--r2)] custom-border-1 text-center cursor-pointer bg-slate-200 hover:bg-slate-300">
          {available_to_join}
        </span>
      ) : (
        <span
          className=" py-2 rounded-[var(--r2)] custom-border-1 text-center cursor-pointer bg-white hover:bg-slate-100"
          onClick={(e: any) =>
            setValues({
              ...values,
              available_to_join,
            })
          }
        >
          {available_to_join}
        </span>
      )}
    </>
  );
};

export default AvailableToJoin;
