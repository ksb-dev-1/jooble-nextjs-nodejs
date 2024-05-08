import { RefObject } from "react";

interface CancelSaveButtonsProps {
  cancelBtnRef: RefObject<HTMLButtonElement>;
  fn1: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  fn2?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoading: boolean;
  type?: any;
}

const CancelSaveButtons: React.FC<CancelSaveButtonsProps> = ({
  cancelBtnRef,
  fn1,
  fn2,
  isLoading,
  type,
}) => {
  return (
    <div className="flex items-center justify-end mt-8">
      <button
        ref={cancelBtnRef}
        type="button"
        onClick={fn1}
        className="py-2 px-4 border border-blue-600 rounded-[var(--r1)] cursor-pointer mr-1 bg-white hover:bg-slate-100 text-blue-600 font-medium"
        aria-label="Cancel"
      >
        Cancel
      </button>
      <button
        type={type ? type : "submit"}
        className="py-2 px-4 border border-blue-600 rounded-[var(--r1)] cursor-pointer ml-2 bg-blue-600 hover:bg-blue-500 text-white w-[81.44px] flex items-center justify-center"
        aria-label="Save"
        onClick={fn2}
      >
        {isLoading ? <div className="loader-1"></div> : "Save"}
      </button>
    </div>
  );
};

export default CancelSaveButtons;
