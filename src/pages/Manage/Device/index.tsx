import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IDevice,
  activeDevice,
  banDevices,
  deactiveDevice,
  deleteDevices,
  getDevices,
} from '../../../contexts/Manage/Device/Device.slice';
import { Checkbox, Select, TableProps } from 'antd';
import { getDateString } from './../../../utils/getDateString';
import { RootState, useAppDispatch } from '../../../contexts/store';
import { useSelector } from 'react-redux';
import Table from '../../../components/Table';
import {
  DeleteOutlined,
  LockOutlined,
  PlusOutlined,
  PoweroffOutlined,
  SearchOutlined,
} from '@ant-design/icons';

interface ExtendedDevice extends IDevice {
  key: string;
  index: number;
}

type ColumnsType<T extends object> = TableProps<T>['columns'];

const columns: ColumnsType<ExtendedDevice> = [
  {
    title: 'STT',
    dataIndex: 'index',
    key: 'index',
    align: 'right',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Tên thiết bị',
    dataIndex: 'nameDevice',
    key: 'nameDevice',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'state',
    key: 'state',
    render: (state: 'active' | 'in-active' | 'ban') => {
      let html = (
        <div className="flex items-center gap-2">
          {' '}
          <div className="w-2 h-2 rounded-full bg-green-500"></div>Đang kích hoạt | Đang hoạt động
        </div>
      );

      switch (state) {
        case 'in-active':
          html = (
            <div className="flex items-center gap-2">
              {' '}
              <div className="w-2 h-2 rounded-full bg-red-500"></div>Ngừng kích hoạt
            </div>
          );
          break;
        case 'ban':
          html = (
            <div className="flex items-center gap-2">
              {' '}
              <div className="w-2 h-2 rounded-full bg-red-500"></div>Đang bị khóa
            </div>
          );
          break;
        default:
          break;
      }
      return <>{html}</>;
    },
  },
  {
    title: 'Địa điểm',
    dataIndex: 'userAccount',
    key: 'userAccount',
    // align: 'left',
    // className: 'px-12',
    render: (userAccount: { username: string; password: string; address: string }) => (
      <div>{userAccount.address}</div>
    ),
  },
  {
    title: 'Hạn hợp đồng',
    key: 'expireDate',
    dataIndex: 'expireDate',
    render: (timestamp: number) => <div>{getDateString(timestamp)}</div>,
  },
  {
    title: 'MAC Address',
    key: 'macAddress',
    dataIndex: 'macAddress',
  },
  {
    title: 'Memory',
    key: 'id',
    dataIndex: 'id',
    render: () => <span>0.00GB/32GB</span>,
  },
];

