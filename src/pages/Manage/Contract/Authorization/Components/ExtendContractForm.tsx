import { Button, DatePicker, Form, Input, Modal, Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../../../../contexts/store';
import { useSelector } from 'react-redux';
import { extendContract } from '../../../../../contexts/Manage/Contract/Authorize.slice';
import { useForm } from 'antd/es/form/Form';
import { getDateString } from '../../../../../utils/getDateString';
import dayjs from 'dayjs';

const ExtendContractForm = ({
  onCancel,
  openModal,
}: {
  onCancel: () => void;
  openModal: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [form] = useForm();
  const [profitType, setProfitType] = useState('author');
  const edittingContract = useSelector(
    (state: RootState) => state.authorizedContract.edittingContract,
  );
  const onExtend = () => {
    const submitData = form.getFieldsValue();
    if (edittingContract?.id) {
      dispatch(
        extendContract({ id: edittingContract?.id, extendDate: submitData.endDate.valueOf() }),
      ).then(() => {
        form.resetFields();
        onCancel();
      });
    }
    console.log(submitData);
  };

  useEffect(() => {
    console.log(profitType);
  }, [profitType]);

  return (
    <>
      {openModal ? (
        <Modal
          width={908}
          title={<div className="text-center mb-12">Gia hạn ủy quyền tác phẩm</div>}
          centered
          onCancel={onCancel}
          open={openModal}
          footer={null}
        >
          <Form onFinish={onExtend} form={form} layout="horizontal">
            <div className="grid grid-cols-2 text-white">
              <div>
                <div className="font-bold text-base leading-6">
                  Thời gian gia hạn <span className="text-red-500">*</span>
                </div>
                <div className="mt-4">
                  Từ ngày:{' '}
                  {getDateString(edittingContract?.startDate ? edittingContract?.startDate : 0)}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="text-white">Đến ngày:</div>
                  <Form.Item
                    initialValue={edittingContract?.endDate ? dayjs(edittingContract.endDate) : ''}
                    name={'endDate'}
                  >
                    <DatePicker format={'DD/MM/YYYY'} allowClear={false} />
                  </Form.Item>
                </div>

                <div className="opacity-50 text-[#FFD0AB] text-xs font-normal leading-[18px] w-[267px] mt-2">
                  Lưu ý: Thời gian bắt đầu gia hạn hợp đồng mới được tính sau ngày hết hạn hợp đồng
                  cũ một ngày.
                </div>
              </div>

              <div>
                <div className="font-bold text-base leading-6">
                  Mức nhuận bút <span className="text-red-500">*</span>
                </div>

                <Radio.Group
                  onChange={e => setProfitType(e.target.value)}
                  className="mt-4"
                  name="profit"
                >
                  <Space direction="vertical">
                    <Radio className="text-white" value={'author'}>
                      <Space direction="horizontal">
                        <span>Quyền tác giả</span>
                        <Form.Item className="text-white">
                          <Input
                            placeholder="0"
                            className="w-[60px] ml-auto text-white placeholder:text-white placeholder:opacity-50"
                          />{' '}
                          %
                        </Form.Item>
                      </Space>
                    </Radio>

                    <Radio className="text-white" value={'others'}>
                      Quyền liên quan
                    </Radio>
                  </Space>
                  <div className="ml-10 my-2">
                    <Radio.Group
                      onChange={() =>
                        profitType === 'others' ? setProfitType('author') : setProfitType('others')
                      }
                      className="border-l border-[#727288]"
                    >
                      <Space className="pl-2 py-2" direction="vertical">
                        <Space direction="horizontal">
                          <Radio value={'other-1'} checked={profitType == 'others'}>
                            <Space direction="horizontal">
                              <span className="text-white">Quyền của người biểu diễn</span>{' '}
                              <Form.Item
                                className="ml-auto text-white"
                                name={'singer'}
                                initialValue={50}
                              >
                                <Input
                                  placeholder="50"
                                  className="w-[60px] ml-auto text-white placeholder:text-white placeholder:opacity-50"
                                />{' '}
                                %
                              </Form.Item>
                            </Space>
                          </Radio>
                        </Space>
                        <Space direction="horizontal">
                          <Radio value={'other-1'} checked={profitType == 'others'}>
                            <Space direction="horizontal">
                              <span className="text-white">
                                Quyền của nhà sản xuất <br />
                                {'(bản ghi/video)'}{' '}
                              </span>
                              <Form.Item
                                className="ml-auto text-white"
                                initialValue={50}
                                name={'producer'}
                              >
                                <Input
                                  placeholder="50"
                                  className="w-[60px] ml-auto text-white placeholder:text-white placeholder:opacity-50"
                                />{' '}
                                %
                              </Form.Item>
                            </Space>
                          </Radio>
                        </Space>
                      </Space>
                    </Radio.Group>
                  </div>
                </Radio.Group>
              </div>
            </div>
            <div>
              <Space direction="horizontal" align="start">
                <div className="text-white mt-2">Đính kèm tệp:</div>
                <div>
                  <div className="w-[108px] h-[40px] px-4 rounded-md border border-[#FFAC69] flex items-center justify-end text-[#FFAC69] font-bold text-base">
                    Tải lên
                  </div>
                  <div className="mt-2 text-white font-light text-base">hetthuongcannho.doc</div>
                  <div className="mt-2 text-white font-light text-base">hetthuongcannho.doc</div>
                </div>
              </Space>
            </div>

            <div className="my-10">
              <div className="mx-auto w-fit flex items-center gap-4">
                <Form.Item>
                  <Button
                    onClick={onCancel}
                    className="block text-[#FF7506]  w-[168px] px-6 py-3 h-[48px] text-base font-semibold leading-6 border border-[#FF7506] outline-none"
                  >
                    <div className="text-white">Hủy</div>
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button
                    htmlType="submit"
                    className="text-white bg-[#FF7506] w-[168px] px-6 py-3 h-[48px] text-base font-semibold leading-6 border-none outline-none"
                  >
                    <div className="">Lưu</div>
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default ExtendContractForm;
