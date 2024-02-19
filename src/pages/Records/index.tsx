import {
  AppstoreOutlined,
  EditOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../contexts/store';
import { getRecords } from '../../contexts/Record/record.slice';
import { useSelector } from 'react-redux';
import { Record } from '../../types/record.type';
import Table from '../../components/Table';
import { formatTime } from '../../utils/formatTime';
import { parseToInt } from '../../utils/parseToInt';
import { CheckExpired } from './../../components/CheckExpired/index';
import RecordGridList from './RecordGridList';
type ColumnsType<T extends object> = TableProps<T>['columns'];

export interface ExtendedRecord extends Record {
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
    title: 'Thời lượng',
    dataIndex: 'duration',
    key: 'duration',
    align: 'left',
    className: 'px-12',
    render: (duration: string) => (
      <span className="block w-fit ml-auto mr-12">{formatTime(parseToInt(duration))}</span>
    ),
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
    title: 'Thể loại',
    key: 'category',
    dataIndex: 'category',
    render: (category: string) => <span className="capitalize">{category}</span>,
  },
  {
    title: 'Định dạng',
    key: 'format',
    dataIndex: 'format',
    render: (format: string) => <span className="capitalize">{format}</span>,
  },
  {
    title: 'Thời hạn sử dụng',
    key: 'expireDate',
    dataIndex: 'expireDate',
    render: (time: number) => <CheckExpired timestamp={time} />,
  },
  {
    title: '',
    key: 'id',
    dataIndex: 'id',
    render: (id: string) => (
      <Link className="text-[#FF7506] text-xs underline" to={`record/u/${id}`}>
        Cập nhật
      </Link>
    ),
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

const Records = () => {
  const dispatch = useAppDispatch();
  const records = useSelector((state: RootState) => state.record.records) || [];
  const data: ExtendedRecord[] = records.map((record, index) => ({
    ...record,
    key: record.id,
    index: index + 1,
  }));
  const isLoading = useSelector((state: RootState) => state.record.isLoading);

  const [viewGrid, setViewGrid] = useState(false);
  useEffect(() => {
    dispatch(getRecords())
      .unwrap()
      .then(res => {
        console.log(res);
      });
  }, [dispatch]);

  // Example usage:

  return (
    <>
      <div className="w-[517px] left-[229px] top-[158px] absolute bg-slate-800 rounded-lg justify-between items-center inline-flex">
        <Input
          type="text"
          className="px-6 py-3 text-white bg-transparent focus:bg-transparent hover:bg-transparent placeholder:text-[#727288] border-none focus:ring-0 h-full text-base font-normal font-['Montserrat'] leading-normal"
          placeholder="Tên bản ghi, ca sĩ,..."
        />
        <div className="p-3 text-white">
          <SearchOutlined style={{ fontSize: '26px' }} />
        </div>
      </div>
      <div className="w-[1541px] left-[229px] top-[294px] absolute bg-[#2B2B3F] bg-opacity-70 rounded-2xl flex-col justify-between items-start inline-flex">
        {!viewGrid ? (
          <>
            {!isLoading && <Table columns={columns} dataSource={data} />}
            {isLoading && <Table columns={loadingColumn} dataSource={[{ text: 'Loading...' }]} />}
          </>
        ) : (
          <>
            <RecordGridList data={data} />
          </>
        )}
      </div>
      <div className="left-[229px] top-[86px] absolute text-white text-4xl font-bold font-['Montserrat'] leading-[48px]">
        Kho bản ghi
      </div>
      <Select
        defaultValue={'all'}
        options={[
          { value: 'all', label: 'Tất cả' },
          { value: 'pop', label: 'Pop' },
          { value: 'edm', label: 'EDM' },
          { value: 'ballad', label: 'Ballad' },
        ]}
        className="w-[131px] h-10 left-[313px] top-[230px] absolute ring-0 bg-zinc-800 text-violet-50 rounded-lg justify-between items-center inline-flex"
      />
      <Select
        defaultValue={'all'}
        options={[
          { value: 'all', label: 'Tất cả' },
          { value: 'audio', label: 'Âm thanh' },
          { value: 'video', label: 'Video' },
        ]}
        className="w-[131px] h-10  left-[615px] top-[230px] absolute bg-zinc-800 rounded-lg justify-between items-center inline-flex"
      />
      <Select
        defaultValue={'all'}
        options={[
          { value: 'all', label: 'Tất cả' },
          { value: 'not-expire', label: 'Còn thời hạn' },
          { value: 'expired', label: 'Hết thời hạn' },
        ]}
        className="w-[131px] h-10  left-[974px] top-[230px] absolute bg-zinc-800 rounded-lg justify-between items-center inline-flex"
      />

      <Select
        defaultValue={'all'}
        options={[
          { value: 'all', label: 'Tất cả' },
          { value: 'sort-by-user', label: 'Duyệt bởi người dùng' },
          { value: 'sort-auto', label: 'Duyệt tự động' },
        ]}
        className="w-[200px] h-10  left-[1273px] top-[230px] absolute bg-zinc-800 rounded-lg justify-between items-center inline-flex"
      />
      <div className="left-[229px] top-[238px] absolute text-white text-base font-semibold font-['Montserrat'] leading-normal">
        Thể loại:
      </div>
      <div className="left-[508px] top-[238px] absolute text-white text-base font-semibold font-['Montserrat'] leading-normal">
        Định dạng:
      </div>
      <div className="left-[810px] top-[238px] absolute text-white text-base font-semibold font-['Montserrat'] leading-normal">
        Thời hạn sử dụng:
      </div>
      <div className="left-[1169px] top-[238px] absolute text-white text-base font-semibold font-['Montserrat'] leading-normal">
        Trạng thái:
      </div>
      <div className="w-8 h-8 left-[1690px] top-[238px] absolute cursor-pointer">
        <div className="w-8 h-8 left-0 top-0 absolute" onClick={() => setViewGrid(prev => !prev)}>
          <UnorderedListOutlined
            style={{ fontSize: '30px', color: `${viewGrid ? '#C8C8DB' : '#FF7506'}` }}
          />
        </div>
      </div>
      <div className="w-8 h-8 left-[1738px] top-[238px] absolute cursor-pointer">
        <div className="w-8 h-8 left-0 top-0 absolute" onClick={() => setViewGrid(prev => !prev)}>
          <AppstoreOutlined
            style={{ fontSize: '30px', color: `${viewGrid ? '#FF7506' : '#C8C8DB'}` }}
          />
        </div>
      </div>
      <div className="left-[1810px] top-[222px] absolute flex-col justify-start items-start inline-flex">
        <div className="h-[130px] p-4 bg-slate-800 rounded-tl-2xl rounded-bl-2xl flex-col justify-center items-center gap-2.5 flex">
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex">
            <EditOutlined className="text-3xl w-8 h-8 relative text-[#FF7506]" />
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Quản lý
            <br />
            phê duyệt
          </div>
        </div>
      </div>

      {/*  */}
    </>
  );
};

export default Records;
