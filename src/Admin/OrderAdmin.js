import React from "react"
import { Tabs } from "antd"
import Sidebarr from "./Sidebarr"
import OrderList from "../screens/orderManagement/OrderList"
const { TabPane } = Tabs

export default function OrderAdmin() {
    return (
        <div className="mt-3 ml-3 mr-3 bs" style={{ backgroundColor: "#FCF9EF", height: '150vh' }}>

            <Sidebarr />
            <Tabs defaultActiveKey="1" style={{ display: 'flex', marginLeft: '300px' }}>

                <TabPane tab="Orders List" key="1">
                    <OrderList/>
                </TabPane>
            </Tabs>
        </div>
    )
}
