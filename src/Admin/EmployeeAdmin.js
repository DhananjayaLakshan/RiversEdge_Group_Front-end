import React from "react"
import { Tabs } from "antd"
import Sidebarr from "./Sidebarr"
import { CreateEmployee } from "../screens/employeeManagement/employee-add.component"
import { EmployeeList } from "../screens/employeeManagement/employee-list.component"
import { CreateLeave } from "../screens/employeeManagement/leave/leave-add.component"
import AdminEditLeave from "../screens/employeeManagement/leave/admin-leave-edit.component"
import { LeaveList } from "../screens/employeeManagement/leave/leave-list.component"
import { EmpLeaveList } from "../screens/employeeManagement/leave/employee-leave-list.component"
const { TabPane } = Tabs

export default function EmployeeAdmin() {
    return (
        <div className="mt-3 ml-3 mr-3 bs" style={{ backgroundColor: "#FCF9EF", height:'150vh' }}>

            <Sidebarr />
            <Tabs defaultActiveKey="1" style={{ display: 'flex', marginLeft: '300px' }}>

                <TabPane tab="List" key="1">
                    <EmployeeList/>
                </TabPane>

                <TabPane tab="Add Employee" key="2">
                    <CreateEmployee/>                    
                </TabPane>

                {/* <TabPane tab="Leave List" key="3">
                    <LeaveList/>
                </TabPane>

                <TabPane tab="Leave" key="4">
                    <EmpLeaveList/>
                </TabPane>

                <TabPane tab="Add Leave" key="5">
                    <CreateLeave/>
                </TabPane>

                <TabPane tab="Edit Leave" key="6">
                    <AdminEditLeave/>
                </TabPane> */}

            </Tabs>
        </div>
    )
}


