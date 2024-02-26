import { InfoCircleOutlined } from '@ant-design/icons';
import { DatePicker, Form, Input } from 'antd';
import React from 'react';

const ContractDetailForm = () => {
  return (
    <>
      <div className="">
        <div className="font-semibold">
          <div className="flex items-center gap-4 justify-between">
            <div className="py-2 flex-1">
              Số hợp đồng: <span className="text-red-500">*</span>{' '}
            </div>
            <div className="py-2 flex-1">
              <Form.Item
                name={'contractId'}
                className="mb-0"
                rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <div className="py-2 flex-1">
              Tên hợp đồng: <span className="text-red-500">*</span>{' '}
            </div>
            <div className="py-2 flex-1">
              <Form.Item
                name={'contractName'}
                className="mb-0"
                rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <div className="py-2 flex-1">
              Ngày hiệu lực: <span className="text-red-500">*</span>{' '}
            </div>
            <div className="py-2 flex-1">
              <Form.Item
                name={'startDate'}
                className="mb-0"
                rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              >
                <DatePicker format={'DD/MM/YYYY'} allowClear={false} />
              </Form.Item>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <div className="py-2 flex-1">
              Ngày hết hạn: <span className="text-red-500">*</span>{' '}
            </div>
            <div className="py-2 flex-1">
              <Form.Item
                name={'endDate'}
                className="mb-0"
                rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              >
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
    </>
  );
};

export default ContractDetailForm;
