import { SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Input, Switch, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Table from '../../../components/Table';
import {
  IUsage,
  getUsageUnitDetail,
  getusageUnit,
} from '../../../contexts/Manage/Usage/Usage.slice';
import { getDateString } from '../../../utils/getDateString';
import { RootState, useAppDispatch } from '../../../contexts/store';
import { useSelector } from 'react-redux';
import {
  IAuthority,
  getReleventAuthority,
} from '../../../contexts/Manage/Authority/Authority.slice';

const breadCrumbItems = [
  {
    title: (
      <Link to={'/manage/usage'}>
        <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
          Quản lý
        </div>
      </Link>
    ),
  },
  {
    title: (
      <Link to={'/manage/usage'}>
        <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
          Đơn vị sử dụng
        </div>
      </Link>
    ),
  },
  {
    title: (
      <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
        Chi tiết
      </div>
    ),
  },
];

interface ExtendedUsage extends IUsage {
  key: string;
  index: number;
}

type ColumnsType<T extends object> = TableProps<T>['columns'];

const columns: ColumnsType<ExtendedUsage> = [
  {
    title: 'STT',
    dataIndex: 'index',
    key: 'index',
    align: 'right',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Tên tài khoản quản trị',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Số hợp đồng',
    dataIndex: 'contractId',
    key: 'contractId',
  },
  {
    title: 'Admin',
    dataIndex: 'admin',
    key: 'admin',
  },
  {
    title: 'Người dùng',
    dataIndex: 'userCount',
    key: 'userCount',
  },
  {
    title: 'Thiết bị được chỉ định',
    dataIndex: 'deviceCount',
    key: 'deviceCount',
  },
  {
    title: 'Ngày hết hạn',
    key: 'expireDate',
    dataIndex: 'expireDate',
    render: (timestamp: number) => <div>{getDateString(timestamp)}</div>,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'state',
    key: 'state',
    render: (state: 'active' | 'in-active') => {
      let html = <div className="flex items-center gap-2"> Đang kích hoạt</div>;

      switch (state) {
        case 'in-active':
          html = <div className="flex items-center gap-2"> Ngừng kích hoạt</div>;
          break;
        default:
          break;
      }
      return <>{html}</>;
    },
  },
  {
    title: '',
    key: 'id',
    dataIndex: 'id',
    render: (id: string) => (
      <Link to={`/manage/usage/d/${id}`} className={`text-[#FF7506] text-xs underline border-none`}>
        Xem chi tiết
      </Link>
    ),
  },
];

const UsageDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentUsage, setCurrentUsage] = useState<IUsage | null>(() => {
    if (id) {
      dispatch(getUsageUnitDetail(id))
        .unwrap()
        .then(res => {
          return res;
        });
    }

    return null;
  });
  const authorities = useSelector((state: RootState) => state.authority.authorities);

  interface ExtendedAuthority extends IAuthority {
    key: string;
    index: number;
  }

  const filteredData: Array<ExtendedAuthority> = authorities.map((a, index) => ({
    ...a,
    index: index + 1,
    key: a.id,
  }));
  const columns: ColumnsType<ExtendedAuthority> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      align: 'right',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Cập nhật lần cuối',
      dataIndex: 'id',
      key: 'lastupdated',
      render: () => <>21/04/2021</>,
    },
    {
      title: 'Trạng thái',
      key: 'state',
      dataIndex: 'state',
      render: (state: string, item) => {
        return (
          <div className="flex gap-2 items-center">
            {/* <Switch
              onChange={() => handleActive({ id: item.id, state: state })}
              checked={state === 'active'}
            ></Switch> */}
            {state === 'active' ? (
              <>
                <div className="w-2 h-2 rounded-full bg-green-500"></div> Đã kích hoạt
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-red-500"></div> Ngừng kích hoạt
              </>
            )}
          </div>
        );
      },
    },
    {
      title: '',
      key: 'id',
      dataIndex: 'id',
      render: (id: string) => (
        <Link
          to={`/manage/usage/authority/${id}`}
          className={`text-[#FF7506] text-xs underline border-none`}
        >
          Xem chi tiết
        </Link>
      ),
    },
  ];
  useEffect(() => {
    if (id) {
      dispatch(getReleventAuthority(id));
    }
  }, [dispatch, id, currentUsage?.authorityIds]);
  return (
    <>
      <div className="h-[770px] px-6 py-4 left-[80px] right-[120px] top-[258px] absolute bg-[#2B2B3F] bg-opacity-70 rounded-2xl flex-col justify-start items-start gap-14 inline-flex">
        <Table dataSource={filteredData} columns={columns} />
      </div>
      <div className="w-[665px] left-[80px]  top-[186px] absolute bg-[#2B2B3F] rounded-lg justify-between items-center inline-flex">
        <Input
          className=" placeholder:text-gray-500 text-base font-normal font-montserrat leading-normal"
          placeholder="Tên khoản giá trị, số hợp đồng,..."
        />
        <SearchOutlined className="w-6 h-6 text-white relative me-4" />
      </div>
      <div className="left-[80px] top-[86px] absolute flex-col justify-start items-start inline-flex">
        <div className="p-0.5 opacity-50 justify-start items-center gap-1 inline-flex">
          <Breadcrumb
            separator={
              <>
                <div className="text-white">{'>'}</div>
              </>
            }
            items={breadCrumbItems}
          />
        </div>
        <div className="text-neutral-200 text-4xl font-bold font-['Montserrat'] leading-[48px]">
          Danh sách đơn vị sử dụng
        </div>
      </div>
      <div className="left-[1810px] top-[186px] absolute flex-col justify-start items-start inline-flex">
        <div className="h-28 p-4 bg-[#2B2B3F] rounded-tl-2xl rounded-bl-2xl flex-col justify-center items-center gap-2.5 flex">
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex">
            <div className="w-8 h-8 relative" />
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Xóa
          </div>
        </div>
      </div>
    </>
  );
};

export default UsageDetail;
