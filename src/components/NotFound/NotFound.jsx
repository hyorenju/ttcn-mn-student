import bgNotFound from "@/assets/img/404.svg";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";

export function NotFound(props) {
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(-1);
  };
  const handleClickBackHome = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="h-screen w-screen bg-gray-50 flex items-center justify-center">
        <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
          <div className="w-full lg:w-1/2 mx-8">
            <div className="text-7xl text-primary-color font-dark font-extrabold mb-8">
              404
            </div>
            <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
              Sorry we couldn't find the page you're looking for
            </p>
            <Space>
              <button
                onClick={handleClickBack}
                className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-primary-color transition-all duration-400 border rounded-lg focus:outline-none bg-transparent border-primary-color hover:bg-primary-color hover:text-white active:scale-90"
              >
                Back
              </button>
              <button
                onClick={handleClickBackHome}
                className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-primary-color active:scale-90 hover:bg-red-700"
              >
                Go Back Homepage
              </button>
            </Space>
          </div>
          <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
            <img src={bgNotFound} className="" alt="Page not found" />
          </div>
        </div>
      </div>
    </div>
  );
}