const Device = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const devices = useSelector((state: RootState) => state.device.devices);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const filteredData: Array<ExtendedDevice> = devices.map((d, index) => ({
    ...d,
    index: index + 1,
    key: d.id,
  }));

  const handleActive = () => {
    const firstSelectedDevice = filteredData.find(f => selectedRowKeys[0] === f.id);

    if (firstSelectedDevice?.state === 'active') {
      dispatch(deactiveDevice({ idList: selectedRowKeys }));
    } else {
      dispatch(activeDevice({ idList: selectedRowKeys }));
    }
  };

  const handleDelete = () => {
    dispatch(deleteDevices({ idList: selectedRowKeys }));
  };

  const handleBan = () => {
    dispatch(banDevices({ idList: selectedRowKeys }));
  };
  const isActiveDevice = () => {
    const device = filteredData.find(f => selectedRowKeys[0] === f.id);

    return device?.state === 'active' ? true : false;
  };

  useEffect(() => {
    dispatch(getDevices());
  }, []);
  return (
    <>
      <div className="w-[665px] px-6 py-3 right-[120px] top-[158px] absolute bg-[#2B2B3F] rounded-lg justify-between items-center inline-flex">
        <div className="text-center text-gray-500 text-base font-normal font-['Montserrat'] leading-normal">
          Tìm thiết bị theo tên, SKU, địa điểm, địa chỉ Mac
        </div>
        <SearchOutlined className="w-6 h-6 relative text-white" />
      </div>
      <div className="h-[520px] left-[1810px] top-[158px] absolute flex-col justify-start items-start inline-flex">
        <div
          onClick={() => navigate('/manage/device/add')}
          className="h-[130px] p-4 bg-[#2B2B3F] rounded-tl-2xl flex-col justify-center items-center gap-2.5 flex"
        >
          <PlusOutlined className="p-4 text-[#FF7506] bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex"></PlusOutlined>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Thêm
            <br />
            thiết bị
          </div>
        </div>
        <div
          onClick={handleActive}
          className="self-stretch h-[130px] p-4 bg-[#2B2B3F] flex-col justify-center items-center gap-2.5 flex"
        >
          <PoweroffOutlined className="p-4 text-[#FF7506] bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex"></PoweroffOutlined>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            {isActiveDevice() ? (
              <>
                Ngừng <br />
                kích hoạt <br />
                thiết bị
              </>
            ) : (
              <>
                Kích hoạt <br />
                thiết bị
              </>
            )}
          </div>
        </div>
        <div
          onClick={handleBan}
          className="self-stretch h-[130px] p-4 bg-[#2B2B3F] flex-col justify-center items-center gap-2.5 flex"
        >
          <LockOutlined className="p-4 text-[#FF7506] bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex"></LockOutlined>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Khoá
            <br />
            thiết bị
          </div>
        </div>
        <div
          onClick={handleDelete}
          className="self-stretch h-[130px] p-4 bg-[#2B2B3F] rounded-bl-2xl flex-col justify-center items-center gap-2.5 flex"
        >
          <DeleteOutlined className="p-4 text-[#FF7506] bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex"></DeleteOutlined>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Xoá <br />
            thiết bị
          </div>
        </div>
      </div>
      <div className="left-[229px] top-[86px] absolute flex-col justify-start items-start inline-flex">
        <div className="text-neutral-200 text-4xl font-bold font-['Montserrat'] leading-[48px]">
          Danh sách thiết bị
        </div>
      </div>
      <Select
        placeholder={
          <div className="text-violet-50 text-base font-normal font-['Montserrat'] leading-normal">
            Chọn nhóm tài khoản
          </div>
        }
        className="w-[274px] h-10 left-[229px] top-[158px] absolute bg-zinc-800 rounded-lg border border-orange-500 justify-between items-center inline-flex"
      >
        <Select.Option value={0}>
          <div className="text-violet-50 text-base font-normal font-['Montserrat'] leading-normal">
            Tất cả
          </div>
        </Select.Option>
        <Select.Option value={0}>
          <div className="text-violet-50 text-base font-normal font-['Montserrat'] leading-normal">
            Công ty TMCP Bách Hóa Xanh
          </div>
        </Select.Option>
      </Select>
      <Select
        placeholder={
          <div className="text-violet-50 text-base font-normal font-['Montserrat'] leading-normal">
            Ẩn hiện cột
          </div>
        }
        className="w-[230px] h-10 left-[527px] top-[158px] absolute bg-zinc-800 rounded-lg border border-orange-500 justify-between items-center inline-flex"
      >
        <Select.Option value={0} hidden>
          <div className="flex items-center gap-2">
            <Checkbox />
            <div>MAC Address</div>
          </div>
        </Select.Option>
        <Select.Option>
          <div className="flex items-center gap-2">
            <Checkbox />
            <div>Memory</div>
          </div>
        </Select.Option>
        <Select.Option>
          <div className="flex items-center gap-2">
            <Checkbox />
            <div>SKU/ID</div>
          </div>
        </Select.Option>
        <Select.Option>
          <div className="flex items-center gap-2">
            <Checkbox />
            <div>Hạn bảo hành</div>
          </div>
        </Select.Option>
        <Select.Option>
          <div className="flex items-center gap-2">
            <Checkbox />
            <div>Tên đăng nhập</div>
          </div>
        </Select.Option>
        <Select.Option>
          <div className="flex items-center gap-2">
            <Checkbox />
            <div>Trạng thái</div>
          </div>
        </Select.Option>
        <Select.Option>
          <div className="flex items-center gap-2">
            <Checkbox />
            <div>Địa điểm</div>
          </div>
        </Select.Option>
        <Select.Option>
          <div className="flex items-center gap-2">
            <Checkbox />
            <div>Hợp đồng</div>
          </div>
        </Select.Option>
      </Select>

      <div className="left-[229px] right-[120px] top-[230px] absolute">
        <Table
          onRow={item => {
            return {
              onClick: () => {
                navigate(`/manage/device/${item.id}`);
              },
            };
          }}
          rowSelection={rowSelection}
          dataSource={filteredData}
          columns={columns}
        />
      </div>
    </>
  );
};

export default Device;
