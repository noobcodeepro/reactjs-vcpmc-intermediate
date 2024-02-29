import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../contexts/store';
import { Record } from '../../types/record.type';
import { Breadcrumb, Button, Form } from 'antd';
import { getDateString } from '../../utils/getDateString';
import { IAuthorizeContract } from '../../contexts/Manage/Contract/Authorize.slice';
import { CheckExpired } from '../../components/CheckExpired';
import { useForm } from 'antd/es/form/Form';
import RecordForm from './components/RecordForm/RecordForm';
import { getDetailRecord } from '../../contexts/Record/record.slice';

const breadCrumbItems = [
  {
    title: (
      <Link to={'/records'}>
        <div className="text-violet-50 text-base font-semibold font-montserrat leading-normal">
          Kho bản ghi
        </div>
      </Link>
    ),
  },

  {
    title: (
      <div className=" text-violet-50 text-base font-semibold font-montserrat leading-normal">
        Cập nhật thông tin
      </div>
    ),
  },
];

const UpdateRecord = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = useForm();
  const [currentRecord, setCurrentRecord] = useState<Record>();
  const [contract, setContract] = useState<IAuthorizeContract>();
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id) {
      dispatch(getDetailRecord(id))
        .unwrap()
        .then(res => {
          setLoading(true);
          setCurrentRecord(res.data);
          setContract(res.contractData);
          setPhotoUrl(res.photoUrl);
          setLoading(false);
        });
    } else {
      alert('Error');
    }
  }, []);

  const onCancel = () => {
    navigate('/records');
  };
  return (
    <>
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
        <div className="left-[90px] top-[114px] absolute text-white text-4xl font-bold font-montserrat leading-[48px]">
          Bản ghi - {currentRecord?.name}
        </div>

        <div className="inset-x-[300px] top-[200px] absolute rounded-3xl  justify-start items-center">
          <div className="flex gap-x-4">
            <div className="flex flex-col gap-y-4">
              <div className="text-center w-[570px] h-[476px] rounded-lg bg-[#2B2B3F] p-6">
                <div className="text-2xl leading-6 text-[#FF7506] font-bold">Thông tin bản ghi</div>
                <div className="">
                  {!loading ? (
                    <img
                      className="w-[130px] h-[130px] rounded-full mx-auto my-4 object-cover"
                      src={photoUrl}
                    />
                  ) : (
                    <div className="w-[130px] h-[130px] rounded-full mx-auto my-4 bg-gray-500"></div>
                  )}
                </div>
                <div className="font-light leading-6 text-base text-white opacity-70">
                  {currentRecord?.name}.mp3
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-base leading-6 text-white">
                      <div>Ngày thêm</div>
                    </div>
                    <div className="font-light leading-6 text-base text-white opacity-70">
                      <div>
                        {getDateString(currentRecord?.createAt ? currentRecord.createAt : 0)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-base leading-6 text-white">
                      <div>Người tải lên</div>
                    </div>
                    <div className="font-light leading-6 text-base text-white opacity-70">
                      <div>{currentRecord?.uploader}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-base leading-6 text-white">
                      <div>Người duyệt</div>
                    </div>
                    <div className="font-light leading-6 text-base text-white opacity-70">
                      <div>{currentRecord?.approvedBy}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-base leading-6 text-white">
                      <div>Ngày phê duyệt</div>
                    </div>
                    <div className="font-light leading-6 text-base text-white opacity-70">
                      <div>
                        {getDateString(currentRecord?.approvedAt ? currentRecord.approvedAt : 0)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center w-[570px] h-[258px] rounded-lg bg-[#2B2B3F] p-6">
                <div className="text-2xl leading-6 text-[#FF7506] font-bold">
                  Thông tin ủy quyền
                </div>
                <div className="flex flex-col gap-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-base leading-6 text-white">
                      <div>Số hợp đồng:</div>
                    </div>
                    <div className="font-light leading-6 text-base text-white opacity-70">
                      <div>{contract?.contractId}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-base leading-6 text-white">
                      <div>Ngày nhận ủy quyền:</div>
                    </div>
                    <div className="font-light leading-6 text-base text-white opacity-70">
                      <div>{getDateString(contract?.startDate ? contract.startDate : 0)}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-base leading-6 text-white">
                      <div>Ngày hết hạn:</div>
                    </div>
                    <div className="font-light leading-6 text-base text-white opacity-70">
                      <div>{getDateString(contract?.endDate ? contract.endDate : 0)}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-base leading-6 text-white">
                      <div>Trạng thái:</div>
                    </div>
                    <div className="font-light leading-6 text-base text-white opacity-70">
                      <div>
                        <CheckExpired
                          showDate={false}
                          cancelReason={contract?.cancelReason}
                          timestamp={contract?.endDate ? contract.endDate : 0}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-center w-[743px] h-[757px] rounded-lg bg-[#2B2B3F] p-6">
                {!loading && currentRecord && (
                  <RecordForm form={form} currentRecord={currentRecord} />
                )}
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
              onClick={() => form.submit()}
              className="text-white bg-[#FF7506] w-[168px] px-6 py-3 h-[48px] text-base font-semibold leading-6 border-none outline-none"
            >
              Lưu
            </Button>
          </Form.Item>
        </div>
      </div>
    </>
  );
};

export default UpdateRecord;
