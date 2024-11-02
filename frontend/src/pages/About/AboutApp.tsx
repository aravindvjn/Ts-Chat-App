import { useNavigate } from "react-router-dom";
import { AppName } from "../../global/Links/Links";
import {ArrowBackIos } from "@mui/icons-material";

const AboutApp = () => {
 const navigate = useNavigate()
  return (
    <div className="p-5 pt-10">
              <ArrowBackIos onClick={()=>navigate(-1)} className="absolute left-4 top-4" fontSize="small" />
      <h2 className="text-xl font-bold py-3 text-center">About {AppName || "Ts Chat App"}</h2>
      <p className="text-center">
        <strong>{AppName || "Ts Chat App"}</strong> is an innovative chat application designed
        to facilitate real-time communication among friends. With a
        user-friendly interface, the app allows users to send and receive friend
        requests easily. Once a request is accepted, users can chat seamlessly,
        making it simple to stay connected with loved ones.
      </p>

      <h3 className="text-lg font-semibold pt-5">Key Features:</h3>
      <ul className="py-3 text-justify">
        <li>
          <strong>Friend Requests:</strong> Users can send friend requests,
          enabling them to connect with others in their network.
        </li>
        <li>
          <strong>Real-Time Chat:</strong> Leverage the power of Socket.IO for
          instant messaging, ensuring that conversations happen in real time
          without delays.
        </li>
        <li>
          <strong>User Authentication:</strong> Built with security in mind,{" "}
          <strong>{AppName || "Ts Chat App"}</strong> utilizes JSON Web Tokens (JWT) for user
          authentication and bcrypt for secure password hashing, safeguarding
          user data and privacy.
        </li>
        <li>
          <strong>Profile Management:</strong> Users can edit their profiles,
          allowing for personalization and the ability to change their
          passwords, ensuring account security.
        </li>
        <li>
          <strong>Responsive Design:</strong> The app offers a modern,
          responsive design that adapts to various devices, providing a
          consistent user experience.
        </li>
      </ul>

      <h3 className="text-lg font-semibold pt-5">Technology Stack:</h3>
      <ul className="py-3 text-justify">
        <li>
          <strong>Frontend:</strong> Developed using React with TypeScript,
          ensuring a robust and scalable user interface that enhances user
          interaction.
        </li>
        <li>
          <strong>Backend:</strong> Built on Node.js with Express, providing a
          solid foundation for handling requests and managing real-time data.
        </li>
        <li>
          <strong>Database:</strong> Utilizes PostgreSQL for efficient data
          storage and retrieval, ensuring reliable performance and data
          integrity.
        </li>
        <li>
          <strong>Dependencies:</strong> The backend includes essential packages
          such as <code>bcryptjs</code>, <code>cors</code>, <code>dotenv</code>,{" "}
          <code>jsonwebtoken</code>, and <code>socket.io</code>. The frontend
          leverages libraries like <code>@mui/material</code>,{" "}
          <code>@emotion/react</code>, and <code>socket.io-client</code> for an
          enriched user experience.
        </li>
      </ul>

      <p>
        <strong>{AppName || "Ts Chat App"}</strong> is more than just a chat application; it's
        a secure platform designed to enhance communication among friends while
        prioritizing user data protection and privacy. Join the community and
        experience seamless interactions today!
      </p>
    </div>
  );
};

export default AboutApp;
