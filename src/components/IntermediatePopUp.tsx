import { useEffect } from "react";
import SingleRightArrow from "./SingleRightArrow";

export type IntermediatePopUpProps = {
  isOpen: boolean;
  title: string;
  image: string;
  description: string;
  onClose: () => void;
  onGoToBook: () => void;
};

export default function IntermediatePopUp({
  isOpen,
  title,
  image,
  description,
  onClose,
  onGoToBook,
}: IntermediatePopUpProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 🚫 disable scroll
    } else {
      document.body.style.overflow = ""; // ✅ restore
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent"
      onClick={onClose}
    >
      {/* Transparent background overlay (no color) */}

      <div
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
        className="
          relative
          w-[60vw]
          h-[80vh]
          bg-white
          rounded-2xl
          shadow-2xl
          border border-gray-300
          flex flex-col
          overflow-hidden
          animate-popup
        "
      >
        {/* Close button (inside border, visible) */}
        <button
          onClick={onClose}
          className="text-[#312c85] absolute top-3 right-3 bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center shadow hover:scale-105 transition z-10"
          aria-label="Close"
        >
          <span className="font-bold text-lg">✕</span>
        </button>

        {/* Image section (top) */}
        <div className="w-full flex justify-center items-center pt-4">
          <div
            className="w-full flex justify-center"
            style={{ paddingLeft: "35%", paddingRight: "35%" }}
          >
            <img
              src={image}
              alt={title}
              className="object-cover rounded-lg shadow"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>

        {/* Content section */}
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          <h2 className="text-xl font-semibold text-indigo-900 text-center mb-2">
            {title}
          </h2>

          {/* Scrollable description */}
          <div className="flex-1 overflow-y-auto text-indigo-900/80 text-sm pr-2">
            <p className="whitespace-pre-line">{description}</p>
          </div>

          {/* Action button */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={onGoToBook}
              className="flex items-center gap-0 group"
            >
              <span className="text-[#312c85] cursor-pointer text-lg">
                Go to book
              </span>

              {/* Arrow slides in from left and fades in */}
              <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mt-1 cursor-pointer">
                <SingleRightArrow width={30} height={30} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
