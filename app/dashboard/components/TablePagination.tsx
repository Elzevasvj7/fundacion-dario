import { Table } from "antd";
import React from "react";

const TablePagination = ({ data, columns, scroll }: any) => {
  return (
    <div className="w-full overflow-auto">
      <Table dataSource={data} columns={columns} pagination={{ pageSize: 5, position: ["bottomCenter"]  }} scroll={scroll}/>
    </div>
  );
};

export default TablePagination;
