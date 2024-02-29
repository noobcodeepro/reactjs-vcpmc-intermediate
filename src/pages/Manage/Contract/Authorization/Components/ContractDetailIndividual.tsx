import React from 'react';
import { IAuthorizeContract } from '../../../../../contexts/Manage/Contract/Authorize.slice';

const ContractDetailIndividual = ({ currentContract }: { currentContract: IAuthorizeContract }) => {
  return (
    <>
      <div>
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
            <div className="py-2">{currentContract?.authorizedEntity?.gender ? 'Nam' : 'Nữ'}</div>
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
    </>
  );
};

export default ContractDetailIndividual;
