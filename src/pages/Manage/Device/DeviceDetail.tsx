import { Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EditOutlined, LockOutlined, ReloadOutlined } from '@ant-design/icons';

import { IDevice, getDevice, startEdiDevice } from '../../../contexts/Manage/Device/Device.slice';
import { getDateString } from '../../../utils/getDateString';
import { useAppDispatch } from '../../../contexts/store';

const DeviceDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currentDevice, setCurrentDevice] = useState<IDevice>();

  const breadCrumbItems = [
    {
      title: (
        <Link to={'/manage/device'}>
          <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
            Danh sách thiết bị
          </div>
        </Link>
      ),
    },
    {
      title: (
        <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
          Chi tiết thiết bị
        </div>
      ),
    },
  ];

  const handleStartEdit = () => {
    if (currentDevice) {
      dispatch(startEdiDevice(currentDevice));
      navigate('/manage/device/edit');
    }
  };

  const handleChangePassword = () => {};

  useEffect(() => {
    if (id) {
      dispatch(getDevice(id))
        .unwrap()
        .then(res => {
          setCurrentDevice(res);
        });
    }
  }, []);

  return (
    <div>
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
        Thông tin thiết bị - {currentDevice?.nameDevice}
      </div>
      <div className="left-[90px] top-[190px] right-[130px] px-28 pt-8 pb-16 absolute text-base  font-['Montserrat'] leading-normal rounded-lg bg-[#2B2B3F]">
        <div className="grid grid-cols-3 gap-x-8">
          <div className="">
            <div className="text-2xl font-bold text-[#FF7506] leading-6  mb-8">
              Thông tin thiết bị
            </div>
            <div className="w-[340px] h-[160px] rounded-lg flex items-center justify-center bg-black">
              <div className="text-white text-4xl">{currentDevice?.nameDevice[0]}</div>
            </div>
            {/* 
              active' | 'ban' | 'in-active
            */}
            <div className="my-4">
              {currentDevice?.state === 'active' ? (
                <div className="flex items-center justify-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div className="text-sm font-normal opacity-80 text-white">Hoạt động</div>
                </div>
              ) : currentDevice?.state === 'in-active' ? (
                <div className="flex items-center justify-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <div className="text-sm font-normal opacity-80 text-white">Ngưng kích hoạt</div>
                </div>
              ) : (
                <div className="flex items-center justify-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <div className="text-sm font-normal opacity-80 text-white">Đang bị khóa</div>
                </div>
              )}
            </div>

            <div className="flex items-start gap-x-10 my-4 text-base leading-6 text-white">
              <div className="font-semibold">Ghi chú:</div>
              <div className="text-base opacity-80 ">{currentDevice?.note}</div>
            </div>
          </div>

          <div>
            <div className="text-2xl font-bold text-[#FF7506] leading-6  mb-8">
              {currentDevice?.nameDevice}
            </div>
            <div className="flex items-center gap-10">
              <div className="text-white font-semibold text-base space-y-6 leading-6">
                <div>SKU/ID:</div>
                <div>Địa chỉ MAC:</div>
                <div>Tên đăng nhập:</div>
                <div>Định dạng:</div>
                <div>Vị trí:</div>
                <div>Thời hạn bảo hành:</div>
                <div>Trạng thái thiết bị:</div>
              </div>
              <div className="text-white opacity-80 text-base space-y-6 leading-6">
                <div>{currentDevice?.skuid}</div>
                <div>{currentDevice?.macAddress}</div>
                <div>{currentDevice?.userAccount.username}</div>
                <div>Displayable</div>
                <div>{currentDevice?.userAccount.address}</div>
                <div>{getDateString(currentDevice?.expireDate ? currentDevice.expireDate : 0)}</div>
                <div>
                  {currentDevice?.state === 'active'
                    ? 'Activated'
                    : currentDevice?.state
                      ? 'Inactivated'
                      : 'Locked'}
                </div>
              </div>
            </div>
          </div>

          <div className="ml-8">
            <div className="flex flex-col justify-between w-full">
              <div className="text-2xl font-bold text-[#FF7506] leading-6  mb-8">
                Thông tin phiên bản
              </div>

              <div className="flex items-start text-base text-white leading-6 gap-10 mb-24">
                <div className="font-semibold ">Phiên bản cũ nhất:</div>
                <div className="space-y-6 opacity-80 font-light ">
                  <div>12.3 (20/02/2020)</div>
                  <div>12.3 (20/02/2020)</div>
                </div>
              </div>
            </div>

            <div className="w-[80%]">
              <div className="text-2xl font-bold text-[#FF7506] leading-6  mb-8">
                Dung lượng bộ nhớ
              </div>
              <div className="flex items-center gap-8 text-base leading-6">
                <div className="font-semibold text-white space-y-6">
                  <div>Dung lượng</div>
                  <div>Còn trống</div>
                </div>

                <div className="text-white opacity-80 space-y-6">
                  <div>512GB</div>
                  <div>123GB</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right-[0px] top-[190px] absolute flex-col justify-start items-start inline-flex rounded-lg overflow-hidden">
        <div
          onClick={handleStartEdit}
          className="h-[130px] p-4 bg-[#2B2B3F] flex-col justify-center items-center gap-2.5 flex"
        >
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-center items-center gap-2.5 inline-flex">
            <div className="w-8 h-8 relative p-1.5">
              <EditOutlined className="text-[#FF7506] text-xl" />
            </div>
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Chỉnh sửa
          </div>
        </div>
        <div
          onClick={handleChangePassword}
          className="h-[130px] p-4 bg-[#2B2B3F]   flex-col justify-center items-center gap-2.5 flex"
        >
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-center items-center gap-2.5 inline-flex">
            <div className="w-8 h-8 relative p-1.5">
              <LockOutlined className="text-[#FF7506] text-xl" />
            </div>
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Khôi phục <br /> mật khẩu
          </div>
        </div>

        <div
          onClick={handleChangePassword}
          className="h-[130px] p-4 bg-[#2B2B3F]   flex-col justify-center items-center gap-2.5 flex"
        >
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-center items-center gap-2.5 inline-flex">
            <div className="w-8 h-8 relative p-1.5">
              <ReloadOutlined className="text-[#FF7506] text-xl" />
            </div>
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Khôi phục <br /> bộ nhớ
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetail;
