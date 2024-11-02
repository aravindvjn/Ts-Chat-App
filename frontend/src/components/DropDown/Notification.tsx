import "./Notification.css";
type NotificationProps = {
  notification: string;
  setNotification: (notification: string) => void;
};
const Notification = ({
  notification = "Hello World",
  setNotification,
}: NotificationProps) => {
    setTimeout(() => {
      setNotification?.("");
    }, 3000);
  return (
    <>
      {notification && (
        <div className="fixed z-20 right-0 left-0  top-0 notification text-center  px-16">
          <p className="bg-yellow-400  px-3 py-2 rounded-b-lg text-[12px]">{notification}</p>
        </div>
      )}
    </>
  );
};

export default Notification;
