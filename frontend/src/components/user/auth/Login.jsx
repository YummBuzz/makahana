import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState(false);

  return (
    <>
      <div className="main">
        <div>Login</div>
        <button onClick={() => setUsername(true)}>Login</button>
        {username && (
          <div className="popup">
            <div className="sub-popup">
              <p>hello</p>
              <span>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga
                pariatur enim modi, unde blanditiis ad similique suscipit ex!
                Dolorum, sunt?
              </span>
              <button onClick={() => setUsername(false)}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
