import { Breadcrumb, Button, Form, Input, Radio, Select } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { RootState, useAppDispatch } from '../../../contexts/store';
import {
  IAuthority,
  addWaitingAuthority,
  getAuthority,
  startEditAuthority,
  updateAuthority,
} from '../../../contexts/Manage/Authority/Authority.slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPasswordType } from '../../../utils/getPasswordType';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

const AuthorityDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [form] = useForm();
  const navigate = useNavigate();
  const [currentAuthority, setCurrentAuthority] = useState<IAuthority>();
  const isLoading = useSelector((state: RootState) => state.authority.isLoading);
  const breadCrumbItems = [
    {
      title: (
        <Link to={'/manage/device'}>
          <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
            Quản lý
          </div>
        </Link>
      ),
    },
    {
      title: (
        <Link to={'/manage/usage'}>
          <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
            Đơn vị sử dụng
          </div>
        </Link>
      ),
    },
    {
      title: (
        <Link to={`/manage/usage`}>
          <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
            Chi tiết
          </div>
        </Link>
      ),
    },
    {
      title: (
        <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
          Thông tin người dùng
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (id) {
      dispatch(getAuthority(id))
        .unwrap()
        .then(res => {
          setCurrentAuthority(res);
        });
    }
  }, [dispatch, id]);

  return (
    <div>
      <div className="h-[520px] left-[1810px] top-[158px] absolute flex-col justify-start items-start inline-flex overflow-hidden">
        <div
          onClick={() => navigate(`/manage/usage/device/e/${id}`)}
          className="h-[130px] p-4 bg-[#2B2B3F] rounded-tl-2xl rounded-bl-2xl flex-col justify-center items-center gap-2.5 flex"
        >
          <EditOutlined className="p-4 text-[#FF7506] bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex"></EditOutlined>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Chỉnh sửa
          </div>
        </div>
      </div>
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
        {/* {edittingContract?.id && copied ? (
          <>{`Bản sao hợp đồng khai thác - ${edittingContract.contractId}`}</>
        ) : (
          <>
            {edittingContract?.id ? (
              <>{`Hợp đồng khai thác - ${edittingContract.contractId}`}</>
            ) : (
              <>Thêm thiết bị mới</>
            )}
          </>
        )} */}
        Thông tin người dùng
      </div>

      <div className="left-[90px] top-[190px] right-[60px] absolute text-base  font-['Montserrat'] leading-normal ">
        <div className="grid grid-cols-2">
          <div className="text-white gap-x-4 gap-y-3 leading-6 text-base">
            <div className="flex my-4">
              <div className="font-semibold w-[200px]">
                <div>Tên người dùng:</div>
              </div>
              <div className="font-light opacity-80">
                <div>{currentAuthority?.name}</div>
              </div>
            </div>

            <div className="flex my-4">
              <div className="font-semibold w-[200px]">
                <div>Vai trò:</div>
              </div>
              <div className="font-light opacity-80">
                {' '}
                <div>{currentAuthority?.role}</div>
              </div>
            </div>
            <div className="flex my-4">
              <div className="font-semibold w-[200px]">
                <div>Email:</div>
              </div>
              <div className="font-light opacity-80">
                <div>{currentAuthority?.email}</div>
              </div>
            </div>
          </div>

          <div className=" text-white gap-x-4 gap-y-3leading-6 text-base">
            <div className="flex my-4">
              <div className="font-semibold w-[200px]">
                <div>Tên đăng nhập:</div>
              </div>
              <div className="font-light opacity-80">
                <div>{currentAuthority?.username}</div>
              </div>
            </div>

            <div className="flex my-4">
              <div className="font-semibold w-[200px]">
                <div>Mật khẩu:</div>
              </div>
              <div className="font-light opacity-80">
                <div className="flex items-center gap-1 h-[24px]">
                  <span className="w-3 h-3 bg-white rounded-full "></span>
                  <span className="w-3 h-3 bg-white rounded-full "></span>
                  <span className="w-3 h-3 bg-white rounded-full "></span>
                  <span className="w-3 h-3 bg-white rounded-full "></span>
                  <span className="w-3 h-3 bg-white rounded-full "></span>
                  <span className="w-3 h-3 bg-white rounded-full "></span>
                  <span className="w-3 h-3 bg-white rounded-full "></span>
                </div>
              </div>
            </div>

            <div className="flex my-4">
              <div className="font-semibold w-[200px]">
                <div>Trạng thái thiết bị:</div>
              </div>
              <div className="font-light opacity-80">
                <div>
                  {currentAuthority?.state === 'in-active' ? 'Ngừng kích hoạt' : 'Đang kích hoạt'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorityDetail;
