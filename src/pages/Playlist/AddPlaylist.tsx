import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Divider,
  Form,
  Input,
  Select,
  SelectProps,
  Space,
  Switch,
  TableProps,
  Tag,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import { Record } from '../../types/record.type';
import { RootState, useAppDispatch } from '../../contexts/store';
import { useSelector } from 'react-redux';
import { getRecords } from '../../contexts/Record/record.slice';
import {
  Playlist,
  addPlaylist,
  clearWaiting,
  deleteAddedRecord,
  updatePlaylist,
} from '../../contexts/Playlist/playlist.slice';
import convertSecondsToHMS from '../../utils/convertSecondsToHMS';

type ColumnsType<T extends object> = TableProps<T>['columns'];

export interface ExtendedRecord extends Record {
  key: string;
  index: number;
}

const options: SelectProps['options'] = [
  {
    value: 'chill',
    label: 'Chill',
  },
  {
    value: 'lofi',
    label: 'Lofi',
  },
  {
    value: 'mashup',
    label: 'Mashup',
  },
  {
    value: 'trending',
    label: 'Trending',
  },
  {
    value: 'songs',
    label: 'Songs',
  },
  {
    value: 'dingga',
    label: 'Dingga',
  },
];

type TagRender = SelectProps['tagRender'];

const tagRender: TagRender = props => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={'white'}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      bordered
      closeIcon={<CloseOutlined style={{ color: 'red' }} />}
      style={{ marginRight: 3, backgroundColor: 'transparent', borderColor: 'whitesmoke' }}
    >
      {label}
    </Tag>
  );
};

