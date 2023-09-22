import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <section className="relative w-[100dvw] md:w-[700px] ml-auto xl:ml-[400px]">
      <div className="flex flex-col justify-center items-center h-[600px] gap-2">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#9ba5cb"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    </section>
  );
};

export default Loader;
