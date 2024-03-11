import { Breadcrumb, Button, Form } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { RootState, useAppDispatch } from '../../../../contexts/store';
import { parseToInt } from '../../../../utils/parseToInt';
import ContractDetailForm from './Components/Form/ContractDetailForm';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import UnitContractForm from './Components/Form/UnitContractForm';
import {
  IMiningContract,
  addContract,
  startEdittingContract,
  updateContract,
} from '../../../../contexts/Manage/Contract/Mining.slice';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';

const AddContract = ({ copied = false }: { copied?: boolean }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [form] = useForm();
  const navigate = useNavigate();
  const edittingContract = useSelector((state: RootState) => state.miningContract.edittingContract);

  useEffect(() => {
    if (id && copied) {
      const fetchData = async (id: string) => {
        const docRef = await doc(db, 'miningContracts', id);
        return getDoc(docRef).then(doc => {
          return { ...doc.data(), id: doc.id } as IMiningContract;
        });
      };
      if (id) {
        fetchData(id).then(res => {
          dispatch(startEdittingContract(res));
        });
      } else {
        alert('Error');
      }
    }
  }, [edittingContract, dispatch, id, copied]);

  const breadCrumbItems = edittingContract?.id
    ? [
        {
          title: (
            <Link to={'/manage/mining-contract'}>
              <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
                Quản lí
              </div>
            </Link>
          ),
        },
        {
          title: (
            <Link to={'/manage/mining-contract'}>
              <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
                Quản lí hợp đồng
              </div>
            </Link>
          ),
        },
        {
          title: (
            <Link to={`/manage/contract/mining-contract/d/${edittingContract.id}`}>
              <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
                Chi tiết
              </div>
            </Link>
          ),
        },
        {
          title: (
            <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
              Chỉnh sửa thông tin
            </div>
          ),
        },
      ]
    : [
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
              Thêm hợp đồng
            </div>
          ),
        },
      ];

  const onFinish = () => {
    const submitData = form.getFieldsValue();
    const time = new Date();

    const data: Omit<IMiningContract, 'id'> = {
      contractId: submitData.contractId,
      cancelReason: edittingContract?.cancelReason ? edittingContract?.cancelReason : '',
      createAt: time.getTime(),
      startDate: submitData.startDate.valueOf(),
      endDate: submitData.endDate.valueOf(),
      name: submitData.contractName,
      contractUnit: {
        bank: submitData.bank,
        dob: submitData.dob.valueOf(),
        email: submitData.email,
        gender: submitData.gender,
        idNumber: parseToInt(submitData.idNumber),
        idProvideAt: submitData.idProvideAt,
        idProvideDate: submitData.idProvideDate.valueOf(),
        nationality: submitData.nationality,
        password: submitData.password,
        phoneNumber: submitData.phoneNumber,
        representer: submitData.representer,
        unitName: submitData.unitName,
        username: submitData.username,
        address: submitData.address,
        bankNumber: parseToInt(submitData.bankNumber),
        role: submitData.role,
        taxCode: parseToInt(submitData.taxCode),
      },
      type: {
        name: submitData.typeName,
        contractValue: submitData.typeName === 'allIn' ? submitData.contractValue : '0',
        distributeValue: submitData.typeName === 'allIn' ? submitData.distributeValue : '0',
        playsValue: submitData.typeName === 'plays' ? submitData.playsValue : '0',
      },
    };

    if (edittingContract && !copied) {
      dispatch(updateContract({ item: data, id: edittingContract.id }));
      navigate('/manage/mining-contract');
    } else {
      dispatch(addContract(data));
      navigate('/manage/mining-contract');
    }
  };

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
        {edittingContract?.id && copied ? (
          <>{`Bản sao hợp đồng khai thác - ${edittingContract.contractId}`}</>
        ) : (
          <>
            {edittingContract?.id ? (
              <>{`Hợp đồng khai thác - ${edittingContract.contractId}`}</>
            ) : (
              <>Thêm hợp đồng ủy quyền mới</>
            )}
          </>
        )}
      </div>

      <div className="left-[90px] top-[190px] right-[60px] absolute text-base  font-['Montserrat'] leading-normal ">
        <Form form={form} onFinish={onFinish}>
          <div className="grid grid-cols-3 gap-x-16 gap-y-12 text-white ">
            <ContractDetailForm />
            <UnitContractForm />

            <div className="">
              <span className="text-red-500">* </span>là những trường thông tin bắt buộc
            </div>
          </div>
          <div className="my-10">
            <div className="mx-auto w-fit flex items-center gap-4">
              <Link to={'/manage/contract'}>
                <Form.Item>
                  <Button className="block text-[#FF7506]  w-[168px] px-6 py-3 h-[48px] text-base font-semibold leading-6 border border-[#FF7506] outline-none">
                    <div className="text-white">Hủy</div>
                  </Button>
                </Form.Item>
              </Link>
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="text-white bg-[#FF7506] w-[168px] px-6 py-3 h-[48px] text-base font-semibold leading-6 border-none outline-none"
                >
                  <div className="">{edittingContract ? 'Lưu' : 'Tạo'}</div>
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddContract;
