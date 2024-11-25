export const handleSignUp = async (userData) => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    // userData를 서버 형식에 맞게 변환
    const formattedData = {
      user_id: userData.user_id, // studentId -> user_id
      password: userData.password,
      user_type: userData.usertype, // "학생"/"강사" -> "s"/"t"
      first_name: userData.first_name, // name -> first_name
    };

    console.log("Sending data:", formattedData); // 데이터 확인용 로그

    const response = await fetch(`${API_URL}/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData), // 변환된 데이터 전송
    });

    console.log("Response status:", response.status); // 응답 상태 확인용 로그

    if (response.status === 201) {
      const data = await response.json();
      return data.message;
    } else if (response.status === 400) {
      const errorData = await response.json();
      console.log("Error data:", errorData); // 에러 데이터 확인용 로그

      if (errorData.error === "Please fill out the required fields") {
        throw new Error("필수 필드를 모두 입력해주세요");
      }
      if (errorData.error === "User ID already exists") {
        throw new Error("이미 존재하는 회원입니다");
      }
      throw new Error(errorData.error || "회원가입 실패");
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || "회원가입 실패");
    }
  } catch (error) {
    console.error("SignUp error:", error); // 에러 로그
    throw new Error("회원가입 실패: " + error.message);
  }
};

// src/services/authService.js
export const handleLogin = async (userData) => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    // 서버가 기대하는 데이터 형식으로 변환
    const formattedData = {
      user_id: userData.user_id, // studentId -> user_id
      password: userData.password,
      user_type: userData.usertype === "학생" ? "s" : "t" // "학생"/"강사" -> "s"/"t"
    };

    console.log("Sending data:", formattedData); // 요청 데이터 확인용 로그

    const response = await fetch(`${API_URL}/login/`, {
      method: "POST", // POST 메소드로 로그인 요청
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 데이터 전송
      },
      body: JSON.stringify(formattedData), // 요청 본문에 사용자 데이터 포함
    });

    // 응답 상태가 2xx(성공)일 경우 처리
    if (!response.ok) {
      const data = await response.json(); // 오류 응답을 JSON으로 파싱
      if (response.status === 400) {
        // 400 상태에 대한 구체적인 처리
        if (data.error === "invalid user type") {
          throw new Error("학생/교사 여부 불일치");
        } else if (data.error === "invalid credentials") {
          throw new Error("잘못된 로그인 정보");
        } else {
          throw new Error("잘못된 요청");
        }
      } else {
        throw new Error(data.error || "로그인 실패");
      }
    }

    // 로그인 성공 시
    const data = await response.json(); // 서버의 응답을 JSON으로 파싱
    const accessToken = data.access_token; // 서버에서 반환한 access_token
    const refreshToken = data.refresh_token; //일단 저장
    console.log("Received access token:", accessToken);

    // access_token을 localStorage에 저장**(우선 refresh_token은 저장안함)
    localStorage.setItem("authToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return data.message || "로그인 성공"; // 성공 메시지 반환
  } catch (error) {
    console.error("Error during login:", error); // 오류 로그
    throw new Error("로그인 실패: " + error.message); // 실패 시 오류 메시지 반환
  }
};
