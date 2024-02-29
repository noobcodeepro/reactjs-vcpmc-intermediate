import React from 'react';
import { Form, Input, Select } from 'antd';
import { Record } from '../../../../types/record.type';
import { FormInstance } from 'antd/es/form/Form';
import './RecordForm.css';
import { useAppDispatch } from '../../../../contexts/store';
import { updateRecord } from '../../../../contexts/Record/record.slice';
import { useNavigate, useParams } from 'react-router-dom';

const RecordForm = ({ currentRecord, form }: { currentRecord: Record; form: FormInstance }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const onFinish = () => {
    console.log('GO');
    console.log(id);
    if (id) {
      dispatch(updateRecord({ id: id, item: form.getFieldsValue() })).then(() => {
        navigate('/records');
      });
    }
  };

  return (
    <Form className="text-start" onFinish={onFinish} form={form} layout="vertical">
      <div className="text-2xl leading-6 text-[#FF7506] font-bold text-center">
        Chỉnh sửa thông tin
      </div>
      <Form.Item
        rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
        initialValue={currentRecord?.name}
        name={'name'}
        label={
          <span className="font-semibold text-base leading-6 text-white">
            Tên bản ghi: <span className="text-red-600">*</span>
          </span>
        }
      >
        <Input className="text-white " />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
        initialValue={currentRecord?.isrc_id}
        name={'isrc_id'}
        label={
          <span className="font-semibold text-base leading-6 text-white">
            Mã ISRC: <span className="text-red-600">*</span>
          </span>
        }
      >
        <Input className="text-white " />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
        initialValue={currentRecord?.singer}
        name={'singer'}
        label={
          <span className="font-semibold text-base leading-6 text-white">
            Ca sĩ: <span className="text-red-600">*</span>
          </span>
        }
      >
        <Input className="text-white " />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
        initialValue={currentRecord?.author}
        name={'author'}
        label={
          <span className="font-semibold text-base leading-6 text-white">
            Tác giả: <span className="text-red-600">*</span>
          </span>
        }
      >
        <Input className="text-white bordered" />
      </Form.Item>
      <Form.Item
        initialValue={currentRecord?.producer}
        name={'producer'}
        label={<span className="font-semibold text-base leading-6 text-white">Nhà sản xuất:</span>}
      >
        <Input className="text-white " />
      </Form.Item>
      <Form.Item
        initialValue={currentRecord.category}
        rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
        name="category"
        label={
          <span className="font-semibold text-base leading-6 text-white">
            Thể loại: <span className="text-red-500">*</span>
          </span>
        }
      >
        <Select
          placeholder={
            <span className="text-[#5a5a6e] font-bold text-base">Chọn một thể loại</span>
          }
          className="h-[48px] bordered"
        >
          <Select.Option value="Rap">Rap</Select.Option>
          <Select.Option value="Ballad">Ballad</Select.Option>
          <Select.Option value="Rock n Roll">Rock n Roll</Select.Option>
          <Select.Option value="R&B">R&B</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default RecordForm;
