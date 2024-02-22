import { Breadcrumb, Button, Input, Radio, Select, Form, DatePicker } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  IAuthorizeContract,
  addContract,
} from '../../../../contexts/Manage/Contract/Authorize.slice';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { useAppDispatch } from '../../../../contexts/store';
import { parseToInt } from '../../../../utils/parseToInt';

const AddContract = () => {
  const dispatch = useAppDispatch();
  const [form] = useForm();
  const navigate = useNavigate();

  const breadCrumbItems = [
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
    console.log(time.getTime());

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
        type: submitData.type,
        name: submitData.authorizer,
      },
      userAccount: {
        email: submitData.email,
        name: submitData.username,
        password: submitData.password,
      },
    };

    dispatch(addContract(data))
      .unwrap()
      .then(res => {
        console.log(res);

        navigate(`/addRecord/${res?.id}`);
      });
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
        Thêm hợp đồng ủy quyền mới
      </div>

      <div className="left-[90px] top-[190px] right-[60px] absolute text-base  font-['Montserrat'] leading-normal ">
        <Form form={form} onFinish={onFinish}>
          <div className="grid grid-cols-3 gap-x-16 text-white ">
            <div className="">
              <div className="font-semibold">
                <div className="flex items-center gap-4 justify-between">
                  <div className="py-2">
                    Số hợp đồng: <span className="text-red-500">*</span>{' '}
                  </div>
                  <div className="py-2">
                    <Form.Item name={'contractId'} className="mb-0">
                      <Input />
                    </Form.Item>
                  </div>
                </div>
                <div className="flex items-center gap-4 justify-between">
                  <div className="py-2">
                    Tên hợp đồng: <span className="text-red-500">*</span>{' '}
                  </div>
                  <div className="py-2">
                    <Form.Item name={'contractName'} className="mb-0">
                      <Input />
                    </Form.Item>
                  </div>
                </div>
                <div className="flex items-center gap-4 justify-between">
                  <div className="py-2">
                    Ngày hiệu lực: <span className="text-red-500">*</span>{' '}
                  </div>
                  <div className="py-2">
                    <Form.Item name={'startDate'} className="mb-0">
                      <DatePicker format={'DD/MM/YYYY'} allowClear={false} />
                    </Form.Item>
                  </div>
                </div>
                <div className="flex items-center gap-4 justify-between">
                  <div className="py-2">
                    Ngày hết hạn: <span className="text-red-500">*</span>{' '}
                  </div>
                  <div className="py-2">
                    <Form.Item name={'endDate'} className="mb-0">
                      <DatePicker format={'DD/MM/YYYY'} allowClear={false} />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className=" px-12">
              <div className="flex items-center gap-4 py-2">
                <div className="font-semibold">Đính kèm tệp:</div>
                <div>
                  <div className="w-[100px] h-[40px] border border-[#FFAC69] px-3 py-2 rounded-md">
                    Tải lên
                  </div>
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
              <div className="pt-6 pb-8 text-[#FFAC69] font-bold text-lg mt-6">
                Thông tin pháp nhân ủy quyền
              </div>
            </div>
            <div className="">
              <div className="">
                <div className="font-semibold">
                  <div className="flex items-center justify-between">
                    <div className="py-2">Pháp nhân ủy quyền: </div>
                    <div className="py-2">
                      <Form.Item name={'type'}>
                        <Radio.Group>
                          <Radio className="text-white" value={'individual'}>
                            Cá nhân{' '}
                          </Radio>
                          <Radio className="text-white" value={'organization'}>
                            Tổ chức
                          </Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="py-2">
                      Tên người ủy quyền: <span className="text-red-500">*</span>
                    </div>
                    <div className="py-2">
                      <Form.Item name={'authorizer'}>
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="py-2">
                      Giới tính: <span className="text-red-500">*</span>
                    </div>
                    <div className="py-2">
                      <Form.Item name={'gender'}>
                        <Radio.Group>
                          <Radio className="text-white" value={true}>
                            Nam
                          </Radio>
                          <Radio className="text-white" value={false}>
                            Nữ
                          </Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="py-2">
                      Ngày sinh: <span className="text-red-500">*</span>
                    </div>
                    <div className="py-2">
                      <Form.Item name={'dob'}>
                        <DatePicker format={'DD/MM/YYYY'} allowClear={false} />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="py-2">
                      Quốc tịch: <span className="text-red-500">*</span>
                    </div>
                    <div className="py-2 min-w-[160px]">
                      <Form.Item name={'nationality'}>
                        <Select placeholder="Select province">
                          <Select.Option value="Việt Nam">Việt Nam</Select.Option>
                          <Select.Option value="Trung Quốc">Trung Quốc</Select.Option>
                          <Select.Option value="Mỹ">Mỹ</Select.Option>
                          <Select.Option value="Nhật Bản">Nhật Bản</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="py-2">Số điện thoại: </div>
                    <div>
                      <div className="py-2">
                        <Form.Item name={'phoneNumber'}>
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" px-12">
              <div className="">
                <div className="font-semibold">
                  <div className="flex items-center justify-between">
                    <div className="py-2">Số CMND/CCCD: </div>
                    <div className="py-2">
                      <Form.Item name={'idNumber'}>
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="py-2">Ngày cấp: </div>
                    <div className="py-2">
                      <Form.Item name={'idProvideDate'}>
                        <DatePicker format={'DD/MM/YYYY'} allowClear={false} />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="py-2">Nơi cấp: </div>
                    <div className="py-2">
                      <Form.Item name={'idProvideAt'}>
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="py-2">Mã số thuế: </div>
                    <div className="py-2">
                      <Form.Item name={'taxCode'}>
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="py-2">Nơi cư trú: </div>
                    <div className="py-2">
                      <Form.Item name={'address'}>
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-8">
              <div className="">
                <div className="font-semibold">
                  <div className="flex items-center justify-between">
                    <div className="py-2">
                      Email: <span className="text-red-500">*</span>
                    </div>
                    <div className="py-2">
                      <Form.Item name={'email'}>
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="py-2">
                      <span>Tài khoản đăng nhập:</span> <span className="text-red-500">*</span>
                    </div>
                    <div className="py-2">
                      <Form.Item name={'username'}>
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="py-2">
                      Mật khẩu: <span className="text-red-500">*</span>
                    </div>
                    <div className="py-2">
                      <Form.Item name={'password'}>
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="py-2">Số tài khoản: </div>
                    <div className="py-2">
                      <Form.Item name={'bankNumber'}>
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="py-2">Ngân hàng: </div>
                    <div className="py-2">
                      <Form.Item name={'bank'}>
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <span className="text-red-500">* </span>là những trường thông tin bắt buộc
            </div>
          </div>
          <div className="my-10">
            <div className="mx-auto w-fit">
              <Link to={'/manage/contract'}>
                <Button size="large">
                  <div className="text-white">Hủy</div>
                </Button>
              </Link>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  <div className="text-[#FFAC69]">Tạo</div>
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
