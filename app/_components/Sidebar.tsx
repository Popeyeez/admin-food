export const Sidebar = () => {
  return (
    <div className="bg-white w-1/6 ">
      <div className="flex flex-col py-10 pl-15">
        <span className="font-bold text-[18px]">NomNom</span>
        <span>Swift delievery</span>
      </div>
      <div className="flex flex-col gap-5 px-15">
        <button className="btn"> Food menu </button>
        <button className="btn"> Orders</button>
      </div>
    </div>
  );
};
