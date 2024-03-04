import React, { useEffect } from 'react';
import { RootState, useAppDispatch } from '../../../../contexts/store';
import { useSelector } from 'react-redux';
import { IMiningContract, getContracts } from '../../../../contexts/Manage/Contract/Mining.slice';
import { Input, TableProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getDateString } from '../../../../utils/getDateString';
import { CheckExpired } from '../../../../components/CheckExpired';
import { Link } from 'react-router-dom';
import Table from '../../../../components/Table';

interface ExtendedContract extends IMiningContract {
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
    title: 'Khách hàng',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Ngày tạo',
    key: 'createAt',
    dataIndex: 'createAt',
    render: (time: number) => <span>{getDateString(time)}</span>,
  },

  {
    title: 'Ngày hiệu lực',
    key: 'startDate',
    dataIndex: 'startDate',
    render: (time: number) => <span>{getDateString(time)}</span>,
  },
  {
    title: 'Ngày hết hạn',
    key: 'endDate',
    dataIndex: 'endDate',
    render: (time: number) => <span>{getDateString(time)}</span>,
  },
  {
    title: 'Hiệu lực hợp đồng',
    key: 'createAt-effect',
    dataIndex: 'createAt',
    render: (time: number, contract) => (
      <CheckExpired timestamp={time} cancelReason={contract.cancelReason} />
    ),
  },
  {
    title: '',
    key: 'id',
    dataIndex: 'id',
    render: (id: string) => (
      <Link
        className="text-[#FF7506] text-xs underline"
        to={`/manage/contract/mining-contract/d/${id}`}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    title: '',
    key: 'id',
    dataIndex: 'id',
    render: (id: string) => (
      <Link
        className={`text-[#FF7506] text-xs underline`}
        to={`/manage/contract/mining-contract/c/${id}`}
      >
        Sao chép hợp đồng
      </Link>
    ),
  },
];

const MiningContract = () => {
  const dispatch = useAppDispatch();
  const contract = useSelector((state: RootState) => state.miningContract.miningContract);
  const data: Array<ExtendedContract> = contract.map((c, i) => ({
    index: i + 1,
    key: c.contractId,
    ...c,
  }));

  useEffect(() => {
    dispatch(getContracts())
      .unwrap()
      .then(res => {
        console.log(res);
      });
  }, [dispatch]);
  return (
    <>
      <div className="w-[418px] left-[229px] top-[250px] absolute bg-slate-800 rounded-lg justify-between items-center inline-flex">
        <Input
          type="text"
          className="px-6 py-3 text-white bg-transparent focus:bg-transparent hover:bg-transparent placeholder:text-[#727288] border-none focus:ring-0 h-full text-base font-normal font-['Montserrat'] leading-normal"
          placeholder="Tên hợp đồng, tác giả..."
        />
        <div className="p-3 text-white">
          <SearchOutlined style={{ fontSize: '16px' }} />
        </div>
      </div>

      <div className="h-[727px]  left-[229px] right-[140px] top-[322px] absolute rounded-2xl flex-col inline-flex">
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default MiningContract;
