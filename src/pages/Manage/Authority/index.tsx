import React, { useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Switch, TableProps } from 'antd';
import { getDateString } from '../../../utils/getDateString';
import {
  IAuthority,
  activeAuthority,
  deactiveAuthority,
  getAuthority,
  getAuthorizedUnit,
  startEditAuthority,
} from '../../../contexts/Manage/Authority/Authority.slice';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../../contexts/store';
import { useSelector } from 'react-redux';
import Table from '../../../components/Table';

interface ExtendedAuthority extends IAuthority {
  key: string;
  index: number;
}

type ColumnsType<T extends object> = TableProps<T>['columns'];

const Authority = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorityList = useSelector((state: RootState) => state.authority.authorities);
  const filteredData: Array<ExtendedAuthority> = authorityList.map((a, index) => ({
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
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ngày hết hạn',
      key: 'expireDate',
      dataIndex: 'expireDate',
      render: (timestamp: number) => <div>{getDateString(timestamp)}</div>,
    },
    {
      title: 'Trạng thái',
      key: 'state',
      dataIndex: 'state',
      render: (state: string, item) => {
        return (
          <div className="flex gap-2 items-center">
            <Switch
              onChange={() => handleActive({ id: item.id, state: state })}
              checked={state === 'active'}
            ></Switch>
            {state === 'active' ? <>Đã kích hoạt</> : <>Ngừng kích hoạt</>}
          </div>
        );
      },
    },
    {
      title: '',
      key: 'id',
      dataIndex: 'id',
      render: (id: string) => (
        <Button
          onClick={() => handleStartUpdate(id)}
          className={`text-[#FF7506] text-xs underline border-none`}
        >
          Cập nhật
        </Button>
      ),
    },
  ];

  const handleStartUpdate = (id: string) => {
    dispatch(getAuthority(id))
      .unwrap()
      .then(res => {
        dispatch(startEditAuthority(res));
        navigate(`/manage/authority/u/${id}`);
      });
  };

  const handleActive = (props: { id: string; state: string }) => {
    if (props.state === 'active') {
      dispatch(deactiveAuthority({ id: props.id }));
    } else {
      dispatch(activeAuthority({ id: props.id }));
    }
  };

  useEffect(() => {
    dispatch(getAuthorizedUnit());
  }, [dispatch]);

  const breadCrumbItems = [
    {
      title: (
        <Link to={'/manage/authority'}>
          <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
            Quản lý
          </div>
        </Link>
      ),
    },
    {
      title: (
        <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
          Đối tác ủy quyền
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
      <div className="left-[229px] top-[116px] absolute flex-col justify-start items-start inline-flex">
        <div className="text-neutral-200 text-4xl font-bold font-['Montserrat'] leading-[48px]">
          Danh sách đối tác ủy quyền
        </div>
      </div>
      <div className="w-[665px] px-6 py-3 left-[229px] top-[186px] absolute bg-[#2B2B3F] rounded-lg justify-between items-center inline-flex">
        <div className="text-center text-gray-500 text-base font-normal font-['Montserrat'] leading-normal">
          Họ tên, tên đăng nhập, email...
        </div>
        <SearchOutlined className="w-6 h-6 relative text-white" />
      </div>
      <div className="h-[770px] px-6 py-4 left-[229px] right-[90px] top-[258px] absolute bg-[#2B2B3F] bg-opacity-70 rounded-2xl flex-col justify-start items-start gap-14 inline-flex">
        <Table dataSource={filteredData} columns={columns} />
      </div>
    </>
  );
};

export default Authority;
