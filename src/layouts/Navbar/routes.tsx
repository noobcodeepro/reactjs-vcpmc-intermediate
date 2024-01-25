import {
  FileAddOutlined,
  MoneyCollectOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
  ScheduleOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { MenuProps } from 'antd';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export type NavItemType = {
  label?: string;
  to?: string;
  icon?: ReactElement;
  children?: MenuProps['items'];
};
export type navType = Array<NavItemType>;
export const navList: navType = [
  {
    label: 'Kho bản ghi',
    to: '/records',
    icon: <PlayCircleOutlined style={{ fontSize: '32px' }} />,
  },
  {
    label: 'Playlist',
    to: '/playlist',
    icon: <UnorderedListOutlined style={{ fontSize: '32px' }} />,
  },
  {
    label: 'Lập lịch phát',
    to: '/play-schedule',
    icon: <ScheduleOutlined style={{ fontSize: '32px' }} />,
  },
  {
    label: 'Quản lý',
    icon: <FileAddOutlined style={{ fontSize: '32px' }} />,

    children: [
      {
        key: '/manage/contract',
        label: <Link to={'/manage/contract'}>Quản lí hợp đồng</Link>,
      },
      {
        key: '/manage/device',
        label: <Link to={'/manage/device'}>Quản lí thiết bị</Link>,
      },
      {
        key: '/manage/authority',
        label: <Link to={'/manage/authority'}>Quản lí ủy quyền</Link>,
      },
      {
        key: '/manage/usage',
        label: <Link to={'/manage/usage'}>Quản lí sử dụng</Link>,
      },
    ],
  },
  {
    label: 'Doanh thu',
    icon: <PlayCircleOutlined style={{ fontSize: '32px' }} />,

    children: [
      {
        key: '/revenue/report',
        label: <Link to={'/revenue/report'}>Báo cáo doanh thu</Link>,
      },
      {
        key: '/revenue/contrast-history',
        label: <Link to={'/revenue/contrast-history'}>Lịch sử đối soát</Link>,
      },
      {
        key: '/revenue/distribution',
        label: <Link to={'/revenue/distribution'}>Phân phối doanh thu</Link>,
      },
    ],
  },
  {
    label: 'Cài đặt',
    icon: <MoneyCollectOutlined style={{ fontSize: '32px' }} />,

    children: [
      {
        key: '/setting/authorize',
        label: <Link to={'/setting/authorize'}>Phân quyền người dùng</Link>,
      },
      {
        key: '/setting/configuration',
        label: <Link to={'/setting/configuration'}>Cấu hình</Link>,
      },
      {
        key: '/setting/contract',
        label: <Link to={'/setting/contract'}>Quản lý hợp đồng</Link>,
      },
      {
        key: '/setting/work',
        label: <Link to={'/setting/work'}>Thông tin tác phẩm</Link>,
      },
      {
        key: '/setting/cycle',
        label: <Link to={'/setting/cycle'}>Chu kỳ đối soát</Link>,
      },
    ],
  },
  {
    label: 'Hỗ trợ',
    icon: <QuestionCircleOutlined style={{ fontSize: '32px' }} />,

    children: [
      {
        key: '/support/user-manual',
        label: <Link to={'/support/user-manual'}>Hướng dẫn sử dụng</Link>,
      },
      {
        key: '/support/download',
        label: <Link to={'/support/download'}>Tải app</Link>,
      },
      {
        key: '/support/feedback',
        label: <Link to={'/support/feedback'}>Feedback</Link>,
      },
    ],
  },
];
