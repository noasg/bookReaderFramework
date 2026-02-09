type BookTileProps = {
  id: string;
  title: string;
  image: string;
  onOpen: (id: string) => void;
};

export default function BookTile({ id, title, image, onOpen }: BookTileProps) {
  return (
    <button
      onClick={() => onOpen(id)}
      className="
        group
        flex flex-col items-center
         
       w-56
       
        rounded-xl
        bg-white
        shadow-md
        hover:shadow-xl
        transition-all
        hover:-translate-y-1
        border border-indigo-900/10
         cursor-pointer
      "
    >
      <img
        src={image}
        alt={title}
        className="
          object-cover
           rounded-t-lg
          border border-indigo-900/10

        "
      />

      <div className="flex items-center justify-center w-full py-2 px-2">
        <p className="text-indigo-900 font-semibold text-center wrap-break-word text-xl">
          {title}
        </p>
      </div>
    </button>
  );
}
