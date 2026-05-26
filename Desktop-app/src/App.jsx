import { useEffect, useState } from "react";

const loadInfo = async () => {
  const info = await window.api.getWSInfo();

  setPort(info.PORT);
  setIp(info.IP);
};

loadInfo();

export default function App() {
  const [port, setPort] = useState(0);
  const [ip, setIp] = useState("");

  useEffect(() => {
    const loadInfo = async () => {
      const info = await window.api.getWSInfo();
      setPort(info.PORT);
      setIp(info.IP);
    };

    loadInfo();
  }, []);

  return (
    <h1>
      Enter this link: ws://{ip}:{port}
    </h1>
  );
}
