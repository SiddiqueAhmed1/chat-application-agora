import { useEffect, useRef, useState } from "react";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const chatClient = useRef(null);

  console.log("this is userid", userId);

  const handleLogin = () => {
    if (userId || token) {
      chatClient.current.open({
        user: userId,
        accessToken: token,
      });
    } else {
      alert("UserId & Token need");
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <section className=" h-[700px] flex justify-center items-center bg-amber-50">
        <div className="card mx-auto ">
          <h1 className="text-3xl text-center mb-6 font-semibold  pb-3 ">
            Agora Chat
          </h1>
          <div className=" flex flex-col gap-2">
            <label className="font-semibold" htmlFor="userid">
              Type your userId
            </label>
            <input
              name="userId"
              id="userid"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              type="text"
              placeholder="UserId"
            />
            <label className="font-semibold" htmlFor="token">
              Type your token
            </label>
            <input
              name="token"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              type="text"
              placeholder="Token"
            />
            <button onClick={handleLogin} className="button my-3">
              Login
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
