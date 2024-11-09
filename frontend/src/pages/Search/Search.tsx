import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import SearchInput from "../../components/Search/SearchInput";
import { UserProps } from "../../global/Context/UserContext";
import { friendURL } from "../../global/Links/Links";
import SingleUser from "./SingleUser";

const Search = () => {
  const [foundUsers, setFoundUsers] = useState<UserProps[] | void[]>([]);
  const [message, setMessage] = useState<string | null>();
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      try {
        const response = await fetch(
          friendURL +
            `/search-user?search=${encodeURIComponent(event.target.value)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Bearer token convention
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (response.status === 200) {
          setMessage("Search Results:");
          setFoundUsers(data);
        } else {
          setFoundUsers([]);
          setMessage(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setMessage(null);
      setFoundUsers([]);
    }
  };
  return (
    <div className="p-5 max-h-svh overflow-y-scroll pb-16">
      <SearchInput onChange={handleChange} />
      {message && <p className="py-2">{message}</p>}
      {foundUsers?.length > 0 &&
        foundUsers.map((user) => {
          if (user) {
            return <SingleUser key={user.user_id} user={user} />;
          }
          return null;
        })}
      <Footer />
    </div>
  );
};

export default Search;
