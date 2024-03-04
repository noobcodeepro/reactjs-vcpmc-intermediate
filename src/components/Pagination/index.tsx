import React from 'react';
import { Pagination as AntdPagination, ConfigProvider, Input } from 'antd';
import { parseToInt } from '../../utils/parseToInt';
import './pagination.css';

const Pagination = ({
  pageSize,
  total,
  setCurrent,
  setPageSize,
}: {
  pageSize: number;
  total: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: (ps: number) => void;
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemActiveBg: '#FF750680',
          },
        },
      }}
    >
      <div className="w-full mx-auto justify-between items-start inline-flex py-3">
        <div className="justify-start items-center gap-2 flex">
          <div className="w-[58.45px] opacity-70 text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
            Hiển thị{' '}
          </div>
          <div className="w-16">
            <Input
              value={pageSize}
              onChange={e => setPageSize(parseToInt(e.target.value))}
              className="outlined block w-full text-center text-black text-base font-normal font-montserrat leading-tight"
            />
          </div>

          <div className="opacity-70 text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
            hàng trong mỗi trang
          </div>
        </div>

        <AntdPagination
          pageSize={pageSize}
          total={total}
          showQuickJumper
          onChange={(page, pageSize) => {
            setPageSize(pageSize);
            setCurrent(page);
          }}
        ></AntdPagination>
      </div>
    </ConfigProvider>
  );
};

export default Pagination;
