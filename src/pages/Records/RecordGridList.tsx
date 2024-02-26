import { Card, ConfigProvider } from 'antd';
import Pagination from '../../components/Pagination';
import Meta from 'antd/es/card/Meta';
import { formatTime } from '../../utils/formatTime';
import { useState } from 'react';
import { EditOutlined, PlayCircleFilled } from '@ant-design/icons';
import { ExtendedRecord } from '.';

type RecordListType = {
  data: Array<ExtendedRecord>;
};

const RecordGridList = (data: RecordListType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const onChangePageSize = (ps: number) => {
    setCurrentPage(1);
    setPageSize(ps);
  };
  const descriptionHtml = (data: ExtendedRecord) => {
    return (
      <>
        <div className="">
          <div className="text-xs text-[#cecedb]">
            <span className="font-bold">Ca sĩ:</span>
            <span className="tracking-[-0.5%] ml-1 font-light">{data.singer}</span>
          </div>
          <div className="text-xs text-[#cecedb]">
            <span className="font-bold">Sáng tác:</span>
            <span className="ml-1 font-light">{data.author}</span>
          </div>
          <div className="text-xs text-[#cecedb]">
            <span className="font-bold">Số hợp đồng:</span>
            <span className="ml-1 font-light">{data.contractId}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex text-center w-full gap-2 text-white">
            <div className="border border-[#727288] rounded-md px-2">
              <div className="text-xs text-[#727288] fw-bolder">Thể loại</div>
              <div>{data.category}</div>
            </div>
            <div className="border border-[#727288] rounded-md px-2">
              <div className="text-xs text-[#727288] fw-bolder">Định dạng</div>
              <div className="capitalize">{data.format}</div>
            </div>
            <div className="border border-[#727288] rounded-md px-2">
              <div className="text-xs text-[#727288] fw-bolder">Thời lượng</div>
              <div>{formatTime(data.duration)}</div>
            </div>
          </div>

          <div>
            <EditOutlined className="text-2xl text-[#FF7506]" />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4 w-full">
        {data.data.map((d, i) => (
          <div
            className={`${i >= pageSize * (currentPage - 1) && i < currentPage * pageSize ? 'block' : 'hidden'}`}
          >
            <ConfigProvider theme={{}}>
              <Card
                bordered={false}
                className="bg-[#393955B2]"
                cover={
                  <div className="relative cursor-pointer">
                    <div className="absolute flex items-center justify-center inset-0">
                      <PlayCircleFilled className="text-[40px] bg-black text-[#fff] opacity-50  rounded-[42px] border-none" />
                    </div>
                    {d.photoUrl ? (
                      <>
                        <img alt="example" src={d.photoUrl} />
                      </>
                    ) : (
                      <>
                        <div className="h-[209px] bg-black ratio-16x9">
                          <div className="flex items-center justify-center h-full text-8xl fw-bolder text-white">
                            {d.name[0]}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                }
              >
                <Meta
                  style={{ color: '#fff' }}
                  title={<div className="text-white text-base fw-bold">{d.name}</div>}
                  description={descriptionHtml(d)}
                />
              </Card>
            </ConfigProvider>
          </div>
        ))}
      </div>
      <Pagination
        total={data.data.length}
        setCurrent={setCurrentPage}
        setPageSize={onChangePageSize}
        pageSize={pageSize}
      />
    </>
  );
};

export default RecordGridList;
