export default function RecomendationNews({ recom }) {
  // Jika recom adalah string JSON, kita bisa melakukan parsing

  return (
    <div
  className="relative h-[20em] w-full sm:w-[22em] border-2 border-green-500/50 rounded-[1.5em] bg-gradient-to-br from-green-700 via-emerald-600 to-green-500 text-white font-nunito p-6 flex flex-col gap-3 justify-between backdrop-blur-[12px] hover:shadow-2xl hover:shadow-green-400/40 transition-all duration-500 group/card hover:-translate-y-1"
>
  {/* Efek Cahaya */}
  <div className="absolute inset-0 bg-gradient-to-br from-green-600/40 via-emerald-500/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-[1.5em]"></div>

  {/* Gambar Pudar dengan Hover */}
  <div className="relative w-full h-40 overflow-hidden rounded-lg">
    <img
      src={recom.image}
      alt={recom.title}
      className="w-full h-full object-cover opacity-60 transition duration-500 ease-in-out group-hover/card:opacity-100 group-hover/card:scale-105"
    />
  </div>

  {/* Konten */}
  <div className="relative z-10 transition-transform duration-300 group-hover/card:translate-y-[-2px] space-y-2">
    <h3 className="text-[1.5em] font-bold bg-gradient-to-r from-white via-green-100 to-green-200 bg-clip-text text-transparent">
      {recom.title.length > 20 ? recom.title.substring(0, 20) + '...' : recom.title}
    </h3>
    <p className="text-[0.9em] text-green-100/90 leading-relaxed font-light">
      {recom.description.length > 100 ? recom.description.substring(0, 100) + "..." : recom.description}
    </p>
  </div>

  {/* Tombol Explore */}
  <button
    className="relative h-fit w-fit px-6 py-2 border-[1px] border-green-100/30 rounded-full flex justify-center items-center gap-2 overflow-hidden group/btn hover:border-green-300/50 hover:shadow-lg hover:shadow-green-500/20 active:scale-95 transition-all duration-300 backdrop-blur-[12px] bg-green-800/10"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-green-600/40 via-emerald-500/40 to-green-600/40 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
    <p className="relative z-10 font-medium tracking-wide">Explore Now</p>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="relative z-10 w-5 h-5 group-hover/btn:translate-x-[10%] transition-transform duration-300"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
    </svg>
  </button>
</div>

  );
}
