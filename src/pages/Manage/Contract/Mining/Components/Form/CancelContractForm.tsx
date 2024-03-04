import { Button, Form, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { cancelContract } from '../../../../../../contexts/Manage/Contract/Mining.slice';
import { RootState, useAppDispatch } from '../../../../../../contexts/store';

const CancelContractForm = ({
  onCancel,
  openModal,
}: {
  onCancel: () => void;
  openModal: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [form] = useForm();

  const edittingContract = useSelector((state: RootState) => state.miningContract.edittingContract);
  const onCancelContract = () => {
    const { cancelReason } = form.getFieldsValue();
    if (edittingContract?.id) {
      dispatch(cancelContract({ cancelReason, id: edittingContract.id })).then(() => {
        form.resetFields();
        onCancel();
      });
    }
  };

  return (
    <>
      {openModal ? (
        <Modal
          width={908}
          title={
            <div className="text-center mb-12">
              Lý do hủy hợp đồng uỷ quyền {edittingContract?.name}
            </div>
          }
          centered
          onCancel={onCancel}
          open={openModal}
          footer={null}
        >
          <Form onFinish={onCancelContract} form={form} layout="horizontal">
            <Form.Item name={'cancelReason'}>
              <TextArea rows={8} />
            </Form.Item>

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

export default CancelContractForm;