const AddPlaylist = ({ editMode = false }: { editMode?: boolean }) => {
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUsername = useSelector((state: RootState) => state.auth.user?.displayName);
  const records = useSelector((state: RootState) => state.record.records) || [];
  const playlistDuration =
    useSelector((state: RootState) => state.playlist.waitingPlaylist.duration) || 0;
  const playlistCount =
    useSelector((state: RootState) => state.playlist.waitingPlaylist.count) || 0;
  const addedRecordsIds =
    useSelector((state: RootState) => state.playlist.waitingPlaylist.songs) || [];
  const addedRecords = records.filter(r => addedRecordsIds.includes(r.id));
  const addedData: ExtendedRecord[] = addedRecords.map((record, index) => ({
    ...record,
    key: record.id,
    index: index + 1,
  }));

  const waitingPlaylist = useSelector((state: RootState) => state.playlist.waitingPlaylist);

  const breadCrumbItems = !editMode
    ? [
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
            <Link to={`/playlist/d/${waitingPlaylist.id}`}>
              <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
                Chi tiết playlist
              </div>
            </Link>
          ),
        },
      ]
    : [
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
            <Link to={`/playlist/d/${waitingPlaylist.id}`}>
              <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
                Chi tiết playlist
              </div>
            </Link>
          ),
        },
        {
          title: (
            <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
              Chỉnh sửa
            </div>
          ),
        },
      ];

  useEffect(() => {
    if (!records) {
      dispatch(getRecords());
    }
  }, []);

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
      render: () => <Button className="text-[#FF7506] text-xs underline">Nghe</Button>,
    },
    {
      title: '',
      key: 'id',
      dataIndex: 'id',
      render: (id: string, item) => {
        const newItem = item as Record;
        return (
          <Button
            onClick={() => deleteRecord(newItem)}
            className="border-none text-[#FF7506] text-xs underline"
          >
            Gỡ
          </Button>
        );
      },
    },
  ];

  const deleteRecord = (item: Record) => {
    dispatch(deleteAddedRecord(item));
  };

  const onCancel = () => {
    dispatch(clearWaiting());
    navigate('/playlist');
  };

  const onFinish = () => {
    const data = form.getFieldsValue();
    const submitData: Omit<Playlist, 'id'> = {
      count: playlistCount,
      duration: playlistDuration,
      songs: addedRecordsIds,
      title: data.title,
      description: data.description,
      topics: data.topics,
      createAt: new Date().getTime(),
      createBy: currentUsername ? currentUsername : '',
    };

    if (submitData) {
      if (waitingPlaylist.id) {
        dispatch(updatePlaylist({ item: submitData, id: waitingPlaylist.id }));
      } else {
        dispatch(addPlaylist(submitData)).then(() => {
          alert('Add playlist thanh cong');
        });
      }
      navigate('/playlist');
    }
  };
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
        Thêm playlist
      </div>
      <div className="left-[90px] top-[190px] right-[100px] absolute text-base  font-['Montserrat'] leading-normal ">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-1  text-white">
            <Form onFinish={onFinish} form={form} layout="vertical">
              <Form.Item
                name={'title'}
                initialValue={waitingPlaylist.title}
                rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                label={
                  <div className="font-semibold text-base text-white">
                    Tiêu đề <span className="text-red-500">* </span>
                  </div>
                }
              >
                <Input />
              </Form.Item>

              <Divider />

              <div className="space-y-4">
                <div className="flex justify-between text-white">
                  <div className="font-semibold text-base ">Tổng số:</div>
                  <div className="font-light opacity-70 text-base">{playlistCount} bản ghi</div>
                </div>
                <div className="flex justify-between text-white">
                  <div className="font-semibold text-base ">Tổng thời lượng:</div>
                  <div className="font-light opacity-70 text-base">
                    {playlistDuration ? convertSecondsToHMS(playlistDuration) : '--:--:--'}
                  </div>
                </div>
              </div>

              <Divider />

              <Form.Item
                initialValue={waitingPlaylist.description}
                name={'description'}
                label={<div className="font-semibold text-base text-white">Mô tả:</div>}
              >
                <TextArea rows={4} />
              </Form.Item>

              <Divider />

              <Form.Item
                initialValue={waitingPlaylist.topics}
                name={'topics'}
                label={<div className="font-semibold text-base text-white">Chủ đề:</div>}
              >
                <Select
                  mode="multiple"
                  size={'large'}
                  tagRender={tagRender}
                  placeholder="Please select"
                  style={{ width: '100%' }}
                  options={options}
                />
              </Form.Item>

              <Space direction="horizontal" className="mt-4">
                <Form.Item name={'private'} initialValue={true} valuePropName="checked">
                  <Switch />
                </Form.Item>
                <span className="font-semibold text-base text-white">Chế độ công khai:</span>
              </Space>
            </Form>
          </div>
          <div className="col-span-5 bg-[#2F2F41B2] rounded-2xl w-[1392px]">
            <Table columns={selectedColumns} dataSource={addedData} />
            <div className="text-xs text-light text-white">
              <span className="text-red-500">* </span>
              <span className="opacity-30">là những trường thông tin bắt buộc</span>
            </div>
          </div>
        </div>
        <div className="my-10">
          <div className="mx-auto w-fit flex items-center gap-4">
            <Button
              onClick={onCancel}
              className="block text-[#FF7506]  w-[168px] px-6 py-3 h-[48px] text-base font-semibold leading-6 border border-[#FF7506] outline-none"
            >
              <div className="text-white">Hủy</div>
            </Button>

            <Button
              onClick={() => form.submit()}
              className="text-white bg-[#FF7506] w-[168px] px-6 py-3 h-[48px] text-base font-semibold leading-6 border-none outline-none"
            >
              <div className="">Lưu</div>
            </Button>
          </div>
        </div>
      </div>
      <div className="right-[0px] top-[250px] absolute flex-col justify-start items-start inline-flex">
        <Link
          to={'/playlist/record/add'}
          className="h-[130px] p-4 bg-[#2B2B3F] rounded-tl-2xl rounded-bl-2xl flex-col justify-center items-center gap-2.5 flex"
        >
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-center items-center gap-2.5 inline-flex">
            <div className="w-8 h-8 relative p-1.5">
              <PlusOutlined className="text-[#FF7506] text-xl" />
            </div>
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Thêm <br />
            bản ghi
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AddPlaylist;
