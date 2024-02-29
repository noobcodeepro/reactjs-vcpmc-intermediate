import React from 'react';
import { IAuthorizeContract } from '../../../../../contexts/Manage/Contract/Authorize.slice';

const ContractDetailGroup = ({ currentContract }: { currentContract: IAuthorizeContract }) => {
  return (
    <>
      <div>
        <div className="flex gap-4">
          <div className="font-semibold">
            <div className="py-2">Pháp nhân ủy quyền: </div>
            <div className="py-2">Tên tổ chức: </div>
            <div className="py-2">Mã số thuế: </div>
            <div className="py-2">Ngân hàng: </div>
            <div className="py-2">Quốc tịch: </div>
            <div className="py-2">Địa chỉ: </div>
          </div>
          <div>
            <div className="py-2">{currentContract?.authorizedEntity.type}</div>
            <div className="py-2">{currentContract?.authorizedEntity.groupName}</div>
            <div className="py-2">{currentContract?.authorizedEntity.taxCode}</div>
            <div className="py-2">{currentContract?.authorizedEntity.bank}</div>
            <div className="py-2">{currentContract?.authorizedEntity.nationality}</div>
            <div className="py-2">{currentContract?.authorizedEntity.groupAddress}</div>
          </div>
        </div>
      </div>
      <div className=" px-12">
        <div className="flex gap-4">
          <div className="font-semibold">
            <div className="py-2">Người đại diện: </div>
            <div className="py-2">Chức vụ: </div>
            <div className="py-2">Ngày sinh: </div>
            <div className="py-2">Giới tính: </div>
            <div className="py-2">Số CMND/CCCD: </div>
            <div className="py-2">Ngày cấp: </div>
            <div className="py-2">Nơi cấp: </div>
          </div>
          <div>
            <div className="py-2">{currentContract?.authorizer}</div>
            <div className="py-2">{currentContract?.authorizedEntity.role}</div>
            <div className="py-2">{currentContract?.authorizedEntity.dob}</div>
            <div className="py-2">{currentContract?.authorizedEntity?.gender ? 'Nam' : 'Nữ'}</div>
            <div className="py-2">{currentContract?.authorizedEntity.idNumber}</div>
            <div className="py-2">{currentContract?.authorizedEntity.idProvideDate}</div>
            <div className="py-2">{currentContract?.authorizedEntity.idProvideAt}</div>
          </div>
        </div>
      </div>
      <div className=" px-12">
        <div className="flex gap-4">
          <div className="font-semibold">
            <div className="py-2">Quốc tịch: </div>
            <div className="py-2">Nơi cư trú: </div>
            <div className="py-2">Số điện thoại: </div>
            <div className="py-2">Tên đăng nhập: </div>
            <div className="py-2">Mật khẩu: </div>
          </div>
          <div>
            <div className="py-2">{currentContract?.authorizedEntity.nationality}</div>
            <div className="py-2">{currentContract?.authorizedEntity.address}</div>
            <div className="py-2">{currentContract?.authorizedEntity.phoneNumber}</div>
            <div className="py-2">{currentContract?.userAccount.name}</div>
            <div className="py-2">{currentContract?.userAccount.password}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractDetailGroup;
