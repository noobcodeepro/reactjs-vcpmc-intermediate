import { useEffect, useState } from 'react';
import { Table as AntdTable, ConfigProvider, TableProps } from 'antd';
import { ExtendedRecord } from '../../pages/Records';

import Pagination from '../Pagination';
import './table.css';
import { TableRowSelection } from 'antd/es/table/interface';

type TableColumnType = ExtendedRecord | { text: string };
type ColumnsType<T extends TableColumnType> = TableProps<T>['columns'];

function Table<T extends TableColumnType>({
  columns,
  dataSource,
  rowSelection,
  ...props
}: {
  columns: ColumnsType<T>;
  dataSource: Array<T>;
  rowSelection?: TableRowSelection<T>;
}) {
  const [pageSize, setPageSize] = useState<number>(16);
  const [current, setCurrent] = useState(1);

  const onChangePageSize = (ps: number) => {
    setPageSize(ps);
  };
  useEffect(() => {}, [pageSize, current]);
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerColor: '#FFAC69',
            colorBgContainer: '#2B2B3F',
            borderColor: '#3b3b4e',
            colorText: '#b4b4bb',
            headerSplitColor: 'transparent',
            cellPaddingBlock: 16,
            cellPaddingInline: 12,
            fontSize: 14,
            fontFamily: 'montserrat',
          },
          Pagination: {
            itemActiveBg: '#FF750680',
          },
        },
      }}
    >
      <AntdTable
        rowSelection={rowSelection}
        {...props}
        columns={columns}
        dataSource={dataSource}
        className="w-full tracking-wide leading-5 font-montserrat"
        rowClassName={'w-fit'}
        pagination={{ current, pageSize }}
      ></AntdTable>
      <Pagination
        total={dataSource.length}
        setCurrent={setCurrent}
        setPageSize={onChangePageSize}
        pageSize={pageSize}
      />
    </ConfigProvider>
  );
}

export default Table;
