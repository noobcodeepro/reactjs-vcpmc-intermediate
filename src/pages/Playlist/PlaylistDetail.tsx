import { Breadcrumb, Button, Divider, TableProps, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../contexts/store';
import {
  Playlist,
  deletePlaylist,
  getPlaylist,
  startEdit,
  updatePlaylist,
} from '../../contexts/Playlist/playlist.slice';
import convertSecondsToHMS from './../../utils/convertSecondsToHMS';
import {
  DeleteOutlined,
  EditOutlined,
  GlobalOutlined,
  RetweetOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import Table from '../../components/Table';
import { getRecords } from '../../contexts/Record/record.slice';
import { useSelector } from 'react-redux';
import { Record } from '../../types/record.type';

type ColumnsType<T extends object> = TableProps<T>['columns'];

export interface ExtendedRecord extends Record {
  key: string;
  index: number;
}

const PlaylistDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist>();
  const records = useSelector((state: RootState) => state.record.records);
  const filteredRecords = records.filter(r => currentPlaylist?.songs.includes(r.id));
  const data: ExtendedRecord[] = filteredRecords.map((record, index) => ({
    ...record,
    key: record.id,
    index: index + 1,
  }));

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
        <div className=" text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
          Chi tiết playlist
        </div>
      ),
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
      render: () => <Button className="border-none text-[#FF7506] text-xs underline">Nghe</Button>,
    },
    {
      title: '',
      key: 'id',
      dataIndex: 'id',
      render: (id: string, item) => {
        const newItem = item as Record;
        return (
          <Button
            className="border-none text-[#FF7506] text-xs underline"
            onClick={() => handleDeleteRecord(id)}
          >
            Gỡ
          </Button>
        );
      },
    },
  ];

  const handleDeleteRecord = (id: string) => {
    const newSongList = currentPlaylist?.songs.filter(s => s !== id);
    const deletedSong = records.find(r => r.id === id);

    if (currentPlaylist && deletedSong) {
      const duration = currentPlaylist?.duration - deletedSong?.duration;
      const count = currentPlaylist?.count - 1;

      if (newSongList) {
        const updatedPlaylist: Playlist = {
          ...currentPlaylist,
          songs: newSongList,
          duration: duration,
          count: count,
        };
        setCurrentPlaylist(updatedPlaylist);
        dispatch(
          updatePlaylist({
            item: updatedPlaylist,
            id: currentPlaylist.id,
          }),
        );
      }
    }
  };
  const handleStartEdit = () => {
    if (currentPlaylist) {
      dispatch(startEdit(currentPlaylist));
      navigate('/playlist/edit');
    }
  };

  const handleDelete = () => {
    if (currentPlaylist) {
      dispatch(deletePlaylist(currentPlaylist.id)).then(() => {
        navigate('/playlist');
      });
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getPlaylist(id))
        .unwrap()
        .then(res => {
          setCurrentPlaylist(res);
        });

      dispatch(getRecords());
    }
  }, []);

  console.log(currentPlaylist?.songs);

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
        {currentPlaylist?.title}
      </div>
      <div className="left-[90px] top-[190px] right-[100px] absolute text-base  font-['Montserrat'] leading-normal ">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-1  text-white">
            <div className="w-[274px] mx-auto flex items-center justify-center aspect-square bg-black">
              <div className="font-bold text-5xl">{currentPlaylist?.title[0]}</div>
            </div>
            <div className="my-4 font-bold text-2xl">{currentPlaylist?.title}</div>
            <Divider className="border" />
            <div className="flex justify-between">
              <div className="space-y-4">
                <div className="font-bold text-base leading-6">Người tạo:</div>
                <div className="font-bold text-base leading-6">Tổng số:</div>
                <div className="font-bold text-base leading-6">Tổng thời lượng:</div>
              </div>
              <div className="space-y-4">
                <div className="opacity-70">
                  {currentPlaylist?.createBy ? currentPlaylist.createBy : 'unknown'}
                </div>
                <div className="opacity-70">{currentPlaylist?.count} bản ghi</div>
                <div className="opacity-70">
                  {convertSecondsToHMS(currentPlaylist?.duration ? currentPlaylist.duration : 0)}
                </div>
              </div>
            </div>

            <Divider />

            <p>{currentPlaylist?.description}</p>

            <Divider />

            <div className="grid grid-cols-3">
              {currentPlaylist?.topics?.map(t => (
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <Tag
                    className="text-xs capitalize bg-transparent border-none text-[#727288]"
                    key={t}
                  >
                    {t}
                  </Tag>
                </div>
              ))}
            </div>

            <Divider />

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white opacity-80">
                <GlobalOutlined className="p-1" />
                <div>Hiển thị ở chế độ công khai</div>
              </div>
              <div className="flex items-center gap-2 text-white ">
                <div className="border border-red-500 rounded-full text-center flex items-center justify-center">
                  <SwapOutlined className="p-1 text-[#FF7506] " />
                </div>
                <div className="text-[#FF7506]">Phát ngẫu nhiên</div>
              </div>
              <div className="flex items-center gap-2 text-white ">
                <div className="border border-white rounded-full text-center flex items-center justify-center">
                  <RetweetOutlined className="p-1  " />
                </div>
                <div className="">Lặp lại</div>
              </div>
            </div>
          </div>
          <div className="col-span-5 bg-[#2F2F41B2] rounded-2xl w-[1392px]">
            <Table columns={selectedColumns} dataSource={data} />
            <div className="text-xs text-light text-white">
              <span className="text-red-500">* </span>
              <span className="opacity-30">là những trường thông tin bắt buộc</span>
            </div>
          </div>
        </div>
      </div>
      <div className="right-[0px] top-[250px] absolute flex-col justify-start items-start inline-flex rounded-bl-2xl">
        <div
          onClick={handleStartEdit}
          className="h-[130px] p-4 bg-slate-800 flex-col justify-center items-center gap-2.5 flex"
        >
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-center items-center gap-2.5 inline-flex">
            <div className="w-8 h-8 relative p-1.5">
              <EditOutlined className="text-[#FF7506] text-xl" />
            </div>
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Chỉnh sửa
          </div>
        </div>
        <div
          onClick={handleDelete}
          className="h-[130px] p-4 bg-slate-800   flex-col justify-center items-center gap-2.5 flex"
        >
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-center items-center gap-2.5 inline-flex">
            <div className="w-8 h-8 relative p-1.5">
              <DeleteOutlined className="text-[#FF7506] text-xl" />
            </div>
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Xóa
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;
