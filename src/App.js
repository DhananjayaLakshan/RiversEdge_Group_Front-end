import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homescreen from "./screens/bookingManagement/Homescreen";
import Bookingscreen from "./screens/bookingManagement/Bookingscreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./screens/bookingManagement/Adminscreen";
import Footer from "./components/Footer";
import Paymentscreen from "./screens/bookingManagement/Paymentscreen";
import UpdateRoomScreen from "./screens/update/UpdateRoomScreen";
import PackagesScreen from "./screens/bookingManagement/packageManagement/PackagesScreen";
import UpdatePackageScreen from "./screens/update/UpdatePackageScreen";
import UpdateServiceScreen from "./screens/update/UpdateServiceScreen";
import ServiceScreen from "./screens/bookingManagement/serviceManagement/ServiceScreen";
import Home from "./screens/Home";
import PayScreen from "./screens/utilityManagement/PayScreen";
import AddPayment from "./screens/utilityManagement/AddPayment";
import ViewPayment from "./screens/utilityManagement/ViewPayment";
import Updatepay from "./screens/utilityManagement/Updatepay";
import Eventscreen from "./screens/eventManagment/Eventscreen";
import UpdateEventScreen from "./screens/update/UpdateEventScreen";
import EventHomescreen from "./screens/eventManagment/EventHomescreen";
import EmployeeAdmin from "./Admin/EmployeeAdmin";
import InventoryAdmin from "./Admin/InventoryAdmin";
import UserAdmin from "./Admin/UserAdmin";
import UserUpdateScreen from "./screens/userManagement/UserUpdateScreen";
import FeedBackUpdate from "./screens/userManagement/FeedBackUpdate";
import MenuScreen from "./screens/orderManagement/MenuScreen";
import FoodOrder from "./screens/orderManagement/FoodOrder";
import OrderAdmin from "./Admin/OrderAdmin";
import UpdateOrder from "./screens/orderManagement/UpdateOrder";


export const URL = "http://localhost:5000"; 


function App() {

  const isFooterVisible = window.location.pathname !== '/admin';
  
  
  return (
    <div className="App">
      <Navbar />    
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/roomBooking" element={<Homescreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/profile" element={<Profilescreen />} />
          <Route path="/admin" element={<Adminscreen />} />
          <Route path="/event" element={<Eventscreen />} />
          <Route path="/service" element={<ServiceScreen />} />
          <Route path="/packages" element={<PackagesScreen />} />
          <Route path="/eventHome" element={<EventHomescreen />} />

          <Route path="/employee" element={<EmployeeAdmin />} />
          <Route path="/inventory" element={<InventoryAdmin />} />
          <Route path="/user" element={<UserAdmin />} />
          <Route path="/userUpdate/:userid" element={<UserUpdateScreen />} />
          <Route path="/updatefeedback/:id" element={<FeedBackUpdate />} />

          <Route path="/menu" element={<MenuScreen />} />
          <Route path="/foodOrder/:userId/:foodItem/:price" element={<FoodOrder />} />
          <Route path="/order" element={<OrderAdmin />} />
          <Route path="/orderUpdate/:id" element={<UpdateOrder />} />





          <Route path="/book/:roomid/:fromdate/:todate" element={<Bookingscreen />} />
          <Route path="/payment/:roomid/:fromdate/:todate/:totalamount/:userID/:userName/:totaldays/:email" element={<Paymentscreen />} />

          <Route path="/updateRoom/:roomid" element={<UpdateRoomScreen />} />
          <Route path="/updatePackages/:packagesID" element={<UpdatePackageScreen />} />
          <Route path="/updateServices/:servicesID" element={<UpdateServiceScreen />} />
          <Route path="/updateEvents/:eventId" element={<UpdateEventScreen />} />

          <Route path="/payment" element={<PayScreen />} />
          <Route path="/addpay" element={<AddPayment />} />
          <Route path="/view/:id" element={<ViewPayment />} />
          <Route path="/update/:id" element={<Updatepay />} />

        </Routes>
      </BrowserRouter>
  
      {/* <Footer /> */}
      {isFooterVisible && <Footer />}

    </div>
  );
}

export default App;
