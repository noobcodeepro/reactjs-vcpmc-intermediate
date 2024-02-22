import { Breadcrumb } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

// type BreadCrumbProps = {
//   items: Array<{ title: string; to?: string }>;
// };

const BreadCrumb = () => {
  return (
    <>
      <Breadcrumb />
      <Outlet />
    </>
  );
};

export default BreadCrumb;
