import { CheckCircleOutlined, CheckOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../../../contexts/store';
import { useForm } from 'antd/es/form/Form';
import { addContract } from '../../../../contexts/Manage/Contract/Authorize.slice';
import { addRecord } from '../../../../contexts/Record/record.slice';

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
        Thêm bản ghi
      </div>
    ),
  },
];

const RecordContractAdd = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const currentContract = useSelector(
    (state: RootState) => state.authorizedContract.waitingContract,
  );
  const [form] = useForm();

  const onOpenModal = () => {
    setOpenModal(true);
  };

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
    }
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
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
                        <span className="text-[#5a5a6e] font-bold text-base">
                          Chọn một thể loại
                        </span>
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
        Thêm thông tin bản ghi
      </div>

      <div className="left-[90px] top-[190px] right-[60px] absolute text-base  font-['Montserrat'] leading-normal">
        <div className="mx-auto mt-14 bg-[#2B2B3F] w-fit px-10 py-6 rounded-xl text-white">
          <div className="pb-4 pt-3 px-14 mx-1.5 text-center font-bold text-2xl leading-6 border-b-2 border-[#5a5a6e] flex items-center gap-4">
            <CheckOutlined className="bg-green-500 rounded-full border-none p-2 text-base" />
            <div>Hợp đồng đã được tạo thành công</div>
          </div>
          <div className="mx-1.5 font-bold text-base leading-6 mt-8">Có 2 cách để tạo bản ghi:</div>
          <div className="mx-12 mt-3 font-medium text-sm leading-5">
            <div className="flex gap-2">
              <div className="text-[#FF7506]">Cách 1:</div>
              <div>
                <div>Upload bản ghi trực tiếp</div>
                <p className="mt-3 mb-2 font-normal text-sm leading-5 opacity-80">
                  Bạn có thể thực hiện thêm bản ghi ngay trên website
                </p>
                <div>
                  <Button
                    onClick={onOpenModal}
                    className="text-white bg-[#FF7506] px-6 py-3 h-[48px] text-base font-semibold leading-6 border-none outline-none"
                  >
                    Thêm bản ghi trực tiếp
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-16">
              <div className="text-[#FF7506]">Cách 2:</div>
              <div>
                <div>Upload bản ghi qua phần mềm</div>
                <p className="mt-3 mb-2 font-normal text-sm leading-5 opacity-80">
                  Bạn có thể thêm bản ghi bằng tool
                </p>
                <div>
                  <Button className="text-[#FF7506]  px-6 py-3 h-[48px] text-base font-semibold leading-6 border border-[#FF7506] outline-none">
                    Thêm bản ghi bằng tool
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-14 mb-4">
              <div className="text-red-600">
                Lưu ý: Hợp đồng chỉ có hiệu lực khi thêm bản ghi thành công.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordContractAdd;
