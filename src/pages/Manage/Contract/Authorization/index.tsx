import { SearchOutlined } from '@ant-design/icons';
import { Input, Select, TableProps } from 'antd';
import React, { useEffect } from 'react';
import {
  IAuthorizeContract,
  getContracts,
} from '../../../../contexts/Manage/Contract/Authorize.slice';
import { CheckExpired } from '../../../../components/CheckExpired';
import { getDateString } from '../../../../utils/getDateString';
import { Link } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../../../contexts/store';
import { useSelector } from 'react-redux';
import Table from '../../../../components/Table';

interface ExtendedContract extends IAuthorizeContract {
  key: string;
  index: number;
}

type ColumnsType<T extends object> = TableProps<T>['columns'];

const columns: ColumnsType<ExtendedContract> = [
  {
    title: 'STT',
    dataIndex: 'index',
    key: 'index',
    align: 'right',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Số hợp đồng',
    dataIndex: 'contractId',
    key: 'contractId',
  },
  {
    title: 'Tên hợp đồng',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Người uỷ quyền',
    dataIndex: 'authorizer',
    key: 'authorizer',
    // align: 'left',
    // className: 'px-12',
    // render: (duration: string) => (
    //   <span className="block w-fit ml-auto mr-12">{formatTime(parseToInt(duration))}</span>
    // ),
  },
  {
    title: 'Quyền sở hữu',
    key: 'ownership',
    dataIndex: 'ownership',
    render: (ships: Array<number>) => (
      <div>
        {ships.map(ship => {
          switch (ship) {
            case 0:
              return 'Người biểu diễn';
              break;
            case 1:
              return 'Nhà sản xuất';
              break;
            default:
              return '';
          }
        })}
      </div>
    ),
  },
  {
    title: 'Hiệu lực hợp đồng',
    key: 'endDate',
    dataIndex: 'endDate',
    render: (time: number, contract) => (
      <CheckExpired timestamp={time} cancelReason={contract.cancelReason} />
    ),
  },
  {
    title: 'Ngày tạo',
    key: 'createAt',
    dataIndex: 'createAt',
    render: (time: number) => <span>{getDateString(time)}</span>,
  },
  {
    title: '',
    key: 'id',
    dataIndex: 'id',
    render: (id: string) => (
      <Link className="text-[#FF7506] text-xs underline" to={`/manage/contract/d/${id}`}>
        Xem chi tiết
      </Link>
    ),
  },
  {
    title: '',
    key: 'id',
    dataIndex: ['endDate'],
    render: (id: string, contract) => (
      <Link
        className={`text-[#FF7506] text-xs underline ${contract.cancelReason ? 'block' : 'hidden'}`}
        to={`contract/l/${id}`}
      >
        Lí do hủy
      </Link>
    ),
  },
];

const AuthorizeContract = () => {
  const dispatch = useAppDispatch();
  const contract = useSelector((state: RootState) => state.authorizedContract.authorizedContract);
  const data: Array<ExtendedContract> = contract.map((c, i) => ({
    index: i + 1,
    key: c.contractId,
    ...c,
  }));

  useEffect(() => {
    dispatch(getContracts());
  }, [dispatch]);
  return (
    <>
      <div className="w-[501px] right-[140px] top-[250px] absolute bg-[#2B2B3F] rounded-lg justify-between items-center inline-flex">
        <Input
          type="text"
          className="px-6 py-3 text-white bg-transparent focus:bg-transparent hover:bg-transparent placeholder:text-[#727288] border-none focus:ring-0 h-full text-base font-normal font-['Montserrat'] leading-normal"
          placeholder="Tên hợp đồng, số hợp đồng, người uỷ quyền..."
        />
        <div className="p-3 text-white">
          <SearchOutlined style={{ fontSize: '16px' }} />
        </div>
      </div>
      <Select
        defaultValue={-1}
        options={[
          { value: -1, label: 'Tất cả' },
          { value: 0, label: 'Người biểu diễn' },
          { value: 1, label: 'Nhà sản xuất' },
        ]}
        className="w-[160px] h-10 left-[363px] top-[258px] absolute ring-0 bg-zinc-800 text-violet-50 rounded-lg justify-between items-center inline-flex"
      />

      <div className="left-[229px] top-[266px] absolute text-white text-base font-semibold font-['Montserrat'] leading-normal">
        Quyền sở hữu:
      </div>
      <div className="left-[587px] top-[258px] absolute justify-start items-center gap-4 inline-flex">
        <div className="text-white text-base font-semibold font-['Montserrat'] leading-normal">
          Hiệu lực hợp đồng:
        </div>
        <Select
          defaultValue={0}
          options={[
            { value: 0, label: 'Tất cả' },
            { value: 1, label: 'Mới' },
            { value: 2, label: 'Còn thời hạn' },
            { value: 3, label: 'Hết hạn' },
            { value: -1, label: 'Hủy' },
          ]}
          className="w-[131px] h-10  ring-0 bg-zinc-800 text-violet-50 rounded-lg justify-between items-center inline-flex"
        />
      </div>
      <div className="h-[727px]  left-[229px] right-[140px] top-[322px] absolute rounded-2xl flex-col inline-flex">
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default AuthorizeContract;
