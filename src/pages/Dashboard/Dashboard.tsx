import { useEffect, useState } from "react";
import PortalLayout from "../../layouts/PortalLayout";
import { useAuth } from "../../context/AuthProvider";
import API_URL  from "../../context/authConstants";
import { CreateHotel } from "./components/CreateHotel";
import { UpdateHotel } from "./components/UpdateHotel";
import { BookingList } from "./components/BookingList";
import { UpdateRoom } from "./components/UpdateRoom";



export default function Dashboard() {
  const auth = useAuth();

  return (
    <PortalLayout>
      <div className="dashboard">
        <h1>Dashboard de {auth.getUser()?.name ?? ""}</h1>
        </div>
        <CreateHotel/>
        <UpdateHotel/>
        <UpdateRoom/>
        <BookingList/>
    </PortalLayout>
  );
}