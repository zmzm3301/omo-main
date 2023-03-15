import React, { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 border border-gray-300 shadow-xl rounded-xl">
      <div className="flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto ">
        <div className="w-full px-6 py-8 mt-5 text-black bg-white rounded shadow-md">
          <h1 className="mb-8 text-2xl text-center text-primary">Sign Up</h1>

          <input
            type="text"
            className="w-full p-3 mb-4 text-sm font-semibold bg-white input input-primary"
            name="email"
            value={email}
            placeholder="이메일"
          />
          <input
            type="text"
            className="w-full p-3 mb-4 text-sm font-semibold bg-white input input-primary"
            name="name"
            value={name}
            placeholder="이름"
          />
          <input
            type="password"
            className="w-full p-3 mb-4 text-sm font-semibold bg-white input input-primary"
            name="password"
            value={password}
            placeholder="비밀번호"
          />
          <input
            type="password"
            className="w-full p-3 mb-4 text-sm font-semibold bg-white input input-primary"
            name="confirm_password"
            placeholder="비밀번호 확인"
          />
          <hr className="mb-4 border-dashed " />
          <div className="flex">
            <input
              type="text"
              className="w-full p-3 mb-4 text-sm font-semibold bg-white input input-primary"
              name="year"
              placeholder="생년(4자)"
            />
            <select className="w-full mb-4 ml-1 mr-1 text-sm font-semibold bg-white input input-primary">
              <option value="">월(선택)</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="6">7</option>
              <option value="6">8</option>
              <option value="6">9</option>
              <option value="6">10</option>
              <option value="6">11</option>
              <option value="6">12</option>
            </select>

            <input
              type="text"
              className="w-full p-3 mb-4 text-sm font-semibold bg-white input input-primary"
              name="day"
              placeholder="일"
            />
          </div>
          <select className="w-full mb-4 text-sm font-semibold bg-white input input-primary">
            <option value="">성별(선택)</option>
            <option value="">남자</option>
            <option value="">여자</option>
          </select>

          <button
            type="submit"
            className="w-full btn btn-primary"
          >
            가입하기
          </button>
        </div>

        <div className="flex mt-6 text-grey-dark">
          <p className="font-semibold ">이미 가입을 하셨나요?</p>
          <p
            herf="#"
            className="ml-3 font-bold text-blue-700 underline underline-offset-2 hover:cursor-pointer"
          >
            <Link to="/login">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
