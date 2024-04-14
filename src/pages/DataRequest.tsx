import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import CoverOne from '../images/cover/cover-01.png';
import userSix from '../images/user/user-06.png';
import { Link } from 'react-router-dom';

const DataRequest = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Data Request" />

      <div className="overflow-hidden">
        <div className="w-[368px] h-[363px] bg-[#FFFEFA] border border-dashed border-primary flex flex-col justify-center items-center shadow-default rounded-md dark:bg-boxdark">
          {/* Plus button */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
            >
              <path
                d="M48.7464 24.6792C48.7464 37.8256 38.1135 48.4805 25.0001 48.4805C11.8867 48.4805 1.25385 37.8256 1.25385 24.6792C1.25385 11.5328 11.8867 0.877869 25.0001 0.877869C38.1135 0.877869 48.7464 11.5328 48.7464 24.6792Z"
                fill="white"
                stroke="#E2E8F0"
                stroke-width="1.22058"
              />
              <path
                d="M25 16.1348V33.2229"
                stroke="#E8AE17"
                stroke-width="2.44116"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.4751 24.6797H33.5247"
                stroke="#E8AE17"
                stroke-width="2.44116"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span className="text-base font-medium text-primary leading-[22px] w-[140px] text-center mt-7">
            Create new data request
          </span>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DataRequest;
