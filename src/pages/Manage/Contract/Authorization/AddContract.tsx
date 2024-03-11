import { Breadcrumb, Button, Form } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  IAuthorizeContract,
  addWatingContract,
  updateContract,
} from '../../../../contexts/Manage/Contract/Authorize.slice';
import { useForm } from 'antd/es/form/Form';
import { RootState, useAppDispatch } from '../../../../contexts/store';
import { parseToInt } from '../../../../utils/parseToInt';
import ContractDetailForm from './Components/Form/ContractDetailForm';
import IndividualForm from './Components/Form/IndividualForm';
import { useEffect, useState } from 'react';
import GroupForm from './Components/Form/GroupForm';
import { useSelector } from 'react-redux';

const AddContract = () => {
  const dispatch = useAppDispatch();
  const [form] = useForm();
  const navigate = useNavigate();
  const edittingContract = useSelector(
    (state: RootState) => state.authorizedContract.edittingContract,
  );
  const [contractType, setContractType] = useState(
    edittingContract?.authorizedEntity.type === 'group' ? 'group' : 'individual',
  );

  const breadCrumbItems = edittingContract?.id
    ? [
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
            <Link to={`/manage/contract/d/${edittingContract.id}`}>
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

    const data: Omit<IAuthorizeContract, 'id'> = {
      authorizer: submitData.authorizer,
      name: submitData.contractName,
      startDate: submitData.startDate.valueOf(),
      endDate: submitData.endDate.valueOf(),
      cancelReason: '',
      contractId: submitData.contractId,
      createAt: time.getTime(),
      ownership: [0],
      authorizedEntity: {
        address: submitData.address,
        bank: submitData.bank,
        bankNumber: parseToInt(submitData.bankNumber),
        dob: submitData.dob.valueOf(),
        gender: submitData.gender,
        idNumber: parseToInt(submitData.idNumber),
        idProvideDate: submitData.idProvideDate.valueOf(),
        idProvideAt: submitData.idProvideAt,
        nationality: submitData.nationality,
        phoneNumber: parseToInt(submitData.phoneNumber),
        taxCode: parseToInt(submitData.taxCode),
        type: contractType,
        name: submitData.authorizer,
        groupName: submitData.type === 'group' ? submitData.groupName : '',
        groupAddress: submitData.type === 'group' ? submitData.groupAddress : '',
      },
      userAccount: {
        email: submitData.email,
        name: submitData.username,
        password: submitData.password,
      },
    };

    if (edittingContract) {
      dispatch(updateContract({ item: data, id: edittingContract.id }));
      navigate('/manage/contract');
    } else {
      dispatch(addWatingContract(data));
      navigate('/manage/contract/addRecordView');
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
        {edittingContract?.id ? (
          <>{`${edittingContract.name} - ${edittingContract.contractId}`}</>
        ) : (
          'Thêm hợp đồng ủy quyền mới'
        )}
      </div>

      <div className="left-[90px] top-[190px] right-[60px] absolute text-base  font-['Montserrat'] leading-normal ">
        <Form form={form} onFinish={onFinish}>
          <div className="grid grid-cols-3 gap-x-16 text-white ">
            <ContractDetailForm />
            <div className="col-span-3">
              <div className="pt-6 pb-8 text-[#FFAC69] font-bold text-lg mt-6">
                Thông tin pháp nhân ủy quyền
              </div>
            </div>
            {contractType == 'individual' && (
              <IndividualForm type="individual" setType={setContractType} />
            )}
            {contractType == 'group' && <GroupForm type="group" setType={setContractType} />}
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
