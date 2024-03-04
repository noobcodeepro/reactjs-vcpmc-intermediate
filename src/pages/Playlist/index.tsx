import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../contexts/store';
import { useEffect } from 'react';
import { Playlist as PlaylistType, getPlaylists } from '../../contexts/Playlist/playlist.slice';
import { Link, useNavigate } from 'react-router-dom';
import Table from './../../components/Table/index';
import { TableProps, Tag } from 'antd';
import convertSecondsToHMS from '../../utils/convertSecondsToHMS';
import { getDateString } from '../../utils/getDateString';

interface ExtendPlaylist extends PlaylistType {
  key: string;
  index: number;
}

type ColumnsType<T extends object> = TableProps<T>['columns'];

const columns: ColumnsType<ExtendPlaylist> = [
  {
    title: 'STT',
    dataIndex: 'index',
    key: 'index',
    align: 'right',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Tiêu đề',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Số bản ghi',
    dataIndex: 'count',
    key: 'count',
  },
  {
    title: 'Thời lượng',
    key: 'duration',
    dataIndex: 'duration',
    render: (time: number) => <span>{convertSecondsToHMS(time)}</span>,
  },

  {
    title: 'Chủ đề',
    key: 'topics',
    dataIndex: 'topics',
    render: (topics: Array<string>) => {
      let mapTopics: Array<string> = [];
      if (topics) {
        mapTopics = topics;
        console.log(mapTopics);
      } else {
        console.log('Eror');
      }
      return (
        <>
          {mapTopics.map(t => (
            <Tag className="bg-transparent text-white">{t}</Tag>
          ))}
        </>
      );
    },
  },
  {
    title: 'Ngày tạo',
    key: 'createAt',
    dataIndex: 'createAt',
    render: (time: number) => <span>{getDateString(time)}</span>,
  },
  {
    title: 'Người tạo',
    key: 'createBy',
    dataIndex: 'createBy',
    render: createBy => <span>{createBy}</span>,
  },
  {
    title: '',
    key: 'id',
    dataIndex: 'id',
    render: (id: string) => (
      <Link className="text-[#FF7506] text-xs underline" to={`/playlist/d/${id}`}>
        Chi tiết
      </Link>
    ),
  },
];

const Playlist = () => {
  const dispatch = useAppDispatch();
  const playlists = useSelector((state: RootState) => state.playlist.playlists) || [];

  const data: Array<ExtendPlaylist> = playlists.map((p, i) => ({
    index: i + 1,
    key: p.id,
    ...p,
  }));
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getPlaylists())
      .unwrap()
      .then(res => console.log(res));
  }, [dispatch]);

  return (
    <>
      <div className="w-[517px] px-6 py-3 left-[229px] top-[158px] absolute bg-slate-800 rounded-lg justify-between items-center inline-flex">
        <div className="text-center text-gray-500 text-base font-normal font-['Montserrat'] leading-normal">
          Tên chủ đề, người tạo,...
        </div>
        <div className="w-6 h-6 relative" />
      </div>
      <div className="left-[229px] top-[86px] absolute text-white text-4xl font-bold font-['Montserrat'] leading-[48px]">
        Playlist
      </div>
      <div className="h-[772px] px-6 py-4 left-[229px] right-[200px] top-[230px] absolute bg-slate-800 bg-opacity-70 rounded-2xl flex-col justify-start items-start gap-14 inline-flex">
        <Table columns={columns} dataSource={data} />
      </div>
      <div className="w-8 h-8 left-[1690px] top-[174px] absolute">
        <div className="w-8 h-8 left-0 top-0 absolute" />
      </div>
      <div className="w-8 h-8 left-[1738px] top-[174px] absolute">
        <div className="w-8 h-8 left-0 top-0 absolute" />
      </div>
      <div className="right-[0px] top-[158px] absolute flex-col justify-start items-start inline-flex">
        <div
          onClick={() => navigate('/playlist/add')}
          className="h-[130px] p-4 bg-slate-800 rounded-tl-2xl rounded-bl-2xl flex-col justify-center items-center gap-2.5 flex"
        >
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex">
            <div className="w-8 h-8 relative" />
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Thêm
            <br />
            Playlist
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlist;
