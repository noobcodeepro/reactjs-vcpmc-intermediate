import { CameraOutlined, FormOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, Image, Input, Modal, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/Auth/useAuth';
import { RootState, useAppDispatch } from '../../../contexts/store';
import { updateAvatar } from '../../../contexts/Auth/auth.slice';
import { useSelector } from 'react-redux';

const Profile = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAuth();
  console.log(currentUser);

  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const loading = useSelector((state: RootState) => state.auth.isLoading);
  const [avatarUrl, setAvatarUrl] = useState<string>(currentUser?.photoURL || '');

  const handleOk = () => {
    if (currentUser && avatar) {
      dispatch(updateAvatar({ file: avatar, currentUser }))
        .unwrap()
        .then(() => {
          message.info('Upload avatar thành công!');
          setAvatarModalOpen(false);
          setAvatar(null);
        });
    }
  };

  const handleCancel = () => {
    setAvatarModalOpen(false);
    setAvatar(null);
    if (currentUser?.photoURL) {
      setAvatarUrl(currentUser?.photoURL);
    } else {
      setAvatarUrl('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    const file = e.target.files?.[0];
    if (file) {
      // Đọc dữ liệu ảnh và chuyển đổi thành Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarUrl(result);
        setAvatar(file);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (currentUser?.photoURL) {
      setAvatarUrl(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <>
      <div className="absolute left-[208px] top-[86px] right-0">
        <div className="h-[54px]  text-violet-50 text-4xl font-bold font-['Montserrat'] leading-[48px]">
          Thông tin cơ bản
        </div>
        <div className="grid grid-cols-12 mt-10">
          <div className="col-span-3">
            <div className="w-fit text-center ml-4">
              <div className="">
                <div className="relative">
                  {currentUser?.photoURL ? (
                    <Avatar src={currentUser?.photoURL} size={280} />
                  ) : (
                    <Avatar size={280}>{currentUser?.displayName?.charAt(0)}</Avatar>
                  )}
                  <div className="bg-black w-14 h-14 absolute -bottom-2 right-10 rounded-full flex items-center justify-center">
                    <CameraOutlined
                      onClick={() => setAvatarModalOpen(true)}
                      style={{ fontSize: '32px', color: '#fff', cursor: 'pointer' }}
                    />
                  </div>
                </div>

                <div className="text-violet-50 mt-4 text-xl font-normal font-['Montserrat'] leading-normal">
                  Tuyết Nguyễn
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 pl-10 pr-24">
            <div className="flex w-full gap-6 my-4">
              <div className="flex-1 ">
                <div className="text-white text-base my-2 font-normal font-['Montserrat'] leading-normal">
                  Họ:
                </div>

                <Input value={'Nguyễn'} />
              </div>
              <div className="flex-1  ">
                <div className="text-white text-base my-2 font-normal font-['Montserrat'] leading-normal">
                  Tên:
                </div>
                <Input value={'Tuyết'} />
              </div>
            </div>
            <div className="flex w-full gap-6 my-4">
              <div className="flex-1">
                <div className="text-white text-base my-2 font-normal font-['Montserrat'] leading-normal">
                  Ngày sinh:
                </div>
                <Input value={'02/02/1998'} />
              </div>
              <div className="flex-1 ">
                <div className="text-white text-base my-2 font-normal font-['Montserrat'] leading-normal">
                  Số điện thoại:
                </div>
                <Input value={' +84 250 123 151'} />
              </div>
            </div>

            <div className="w-full mt-12 mb-8">
              <div className="text-white text-base my-2 font-normal font-['Montserrat'] leading-normal">
                Email:
              </div>
              <Input value={'tuyetnguyenngoc@alta.com.vn'} disabled />
            </div>
            <div className="w-full mb-8">
              <div className="text-white text-base my-2 font-normal font-['Montserrat'] leading-normal">
                Tên đăng nhập:
              </div>
              <Input value={'tuyetnguyenngoc@alta.com.vn'} disabled />
            </div>

            <div className="w-[274px] mb-8">
              <div className="text-white text-base my-2 font-normal font-['Montserrat'] leading-normal">
                Phân quyền:
              </div>
              <Input value={'Admin'} disabled />
            </div>
          </div>
        </div>

        <div className="h-[372px] top-[80px]  absolute z-1 right-0  ">
          <div className="h-[130px] p-4 bg-[#2f2f41] rounded-tl-2xl flex-col justify-center items-center gap-2.5 flex">
            <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 ">
              {/* <div className="w-8 h-8 relative" /> */}
              <FormOutlined className="text-[#ff7506]" style={{ fontSize: '30px' }} />
            </div>
            <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
              Sửa thông tin
            </div>
          </div>
          <div className="self-stretch h-[130px] p-4 bg-[#2f2f41] flex-col justify-center items-center gap-2.5 flex">
            <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 ">
              {/* <div className="w-8 h-8 relative"></div> */}
              <LockOutlined className="text-[#ff7506]" style={{ fontSize: '30px' }} />
            </div>
            <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
              Đổi <br />
              mật khẩu
            </div>
          </div>
          <div className="self-stretch h-28 p-4 bg-[#2f2f41] rounded-bl-2xl flex-col justify-center items-center gap-2.5 flex">
            <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 ">
              <LogoutOutlined className="text-[#ff7506]" style={{ fontSize: '30px' }} />
            </div>
            <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
              Đăng xuất
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={avatarModalOpen}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <>
            {avatar && (
              <Button className="bg-blue-500 text-white" key="ok" onClick={handleOk}>
                Save
              </Button>
            )}
          </>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <div className=" mx-auto block w-fit">
          <input type="file" accept="image/*,svg" onChange={handleChange} className="block my-2" />
          <div className="mx-auto w-fit rounded-full">
            <Image className="object-cover" src={avatarUrl} width={200} height={200} />
          </div>
        </div>
      </Modal>

      <Modal open={loading} footer={[]}>
        <div className="flex items-center gap-4">
          <>{loading && <Spin size="large" />}</>
          <span className="text-white px-4 text-xl">Đang xử lí</span>
        </div>
      </Modal>
    </>
  );
};

export default Profile;
