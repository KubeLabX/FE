import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div>
      <h2>회원가입</h2>
      <form>
        <label>
          이름:
          <input type="text" name="name" required />
        </label>
        <br />
        <label>
          이메일:
          <input type="email" name="email" required />
        </label>
        <br />
        <label>
          비밀번호:
          <input type="password" name="password" required />
        </label>
        <br />
        <button type="submit">회원가입</button>
      </form>
      <p>
        이미 회원이신가요? <Link to="/">로그인</Link>
      </p>
    </div>
  );
}

export default Signup;
