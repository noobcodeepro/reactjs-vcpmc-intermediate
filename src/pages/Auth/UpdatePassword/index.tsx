import { Input, Modal, message } from 'antd';
import React, { useState } from 'react';
import './updatePassword.css';
import { handleUpdatePassword } from '../../../contexts/Auth/auth.service';

const UpdatePassword = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleCancel = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOk = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      handleUpdatePassword(currentPassword, newPassword)
        .then(() => {
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setOpen(false);
          message.info('Đổi mật khẩu thành công');
        })
        .catch(error => {
          console.log('Error happened: ', error);
        });
    } else {
      message.info('Password không trùng khớp');
    }
  };
  return (
    <>
      <Modal
        className="title__hidden w-[552px] h-[512px] relative bg-[#3E3E5B] rounded-2xl"
        open={open}
        title={<div className="bg-[#3E3E5B]"></div>}
        footer={[]}
      >
        <div className="">
          <div className="text-center text-violet-50 text-2xl font-bold font-['Montserrat'] leading-normal">
            Thay đổi mật khẩu
          </div>

          <div className="flex flex-col mt-8">
            <div className="flex-col justify-start items-start gap-6 inline-flex">
              <div className="w-full h-20 flex-col justify-start items-start gap-2 flex">
                <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
                  Mật khẩu hiện tại:
                </div>
                <Input.Password
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className="w-full"
                ></Input.Password>
              </div>
              <div className="w-full h-20 flex-col justify-start items-start gap-2 flex">
                <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
                  Mật khẩu mới:
                </div>
                <Input.Password
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full"
                ></Input.Password>
              </div>
              <div className="w-full h-20 flex-col justify-start items-start gap-2 flex">
                <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
                  Nhập lại mật khẩu mới:
                </div>
                <Input.Password
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full"
                ></Input.Password>
              </div>
            </div>
          </div>
          <div className="left-[92px] top-[424px] absolute justify-start items-start gap-8 inline-flex">
            <div className="px-6 py-3 rounded-lg border border-orange-500 justify-center items-center gap-2 flex">
              <div
                onClick={handleCancel}
                className="w-[120px] text-center text-orange-500 text-base font-semibold font-['Montserrat'] leading-normal"
              >
                Hủy
              </div>
            </div>
            <div className="px-6 py-3 bg-orange-500 rounded-lg justify-center items-center gap-2 flex">
              <div
                onClick={handleOk}
                className="w-[120px] text-center text-white text-base font-semibold font-['Montserrat'] leading-normal"
              >
                Lưu
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdatePassword;
