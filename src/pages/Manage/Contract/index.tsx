import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Input, Select, TableProps } from 'antd';
import { useEffect } from 'react';
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
// import BreadCrumb from '../../../components/BreadCrumb';

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
    render: (time: number) => <CheckExpired timestamp={time} />,
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

const Contract = () => {
  const dispatch = useAppDispatch();
  const contract = useSelector((state: RootState) => state.authorizedContract.authorizedContract);
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
      <div className="w-[501px] left-[1261px] top-[250px] absolute bg-slate-800 rounded-lg justify-between items-center inline-flex">
        <Input
          type="text"
          className="px-6 py-3 text-white bg-transparent focus:bg-transparent hover:bg-transparent placeholder:text-[#727288] border-none focus:ring-0 h-full text-base font-normal font-['Montserrat'] leading-normal"
          placeholder="Tên hợp đồng, số hợp đồng, người uỷ quyền..."
        />
        <div className="p-3 text-white">
          <SearchOutlined style={{ fontSize: '16px' }} />
        </div>
      </div>

      <div className="h-[727px]  left-[229px] top-[322px] absolute rounded-2xl flex-col inline-flex">
        {/* <div className="self-stretch justify-start items-start inline-flex">
          <div className="w-[99px] flex-col justify-center items-start inline-flex">
            <div className="self-stretch h-12 pl-2 py-2 justify-start items-start gap-2 inline-flex">
              <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                STT
              </div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
              <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                1
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
              <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                2
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
              <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                3
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
              <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                4
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
              <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                5
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
              <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                6
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
              <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                7
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
              <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                8
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[50px] pt-[15px] opacity-80 flex-col justify-center items-start gap-[15px] flex">
              <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                9
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
              <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                10
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
              <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                11
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-8 pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
              <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                13
              </div>
            </div>
          </div>
          <div className="w-[158px] flex-col justify-start items-start inline-flex">
            <div className="self-stretch h-12 pr-2 py-2 justify-start items-start gap-2 inline-flex">
              <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                Số hợp đồng
              </div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="w-[94px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                HD123
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="w-[94px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                YQ14145145
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="w-[94px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                UH1563167
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="w-[94px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                TH2156355
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="w-[94px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                DG639148
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="w-[94px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                FG638149
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="w-[94px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                HJ256203
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="w-[94px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                DG253321
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[50px] pt-[15px] opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="w-[69px] h-5 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                HH141654
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="w-[94px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                JD1466521
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="w-[94px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                JH1567587
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-8 pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="w-[94px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                SG1562100
              </div>
            </div>
          </div>
          <div className="w-[309px] flex-col justify-start items-start inline-flex">
            <div className="h-12 py-2 justify-start items-start gap-2 inline-flex">
              <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                Tên hợp đồng
              </div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Hợp đồng uỷ quyền bài hát
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Hợp đồng uỷ quyền bài hát
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Hợp đồng uỷ quyền bài hát
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Hợp đồng uỷ quyền bài hát
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Hợp đồng uỷ quyền bài hát
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Hợp đồng uỷ quyền bài hát
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Hợp đồng uỷ quyền bài hát
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Hợp đồng uỷ quyền bài hát
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[50px] pt-[15px] opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Hợp đồng uỷ quyền bài hát
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Hợp đồng uỷ quyền bài hát
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Hợp đồng uỷ quyền bài hát
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[30px] pt-2.5 opacity-80 flex-col justify-start items-start gap-[13px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Hợp đồng uỷ quyền bài hát
              </div>
            </div>
          </div>
          <div className="w-[219px] flex-col justify-start items-start inline-flex">
            <div className="h-12 py-2 justify-start items-start gap-2 inline-flex">
              <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                Người uỷ quyền
              </div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Vương Anh Tú
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Khác Hưng
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Châu Đăng Khoa
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Phan Mạnh Quỳnh
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Karik
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Binz
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                JustaTee
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Đen Vâu
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[50px] pt-[15px] opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                RPT MCK
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Chillies
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Cá Hồi Hoang
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-8 pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Mai Deadline
              </div>
            </div>
          </div>
          <div className="w-[207px] flex-col justify-start items-start inline-flex">
            <div className="h-12 pr-2 py-2 justify-start items-start gap-2 inline-flex">
              <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                Quyền sở hữu
              </div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Người biểu diễn
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Người biểu diễn
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Người biểu diễn
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Nhà sản xuất
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Người biểu diễn
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Người biểu diễn
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Người biểu diễn
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Nhà sản xuất
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[50px] pt-1 opacity-80 flex-col justify-start items-start gap-1.5 flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Người biểu diễn
                <br />
                Nhà sản xuất
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Người biểu diễn
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Người biểu diễn
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-8 pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Người biểu diễn
              </div>
            </div>
          </div>
          <div className="w-[159px] flex-col justify-start items-start inline-flex">
            <div className="h-12 py-2 justify-start items-start gap-2 inline-flex">
              <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                Hiệu lực hợp đồng
              </div>
            </div>
            <div className="self-stretch h-[47px] pt-3 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Còn thời hạn
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Còn thời hạn
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Còn thời hạn
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Còn thời hạn
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Còn thời hạn
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Còn thời hạn
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Còn thời hạn
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Còn thời hạn
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[50px] pt-[15px] flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Còn thời hạn
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Đã huỷ
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Đã huỷ
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-8 pt-3 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Đã huỷ
                </div>
              </div>
            </div>
          </div>
          <div className="w-[152px] flex-col justify-start items-start inline-flex">
            <div className="h-12 pr-2 py-2 justify-start items-start gap-2 inline-flex">
              <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                Ngày tạo
              </div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                01/04/2021 15:53:13
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                12/03/2021 15:53:13
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                14/03/2021 15:53:13
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                01/03/2021 15:51:05
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                01/02/2021 13:13:13
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                01/01/2021 15:53:13
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                01/12/2020 15:53:13
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                01/11/2020 15:53:13
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[50px] pt-[15px] opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                16/10/2020 15:53:13
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                30/09/2020 15:53:13
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                20/09/2020 15:53:13
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-8 pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                01/02/2020 15:53:13
              </div>
            </div>
          </div>
          <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
            <div className="h-12 p-2 justify-start items-start gap-2 inline-flex" />
            <div className="self-stretch h-[47px] pt-[5px] opacity-80 flex-col justify-center items-start gap-2 flex">
              <div className="px-4 py-[5px] rounded justify-center items-center gap-1 inline-flex">
                <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                  Xem chi tiết
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[5px] opacity-80 flex-col justify-center items-start gap-2 flex">
              <div className="px-4 py-[5px] rounded justify-center items-center gap-1 inline-flex">
                <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                  Xem chi tiết
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[5px] opacity-80 flex-col justify-center items-start gap-2 flex">
              <div className="px-4 py-[5px] rounded justify-center items-center gap-1 inline-flex">
                <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                  Xem chi tiết
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[5px] opacity-80 flex-col justify-center items-start gap-2 flex">
              <div className="px-4 py-[5px] rounded justify-center items-center gap-1 inline-flex">
                <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                  Xem chi tiết
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[5px] opacity-80 flex-col justify-center items-start gap-2 flex">
              <div className="px-4 py-[5px] rounded justify-center items-center gap-1 inline-flex">
                <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                  Xem chi tiết
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[5px] opacity-80 flex-col justify-center items-start gap-2 flex">
              <div className="px-4 py-[5px] rounded justify-center items-center gap-1 inline-flex">
                <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                  Xem chi tiết
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[5px] opacity-80 flex-col justify-center items-start gap-2 flex">
              <div className="px-4 py-[5px] rounded justify-center items-center gap-1 inline-flex">
                <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                  Xem chi tiết
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[5px] opacity-80 flex-col justify-center items-start gap-2 flex">
              <div className="px-4 py-[5px] rounded justify-center items-center gap-1 inline-flex">
                <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                  Xem chi tiết
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[50px] pt-2 opacity-80 flex-col justify-center items-start gap-2 flex">
              <div className="px-4 py-[5px] rounded justify-center items-center gap-1 inline-flex">
                <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                  Xem chi tiết
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[5px] opacity-80 flex-col justify-center items-start gap-2 flex">
              <div className="justify-start items-start inline-flex">
                <div className="h-[34px] px-4 py-[5px] rounded justify-center items-center gap-1 flex">
                  <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                    Xem chi tiết
                  </div>
                </div>
                <div className="h-[34px] px-4 py-[5px] rounded justify-center items-center gap-1 flex">
                  <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                    Lý do hủy
                  </div>
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[5px] opacity-80 flex-col justify-center items-start gap-2 flex">
              <div className="justify-start items-start inline-flex">
                <div className="h-[34px] px-4 py-[5px] rounded justify-center items-center gap-1 flex">
                  <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                    Xem chi tiết
                  </div>
                </div>
                <div className="h-[34px] px-4 py-[5px] rounded justify-center items-center gap-1 flex">
                  <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                    Lý do hủy
                  </div>
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[39px] pt-[5px] opacity-80 flex-col justify-center items-start gap-2 flex">
              <div className="justify-start items-start inline-flex">
                <div className="h-[34px] px-4 py-[5px] rounded justify-center items-center gap-1 flex">
                  <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                    Xem chi tiết
                  </div>
                </div>
                <div className="h-[34px] px-4 py-[5px] rounded justify-center items-center gap-1 flex">
                  <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                    Lý do hủy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <Table columns={columns} dataSource={data} />
      </div>
      <div className="left-[229px] top-[186px] absolute rounded-3xl border border-orange-500 justify-start items-center inline-flex">
        <div className="px-6 py-2 bg-amber-700 rounded-3xl justify-start items-start gap-2.5 flex">
          <div className="text-center text-white text-base font-semibold font-['Montserrat'] leading-normal">
            Hợp đồng uỷ quyền
          </div>
        </div>
        <div className="px-6 py-2 rounded-3xl justify-start items-start gap-2.5 flex">
          <div className="opacity-70 text-center text-white text-base font-normal font-['Montserrat'] leading-normal">
            Hợp đồng khai thác
          </div>
        </div>
      </div>
      <div className="left-[229px] top-[114px] absolute text-white text-4xl font-bold font-['Montserrat'] leading-[48px]">
        Danh sách hợp đồng
      </div>

      <div className="left-[1810px] top-[250px] absolute flex-col justify-start items-start inline-flex">
        <Link
          to={'/manage/contract/authorization-contract/add'}
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
    </>
  );
};

export default Contract;
