import React from "react"
import { Tabs } from "antd"
import Sidebarr from "./Sidebarr"
import UserList from "../screens/userManagement/UserList"
import FeedbackList from "../screens/userManagement/FeedbackList"
const { TabPane } = Tabs


export default function UserAdmin() {
    return (

        <div className="mt-3 ml-3 mr-3 bs" style={{ backgroundColor: "#FCF9EF", height: '150vh' }}>

            <Sidebarr />
            <Tabs defaultActiveKey="1" style={{ display: 'flex', marginLeft: '300px' }}>

                <TabPane tab="User List" key="1">
                    <UserList/>
                </TabPane>

                <TabPane tab="FeedBack" key="2">
                    <FeedbackList/>
                </TabPane>


            </Tabs>
        </div>
    )
}
