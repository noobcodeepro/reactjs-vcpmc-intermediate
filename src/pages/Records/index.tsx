import { AppstoreOutlined, SearchOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import Pagination from '../../components/Pagination';

const Records = () => {
  return (
    <>
      <div className="w-[517px] left-[229px] top-[158px] absolute bg-slate-800 rounded-lg justify-between items-center inline-flex">
        <Input
          type="text"
          className="px-6 py-3 text-white bg-transparent focus:bg-transparent hover:bg-transparent placeholder:text-[#727288] border-none focus:ring-0 h-full text-base font-normal font-['Montserrat'] leading-normal"
          placeholder="Tên bản ghi, ca sĩ,..."
        />
        <div className="p-3 text-white">
          <SearchOutlined style={{ fontSize: '26px' }} />
        </div>
      </div>
      <div className="w-[1541px] h-[722px] px-6 py-4 left-[229px] top-[294px] absolute bg-slate-800 bg-opacity-70 rounded-2xl flex-col justify-between items-start inline-flex">
        <table>
          <thead>
            <tr>
              <td className="w-16">
                <div className="h-12 pl-2 py-2 justify-start items-start gap-2 inline-flex">
                  <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                    STT
                  </div>
                </div>
              </td>

              <td className="w-[217px]">
                <div className="h-12 pt-2 justify-start items-start gap-2 inline-flex">
                  <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                    Tên bản ghi
                  </div>
                </div>
              </td>
              <td className="w-[130px]">
                <div className="h-12 pt-2 justify-start items-start gap-2 inline-flex">
                  <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                    Mã ISRC
                  </div>
                </div>
              </td>
              <td className="w-[136px]">
                <div className="h-12 pt-2 justify-start items-start gap-2 inline-flex">
                  <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                    Thời lượng
                  </div>
                </div>
              </td>
              <td className="w-[181px]">
                <div className="h-12 pt-2 justify-start items-start gap-2 inline-flex">
                  <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                    Ca sĩ
                  </div>
                </div>
              </td>
              <td className="w-[180px]">
                <div className="h-12 pt-2 justify-start items-start gap-2 inline-flex">
                  <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                    Tác giả
                  </div>
                </div>
              </td>
              <td className="w-[107px]">
                <div className="h-12 pt-2 justify-start items-start gap-2 inline-flex">
                  <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                    Thể loại
                  </div>
                </div>
              </td>
              <td className="w-[116px]">
                <div className="h-12 pt-2 justify-start items-start gap-2 inline-flex">
                  <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                    Định dạng
                  </div>
                </div>
              </td>
              <td className="w-[163px]">
                <div className="h-12 pt-2 justify-start items-start gap-2 inline-flex">
                  <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                    Thời hạn sử dụng
                  </div>
                </div>
              </td>
              <td className="w-[115px]"></td>
              <td className="w-auto"></td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <div className="pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
                  <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                    1
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
                  <div className="w-[93px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                    Mất em{' '}
                  </div>
                  <div className="self-stretch h-[0px] opacity-25 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
                  <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                    KRA40105463
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
                  <div className="w-[118px] text-center text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                    04:27
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
                  <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                    Phan Mạnh Quỳnh
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
                  <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                    Phan Mạnh Quỳnh
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
                  <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                    Ballad
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
                  <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                    Audio
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="self-stretch h-[47px] pt-1 opacity-80 flex-col justify-start items-start gap-1 flex">
                  <div className="w-[105px] h-[39px] relative">
                    <div className="w-[105px] h-5 left-0 top-0 absolute justify-center items-center gap-1 inline-flex">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                        Còn thời hạn
                      </div>
                    </div>
                    <div className="left-0 top-[21px] absolute opacity-50 text-white text-xs font-normal font-['Montserrat'] leading-[18px]">
                      02/10/2019
                    </div>
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="pt-1.5 opacity-80 flex-col justify-start items-start gap-[7px] flex">
                  <div className="px-4 py-[5px] rounded justify-center items-center gap-1 inline-flex">
                    <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                      Cập nhật
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="pt-1.5 opacity-80 flex-col justify-between items-start gap-[7px] flex">
                  <div className="px-4 py-[5px] rounded justify-center items-center gap-1 inline-flex">
                    <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                      Nghe
                    </div>
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
                  <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                    1
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
                  <div className="w-[93px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                    Ergonomic Fresh Chips
                  </div>
                  <div className="self-stretch h-[0px] opacity-25 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
                  <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                    KRA40105519
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
                  <div className="w-[118px] text-center text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                    16:18
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
                  <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                    Chillies
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
                  <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                    Chillies
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
                  <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                    Ballad
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
                  <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                    Audio
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="self-stretch h-[47px] pt-1 opacity-80 flex-col justify-start items-start gap-1 flex">
                  <div className="w-[92px] h-[39px] relative">
                    <div className="w-[92px] h-5 left-0 top-0 absolute justify-center items-center gap-1 inline-flex">
                      <div className="w-2 h-2 bg-zinc-500 rounded-full" />
                      <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                        Đã hết hạn
                      </div>
                    </div>
                    <div className="left-0 top-[21px] absolute opacity-50 text-white text-xs font-normal font-['Montserrat'] leading-[18px]">
                      07/10/2019
                    </div>
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
              <td>
                <div className="pt-1.5 opacity-80 flex-col justify-start items-start gap-[7px] flex">
                  <div className="px-4 py-[5px] rounded justify-center items-center gap-1 inline-flex">
                    <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                      Cập nhật
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className=" pt-1 opacity-80 flex-col justify-between items-start gap-[7px] flex">
                  <div className="px-4 py-[5px] rounded justify-center items-center gap-1 inline-flex">
                    <div className="text-center text-orange-500 text-xs font-semibold font-['Montserrat'] underline leading-normal">
                      Nghe
                    </div>
                  </div>
                  <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination />
      </div>
      <div className="left-[229px] top-[86px] absolute text-white text-4xl font-bold font-['Montserrat'] leading-[48px]">
        Kho bản ghi
      </div>
      <Select
        defaultValue={'all'}
        options={[
          { value: 'all', label: 'Tất cả' },
          { value: 'pop', label: 'Pop' },
          { value: 'edm', label: 'EDM' },
          { value: 'ballad', label: 'Ballad' },
        ]}
        className="w-[131px] h-10 left-[313px] top-[230px] absolute ring-0 bg-zinc-800 text-violet-50 rounded-lg justify-between items-center inline-flex"
      />
      <Select
        defaultValue={'all'}
        options={[
          { value: 'all', label: 'Tất cả' },
          { value: 'audio', label: 'Âm thanh' },
          { value: 'video', label: 'Video' },
        ]}
        className="w-[131px] h-10  left-[615px] top-[230px] absolute bg-zinc-800 rounded-lg justify-between items-center inline-flex"
      />

      <Select
        defaultValue={'all'}
        options={[
          { value: 'all', label: 'Tất cả' },
          { value: 'not-expire', label: 'Còn thời hạn' },
          { value: 'expired', label: 'Hết thời hạn' },
        ]}
        className="w-[131px] h-10  left-[974px] top-[230px] absolute bg-zinc-800 rounded-lg justify-between items-center inline-flex"
      />
      {/* <div className="w-[131px] h-10 pl-4 pr-3 py-3 left-[974px] top-[230px] absolute bg-zinc-800 rounded-lg border border-orange-500 justify-between items-center inline-flex">
        <div className="text-violet-50 text-base font-normal font-['Montserrat'] leading-normal">
          Tất cả
        </div>
        <div className="w-6 h-6 relative" />
      </div> */}
      {/* <div className="w-[200px] h-10 pl-4 pr-3 py-3 left-[1273px] top-[230px] absolute bg-zinc-800 rounded-lg border border-orange-500 justify-between items-center inline-flex">
        <div className="text-violet-50 text-base font-normal font-['Montserrat'] leading-normal">
          Tất cả
        </div>
        <div className="w-6 h-6 relative" />
      </div> */}

      <Select
        defaultValue={'all'}
        options={[
          { value: 'all', label: 'Tất cả' },
          { value: 'sort-by-user', label: 'Duyệt bởi người dùng' },
          { value: 'sort-auto', label: 'Duyệt tự động' },
        ]}
        className="w-[200px] h-10  left-[1273px] top-[230px] absolute bg-zinc-800 rounded-lg justify-between items-center inline-flex"
      />
      <div className="left-[229px] top-[238px] absolute text-white text-base font-semibold font-['Montserrat'] leading-normal">
        Thể loại:
      </div>
      <div className="left-[508px] top-[238px] absolute text-white text-base font-semibold font-['Montserrat'] leading-normal">
        Định dạng:
      </div>
      <div className="left-[810px] top-[238px] absolute text-white text-base font-semibold font-['Montserrat'] leading-normal">
        Thời hạn sử dụng:
      </div>
      <div className="left-[1169px] top-[238px] absolute text-white text-base font-semibold font-['Montserrat'] leading-normal">
        Trạng thái:
      </div>
      <div className="w-8 h-8 left-[1690px] top-[238px] absolute">
        <div className="w-8 h-8 left-0 top-0 absolute">
          <UnorderedListOutlined style={{ fontSize: '30px', color: '#C8C8DB' }} />
        </div>
      </div>
      <div className="w-8 h-8 left-[1738px] top-[238px] absolute">
        <div className="w-8 h-8 left-0 top-0 absolute">
          <AppstoreOutlined style={{ fontSize: '30px', color: '#C8C8DB' }} />
        </div>
      </div>
      <div className="left-[1810px] top-[222px] absolute flex-col justify-start items-start inline-flex">
        <div className="h-[130px] p-4 bg-slate-800 rounded-tl-2xl rounded-bl-2xl flex-col justify-center items-center gap-2.5 flex">
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex">
            <div className="w-8 h-8 relative" />
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Quản lý
            <br />
            phê duyệt
          </div>
        </div>
      </div>
    </>
  );
};

export default Records;
