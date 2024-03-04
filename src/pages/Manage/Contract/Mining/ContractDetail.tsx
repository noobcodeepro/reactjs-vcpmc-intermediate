import { Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';

import { CheckExpired } from './../../../../components/CheckExpired/index';
import { useAppDispatch } from '../../../../contexts/store';
import { getDateString } from '../../../../utils/getDateString';
import CancelContractForm from './Components/Form/CancelContractForm';
import {
  IMiningContract,
  startEdittingContract,
} from '../../../../contexts/Manage/Contract/Mining.slice';

const ContractDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentContract, setCurrentContract] = useState<IMiningContract>();
  useEffect(() => {
    const fetchData = async (id: string) => {
      const docRef = await doc(db, 'miningContracts', id);
      return getDoc(docRef).then(doc => {
        return { ...doc.data(), id: doc.id } as IMiningContract;
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

  // Gia hạn hợp đồng
  const [openCancelModal, setOpenCancelModal] = useState(false);

  const onOpenCancelModal = () => {
    if (currentContract) {
      dispatch(startEdittingContract(currentContract));
      setOpenCancelModal(true);
    }
  };

  const onCancelCancel = () => {
    setOpenCancelModal(false);
  };

  const breadCrumbItems = [
    {
      title: (
        <Link to={'/manage/mining-contract'}>
          <div className="text-violet-50 text-base font-semibold font-montserrat leading-normal">
            Quản lí
          </div>
        </Link>
      ),
    },
    {
      title: (
        <Link to={'/manage/mining-contract'}>
          <div className=" text-violet-50 text-base font-semibold font-montserrat leading-normal">
            Quản lí hợp đồng
          </div>
        </Link>
      ),
    },
    {
      title: (
        <div className=" text-violet-50 text-base font-semibold font-montserrat leading-normal">
          Chi tiết
        </div>
      ),
    },
  ];

  const handleStartEdit = () => {
    if (currentContract) {
      dispatch(startEdittingContract(currentContract));
      navigate('/manage/contract/mining-contract/edit');
    }
  };

  return (
    <>
      <CancelContractForm onCancel={onCancelCancel} openModal={openCancelModal} />
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
        <div className="left-[90px] top-[114px] absolute text-white text-4xl font-bold font-montserrat leading-[48px]">
          Hợp đồng khai thác {currentContract?.name.toLowerCase()} - {currentContract?.contractId}
        </div>

        <div className="right-[0] top-[200px] absolute flex-col justify-start items-start inline-flex">
          <div className="p-4 bg-slate-800 rounded-tl-2xl rounded-bl-2xl flex-col justify-center items-center gap-2.5 flex">
            <div className="text-center mt-2" onClick={handleStartEdit}>
              <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex">
                <div className="w-8 h-8 relative" />
              </div>
              <div className="mt-2 self-stretch opacity-70 text-center text-white text-xs font-medium font-montserrat leading-[18px] tracking-tight">
                Chỉnh sửa
              </div>
            </div>

            {!currentContract?.cancelReason && (
              <>
                <div className="text-center mt-2" onClick={onOpenCancelModal}>
                  <div
                    onClick={onOpenCancelModal}
                    className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex"
                  >
                    <div className="w-8 h-8 relative" />
                  </div>
                  <div className="mt-2 self-stretch opacity-70 text-center text-white text-xs font-medium font-montserrat leading-[18px] tracking-tight">
                    Hủy <br />
                    hợp đồng
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <>
          <div className="left-[90px] top-[210px] right-[180px] absolute text-white text-base  font-montserrat leading-normal ">
            <div className="grid grid-cols-3 gap-x-16 gap-y-24">
              <div className="">
                <div className="flex gap-4">
                  <div className="font-semibold">
                    <div className="py-2">Tên hợp đồng: </div>
                    <div className="py-2">Số hợp đồng: </div>
                    <div className="py-2">Ngày hiệu lực: </div>
                    <div className="py-2">Ngày hết hạn: </div>
                  </div>
                  <div>
                    <div className="py-2">{currentContract?.contractId}</div>
                    <div className="py-2">{currentContract?.name}</div>
                    <div className="py-2">
                      {getDateString(currentContract?.startDate ? currentContract?.startDate : 0)}
                    </div>
                    <div className="py-2">
                      {getDateString(currentContract?.endDate ? currentContract?.endDate : 0)}
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
                <div className="flex gap-4">
                  <div className="font-semibold">
                    <div className="py-2">Loại hợp đồng: </div>
                    <div
                      className={`py-2 ${currentContract?.type.name === 'allIn' ? 'block' : 'hidden'}`}
                    >
                      Giá trị hợp đồng (VND):{' '}
                    </div>
                    <div
                      className={`py-2 ${currentContract?.type.name === 'allIn' ? 'block' : 'hidden'}`}
                    >
                      Giá trị phân phối (VND)/ngày:{' '}
                    </div>
                    <div
                      className={`py-2 ${currentContract?.type.name === 'allIn' ? 'hidden' : 'block'}`}
                    >
                      Giá trị lượt phát (VND)/ngày:{' '}
                    </div>
                    <div className="py-2">Tình trạng: </div>
                  </div>
                  <div>
                    <div className="py-2">
                      {currentContract?.type.name === 'allIn' ? 'Trọn gói' : 'Lượt phát'}
                    </div>
                    <div
                      className={`py-2 ${currentContract?.type.name === 'allIn' ? 'block' : 'hidden'}`}
                    >
                      {currentContract?.type.contractValue}
                    </div>
                    <div
                      className={`py-2 ${currentContract?.type.name === 'allIn' ? 'block' : 'hidden'}`}
                    >
                      {currentContract?.type.distributeValue}
                    </div>
                    <div
                      className={`py-2 ${currentContract?.type.name === 'allIn' ? 'hidden' : 'block'}`}
                    >
                      {currentContract?.type.playsValue}
                    </div>
                    <div className="py-2">
                      <CheckExpired
                        showDate={false}
                        timestamp={currentContract?.endDate ? currentContract.endDate : 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex gap-4">
                  <div className="font-semibold">
                    <div className="py-2">Tên đơn vị sử dụng: </div>
                    <div className="py-2">Người đại diện: </div>
                    <div className="py-2">Chức vụ: </div>
                    <div className="py-2">Ngày sinh: </div>
                    <div className="py-2">Quốc tịch: </div>
                    <div className="py-2">Số điện thoại: </div>
                  </div>
                  <div>
                    <div className="py-2">{currentContract?.contractUnit.unitName}</div>
                    <div className="py-2">{currentContract?.contractUnit.representer}</div>
                    <div className="py-2">{currentContract?.contractUnit.role}</div>
                    <div className="py-2">
                      {currentContract?.contractUnit.dob
                        ? getDateString(currentContract.contractUnit.dob)
                        : ''}
                    </div>
                    <div className="py-2">{currentContract?.contractUnit.nationality}</div>
                    <div className="py-2">{currentContract?.contractUnit.phoneNumber}</div>
                  </div>
                </div>
              </div>
              <div className=" px-12">
                <div className="flex gap-4">
                  <div className="font-semibold">
                    <div className="py-2">Giới tính: </div>
                    <div className="py-2">Số CMND/CCCD: </div>
                    <div className="py-2">Ngày cấp: </div>
                    <div className="py-2">Nơi cấp: </div>
                    <div className="py-2">Mã số thuế: </div>
                    <div className="py-2">Nơi cư trú: </div>
                  </div>
                  <div>
                    <div className="py-2">
                      {currentContract?.contractUnit.gender ? 'Nam' : 'Nữ'}
                    </div>
                    <div className="py-2">{currentContract?.contractUnit.idNumber}</div>
                    <div className="py-2">
                      {currentContract?.contractUnit.idProvideDate
                        ? getDateString(currentContract.contractUnit.idProvideDate)
                        : ''}
                    </div>
                    <div className="py-2">{currentContract?.contractUnit.idProvideAt}</div>

                    <div className="py-2">{currentContract?.contractUnit.taxCode}</div>
                    <div className="py-2">{currentContract?.contractUnit.address}</div>
                  </div>
                </div>
              </div>
              <div className=" px-12">
                <div className="flex gap-4">
                  <div className="font-semibold">
                    <div className="py-2">Tên đăng nhập: </div>
                    <div className="py-2">Mật khẩu: </div>
                    <div className="py-2">Số tài khoản: </div>
                    <div className="py-2">Ngân hàng: </div>
                  </div>
                  <div>
                    <div className="py-2">{currentContract?.contractUnit.username}</div>
                    <div className="py-2">{currentContract?.contractUnit.password}</div>
                    <div className="py-2">{currentContract?.contractUnit.bankNumber}</div>
                    <div className="py-2">{currentContract?.contractUnit.bank}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default ContractDetail;
