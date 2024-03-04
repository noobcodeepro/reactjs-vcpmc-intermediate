import { PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Flex,
  Input,
  Select,
  SelectProps,
  TableProps,
  Upload,
  UploadProps,
  message,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';
import { formatTime } from '../../utils/formatTime';
import { parseToInt } from '../../utils/parseToInt';
import { Record } from '../../types/record.type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../contexts/store';
import { addRecordToPlaylist, deleteAddedRecord } from '../../contexts/Playlist/playlist.slice';
import { getRecords } from '../../contexts/Record/record.slice';
import convertSecondsToHMS from '../../utils/convertSecondsToHMS';

const breadCrumbItems = [
  {
    title: (
      <Link to={'/playlist'}>
        <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
          Playlist
        </div>
      </Link>
    ),
  },
  {
    title: (
      <Link to={'/playlist/add'}>
        <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
          Thêm playlist mới
        </div>
      </Link>
    ),
  },
  {
    title: (
      <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
        Thêm bản ghi vào playlist
      </div>
    ),
  },
];
const props: UploadProps = {
  beforeUpload: file => {
    const isPNG = file.type === 'image/png';
    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  },
  onChange: info => {
    console.log(info.fileList);
  },
};

type ColumnsType<T extends object> = TableProps<T>['columns'];

export interface ExtendedRecord extends Record {
  key: string;
  index: number;
}

const AddRecordToPlayList = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(addRecordToPlaylist(id));
  }, []);
};

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

const handleChange = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
};

