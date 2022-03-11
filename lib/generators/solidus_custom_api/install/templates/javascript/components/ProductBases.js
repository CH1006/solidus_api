import { Table, Button, Modal, Form, Input } from 'antd'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ProductBases = () => {
  useEffect(() => {
    refetch()
  }, []);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([])
  const [visible, setVisible] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [initValue, setInitValue] = useState(null)
  useEffect(() => {
    if (initValue) {
      form.setFieldsValue({
        id: initValue?.id,
        title: initValue?.title,
        description: initValue?.description,
      });
    }
    setInitValue(null)
  }, [initValue]);
  const onCreate = (values) => {
    console.log('Create received values of form: ', values);
    axios.post("/admin/product_bases",values).then(res => console.log(res))
    setVisible(false);
    refetch()
  };
  const onUpdate = (values) => {
    console.log('Update received values of form: ', values);
    axios.put("/admin/product_bases/"+values.id, values).then(res => console.log(res))
    setVisible(false);
    refetch()
  };
  const onEditBase = (record) => {
    form.resetFields()
    setInitValue(record)
    setVisible(true)
    setIsEdit(true)
  }
  const onDelete = (values) => {
    axios.delete("/admin/product_bases/"+values.id).then(res => {console.log(res), refetch()})
  }
  const refetch = () => {
    axios.get("/admin/product_bases.json").then(res => res ? setDataSource(res.data) : console.log(res))
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      key: "action",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditBase(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDelete(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];
  
  return (
    <div>
      <Button type="primary" onClick={() => {setVisible(true), setIsEdit(false), form.resetFields()}}>Add Product Base</Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        visible={visible}
        title={isEdit ? "Edit Base" : "New Base"}
        okText="Save"
        cancelText="Cancel"
        onCancel={() => {
          setVisible(false)
          form.resetFields()
        }}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              console.log(values)
              isEdit ? onUpdate(values) : onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item label="ID" name="id" style={{ display: 'none' }}>
            <Input type="text" />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title of base!' }]}

          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input type="textarea" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default props => <ProductBases {...props} />