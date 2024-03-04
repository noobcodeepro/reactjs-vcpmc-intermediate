import React from 'react';
import { DatePicker, Form, Input, Radio, Select } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../contexts/store';
import dayjs from 'dayjs';

const emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
const UnitContractForm = () => {
  const edittingContract = useSelector((state: RootState) => state.miningContract.edittingContract);
  return (
    <>
      <div className="">
        <div className="">
          <div className="font-semibold">
            <div className="flex items-center justify-between">
              <div className="py-2 flex-1">
                Tên đơn vị sử dụng: <span className="text-red-500">*</span>
              </div>
              <div className="py-2 flex-1">
                <Form.Item
                  name={'unitName'}
                  initialValue={edittingContract?.contractUnit.unitName}
                  rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="py-2 flex-1">
                Người đại diện: <span className="text-red-500">*</span>
              </div>
              <div className="py-2 flex-1">
                <Form.Item
                  name={'representer'}
                  initialValue={edittingContract?.contractUnit.representer}
                  rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="py-2 flex-1">Chức vụ:</div>
              <div className="py-2 flex-1">
                <Form.Item
                  initialValue={edittingContract?.contractUnit.role}
                  name={'role'}
                  rules={[{ required: true, message: 'Trường này không được trống' }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="py-2 flex-1">
                Ngày sinh: <span className="text-red-500">*</span>
              </div>
              <div className="py-2 flex-1">
                <Form.Item
                  initialValue={
                    edittingContract?.contractUnit.dob
                      ? dayjs(edittingContract.contractUnit.dob)
                      : ''
                  }
                  name={'dob'}
                  rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                >
                  <DatePicker
                    className="placeholder:text-white"
                    placeholder="Chọn ngày sinh"
                    format={'DD/MM/YYYY'}
                    allowClear={false}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="py-2 flex-1">
                Quốc tịch: <span className="text-red-500">*</span>
              </div>
              <div className="py-2 flex-1 min-w-[160px]">
                <Form.Item
                  initialValue={edittingContract?.contractUnit.nationality}
                  name={'nationality'}
                  rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                >
                  <Select
                    className="h-[40px]"
                    placeholder={
                      <div className="text-[#5a5a6e] font-bold text-base">Chọn quốc tịch</div>
                    }
                  >
                    <Select.Option value="Việt Nam">Việt Nam</Select.Option>
                    <Select.Option value="Trung Quốc">Trung Quốc</Select.Option>
                    <Select.Option value="Mỹ">Mỹ</Select.Option>
                    <Select.Option value="Nhật Bản">Nhật Bản</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="py-2 flex-1">Số điện thoại: </div>
              <div className="py-2 flex-1">
                <Form.Item
                  initialValue={edittingContract?.contractUnit.phoneNumber}
                  name={'phoneNumber'}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="py-2 flex-1">
                Email: <span className="text-red-500">*</span>
              </div>
              <div className="py-2 flex-1">
                <Form.Item
                  initialValue={edittingContract?.contractUnit.email}
                  name={'email'}
                  rules={[
                    { required: true, message: 'Trường này không được trống' },
                    {
                      pattern: emailRegex,
                      message: 'Vui lòng điền một email hợp lệ',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-12">
        <div className="">
          <div className="font-semibold">
            <div className="flex items-center justify-between">
              <div className="py-2 flex-1">
                Giới tính: <span className="text-red-500">*</span>
              </div>
              <div className="py-2 flex-1">
                <Form.Item
                  initialValue={edittingContract?.contractUnit.gender}
                  name={'gender'}
                  rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                >
                  <Radio.Group className="flex">
                    <Radio className="text-white flex-1" value={true}>
                      Nam
                    </Radio>
                    <Radio className="text-white flex-1" value={false}>
                      Nữ
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="py-2 flex-1">
                Số CMND/CCCD: <span className="text-red-500">*</span>{' '}
              </div>
              <div className="py-2 flex-1">
                <Form.Item
                  initialValue={edittingContract?.contractUnit.idNumber}
                  name={'idNumber'}
                  rules={[
                    { required: true, message: 'Trường này không được trống' },
                    {
                      pattern: new RegExp('^[0-9]*$'),
                      message: 'Trường này phải là một dãy số',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="py-2 flex-1">
                Ngày cấp: <span className="text-red-500">*</span>
              </div>
              <div className="py-2 flex-1">
                <Form.Item
                  initialValue={
                    edittingContract?.contractUnit.idProvideDate
                      ? dayjs(edittingContract.contractUnit.idProvideDate)
                      : ''
                  }
                  name={'idProvideDate'}
                  rules={[{ required: true, message: 'Trường này không được trống' }]}
                >
                  <DatePicker format={'DD/MM/YYYY'} allowClear={false} />
                </Form.Item>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="py-2">
                Nơi cấp: <span className="text-red-500">*</span>
              </div>
              <div className="py-2">
                <Form.Item
                  initialValue={edittingContract?.contractUnit.idProvideAt}
                  name={'idProvideAt'}
                  rules={[{ required: true, message: 'Trường này không được trống' }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="py-2 flex-1">Mã số thuế:</div>
              <div className="py-2 flex-1">
                <Form.Item initialValue={edittingContract?.contractUnit.taxCode} name={'taxCode'}>
                  <Input />
                </Form.Item>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="py-2 flex-1">Nơi cư trú: </div>
              <div className="py-2 flex-1">
                <Form.Item initialValue={edittingContract?.contractUnit.address} name={'address'}>
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
              <div className="py-2 flex-1">
                <span>Tên đăng nhập:</span> <span className="text-red-500">*</span>
              </div>
              <div className="py-2 flex-1">
                <Form.Item
                  initialValue={edittingContract?.contractUnit.username}
                  name={'username'}
                  rules={[{ required: true, message: 'Trường này không được trống' }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="py-2 flex-1">
                Mật khẩu: <span className="text-red-500">*</span>
              </div>
              <div className="py-2 flex-1">
                <Form.Item
                  initialValue={edittingContract?.contractUnit.password}
                  name={'password'}
                  rules={[{ required: true, message: 'Trường này không được trống' }]}
                >
                  <Input type="password" />
                </Form.Item>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="py-2 flex-1">Số tài khoản:</div>
              <div className="py-2 flex-1">
                <Form.Item
                  initialValue={edittingContract?.contractUnit.bankNumber}
                  name={'bankNumber'}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="py-2 flex-1">Ngân hàng:</div>
              <div className="py-2 flex-1">
                <Form.Item initialValue={edittingContract?.contractUnit.bank} name={'bank'}>
                  <Input />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnitContractForm;

/** gender
 * <div className="flex items-center justify-between">
              <div className="py-2 flex-1">
                Giới tính: <span className="text-red-500">*</span>
              </div>
              <div className="py-2 flex-1">
                <Form.Item
                  name={'gender'}
                  rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                >
                  <Radio.Group className="flex">
                    <Radio className="text-white flex-1" value={true}>
                      Nam
                    </Radio>
                    <Radio className="text-white flex-1" value={false}>
                      Nữ
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
 * dob
            <div className="flex items-center justify-between">
              <div className="py-2 flex-1">
                Ngày sinh: <span className="text-red-500">*</span>
              </div>
              <div className="py-2 flex-1">
                <Form.Item
                  name={'dob'}
                  rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                >
                  <DatePicker
                    className="placeholder:text-white"
                    placeholder="Chọn ngày sinh"
                    format={'DD/MM/YYYY'}
                    allowClear={false}
                  />
                </Form.Item>
              </div>
            </div>
 */
