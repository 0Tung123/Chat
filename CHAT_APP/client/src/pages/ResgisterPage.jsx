import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helpers/uploadFile";
import axios from "axios";
import toast from "react-hot-toast";
function RegisterPage() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [uploadPhoto, setUploadPhoto] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    setUploadPhoto(file);

    const uploadPhoto = await uploadFile(file);

    setData((prevData) => ({
      ...prevData,
      profile_pic: uploadPhoto?.url,
    }));
  };

  console.log("upload", uploadPhoto);

  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
    setData((prevData) => ({
      ...prevData,
      profile_pic: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/register`;

    try {
      const response = await axios.post(URL, data);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        });

        navigate("/email");
      }
    } catch (error) {
      toast.error(error.response.data?.message);
    }
    console.log("data", data);
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md mx:2 rounded overflow-hidden p-4 md:mx-auto">
        <h3>Welcome to chat app!</h3>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 mt-5">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Profile:
              <div className="h-14 bg-slate-200 flex justify-center items-center border cursor-pointer rounded hover:border-primary">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {uploadPhoto?.name
                    ? uploadPhoto?.name
                    : "upload profile photo"}
                </p>
                {uploadPhoto?.name && (
                  <button
                    className="text-lg ml-2 bg-slate-200 hover:text-red-600 border-none"
                    onClick={handleClearUploadPhoto}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>

            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
              onChange={handleUploadPhoto}
            />
          </div>

          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-4 font-bold text-white leading-relaxed tracking-wide">
            Register
          </button>
        </form>

        <p className="my-3 text-center">
          Already have account ?{" "}
          <Link
            to={"/email"}
            className="text-black hover:text-primary font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
