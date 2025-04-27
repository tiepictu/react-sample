"use client";

import React from 'react';
import { Table } from 'antd';
import axios from 'axios';

const NoteScreen = () => {
  const [notes, setNotes] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:5000/api/notes').then((response) => {
      setNotes(response.data);
    });
  }, []);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
  ];

  return <Table dataSource={notes} columns={columns} rowKey="id" />;
};

export default NoteScreen;