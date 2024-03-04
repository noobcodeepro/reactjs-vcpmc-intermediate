import { InfoCircleOutlined } from '@ant-design/icons';
import { DatePicker, Form, Input, Radio, Space } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../contexts/store';
import dayjs from 'dayjs';

const ContractDetailForm = () => {
  const edittingContract = useSelector((state: RootState) => state.miningContract.edittingContract);

  const [contractType, setContractType] = useState('allIn');
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
                initialValue={edittingContract?.contractId}
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
                initialValue={edittingContract?.name}
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
                initialValue={edittingContract?.startDate ? dayjs(edittingContract.startDate) : ''}
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
                initialValue={edittingContract?.endDate ? dayjs(edittingContract.endDate) : ''}
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
          <span>Loại hợp đồng</span>
        </div>
        <div className="flex ">
          <div className="flex items-center">
            <div className="py-2">
              <Form.Item name={'typeName'} initialValue={'allIn'}>
                <Radio.Group onChange={e => setContractType(e.target.value)} defaultValue={'allIn'}>
                  <Space direction="vertical">
                    <Radio value={'allIn'}>
                      <div className="text-white">Trọn gói</div>
                    </Radio>
                    <Radio className="mt-[94px]" value={'plays'}>
                      <span className="text-white">Lượt phát</span>
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
            <div className="py-2">
              <div className="flex flex-col justify-between">
                <div className="mb-4 space-y-2 border-l-[1px] border-[#727288] pl-4">
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      Giá trị hợp đồng <br />
                      (VND)
                    </div>
                    <Form.Item initialValue={'350.000.000'} name={'contractValue'}>
                      <Input disabled={contractType === 'plays'} className="w-[200px]" />
                    </Form.Item>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      Giá trị phân phối <br />
                      (VND)/ngày
                    </div>
                    <Form.Item initialValue={'1.000.000'} name={'distributeValue'}>
                      <Input disabled={contractType === 'plays'} className="w-[200px]" />
                    </Form.Item>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-4 pl-4">
                  <div>
                    Giá trị lượt phát <br />
                    (VND)/ngày
                  </div>
                  <Form.Item initialValue={'1.000.000'} name={'playsValue'}>
                    <Input disabled={contractType === 'allIn'} className="w-[200px]" />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractDetailForm;
