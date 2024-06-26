import {
  useState,
  useEffect,
  useRef,
  Dispatch,
  FormEvent,
  forwardRef,
  SetStateAction,
  useImperativeHandle,
} from "react";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- react-icons -----
import { BsPlus } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
// ----- redux -----
import { useUpdateKeySkillsMutation } from "@/redux/slices/userApi";
import { useDispatch } from "react-redux";
import { userApi } from "@/redux/slices/userApi";
// ----- common -----
import CancelSaveButtons from "../common/CancelSaveButtons";

interface SkillsProps {
  data: any;
  skills: string[];
  setSkills: Dispatch<SetStateAction<string[]>>;
}

const KeySkillsForm = forwardRef<HTMLDivElement, SkillsProps>(
  ({ skills, setSkills, data }, ref) => {
    const keySkillsModalRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const cancelBtnRef = useRef<HTMLButtonElement>(null);

    const [skill, setSkill] = useState<string>("");
    const [toDeleteSkills, setToDeleteSkills] = useState<string[]>([]);

    const [updateKeySkills, { isLoading, isError }] =
      useUpdateKeySkillsMutation();

    const dispatch = useDispatch();

    useImperativeHandle(ref, () => keySkillsModalRef.current as HTMLDivElement);

    const hideKeySkillsForm = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (
        (keySkillsModalRef.current &&
          closeBtnRef.current &&
          closeBtnRef.current.contains(e.target as Node)) ||
        (keySkillsModalRef.current &&
          cancelBtnRef.current &&
          cancelBtnRef.current.contains(e.target as Node))
      ) {
        keySkillsModalRef.current.style.opacity = "0";
        setTimeout(() => {
          keySkillsModalRef.current!.style.transform = "scale(0)";
        }, 300);

        setSkill("");
        setToDeleteSkills([]);
      }
    };

    const handleUpdateKeySkills = async (e: FormEvent) => {
      e.preventDefault();

      if (
        skills.length === (data && data.skills && data?.skills?.length)! &&
        toDeleteSkills.length < 1
      ) {
        if (keySkillsModalRef.current) {
          keySkillsModalRef.current.style.opacity = "0";
          setTimeout(() => {
            keySkillsModalRef.current!.style.transform = "scale(0)";
          }, 300);

          setSkill("");
          setToDeleteSkills([]);
          return;
        }
      }

      try {
        const res = await updateKeySkills({ skills, toDeleteSkills }).unwrap();

        //setSkills([]);
        setSkill("");
        setToDeleteSkills([]);

        if (res.msg) {
          dispatch(userApi.util.invalidateTags([{ type: "Skills" }]));
          toast.success(res.msg);

          if (keySkillsModalRef.current) {
            keySkillsModalRef.current.style.opacity = "0";
            setTimeout(() => {
              keySkillsModalRef.current!.style.transform = "scale(0)";
            }, 300);
          }
        }

        isError && toast.error(res.data.msg);
      } catch (err) {
        const error = err as ErrorProps;
        toast.error(error?.data?.msg);
      }
    };

    return (
      <div
        ref={keySkillsModalRef}
        className="fixed top-0 left-0 right-0 bottom-0 z-30 scale-0 opacity-0 bg-[rgba(0,0,0,0.85)] w-full h-full flex justify-center transition-opacity duration-300 pt-[4.5rem] pb-[4rem] px-4 overflow-y-auto"
      >
        <div className="relative rounded-[var(--r1)] bg-white p-8 sm:p-16 w-full sm:w-[600px] h-fit">
          <button
            ref={closeBtnRef}
            onClick={hideKeySkillsForm}
            className="absolute top-2 right-2 bg-[tomato] cursor-pointer rounded-full h-[40px] w-[40px] hover:bg-[#ff856f]"
            aria-label="Close"
          >
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white">
              <IoMdClose />
            </span>
          </button>
          <p className="font-bold text-xl">Key Skills</p>
          <p className="mt-2">
            Add skills that best define your expertise, for e.g, Javascript,
            Next.js etc.
          </p>
          <form
            className="relative flex-grow box-border mt-8"
            //onSubmit={handleUpdateKeySkills}
            onSubmit={(e) => {
              e.preventDefault();
              !skills.includes(skill.toLocaleLowerCase()) &&
                skill &&
                setSkills((prevSkills) => [...prevSkills, skill]);

              setSkill("");
            }}
          >
            <label htmlFor="skill" className="inline-block mb-1 font-medium">
              Skill
            </label>
            <input
              id="skill"
              type="text"
              name="skill"
              value={skill}
              className="custom-border-1 rounded-[var(--r1)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%]"
              onChange={(e: any) => setSkill(e.target.value)}
              required
            />
            <button
              type="submit"
              className="absolute right-[5px] top-[33px] bg-blue-600 text-white hover:bg-blue-500 rounded-[var(--r1)] h-[32px] w-[32px]"
              onClick={() => {
                !skills.includes(skill.toLocaleLowerCase()) &&
                  skill &&
                  setSkills((prevSkills) => [...prevSkills, skill]);

                setSkill("");
              }}
              aria-label="Add"
            >
              <BsPlus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl" />
            </button>

            {skills.length >= 1 && (
              <div className="mt-8 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="custom-border-1 rounded-[var(--r2)] py-2 pl-4 pr-2 mr-2 mb-2 flex items-center justify-between"
                  >
                    {skill}
                    <IoMdClose
                      className="ml-2 bg-[tomato] cursor-pointer text-white hover:bg-tomato hover:bg-[#ff856f] rounded-full p-1 text-2xl transition"
                      onClick={() => {
                        const filter = skills.filter((el) => el !== skill);
                        setToDeleteSkills((prev) => [...prev, skill]);
                        setSkills(filter);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            <CancelSaveButtons
              cancelBtnRef={cancelBtnRef}
              fn1={hideKeySkillsForm}
              fn2={handleUpdateKeySkills}
              isLoading={isLoading}
              type={"button"}
            />
          </form>
        </div>
      </div>
    );
  }
);

export default KeySkillsForm;
