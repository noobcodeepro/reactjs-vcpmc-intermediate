import { Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import { IAuthorizeContract } from '../../../../contexts/Manage/Contract/Authorize.slice';
import { CheckExpired } from './../../../../components/CheckExpired/index';
import { InfoCircleOutlined } from '@ant-design/icons';

const ContractDetail = () => {
  const { id } = useParams();
  const [currentContract, setCurrentContract] = useState<IAuthorizeContract>();
  useEffect(() => {
    const fetchData = async (id: string) => {
      const docRef = await doc(db, 'authorizedContracts', id);
      return getDoc(docRef).then(doc => {
        return { ...doc.data(), id: doc.id } as IAuthorizeContract;
      });
    };
    if (id) {
      fetchData(id).then(res => {
        console.log(res);

        setCurrentContract(res);
      });
    } else {
      alert('Error');
    }
  }, []);
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
          Chi tiết
        </div>
      ),
    },
  ];

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
        Chi tiết {currentContract?.name.toLowerCase()} - {currentContract?.contractId}
      </div>

      <div className="left-[90px] top-[186px] absolute rounded-3xl border border-orange-500 justify-start items-center inline-flex">
        <div className="px-6 py-2 bg-amber-700 rounded-3xl justify-start items-start gap-2.5 flex">
          <div className="text-center text-white text-base font-semibold font-['Montserrat'] leading-normal">
            Thông tin hợp đồng
          </div>
        </div>
        <div className="px-6 py-2 rounded-3xl justify-start items-start gap-2.5 flex">
          <div className="opacity-70 text-center text-white text-base font-normal font-['Montserrat'] leading-normal">
            Tác phẩm ủy quyền
          </div>
        </div>
      </div>
      <div className="right-[0] top-[200px] absolute flex-col justify-start items-start inline-flex">
        <div className="p-4 bg-slate-800 rounded-tl-2xl rounded-bl-2xl flex-col justify-center items-center gap-2.5 flex">
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex">
            <div className="w-8 h-8 relative" />
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Chỉnh sửa <br />
            hợp đồng
          </div>
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex">
            <div className="w-8 h-8 relative" />
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Gia hạn <br />
            hợp đồng
          </div>
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex">
            <div className="w-8 h-8 relative" />
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Hủy <br />
            hợp đồng
          </div>
        </div>
      </div>
      <div className="left-[90px] top-[266px] right-[180px] absolute text-white text-base  font-['Montserrat'] leading-normal ">
        <div className="grid grid-cols-3 gap-x-16">
          <div className="">
            <div className="flex gap-4">
              <div className="font-semibold">
                <div className="py-2">Số hợp đồng: </div>
                <div className="py-2">Tên hợp đồng: </div>
                <div className="py-2">Ngày hiệu lực: </div>
                <div className="py-2">Ngày hết hạn: </div>
                <div className="py-2">Tình trạng: </div>
              </div>
              <div>
                <div className="py-2">{currentContract?.contractId}</div>
                <div className="py-2">{currentContract?.name}</div>
                <div className="py-2">{currentContract?.startDate}</div>
                <div className="py-2">{currentContract?.endDate}</div>
                <div className="py-2">
                  <CheckExpired showDate={false} timestamp={currentContract?.endDate || 0} />
                </div>
              </div>
            </div>
          </div>
          <div className=" px-12">
            <div className="flex items-start gap-4 py-2">
              <div className="font-semibold">Đính kèm tệp:</div>
              <div>
                <div>hetthuongcannho.doc</div>
                <div>hetthuongcannho.doc</div>
              </div>
            </div>
          </div>
          <div className="px-12">
            <div className="py-2 font-semibold text-[#FFAC69] space-x-2">
              <span>
                <InfoCircleOutlined className="text-base" />
              </span>
              <span>Mức nhuận bút</span>
            </div>
            <div className="flex gap-4 ">
              <div className="">
                <div className="py-2">Quyền tác giả:</div>
                <div className="py-2">
                  <div className="font-semibold py-2">Quyền liên quan:</div>
                  <div>Quyền của người biểu diễn:</div>
                </div>
                <div className="py-2">
                  Quyền của nhà sản xuất: <br /> {'(Bản ghi/video)'}
                </div>
              </div>

              <div className="">
                <div className="py-2">0%</div>
                <div>
                  <div className="h-[24px]"></div>
                  <div className="py-2">50%</div>
                  <div className="py-2">50%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="py-2 text-[#FFAC69] font-bold text-lg mt-10">
              Thông tin pháp nhân ủy quyền
            </div>
          </div>
          <div className="">
            <div className="flex gap-4">
              <div className="font-semibold">
                <div className="py-2">Pháp nhân ủy quyền: </div>
                <div className="py-2">Tên người ủy quyền: </div>
                <div className="py-2">Ngày sinh: </div>
                <div className="py-2">Giới tính: </div>
                <div className="py-2">Quốc tịch: </div>
                <div className="py-2">Số điện thoại: </div>
              </div>
              <div>
                <div className="py-2">{currentContract?.contractId}</div>
                <div className="py-2">{currentContract?.authorizedEntity.name}</div>
                <div className="py-2">{currentContract?.startDate}</div>
                <div className="py-2">
                  {currentContract?.authorizedEntity?.gender ? 'Nam' : 'Nữ'}
                </div>
                <div className="py-2">{currentContract?.authorizedEntity.nationality}</div>
                <div className="py-2">{currentContract?.authorizedEntity.phoneNumber}</div>
              </div>
            </div>
          </div>
          <div className=" px-12">
            <div className="flex gap-4">
              <div className="font-semibold">
                <div className="py-2">Số CMND/CCCD: </div>
                <div className="py-2">Ngày cấp: </div>
                <div className="py-2">Nơi cấp: </div>
                <div className="py-2">Mã số thuế: </div>
                <div className="py-2">Nơi cư trú: </div>
              </div>

              <div>
                <div className="py-2">{currentContract?.authorizedEntity.idNumber}</div>
                <div className="py-2">{currentContract?.authorizedEntity.idProvideDate}</div>
                <div className="py-2">{currentContract?.authorizedEntity.idProvideAt}</div>
                <div className="py-2">{currentContract?.authorizedEntity.taxCode}</div>
                <div className="py-2">{currentContract?.authorizedEntity.address}</div>
              </div>
            </div>
          </div>
          <div className=" px-12">
            <div className="flex gap-4">
              <div className="font-semibold">
                <div className="py-2">Email: </div>
                <div className="py-2">Tài khoản đăng nhập: </div>
                <div className="py-2">Mật khẩu: </div>
                <div className="py-2">Số tài khoản: </div>
                <div className="py-2">Ngân hàng: </div>
              </div>
              <div>
                <div className="py-2">{currentContract?.userAccount.email}</div>
                <div className="py-2">{currentContract?.userAccount.name}</div>
                <div className="py-2">{currentContract?.userAccount.password}</div>
                <div className="py-2">{currentContract?.authorizedEntity.bankNumber}</div>
                <div className="py-2">{currentContract?.authorizedEntity.bank}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetail;
