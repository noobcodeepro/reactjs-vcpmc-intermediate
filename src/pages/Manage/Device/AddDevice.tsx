import { Breadcrumb, Button, DatePicker, Form, Input, Select } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { RootState, useAppDispatch } from '../../../contexts/store';
import { useSelector } from 'react-redux';
import { PlusCircleOutlined } from '@ant-design/icons';
import { IDevice, addDevice } from '../../../contexts/Manage/Device/Device.slice';

const AddDevice = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [form] = useForm();
  const navigate = useNavigate();
  //   const edittingContract = useSelector((state: RootState) => state.miningContract.edittingContract);

  useEffect(() => {
    // if (id && copied) {
    //   const fetchData = async (id: string) => {
    //     const docRef = await doc(db, 'miningContracts', id);
    //     return getDoc(docRef).then(doc => {
    //       return { ...doc.data(), id: doc.id } as IMiningContract;
    //     });
    //   };
    //   if (id) {
    //     fetchData(id).then(res => {
    //       dispatch(startEdittingContract(res));
    //     });
    //   } else {
    //     alert('Error');
    //   }
    // }
    // if (edittingContract) {
    //   console.log(edittingContract);
    // }
  }, []);

  const breadCrumbItems = [
    {
      title: (
        <Link to={'/manage/device'}>
          <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
            Danh sách thiết bị
          </div>
        </Link>
      ),
    },
    {
      title: (
        <Link to={'/manage/device'}>
          <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
            Chi tiết thiết bị
          </div>
        </Link>
      ),
    },
    {
      title: (
        <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
          Thêm thiết bị mới
        </div>
      ),
    },
  ];

  const onFinish = () => {
    const submitData = form.getFieldsValue();
    const time = new Date();
    console.log(submitData);
    const data: Omit<IDevice, 'id'> = {
      nameDevice: submitData.nameDevice,
      macAddress: submitData.macAddress,
      expireDate: submitData.expireDate.valueOf(),
      note: submitData.note,
      skuid: submitData.skuid,
      state: 'not-active',
      userAccount: {
        address: submitData.address,
        password: submitData.password,
        username: submitData.username,
      },
    };

    if (!id) {
      dispatch(addDevice(data)).then(() => {
        navigate('/manage/device');
      });
    }
    // const data: Omit<IMiningContract, 'id'> = {
    //   contractId: submitData.contractId,
    //   cancelReason: edittingContract?.cancelReason ? edittingContract?.cancelReason : '',
    //   createAt: time.getTime(),
    //   startDate: submitData.startDate.valueOf(),
    //   endDate: submitData.endDate.valueOf(),
    //   name: submitData.contractName,
    //   contractUnit: {
    //     bank: submitData.bank,
    //     dob: submitData.dob.valueOf(),
    //     email: submitData.email,
    //     gender: submitData.gender,
    //     idNumber: parseToInt(submitData.idNumber),
    //     idProvideAt: submitData.idProvideAt,
    //     idProvideDate: submitData.idProvideDate.valueOf(),
    //     nationality: submitData.nationality,
    //     password: submitData.password,
    //     phoneNumber: submitData.phoneNumber,
    //     representer: submitData.representer,
    //     unitName: submitData.unitName,
    //     username: submitData.username,
    //     address: submitData.address,
    //     bankNumber: parseToInt(submitData.bankNumber),
    //     role: submitData.role,
    //     taxCode: parseToInt(submitData.taxCode),
    //   },
    //   type: {
    //     name: submitData.typeName,
    //     contractValue: submitData.typeName === 'allIn' ? submitData.contractValue : '0',
    //     distributeValue: submitData.typeName === 'allIn' ? submitData.distributeValue : '0',
    //     playsValue: submitData.typeName === 'plays' ? submitData.playsValue : '0',
    //   },
    // };

    // if (edittingContract && !copied) {
    //   dispatch(updateContract({ item: data, id: edittingContract.id }));
    //   navigate('/manage/mining-contract');
    // } else {
    //   dispatch(AddDevice(data));
    //   navigate('/manage/mining-contract');
    // }
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
        Thêm thiết bị mới
      </div>

      <div className="left-[90px] top-[190px] right-[60px] absolute text-base  font-['Montserrat'] leading-normal ">
        <Form form={form} onFinish={onFinish} layout="horizontal">
          <div className="grid grid-cols-2 gap-x-60 gap-y-12 text-white ">
            <div className="mr-[200px]">
              <div className="py-2 flex-1">
                <Form.Item
                  name={'nameDevice'}
                  rules={[
                    {
                      required: true,
                      message: 'Trường này là bắt buộc',
                    },
                  ]}
                  label={
                    <div className="font-bold text-base text-white leading-7 min-w-[190px] text-start">
                      Tên thiết bị: <span className="text-red-500">*</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </div>

              <div className="py-2 flex-1">
                <Form.Item
                  name={'skuid'}
                  rules={[
                    {
                      required: true,
                      message: 'Trường này là bắt buộc',
                    },
                  ]}
                  label={
                    <div className="font-bold text-base text-white leading-7 min-w-[190px] text-start">
                      SKU/ID: <span className="text-red-500">*</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="py-2 flex-1">
                <Form.Item
                  name={'macAddress'}
                  rules={[
                    {
                      required: true,
                      message: 'Trường này là bắt buộc',
                    },
                  ]}
                  label={
                    <div className="font-bold text-base text-white leading-7 min-w-[190px] text-start">
                      Địa chỉ MAC: <span className="text-red-500">*</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </div>

              <div className="py-2 flex-1">
                <Form.Item
                  name={'expireDate'}
                  rules={[
                    {
                      required: true,
                      message: 'Trường này là bắt buộc',
                    },
                  ]}
                  label={
                    <div className="font-bold text-base text-white leading-7 min-w-[190px] text-start">
                      Thời hạn bảo hành: <span className="text-red-500">*</span>
                    </div>
                  }
                >
                  <DatePicker />
                </Form.Item>
              </div>

              <div className="py-2 flex-1">
                <Form.Item
                  label={
                    <div className="font-bold text-base text-white leading-7 min-w-[190px] text-start">
                      Label: <span className="text-red-500">*</span>
                    </div>
                  }
                >
                  <Select className="h-[40px] border-white opacity-40" />
                </Form.Item>
              </div>

              <div className="py-2 flex-1">
                <Form.Item
                  label={
                    <div className="font-bold text-base text-white leading-7 min-w-[190px] text-start">
                      Thông tin: <span className="text-red-500">*</span>
                    </div>
                  }
                >
                  <Select className="h-[40px] border-white opacity-40" />
                </Form.Item>
              </div>
              <div className="font-bold text-white w-fit ml-auto flex items-center gap-2">
                <PlusCircleOutlined className="text-[#ff7506] text-sm" /> <div>Thêm thông tin</div>
              </div>

              <div className="py-2 flex-1">
                <Form.Item
                  name={'note'}
                  label={
                    <div className="font-bold text-base text-white leading-7 min-w-[190px] text-start">
                      Ghi chú:
                    </div>
                  }
                >
                  <TextArea rows={3} />
                </Form.Item>
              </div>
            </div>

            <div className="mr-[200px]">
              <div className="py-2 flex-1">
                <Form.Item
                  name={'username'}
                  rules={[
                    {
                      required: true,
                      message: 'Trường này là bắt buộc',
                    },
                  ]}
                  label={
                    <div className="font-bold text-base text-white leading-7 min-w-[190px] text-start">
                      Tên đăng nhập: <span className="text-red-500">*</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </div>

              <div className="py-2 flex-1">
                <Form.Item
                  name={'password'}
                  rules={[
                    {
                      required: true,
                      message: 'Trường này là bắt buộc',
                    },
                  ]}
                  label={
                    <div className="font-bold text-base text-white leading-7 min-w-[190px] text-start">
                      Mật khẩu: <span className="text-red-500">*</span>
                    </div>
                  }
                >
                  <Input type="password" />
                </Form.Item>
              </div>
              <div className="py-2 flex-1">
                <Form.Item
                  name={'passwordConfirm'}
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: 'Trường này là bắt buộc',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('The new password that you entered do not match!'),
                        );
                      },
                    }),
                  ]}
                  label={
                    <div className="font-bold text-base text-white leading-7 min-w-[190px] text-start">
                      Nhập lại mật khẩu: <span className="text-red-500">*</span>
                    </div>
                  }
                >
                  <Input type="password" />
                </Form.Item>
              </div>

              <div className="py-2 flex-1">
                <Form.Item
                  name={'address'}
                  rules={[
                    {
                      required: true,
                      message: 'Trường này là bắt buộc',
                    },
                  ]}
                  label={
                    <div className="font-bold text-base text-white leading-7 min-w-[190px] text-start">
                      Vị trí: <span className="text-red-500">*</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </div>
            </div>

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
                  <div className="">
                    {/* {edittingContract ? 'Lưu' : 'Tạo'} */}
                    Tạo
                  </div>
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddDevice;
