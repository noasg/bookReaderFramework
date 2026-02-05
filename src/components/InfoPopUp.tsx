import { useEffect } from "react";
import Legend from "./Legend";

type InfoPopUpProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function InfoPopUp({ isOpen, onClose }: InfoPopUpProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
             bg-black/30 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-[75vw]
          h-[85vh]
          bg-white
          rounded-2xl
          shadow-2xl
          border border-gray-300
          flex flex-col
          overflow-hidden
          animate-popup
        "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="text-[#312c85] absolute top-3 right-3 bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center shadow hover:scale-105 transition z-10 "
          aria-label="Close"
        >
          <span className="font-bold text-lg">✕</span>
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-6 border-b border-indigo-900/10">
          <h2 className="text-xl font-semibold text-indigo-900 text-center">
            Informatii
          </h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* LEFT: Legend */}
          <div className="overflow-y-auto pr-2 ml-2">
            <Legend />
          </div>

          {/* RIGHT: Extra content */}
          <div className="overflow-y-auto text-sm text-indigo-900 space-y-4 ml-2">
            <div>
              <h4 className="font-semibold mb-1">Alte Informatii</h4>
              <p className="text-indigo-900/80">
                Descriere alte Informatii despre proiect, cum ar fi scopul,
                metodologia, sursele de date, etc. Acest text poate fi
                personalizat pentru a oferi utilizatorilor o înțelegere mai
                profundă a contextului și a obiectivelor proiectului.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Navigare</h4>
              <ul className="list-disc list-inside text-indigo-900/80">
                Detalii navigare proiect, cum ar fi cum să folosești interfața,
                ce funcționalități sunt disponibile, cum să interpretezi datele,
                etc. Acest text poate fi personalizat pentru a ghida
                utilizatorii în explorarea și utilizarea eficientă a
                proiectului.
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Despre echipa</h4>
              <p className="text-indigo-900/80">
                Informatii despre echipa care a realizat proiectul, cum ar fi
                numele membrilor, rolurile lor, experiența relevantă, etc. Acest
                text poate fi personalizat pentru a oferi utilizatorilor o
                perspectivă asupra celor care au contribuit la realizarea
                proiectului și a expertizei lor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
