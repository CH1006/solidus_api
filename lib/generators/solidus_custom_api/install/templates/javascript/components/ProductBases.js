import { useQuery } from "@apollo/client";
import { Button, PageHeader, Table, Tag, Modal, Divider } from "antd";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { STORES } from "../../graphql/queries/storeQuery";
import useStoreForm from "./StoreForm";
import { SettingOutlined, EditOutlined } from "@ant-design/icons";

const StoreList = () => {
  const router = useRouter();
  const { data, loading, refetch } = useQuery(STORES);
  const [showAddNew, setShowAddNew] = useState({
    record: null,
    visible: false,
  });
  const [formStore, { form, createLoading, updateLoading }] = useStoreForm({
    setShowAddNew,
    store: showAddNew.record,
  });

  const columns = [
    {
      title: "Store",
      key: "title",
      width: 200,
      dataIndex: "title",
      // render: (record) => (
      //   <div className="flex item-center">
      //     <Avatar
      //       style={{ minWidth: 30, display: "flex" }}
      //       src={
      //         record.platform === "shopify"
      //           ? "/shopify.png"
      //           : record.platform === "woocommerce"
      //           ? "/woocommerce.jpg"
      //           : record.platform === "shopbase"
      //           ? "images/shopbase-icon.png"
      //           : "/lattehub-logo.png"
      //       }
      //     />
      //     <EditText
      //       updateName={(id, title) => updateName(id, title)}
      //       store={true}
      //       edit={edit}
      //       setEdit={setEdit}
      //       defaultValue={record.title}
      //       record={record}
      //     />
      //   </div>
      // ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status, _) =>
        status ? (
          <Tag color="green">Connected</Tag>
        ) : (
          <Tag color="orange">Disconnected</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      align: "right",
      render: (record) => (
        <div>
          <EditOutlined
            onClick={() => setShowAddNew({ record: record, visible: true })}
          />
          <Divider type="vertical" />
          <SettingOutlined
            onClick={() =>
              router.push(
                "/stores/settings/[id]",
                `/stores/settings/${record.id}`
              )
            }
          />
        </div>
      ),
      // render: (record) => (
      //   <AuthElement name={permissions.StoreUpdate}>
      //     <StoreAction key={record.key} refetch={refetch} store={record} />
      //   </AuthElement>
      // ),
    },
  ];

  return (
    <div style={{ padding: "15px 24px" }}>
      <div style={{ marginBottom: 15 }} className="flex item-center">
        <PageHeader
          title="Stores"
          style={{ padding: 0, maxWidth: 400 }}
          onBack={() => router.back()}
        />
        <Button
          type="primary"
          onClick={() => {
            setShowAddNew({
              record: null,
              visible: true,
            });
            form.resetFields();
          }}
        >
          Add new
        </Button>
      </div>
      <Table
        pagination={false}
        rowKey={(record) => record.id}
        dataSource={data?.stores?.hits}
        columns={columns}
      />
      {showAddNew.visible && (
        <Modal
          style={{ top: 50 }}
          visible={showAddNew.visible}
          title={showAddNew.record ? "Edit store" : "Add store"}
          onCancel={() => {
            form.resetFields();
            setShowAddNew({
              visible: false,
              record: null,
            });
          }}
          okButtonProps={{
            htmlType: "submit",
            form: "form-store",
            loading: createLoading || updateLoading,
          }}
          okText="Save"
        >
          {formStore}
        </Modal>
      )}
    </div>
  );
};

export default StoreList;
