import { useEffect, useState } from "react";
import { friendURL } from "../../global/Links/Links";
import SingleRequest from "./SingleRequest";
import Suggested from "../Search/Suggested";

import Footer from "../../components/Footer/Footer";

const Notifications = () => {

  const [requests, setRequests] = useState([]);
  useEffect(() => {
    console.log("Refreshed");
    const fetchFriendRequests = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(friendURL + `pending-requests`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.status === 200) {
          setRequests(data);
          console.log(data)
        } else {
          setRequests([]);
          console.log(data.message);
        }
      } catch (err) {
        console.log("Error in fetcing friend status", err);
      }
    };

    fetchFriendRequests();
  }, []);
  return (
    <div className="p-5">
      <p className="font-bold">Friend Requests</p>
      {requests.length > 0 ? (
        requests.map((req) => {
          return <SingleRequest req={req} />;
        })
      ) : (
        <p className="text-center p-5 opacity-60">No Friend requests</p>
      )}
      <Suggested />
      <Footer />
    </div>
  );
};

export default Notifications;
