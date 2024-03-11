import { Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import {
  IAuthorizeContract,
  startEdittingContract,
} from '../../../../contexts/Manage/Contract/Authorize.slice';
import { CheckExpired } from './../../../../components/CheckExpired/index';
import { InfoCircleOutlined } from '@ant-design/icons';
import RecordContract from './RecordContract';
import AddRecordForm from './Components/AddRecordForm';
import ContractDetailIndividual from './Components/ContractDetailIndividual';
import ContractDetailGroup from './Components/ContractDetailGroup';
import { useAppDispatch } from '../../../../contexts/store';
import ExtendContractForm from './Components/ExtendContractForm';
import CancelContractForm from './Components/CancelContractForm';
import { getDateString } from '../../../../utils/getDateString';

const ContractDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
        setCurrentContract(res);
      });
    } else {
      alert('Error');
    }
  }, []);

  // Thêm bản ghi
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  // Gia hạn hợp đồng
  const [openExtendContract, setOpenExtendContract] = useState(false);

  const onOpenExtendModal = () => {
    if (currentContract) {
      dispatch(startEdittingContract(currentContract));
      setOpenExtendContract(true);
    }
  };

  const onCancelExtend = () => {
    setOpenExtendContract(false);
  };

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

  const [currentSection, setCurrentSection] = useState(0);

  const breadCrumbItems = [
    {
      title: (
        <Link to={'/manage/contract'}>
          <div className="text-violet-50 text-base font-semibold font-montserrat leading-normal">
            Quản lí
          </div>
        </Link>
      ),
    },
    {
      title: (
        <Link to={'/manage/contract'}>
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
      navigate('/manage/contract/edit-contract');
    }
  };

  return (
    <>
      <AddRecordForm onCancel={onCancel} openModal={openModal} contractId={id} key={'AddRecord'} />
      <ExtendContractForm onCancel={onCancelExtend} openModal={openExtendContract} />
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
          Chi tiết {currentContract?.name.toLowerCase()} - {currentContract?.contractId}
        </div>

        <div className="left-[90px] top-[186px] absolute rounded-3xl border border-orange-500 justify-start items-center inline-flex">
          <div
            onClick={() => setCurrentSection(0)}
            className={`px-6 py-2 rounded-3xl justify-start items-start gap-2.5 flex ${!currentSection ? 'bg-amber-700' : ''}`}
          >
            <div
              className={`text-center text-white text-base font-normal font-montserrat leading-normal ${currentSection ? 'opacity-70' : ''}`}
            >
              Thông tin hợp đồng
            </div>
          </div>
          <div
            onClick={() => setCurrentSection(1)}
            className={`px-6 py-2 rounded-3xl justify-start items-start gap-2.5 flex ${currentSection ? 'bg-amber-700' : ''}`}
          >
            <div
              className={`text-center text-white text-base font-normal font-montserrat leading-normal ${!currentSection ? 'opacity-70' : ''}`}
            >
              Tác phẩm ủy quyền
            </div>
          </div>
        </div>
        <div className="right-[0] top-[200px] absolute flex-col justify-start items-start inline-flex">
          <div className="p-4 bg-[#2B2B3F] rounded-tl-2xl rounded-bl-2xl flex-col justify-center items-center gap-2.5 flex">
            <div className="text-center mt-2" onClick={handleStartEdit}>
              <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex">
                <div className="w-8 h-8 relative" />
              </div>
              <div className="mt-2 self-stretch opacity-70 text-center text-white text-xs font-medium font-montserrat leading-[18px] tracking-tight">
                Chỉnh sửa <br />
                hợp đồng
              </div>
            </div>
            <div className="text-center mt-2" onClick={onOpenExtendModal}>
              <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex">
                <div className="w-8 h-8 relative" />
              </div>
              <div className="mt-2 self-stretch opacity-70 text-center text-white text-xs font-medium font-montserrat leading-[18px] tracking-tight">
                Gia hạn <br />
                hợp đồng
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
            <div className="text-center mt-2" onClick={onOpenModal}>
              <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex">
                <div className="w-8 h-8 relative" />
              </div>
              <div className="mt-2 self-stretch opacity-70 text-center text-white text-xs font-medium font-montserrat leading-[18px] tracking-tight">
                Thêm bản <br />
                ghi
              </div>
            </div>
          </div>
        </div>
        {!currentSection ? (
          <>
            <div className="left-[90px] top-[266px] right-[180px] absolute text-white text-base  font-montserrat leading-normal ">
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
                      <div className="py-2">
                        {getDateString(currentContract?.startDate ? currentContract?.startDate : 0)}
                      </div>
                      <div className="py-2">
                        {getDateString(currentContract?.endDate ? currentContract?.endDate : 0)}
                      </div>
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
                <>
                  {currentContract && (
                    <>
                      <>
                        {currentContract.authorizedEntity.type === 'individual' && (
                          <ContractDetailIndividual currentContract={currentContract} />
                        )}
                      </>
                      <>
                        {currentContract.authorizedEntity.type === 'group' && (
                          <ContractDetailGroup currentContract={currentContract} />
                        )}
                      </>
                    </>
                  )}
                </>
              </div>
            </div>
          </>
        ) : (
          <>
            <RecordContract contractId={id ? id : ''} />
          </>
        )}
      </div>
    </>
  );
};

export default ContractDetail;
