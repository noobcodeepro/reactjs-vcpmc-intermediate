import { Breadcrumb, Button, Form, Input, Radio, Select } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { RootState, useAppDispatch } from '../../../contexts/store';
import {
  IAuthority,
  addWaitingAuthority,
  getAuthority,
  startEditAuthority,
  updateAuthority,
} from '../../../contexts/Manage/Authority/Authority.slice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AddAuthority = ({ usage = false }: { usage?: boolean }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [form] = useForm();
  const navigate = useNavigate();
  const currentAuthority = useSelector((state: RootState) => state.authority.edittingAuthority);
  const isLoading = useSelector((state: RootState) => state.authority.isLoading);
  const breadCrumbItems = !usage
    ? [
        {
          title: (
            <Link to={'/manage/device'}>
              <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
                Quản lý
              </div>
            </Link>
          ),
        },
        {
          title: (
            <Link to={'/manage/authority'}>
              <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
                Đối tác ủy quyền
              </div>
            </Link>
          ),
        },
        {
          title: (
            <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
              Cập nhật thông tin người dùng
            </div>
          ),
        },
      ]
    : [
        {
          title: (
            <Link to={'/manage/usage'}>
              <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
                Quản lý
              </div>
            </Link>
          ),
        },
        {
          title: (
            <Link to={'/manage/usage'}>
              <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
                Đơn vị sử dụng
              </div>
            </Link>
          ),
        },
        {
          title: (
            <Link to={`/manage/usage`}>
              <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
                Chi tiết
              </div>
            </Link>
          ),
        },
        {
          title: (
            <Link to={`/manage/usage/authority/${id}`}>
              <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
                Thông tin người dùng
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
      ];

  const onFinish = () => {
    const submitData = form.getFieldsValue();

    const data: Omit<IAuthority, 'id'> = {
      name: submitData.name,
      email: submitData.email,
      expireDate: currentAuthority?.expireDate ? currentAuthority?.expireDate : 0,
      password: submitData?.password,
      state: submitData?.state,
      phoneNumber: submitData?.phoneNumber,
      role: submitData?.role,
      username: submitData?.username,
      usingUnitId: currentAuthority?.usingUnitId ? currentAuthority.usingUnitId : '',
    };

    if (!id) {
      dispatch(addWaitingAuthority(data));
    } else {
      dispatch(updateAuthority({ item: data, id: id }));
    }

    usage ? navigate('/manage/authority') : navigate('/manage/usage');
  };

  useEffect(() => {
    if (id) {
      dispatch(getAuthority(id))
        .unwrap()
        .then(res => {
          //   setCurrentAuthority(res);
          dispatch(startEditAuthority(res));
        });
    }
  }, [dispatch, id]);

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
        Cập nhật thông tin
      </div>
      {!isLoading && (
        <div className="left-[90px] top-[190px] right-[60px] absolute text-base  font-['Montserrat'] leading-normal ">
          <Form form={form} onFinish={onFinish} layout="horizontal">
            <div className="grid grid-cols-2 gap-x-60 gap-y-12 text-white ">
              <div className="mr-[200px]">
                <div className="py-2 flex-1">
                  <Form.Item
                    initialValue={currentAuthority?.name}
                    name={'name'}
                    rules={[
                      {
                        required: true,
                        message: 'Trường này là bắt buộc',
                      },
                    ]}
                    label={
                      <div className="font-bold text-base text-white leading-7 min-w-[190px] text-start">
                        Tên người dùng: <span className="text-red-500">*</span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </div>

                <div className="py-2 flex-1">
                  <Form.Item
                    initialValue={currentAuthority?.email}
                    name={'email'}
                    rules={[
                      {
                        required: true,
                        message: 'Trường này là bắt buộc',
                      },
                    ]}
                    label={
                      <div className="font-bold text-base text-white leading-7 min-w-[190px] text-start">
                        Email: <span className="text-red-500">*</span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </div>
                {!usage && (
                  <div className="py-2 flex-1">
                    <Form.Item
                      initialValue={currentAuthority?.phoneNumber}
                      name={'phoneNumber'}
                      rules={[
                        {
                          required: true,
                          message: 'Trường này là bắt buộc',
                        },
                      ]}
                      label={
                        <div className="font-bold text-base text-white leading-7 min-w-[190px] text-start">
                          Số điện thoại: <span className="text-red-500">*</span>
                        </div>
                      }
                    >
                      <Input />
                    </Form.Item>
                  </div>
                )}

                <div className="py-2 flex-1">
                  <Form.Item
                    initialValue={currentAuthority?.role}
                    name={'role'}
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
                    <Select className="h-[48px]">
                      <Select.Option value={'Super Admin'}>Super Admin</Select.Option>
                      <Select.Option value={'Group Admin'}>Group Admin</Select.Option>
                      <Select.Option value={'Sub - ser'}>Sub - ser</Select.Option>
                      <Select.Option value={'Content Manage'}>Content Manage</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div className="mr-[200px]">
                <div className="py-2 flex-1">
                  <Form.Item
                    initialValue={currentAuthority?.username}
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
                    initialValue={currentAuthority?.password}
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
                    <Input type="password" autoComplete="true" />
                  </Form.Item>
                </div>
                <div className="py-2 flex-1">
                  <Form.Item
                    name={'passwordConfirm'}
                    dependencies={['password']}
                    initialValue={currentAuthority?.password}
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
                    <Input type="password" autoComplete="true" />
                  </Form.Item>
                </div>

                <div className="py-2 flex-1">
                  <Form.Item
                    initialValue={currentAuthority?.state}
                    name={'state'}
                    rules={[
                      {
                        required: true,
                        message: 'Trường này là bắt buộc',
                      },
                    ]}
                    label={
                      <div className="font-bold text-base text-white leading-7 min-w-[190px] text-start">
                        Trạng thái: <span className="text-red-500">*</span>
                      </div>
                    }
                  >
                    <Radio.Group className="space-x-4">
                      <Radio className="text-white text-base" value={'active'}>
                        Đã kích hoạt
                      </Radio>
                      <Radio className="text-white text-base" value={'in-active'}>
                        Ngưng kích hoạt
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>

              <div className="">
                <span className="text-red-500">* </span>là những trường thông tin bắt buộc
              </div>
            </div>
            <div className="my-10">
              <div className="mx-auto w-fit flex items-center gap-4">
                <Link to={usage ? '/manage/usage' : '/manage/authority'}>
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
                    <div className="">{id ? 'Lưu' : 'Tạo'}</div>
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default AddAuthority;
