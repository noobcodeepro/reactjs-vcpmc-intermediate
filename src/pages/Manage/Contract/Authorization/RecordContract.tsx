import { Input, Select, TableProps } from 'antd';
import React, { useEffect } from 'react';
import { CheckExpired } from '../../../../components/CheckExpired';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import Table from '../../../../components/Table';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../contexts/store';
import { Record } from '../../../../types/record.type';
import { getRecords } from '../../../../contexts/Record/record.slice';
import { getDateString } from '../../../../utils/getDateString';

type ColumnsType<T extends object> = TableProps<T>['columns'];

interface ExtendedRecord extends Record {
  key: string;
  index: number;
}

const columns: ColumnsType<ExtendedRecord> = [
  {
    title: 'STT',
    dataIndex: 'index',
    key: 'index',
    align: 'right',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Tên bản ghi',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Mã ISRC',
    dataIndex: 'isrc_id',
    key: 'isrc_id',
  },

  {
    title: ' Ca sĩ',
    key: 'singer',
    dataIndex: 'singer',
    render: (singer: string) => <span>{singer}</span>,
  },
  {
    title: 'Tác giả',
    key: 'author',
    dataIndex: 'author',
    render: (author: string) => <span>{author}</span>,
  },
  {
    title: 'Ngày tải',
    key: 'createAt',
    dataIndex: 'createAt',
    render: (timespan: number) => <span className="capitalize">{getDateString(timespan)}</span>,
  },
  {
    title: 'Tình trạng',
    key: 'approvedAt',
    dataIndex: 'approvedAt',
    render: (time: number) => <CheckExpired timestamp={time} />,
  },
  {
    title: '',
    key: 'id',
    dataIndex: 'id',
    render: (id: string) => (
      <Link className="text-[#FF7506] text-xs underline" to={`record/l/${id}`}>
        Nghe
      </Link>
    ),
  },
];

const loadingColumn: ColumnsType<{ text: string }> = [
  {
    key: 'loading',
    title: '',
    dataIndex: 'text',
    className: 'text-center w-full',
    colSpan: 11,
    render: (load: string) => {
      return <div className="text-center">{load}</div>;
    },
  },
];

const RecordContract = ({ contractId = '' }: { contractId: string }) => {
  const dispatch = useAppDispatch();
  const records = useSelector((state: RootState) => state.record.records);
  const recordsExtended: ExtendedRecord[] = records.map((record, index) => ({
    ...record,
    key: record.id,
    index: index + 1,
  }));
  const data = recordsExtended.filter(r => r.contractId == contractId);
  useEffect(() => {
    const fetchData = () => {
      dispatch(getRecords());
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className="w-[501px] right-[120px] top-[250px] absolute bg-slate-800 rounded-lg justify-between items-center inline-flex">
        <Input
          type="text"
          className="px-6 py-3 text-white bg-transparent focus:bg-transparent hover:bg-transparent placeholder:text-[#727288] border-none focus:ring-0 h-full text-base font-normal font-['Montserrat'] leading-normal"
          placeholder="Tìm bản ghi, tên ca sĩ, tác giả..."
        />
        <div className="p-3 text-white">
          <SearchOutlined style={{ fontSize: '16px' }} />
        </div>
      </div>

      <div className="left-[90px] top-[266px] absolute flex items-center justify-center gap-4 text-white text-base font-semibold font-['Montserrat'] leading-normal">
        <div>Tình trạng phê duyệt:</div>
        <Select
          defaultValue={-2}
          options={[
            { value: -2, label: 'Tất cả' },
            { value: -1, label: 'Mới' },
            { value: 0, label: 'Đã phê duyệt' },
            { value: 1, label: 'Từ chối' },
          ]}
          className="w-[160px] h-10  ring-0 bg-zinc-800 text-violet-50 rounded-lg justify-between items-center inline-flex"
        />
      </div>

      <div className="right-[120px] left-[90px] top-[315px] absolute bg-[#2B2B3F] bg-opacity-70 rounded-2xl flex-col justify-between items-start inline-flex">
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default RecordContract;
