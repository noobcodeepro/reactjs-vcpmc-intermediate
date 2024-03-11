import { CameraOutlined, FormOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, DatePicker, Image, Input, Modal, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../../contexts/store';
import {
  authStartUpdate,
  cancelEditProfile,
  getUser,
  logOut,
  saveUpdateProfile,
  updateAvatar,
} from '../../../contexts/Auth/auth.slice';
import { useSelector } from 'react-redux';
import UpdatePassword from '../UpdatePassword';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import dayjs from 'dayjs';
import { getDateString } from '../../../utils/getDateString';

import './profile.css';
import { splitFullName } from '../../../utils/splitName';
import { formatPhoneNumber } from '../../../utils/formatPhoneNumber';

const Profile = () => {
  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.auth.isLoading);
  const isEditingProfile = useSelector((state: RootState) => state.auth.isEditing);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [editProfile, setEditProfile] = useState<{
    firstName: string | undefined | null;
    lastName: string | undefined | null;
    birthDay: number | null;
    phoneNumber: undefined | null | string;
  }>({
    firstName: '',
    lastName: '',
    birthDay: 0,
    phoneNumber: 0 || null,
  });

  // Avatar state
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>(currentUser?.photoURL || '');

  const handleSaveChangesAvatar = () => {
    if (currentUser && avatar) {
      dispatch(updateAvatar({ file: avatar, currentUser }))
        .unwrap()
        .then(() => {
          message.info('Upload avatar thành công!');
          setAvatarModalOpen(false);
          setAvatar(null);
          currentUser.reload();
          // setCurrentUser(prev => ({...prev, photoURL: }))
        });
    }
  };

  // Password state
  const [passwordChangeOpen, setPasswordChangeOpen] = useState(false);
  const handleOpenUpdatePassword = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    setPasswordChangeOpen(true);
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

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // Logout handler
  const handleLogout = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    try {
      dispatch(logOut());
    } catch (error) {
      console.log(error);
    }
  };

  // Update state
  // Start editing Profile

  // Birthday handler
  const birthdayState = useSelector((state: RootState) => state.auth.others.birthDay);

  // const handleUpdateProfile = () => {
  //   const data = userBirthDay?.valueOf();
  // };

  const handleStartEditProfile = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(authStartUpdate());
  };
  const handleCancelUpdateProfile = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(cancelEditProfile());
  };

  const handleUpdateProfile = () => {
    dispatch(saveUpdateProfile(editProfile));
  };

  const userRole = useSelector((state: RootState) => state.auth.others.role);

  useEffect(() => {
    if (currentUser?.photoURL) {
      setAvatarUrl(currentUser.photoURL);
    }
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    const reload = () => {
      dispatch(getUser())
        .unwrap()
        .then(res => {
          if (res.user.displayName) {
            const { firstName, lastName } = splitFullName(res.user.displayName);
            setEditProfile({
              firstName,
              lastName,
              birthDay: res.otherFields.birthDay,
              phoneNumber: res.otherFields.phoneNumber || null,
            });
          }
        });
    };

    reload();
    return unsub;
  }, [currentUser, currentUser?.photoURL, dispatch, isEditingProfile]);

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
                  {currentUser?.displayName}
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

                {isEditingProfile ? (
                  <Input
                    value={editProfile.lastName || ''}
                    onChange={e => setEditProfile(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                ) : (
                  <div className="datafield">{editProfile.lastName}</div>
                )}
              </div>
              <div className="flex-1  ">
                <div className="text-white text-base my-2 font-normal font-['Montserrat'] leading-normal">
                  Tên:
                </div>
                {isEditingProfile ? (
                  <Input
                    value={editProfile.firstName || ''}
                    onChange={e => setEditProfile(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                ) : (
                  <div className="datafield">{editProfile.firstName}</div>
                )}
              </div>
            </div>
            <div className="flex w-full gap-6 my-4">
              <div className="flex-1">
                <div className="text-white text-base my-2 font-normal font-['Montserrat'] leading-normal">
                  Ngày sinh:
                </div>

                {/* Datepicker */}
                {isEditingProfile ? (
                  <DatePicker
                    format={'DD/MM/YYYY'}
                    allowClear={false}
                    value={editProfile.birthDay ? dayjs.unix(editProfile.birthDay / 1000) : null}
                    onChange={e =>
                      setEditProfile(prev => ({ ...prev, birthDay: e?.valueOf() || null }))
                    }
                  />
                ) : (
                  <div className="datafield">{getDateString(birthdayState)}</div>
                )}
              </div>
              <div className="flex-1 ">
                <div className="text-white text-base my-2 font-normal font-['Montserrat'] leading-normal">
                  Số điện thoại:
                </div>
                {isEditingProfile ? (
                  <Input
                    value={editProfile?.phoneNumber ? editProfile?.phoneNumber : ''}
                    onChange={e =>
                      setEditProfile(prev => ({ ...prev, phoneNumber: e.target.value }))
                    }
                  />
                ) : (
                  <div className="datafield">
                    {formatPhoneNumber(
                      editProfile?.phoneNumber ? editProfile?.phoneNumber?.toString() : '',
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full mt-12 mb-8">
              <div className="text-white text-base my-2 font-normal font-['Montserrat'] leading-normal">
                Email:
              </div>
              <Input value={currentUser?.email ? currentUser.email : ''} disabled />
            </div>
            <div className="w-full mb-8">
              <div className="text-white text-base my-2 font-normal font-['Montserrat'] leading-normal">
                Tên đăng nhập:
              </div>
              <Input value={currentUser?.email ? currentUser.email : ''} disabled />
            </div>

            <div className="w-[274px] mb-8">
              <div className="text-white text-base my-2 font-normal font-['Montserrat'] leading-normal">
                Phân quyền:
              </div>
              <Input value={userRole} disabled className="capitalize" />
            </div>
            {isEditingProfile && (
              <div className="flex gap-4 justify-center">
                <Button
                  className="button w-[174px] h-[48px] outline"
                  onClick={handleCancelUpdateProfile}
                >
                  Cancel
                </Button>
                <Button className="button w-[174px] h-[48px]" onClick={handleUpdateProfile}>
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="h-[372px] top-[80px]  absolute z-1 right-0  ">
          <div className="h-[130px] p-4 bg-[#2f2f41] rounded-tl-2xl flex-col justify-center items-center gap-2.5 flex">
            <div
              onClick={handleStartEditProfile}
              className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 cursor-pointer"
            >
              {/* <div className="w-8 h-8 relative" /> */}
              <FormOutlined className="text-[#ff7506]" style={{ fontSize: '30px' }} />
            </div>
            <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
              Sửa thông tin
            </div>
          </div>
          <div
            onClick={handleOpenUpdatePassword}
            className="self-stretch h-[130px] p-4 bg-[#2f2f41] flex-col justify-center items-center gap-2.5 flex"
          >
            <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 ">
              {/* <div className="w-8 h-8 relative"></div> */}
              <LockOutlined className="text-[#ff7506]" style={{ fontSize: '30px' }} />
            </div>
            <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
              Đổi <br />
              mật khẩu
            </div>
          </div>
          <div
            onClick={handleLogout}
            className="self-stretch h-28 p-4 bg-[#2f2f41] rounded-bl-2xl flex-col justify-center items-center gap-2.5 flex"
          >
            <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 ">
              <LogoutOutlined className="text-[#ff7506]" style={{ fontSize: '30px' }} />
            </div>
            <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
              Đăng xuất
            </div>
          </div>
        </div>
      </div>

      {/* Avatar change modal */}

      <Modal
        open={avatarModalOpen}
        title="Change Avatar"
        onOk={handleSaveChangesAvatar}
        onCancel={handleCancel}
        footer={[
          <>
            {avatar && (
              <Button className="bg-blue-500 text-white" key="ok" onClick={handleSaveChangesAvatar}>
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
          <input
            type="file"
            accept="image/*,svg"
            onChange={handleChangeAvatar}
            className="block my-2"
          />
          <div className="mx-auto w-fit rounded-full">
            <Image className="object-cover" src={avatarUrl} width={200} height={200} />
          </div>
        </div>
      </Modal>

      {/* Password change modal */}
      <UpdatePassword open={passwordChangeOpen} setOpen={setPasswordChangeOpen} />
      {/* Loading modal */}
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
