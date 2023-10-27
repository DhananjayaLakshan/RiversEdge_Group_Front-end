import React from "react"
import { Tabs } from "antd"
import Sidebarr from "./Sidebarr"
import { InventoryList } from "../screens/inventoryManagement/inventory/inventory-list.component"
import { CreateInventory } from "../screens/inventoryManagement/inventory/inventory-add.component"

const { TabPane } = Tabs

export default function InventoryAdmin() {
    return (
        <div className="mt-3 ml-3 mr-3 bs" style={{ backgroundColor: "#FCF9EF", height: '150vh' }}>

            <Sidebarr />
            <Tabs defaultActiveKey="1" style={{ display: 'flex', marginLeft: '300px' }}>

                <TabPane tab="List" key="1">
                    <InventoryList/>
                </TabPane>

                <TabPane tab="Add Inventory" key="2">
                    <CreateInventory/>
                </TabPane>

                {/* <TabPane tab="Leave List" key="3">

                </TabPane>

                <TabPane tab="Leave" key="4">

                </TabPane>

                <TabPane tab="Add Leave" key="5">

                </TabPane>

                <TabPane tab="Edit Leave" key="6">

                </TabPane> */}

            </Tabs>
        </div>
    )
}
