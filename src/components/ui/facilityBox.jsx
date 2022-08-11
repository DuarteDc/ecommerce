
const FacilityBox = ({ icon, title }) => {
  return (
    <div className="text-center mb-6">
      <div className="inline-block w-20 h-20 text-2xl text-[#333] leading-10 rounded-full relative border-b-gray-50 border-solid border-2 z-[1] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-luz before:m-1 before:rounded-full before:z-[-1]">
        <i className="flex justify-center items-center mt-5">{icon}</i>
      </div>
      <h3 className="text-luz text-lg mt-3">{title}</h3>
    </div>
  );
};

export default FacilityBox;
