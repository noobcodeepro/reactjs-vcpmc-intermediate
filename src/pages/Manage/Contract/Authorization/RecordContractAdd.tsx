import { CheckOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddRecordForm from './Components/AddRecordForm';

const breadCrumbItems = [
  {
    title: (
      <Link to={'/manage/contract'}>
        <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
          Quản lí
        </div>
      </Link>
    ),
  },
  {
    title: (
      <Link to={'/manage/contract'}>
        <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
          Quản lí hợp đồng
        </div>
      </Link>
    ),
  },
  {
    title: (
      <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
        Thêm bản ghi
      </div>
    ),
  },
];

const RecordContractAdd = () => {
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      <>
        <AddRecordForm onCancel={onCancel} openModal={openModal} key={'AddRecordForm'} />
      </>
      <div className="p-0.5 left-[90px] top-[86px] absolute opacity-50 justify-start items-center gap-1 inline-flex">
        <Breadcrumb
          separator={
            <>
              <div className="text-white">{'>'}</div>
            </>
          }
          items={breadCrumbItems}
        />
      </div>
      <div className="left-[90px] top-[114px] absolute text-white text-4xl font-bold font-['Montserrat'] leading-[48px]">
        Thêm thông tin bản ghi
      </div>

      <div className="left-[90px] top-[190px] right-[60px] absolute text-base  font-['Montserrat'] leading-normal">
        <div className="mx-auto mt-14 bg-[#2B2B3F] w-fit px-10 py-6 rounded-xl text-white">
          <div className="pb-4 pt-3 px-14 mx-1.5 text-center font-bold text-2xl leading-6 border-b-2 border-[#5a5a6e] flex items-center gap-4">
            <CheckOutlined className="bg-green-500 rounded-full border-none p-2 text-base" />
            <div>Hợp đồng đã được tạo thành công</div>
          </div>
          <div className="mx-1.5 font-bold text-base leading-6 mt-8">Có 2 cách để tạo bản ghi:</div>
          <div className="mx-12 mt-3 font-medium text-sm leading-5">
            <div className="flex gap-2">
              <div className="text-[#FF7506]">Cách 1:</div>
              <div>
                <div>Upload bản ghi trực tiếp</div>
                <p className="mt-3 mb-2 font-normal text-sm leading-5 opacity-80">
                  Bạn có thể thực hiện thêm bản ghi ngay trên website
                </p>
                <div>
                  <Button
                    onClick={onOpenModal}
                    className="text-white bg-[#FF7506] px-6 py-3 h-[48px] text-base font-semibold leading-6 border-none outline-none"
                  >
                    Thêm bản ghi trực tiếp
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-16">
              <div className="text-[#FF7506]">Cách 2:</div>
              <div>
                <div>Upload bản ghi qua phần mềm</div>
                <p className="mt-3 mb-2 font-normal text-sm leading-5 opacity-80">
                  Bạn có thể thêm bản ghi bằng tool
                </p>
                <div>
                  <Button className="text-[#FF7506]  px-6 py-3 h-[48px] text-base font-semibold leading-6 border border-[#FF7506] outline-none">
                    Thêm bản ghi bằng tool
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-14 mb-4">
              <div className="text-red-600">
                Lưu ý: Hợp đồng chỉ có hiệu lực khi thêm bản ghi thành công.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordContractAdd;
