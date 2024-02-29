import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { RootState, useAppDispatch } from '../../../../../contexts/store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addContract } from '../../../../../contexts/Manage/Contract/Authorize.slice';
import { addRecord } from '../../../../../contexts/Record/record.slice';
import { useForm } from 'antd/es/form/Form';

const AddRecordForm = ({
  onCancel,
  openModal,
  contractId,
}: {
  onCancel: () => void;
  openModal: boolean;
  contractId?: string;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = useForm();

  const currentContract = useSelector(
    (state: RootState) => state.authorizedContract.waitingContract,
  );
  const onAddRecord = () => {
    const submitData = form.getFieldsValue();
    console.log(submitData);
    console.log('contract:', currentContract);

    if (currentContract) {
      dispatch(addContract(currentContract))
        .unwrap()
        .then(res => {
          if (res?.id) {
            dispatch(
              addRecord({
                ...submitData,
                duration: 300,
                approvedAt: -1,
                approvedBy: 'Super Admin',
                createAt: new Date().getTime(),
                format: 'audio',
                uploader: 'Super Admin',
                contractId: res.id,
                expireDate: 1234567800,
                authorizationDate: 1234567800,
              }),
            ).then(() => {
              navigate('/manage/contract');
            });
          }
        });
    } else {
      if (contractId) {
        dispatch(
          addRecord({
            ...submitData,
            duration: 300,
            approvedAt: -1,
            approvedBy: 'Super Admin',
            createAt: new Date().getTime(),
            format: 'audio',
            uploader: 'Super Admin',
            contractId,
            expireDate: 1234567800,
            authorizationDate: 1234567800,
          }),
        ).then(() => {
          navigate('/manage/contract');
        });
      }
    }
  };
  return (
    <>
      {openModal ? (
        <Modal
          width={800}
          title={<div className="text-center mb-12">Thêm bản ghi mới</div>}
          centered
          onCancel={onCancel}
          open={openModal}
          footer={null}
        >
          <Form onFinish={onAddRecord} form={form} layout="vertical">
            <Form.Item
              rules={[{ required: true, message: 'Trường này không được trống' }]}
              name="name"
              label={
                <span className="text-white">
                  Tên bản ghi: <span className="text-red-500">*</span>
                </span>
              }
            >
              <Input />
            </Form.Item>
            <Form.Item name="isrc_id" label={<span className="text-white">Mã ISRC:</span>}>
              <Input />
            </Form.Item>
            <Form.Item
              name="author"
              label={
                <span className="text-white">
                  Tác giả: <span className="text-red-500">*</span>
                </span>
              }
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="singer"
              label={
                <span className="text-white">
                  Ca sĩ/Nhóm nhạc: <span className="text-red-500">*</span>
                </span>
              }
            >
              <Input />
            </Form.Item>
            <div className="flex items-center justify-between gap-8">
              <div className="flex-1">
                <Form.Item
                  name="category"
                  label={
                    <span className="text-white">
                      Thể loại: <span className="text-red-500">*</span>
                    </span>
                  }
                >
                  <Select
                    placeholder={
                      <span className="text-[#5a5a6e] font-bold text-base">Chọn một thể loại</span>
                    }
                    className="h-[48px]"
                  >
                    <Select.Option value="Rap">Rap</Select.Option>
                    <Select.Option value="Ballad">Ballad</Select.Option>
                    <Select.Option value="Rock n Roll">Rock n Roll</Select.Option>
                    <Select.Option value="R&B">R&B</Select.Option>
                  </Select>
                </Form.Item>
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-white">
                    Đính kèm bản ghi: <span className="text-red-500">*</span>
                  </span>
                  <div className="w-[100px] h-[40px] border border-[#FFAC69] text-[#FFAC69] px-3 py-2 rounded-md">
                    Tải lên
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <Form.Item
                  name="producer"
                  label={
                    <span className="text-white">
                      Nhà sản xuất: <span className="text-red-500">*</span>
                    </span>
                  }
                >
                  <Input />
                </Form.Item>
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-white">Đính kèm lời bài hát:</span>
                  <div className="w-[100px] h-[40px] border border-[#FFAC69] text-[#FFAC69] px-3 py-2 rounded-md">
                    Tải lên
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 w-full py-8">
              <Form.Item>
                <Button
                  onClick={onCancel}
                  className="text-[#FF7506]  w-[168px] px-6 py-3 h-[48px] text-base font-semibold leading-6 border border-[#FF7506] outline-none"
                >
                  Hủy
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="text-white bg-[#FF7506] w-[168px] px-6 py-3 h-[48px] text-base font-semibold leading-6 border-none outline-none"
                >
                  Tải lên
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddRecordForm;