const AddRecord = () => {
  const [form] = useForm();
  const records = useSelector((state: RootState) => state.record.records) || [];

  const data: ExtendedRecord[] = records.map((record, index) => ({
    ...record,
    key: record.id,
    index: index + 1,
  }));

  const addedRecordsIds =
    useSelector((state: RootState) => state.playlist.waitingPlaylist.songs) || [];

  const playlistDuration =
    useSelector((state: RootState) => state.playlist.waitingPlaylist.duration) || 0;
  const playlistCount =
    useSelector((state: RootState) => state.playlist.waitingPlaylist.count) || 0;
  const addedRecords = records.filter(r => addedRecordsIds.includes(r.id));
  const addedData: ExtendedRecord[] = addedRecords.map((record, index) => ({
    ...record,
    key: record.id,
    index: index + 1,
  }));

  const dispatch = useAppDispatch();

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
      title: '',
      key: 'id',
      dataIndex: 'id',
      render: (id: string) => <Button className="text-[#FF7506] text-xs underline">Nghe</Button>,
    },
    {
      title: '',
      key: 'id',
      dataIndex: 'id',
      render: (id: string, item) => {
        const newData = item as Record;
        return (
          <Button
            onClick={() => addRecord(newData)}
            className="border-none text-[#FF7506] text-xs underline"
          >
            Thêm
          </Button>
        );
      },
    },
  ];

  const selectedColumns: ColumnsType<ExtendedRecord> = [
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
      title: '',
      key: 'id',
      dataIndex: 'id',
      render: (id: string) => <Button className="text-[#FF7506] text-xs underline">Nghe</Button>,
    },
    {
      title: '',
      key: 'id',
      dataIndex: 'id',
      render: (id: string, item) => {
        const newData = item as Record;
        return (
          <Button
            onClick={() => deleteRecord(newData)}
            className="border-none text-[#FF7506] text-xs underline"
          >
            Gỡ
          </Button>
        );
      },
    },
  ];
  const addRecord = (item: Record) => {
    dispatch(addRecordToPlaylist(item));
  };

  const deleteRecord = (item: Record) => {
    dispatch(deleteAddedRecord(item));
  };
  useEffect(() => {
    dispatch(getRecords());
  }, []);
  return (
    <div>
      <div className="p-0.5 left-[90px] top-[86px] absolute opacity-50 justify-start items-center gap-1 inline-flex">
        <Breadcrumb
          separator={
            <>
              <div className="text-white">{'>'}</div>
            </>
          }
          items={breadCrumbItems}
        />
      </div>

      <div className="left-[90px] top-[114px] absolute text-white text-4xl font-bold font-['Montserrat'] leading-[48px]">
        Thêm bản ghi
      </div>
      <div className="left-[90px] top-[190px] right-[100px] absolute text-base  font-['Montserrat'] leading-normal ">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[#2F2F41B2] p-4">
            <div className="font-semibold text-xl text-white mb-4">Kho bản ghi</div>
            <div className="flex text-white gap-16">
              <div className="flex items-center gap-4">
                <div className="text-[#AEAEAE] text-base">Thể loại</div>

                <Select className="w-[170px] h-[38px] text-white" defaultValue={'Tất cả'}>
                  <Select.Option>Tất cả </Select.Option>
                  <Select.Option>Video</Select.Option>
                  <Select.Option>Audio</Select.Option>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-[#AEAEAE] text-base">Playlist mẫu</div>
                <Select className="w-[170px] h-[38px] text-white" defaultValue={'Playlist 1'}>
                  <Select.Option>Playlist 1 </Select.Option>
                  <Select.Option>Playlist 2</Select.Option>
                  <Select.Option>Playlist 3</Select.Option>
                  <Select.Option>Playlist 4</Select.Option>
                </Select>
              </div>
            </div>

            <div className="w-[418px] bg-[#33334D] rounded-lg justify-between items-center inline-flex">
              <Input
                type="text"
                className="px-6 py-3 text-white  focus:bg-transparent hover:bg-transparent placeholder:text-[#727288] border-none focus:ring-0 h-full text-base font-normal font-['Montserrat'] leading-normal"
                placeholder="Tên bản ghi ca sĩ..."
              />
              <div className="p-3 text-white">
                <SearchOutlined style={{ fontSize: '16px' }} />
              </div>
            </div>

            <Table dataSource={data} columns={columns} />
          </div>
          <div className="rounded-2xl bg-[#2F2F41B2] p-4">
            <div className="font-semibold text-xl text-white mb-4">
              Danh sách bản ghi được thêm vào playlist
            </div>

            <div className="flex items-center gap-40">
              <div className="flex items-center gap-4 text-white">
                <div className="font-semibold text-base">Tổng số:</div>
                <div className="text-[#AEAEAE] text-base">{playlistCount} bản ghi</div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="font-semibold text-base">Tổng thời lượng:</div>
                <div className="text-[#AEAEAE] text-base">
                  {playlistDuration ? convertSecondsToHMS(playlistDuration) : '--:--:--'}
                </div>
              </div>
            </div>

            <div className="w-[418px] bg-[#33334D] rounded-lg justify-between items-center inline-flex">
              <Input
                type="text"
                className="px-6 py-3 text-white  focus:bg-transparent hover:bg-transparent placeholder:text-[#727288] border-none focus:ring-0 h-full text-base font-normal font-['Montserrat'] leading-normal"
                placeholder="Tên bản ghi ca sĩ..."
              />
              <div className="p-3 text-white">
                <SearchOutlined style={{ fontSize: '16px' }} />
              </div>
            </div>
            <Table dataSource={addedData} columns={selectedColumns} />
          </div>
        </div>

        <div className="my-10">
          <div className="mx-auto w-fit flex items-center gap-4">
            <Link to={'/playlist'}>
              <Button className="block text-[#FF7506]  w-[168px] px-6 py-3 h-[48px] text-base font-semibold leading-6 border border-[#FF7506] outline-none">
                <div className="text-white">Hủy</div>
              </Button>
            </Link>
            <Link to={'/playlist/add'}>
              <Button
                htmlType="submit"
                className="text-white bg-[#FF7506] w-[168px] px-6 py-3 h-[48px] text-base font-semibold leading-6 border-none outline-none"
              >
                <div className="">Lưu</div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecord;
