import { useEffect, useState } from "react";
import Login from "./Login";

const loadInfo = async () => {
  const info = await window.api.getWSInfo();

  setPort(info.PORT);
  setIp(info.IP);
};

export default function App() {
  const [port, setPort] = useState(0);
  const [ip, setIp] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loadInfo = async () => {
      const info = await window.api.getWSInfo();
      setPort(info.PORT);
      setIp(info.IP);
    };

    loadInfo();
  }, []);

  return !username ? (
    <Login onSubmit={setUsername} />
  ) : (
    <h1>
      Enter this link: ws://{ip}:{port}?username={username}
    </h1>
  );
}
