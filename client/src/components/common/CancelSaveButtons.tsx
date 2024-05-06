import { RefObject } from "react";

interface CancelSaveButtonsProps {
  cancelBtnRef: RefObject<HTMLButtonElement>;
  fn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoading: boolean;
}

const CancelSaveButtons: React.FC<CancelSaveButtonsProps> = ({
  cancelBtnRef,
  fn,
  isLoading,
}) => {
  return (
    <div className="flex items-center justify-end mt-8">
      <button
        ref={cancelBtnRef}
        type="button"
        onClick={fn}
        className="py-2 px-4 border border-blue-600 rounded-[var(--r2)] cursor-pointer mr-1 bg-white hover:bg-slate-100 text-blue-600 font-medium"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="py-2 px-4 border border-blue-600 rounded-[var(--r2)] cursor-pointer ml-2 bg-blue-600 hover:bg-blue-500 text-white w-[81.44px] flex items-center justify-center"
      >
        {isLoading ? <div className="loader-1"></div> : "Save"}
      </button>
    </div>
  );
};

export default CancelSaveButtons;
