import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Input, Select, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../../contexts/store';
import {
  IAuthorizeContract,
  getContracts,
} from '../../../contexts/Manage/Contract/Authorize.slice';
import { CheckExpired } from '../../../components/CheckExpired';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Table from '../../../components/Table';
import { getDateString } from '../../../utils/getDateString';
import AuthorizeContract from './Authorization';
import MiningContract from './Mining/index.tsx';

const Contract = ({ state = 'authorized' }: { state?: 'authorized' | 'mining' }) => {
  const [contractType, setContractType] = useState(state);

  const breadCrumbItems = [
    {
      title: (
        <Link to={'/contract'}>
          <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
            Quản lí
          </div>
        </Link>
      ),
    },
    {
      title: (
        <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
          Quản lí hợp đồng
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="p-0.5 left-[229px] top-[86px] absolute opacity-50 justify-start items-center gap-1 inline-flex">
        <Breadcrumb
          separator={
            <>
              <div className="text-white">{'>'}</div>
            </>
          }
          items={breadCrumbItems}
        />
      </div>

      {contractType === 'authorized' && <AuthorizeContract />}
      {contractType === 'mining' && <MiningContract />}
      <div className="left-[229px] top-[186px] absolute rounded-3xl border border-orange-500 justify-start items-center inline-flex">
        <div
          onClick={() => setContractType('authorized')}
          className={`px-6 py-2 ${contractType === 'authorized' ? 'bg-amber-700' : 'opacity-70'} rounded-3xl justify-start items-start gap-2.5 flex`}
        >
          <div className="text-center text-white text-base font-semibold font-['Montserrat'] leading-normal">
            Hợp đồng uỷ quyền
          </div>
        </div>
        <div
          className={`px-6 py-2 rounded-3xl justify-start items-start gap-2.5 flex ${contractType === 'mining' ? 'bg-amber-700' : ''}`}
          onClick={() => setContractType('mining')}
        >
          <div
            className={`${contractType === 'mining' ? '' : 'opacity-70'} text-center text-white text-base font-normal font-['Montserrat'] leading-normal`}
          >
            Hợp đồng khai thác
          </div>
        </div>
      </div>
      <div className="left-[229px] top-[114px] absolute text-white text-4xl font-bold font-['Montserrat'] leading-[48px]">
        Danh sách hợp đồng
      </div>

      <div className="left-[1810px] top-[250px] absolute flex-col justify-start items-start inline-flex">
        <Link
          to={`${contractType === 'authorized' ? '/manage/contract/authorization-contract/add' : '/manage/contract/mining-contract/add'}`}
          className="h-[130px] p-4 bg-slate-800 rounded-tl-2xl rounded-bl-2xl flex-col justify-center items-center gap-2.5 flex"
        >
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-center items-center gap-2.5 inline-flex">
            <div className="w-8 h-8 relative p-1.5">
              <PlusOutlined className="text-[#FF7506] text-xl" />
            </div>
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Thêm <br />
            hợp đồng
          </div>
        </Link>
      </div>
    </>
  );
};

export default Contract;
