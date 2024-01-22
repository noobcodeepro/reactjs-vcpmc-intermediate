import React from 'react';
import Pagination from '../../../components/Pagination';

const Device = () => {
  return (
    <>
      <div className="w-[665px] px-6 py-3 left-[1105px] top-[158px] absolute bg-slate-800 rounded-lg justify-between items-center inline-flex">
        <div className="text-center text-gray-500 text-base font-normal font-['Montserrat'] leading-normal">
          Tìm thiết bị theo tên, SKU, địa điểm, địa chỉ Mac
        </div>
        <div className="w-6 h-6 relative" />
      </div>
      <div className="h-[520px] left-[1810px] top-[158px] absolute flex-col justify-start items-start inline-flex">
        <div className="h-[130px] p-4 bg-slate-800 rounded-tl-2xl flex-col justify-center items-center gap-2.5 flex">
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex">
            <div className="w-8 h-8 relative" />
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Thêm
            <br />
            thiết bị
          </div>
        </div>
        <div className="self-stretch h-[130px] p-4 bg-slate-800 flex-col justify-center items-center gap-2.5 flex">
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex">
            <div className="w-8 h-8 relative" />
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Kích hoạt <br />
            thiết bị
          </div>
        </div>
        <div className="self-stretch h-[130px] p-4 bg-slate-800 flex-col justify-center items-center gap-2.5 flex">
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex">
            <div className="w-8 h-8 relative" />
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Khoá
            <br />
            thiết bị
          </div>
        </div>
        <div className="self-stretch h-[130px] p-4 bg-slate-800 rounded-bl-2xl flex-col justify-center items-center gap-2.5 flex">
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex">
            <div className="w-8 h-8 relative" />
          </div>
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
      <div className="w-[274px] h-10 pl-4 pr-3 py-3 left-[229px] top-[158px] absolute bg-zinc-800 rounded-lg border border-orange-500 justify-between items-center inline-flex">
        <div className="text-violet-50 text-base font-normal font-['Montserrat'] leading-normal">
          Chọn nhóm tài khoản
        </div>
        <div className="w-6 h-6 relative" />
      </div>
      <div className="w-[230px] h-10 pl-4 pr-3 py-3 left-[527px] top-[158px] absolute bg-zinc-800 rounded-lg border border-orange-500 justify-between items-center inline-flex">
        <div className="text-violet-50 text-base font-normal font-['Montserrat'] leading-normal">
          Ẩn hiện cột
        </div>
        <div className="w-6 h-6 relative" />
      </div>
      <div className="h-[779px] px-6 py-4 left-[229px] top-[230px] absolute bg-slate-800 bg-opacity-70 rounded-2xl flex-col justify-start items-start gap-14 inline-flex">
        <div className="self-stretch justify-start items-start inline-flex">
          <div className="w-[71px] flex-col justify-center items-start inline-flex">
            <div className="self-stretch h-12 py-2 justify-start items-start gap-1 inline-flex">
              <div className="w-10 h-6 relative">
                <div className="w-6 h-6 left-0 top-0 absolute" />
                <div className="w-3 h-3 left-[40px] top-[6px] absolute origin-top-left rotate-90" />
              </div>
            </div>
            <div className="self-stretch h-[47px] pt-[11px] opacity-80 flex-col justify-center items-start gap-3 flex">
              <div className="w-6 h-6 relative" />
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[11px] opacity-80 flex-col justify-center items-start gap-3 flex">
              <div className="w-6 h-6 relative" />
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[11px] opacity-80 flex-col justify-center items-start gap-3 flex">
              <div className="w-6 h-6 relative" />
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[11px] opacity-80 flex-col justify-center items-start gap-3 flex">
              <div className="w-6 h-6 relative" />
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[11px] opacity-80 flex-col justify-center items-start gap-3 flex">
              <div className="w-6 h-6 relative" />
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[11px] opacity-80 flex-col justify-center items-start gap-3 flex">
              <div className="w-6 h-6 relative" />
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[11px] opacity-80 flex-col justify-center items-start gap-3 flex">
              <div className="w-6 h-6 relative" />
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[11px] opacity-80 flex-col justify-center items-start gap-3 flex">
              <div className="w-6 h-6 relative" />
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[11px] opacity-80 flex-col justify-center items-start gap-3 flex">
              <div className="w-6 h-6 relative" />
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[11px] opacity-80 flex-col justify-center items-start gap-3 flex">
              <div className="w-6 h-6 relative" />
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[11px] opacity-80 flex-col justify-center items-start gap-3 flex">
              <div className="w-6 h-6 relative" />
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-[11px] opacity-80 flex-col justify-center items-start gap-3 flex">
              <div className="w-6 h-6 relative" />
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[35px] pt-[11px] opacity-80 flex-col justify-center items-start gap-3 flex">
              <div className="w-6 h-6 relative" />
            </div>
          </div>
          <div className="w-[85px] flex-col justify-center items-start inline-flex">
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
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
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
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
              <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                12
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-8 pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
              <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                13
              </div>
            </div>
          </div>
          <div className="w-[151px] flex-col justify-start items-start inline-flex">
            <div className="h-12 py-2 justify-start items-start gap-2 inline-flex">
              <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                Tên thiết bị
              </div>
            </div>
            <div className="self-stretch h-[47px] pt-1 opacity-80 flex-col justify-start items-start gap-[7px] flex">
              <div className="self-stretch h-9 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Device A12231
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-1.5 opacity-80 flex-col justify-start items-start gap-[7px] flex">
              <div className="self-stretch h-[34px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Device A12231
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-1.5 opacity-80 flex-col justify-start items-start gap-[7px] flex">
              <div className="self-stretch h-[34px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Device A12231
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-1.5 opacity-80 flex-col justify-start items-start gap-[7px] flex">
              <div className="self-stretch h-[34px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Device A12231
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-1.5 opacity-80 flex-col justify-start items-start gap-[7px] flex">
              <div className="self-stretch h-[34px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Device A12231
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-1.5 opacity-80 flex-col justify-start items-start gap-[7px] flex">
              <div className="self-stretch h-[34px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Device A12231
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-1.5 opacity-80 flex-col justify-start items-start gap-[7px] flex">
              <div className="self-stretch h-[34px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Device A12231
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-1.5 opacity-80 flex-col justify-start items-start gap-[7px] flex">
              <div className="self-stretch h-[34px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Device A12231
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-1.5 opacity-80 flex-col justify-start items-start gap-[7px] flex">
              <div className="self-stretch h-[34px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Device A12231
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-1.5 opacity-80 flex-col justify-start items-start gap-[7px] flex">
              <div className="self-stretch h-[34px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Device A12231
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-1.5 opacity-80 flex-col justify-start items-start gap-[7px] flex">
              <div className="self-stretch h-[34px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Device A12231
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-1.5 opacity-80 flex-col justify-center items-start gap-[7px] flex">
              <div className="self-stretch h-[34px] text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Device A12231
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-1.5 opacity-80 flex-col justify-center items-start gap-1 flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Device A12231
              </div>
            </div>
          </div>
          <div className="w-[311px] h-[659px] flex-col justify-start items-start inline-flex">
            <div className="h-12 pr-2 py-2 justify-start items-start gap-2 inline-flex">
              <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                Trạng thái
              </div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Đang kích hoạt | Đang hoạt động{' '}
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Đang kích hoạt | Đang hoạt động{' '}
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Đang kích hoạt | Đang hoạt động{' '}
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Ngừng kích hoạt
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Đang kích hoạt | Đang hoạt động{' '}
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Đang kích hoạt | Đang hoạt động{' '}
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Đang bị khoá
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Đang kích hoạt | Đang hoạt động{' '}
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Đang kích hoạt | Đang hoạt động{' '}
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Đang bị khoá
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Ngừng kích hoạt
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Đang kích hoạt | Đang hoạt động{' '}
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-8 pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <div className="opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Đang kích hoạt | Đang hoạt động{' '}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[391px] flex-col justify-start items-start inline-flex">
            <div className="h-12 pr-2 py-2 justify-start items-start gap-2 inline-flex">
              <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                Địa điểm
              </div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-between items-start flex">
              <div className="self-stretch opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-between items-start flex">
              <div className="self-stretch opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-between items-start flex">
              <div className="self-stretch opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-between items-start flex">
              <div className="self-stretch opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-between items-start flex">
              <div className="self-stretch opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-between items-start flex">
              <div className="self-stretch opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-between items-start flex">
              <div className="self-stretch opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-between items-start flex">
              <div className="self-stretch opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-between items-start flex">
              <div className="self-stretch opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-between items-start flex">
              <div className="self-stretch opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-between items-start flex">
              <div className="self-stretch opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-between items-start flex">
              <div className="self-stretch opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-8 pt-3 opacity-80 flex-col justify-between items-start flex">
              <div className="self-stretch opacity-80 text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh
              </div>
            </div>
          </div>
          <div className="w-[157px] flex-col justify-start items-start inline-flex">
            <div className="h-12 pr-2 py-2 justify-start items-start gap-2 inline-flex">
              <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                Hạn hợp đồng
              </div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                21/04/2021
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                21/04/2021
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                21/04/2021
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                21/04/2021
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                21/04/2021
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                21/04/2021
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                21/04/2021
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                21/04/2021
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                21/04/2021
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                21/04/2021
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                21/04/2021
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                21/04/2021
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-8 pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                21/04/2021
              </div>
            </div>
          </div>
          <div className="w-[146px] flex-col justify-start items-start inline-flex">
            <div className="h-12 pr-2 py-2 justify-start items-start gap-2 inline-flex">
              <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                MAC Addresss
              </div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                123.12.156.10
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                123.12.156.11
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                123.12.156.12
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                123.12.156.13
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                123.12.156.14
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                123.12.156.15
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                123.12.156.16
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                123.12.156.17
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                123.12.156.18
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                123.12.156.19
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                123.12.156.20
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                123.12.156.21
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-8 pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                123.12.156.21
              </div>
            </div>
          </div>
          <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
            <div className="h-12 pr-2 py-2 justify-start items-start gap-2 inline-flex">
              <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                Memory
              </div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                0.00GB/32GB
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                0.00GB/32GB
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                0.00GB/32GB
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                0.00GB/32GB
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                0.00GB/32GB
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                0.00GB/32GB
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                0.00GB/32GB
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                0.00GB/32GB
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                0.00GB/32GB
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                0.00GB/32GB
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                0.00GB/32GB
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                0.00GB/32GB
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-8 pt-3 opacity-80 flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                0.00GB/32GB
              </div>
            </div>
          </div>
        </div>
        <Pagination />
      </div>
    </>
  );
};

export default Device;
