// eslint-disable-next-line no-unused-vars
import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './managerstyle.css';

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const passwordRef = useRef();
  const ref = useRef();
  const displayRef = useRef();

  const isFormValid = form.site && form.username && form.password;

  const showPassword = () => {
    // alert("Password will be showed")

    if (ref.current.src.includes("public/icons/show.svg")) {
      ref.current.src = "public/icons/hide.svg";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "public/icons/show.svg";
      passwordRef.current.type = "text";
    }
  };

  const showPasswordDisplay = () => {
    toast.warning("Beware! Passwords are shown", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setIsPasswordVisible(!isPasswordVisible); // Toggle password visibility
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  //SAVING WHOLE FORM
  const savePassword = () => {
    toast.info(" Information saved successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // Save the password to the array and localStorage
    const newPassword = { ...form, id: uuidv4() };
    setpasswordArray([...passwordArray, newPassword]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, newPassword])
    );

    // Clear the form fields after saving
    setform({ site: "", username: "", password: "" });
  };

  // COPY FUNCTION
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info(" Username is copied", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  //EDIT PASSWORD
  const editPassword = (id) => {
    console.log("Editing password with id", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  //DELETE PASSWORD
  const deletePassword = (id) => {
    toast.info(" Password is Deleted", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("Deleting password with id", id);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id !== id))
    );
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <div className="pt-2 container max-w-3xl  mx-auto border shadow-purple-600 shadow-md mt-10 firstdiv">
        <h1 className="ml-6 font-bold text-3xl text-center  ">
          <span className="text-purple-700">&lt;</span>PassKeeper
          <span className="text-purple-700">&gt;</span>
        </h1>
        <h3 className="ml-20">Personal Password Manager</h3>
        <div className=" flex flex-col p-4 items-center text-black">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full border border-purple-500 w-full p-4 py-1 "
            type="text"
            name="site"
            id=""
            placeholder="Enter Website URL"
          />

          <div className="flex w-full">
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              className="border w-2/3 mt-2 rounded-full border-purple-500 p-4 py-1"
              type="text"
              placeholder="Enter Username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                name="password"
                className="border w-full mt-2 ml-2 rounded-full border-purple-500 p-4 py-1"
                type="password"
                placeholder="Enter Password"
              />
              <span className="absolute top-4 right-0">
                <img
                  ref={ref}
                  onClick={showPassword}
                  src="public/icons/hide.svg"
                  alt="hide"
                />
              </span>
            </div>
          </div>

          <button
            disabled={!isFormValid}
            onClick={savePassword}
            className="flex justify-center items-center bg-purple-700 text-white hover:bg-purple-500 rounded-full w-fit px-1 py-1 mt-2 pr-4"
          >
            <lord-icon
              src="https://cdn.lordicon.com/ftndcppj.json"
              colors="primary:#8930e8,secondary:#ebe6ef"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
      </div>

      {/* **************************************** */}
      <div className="passwords min-h-60 max-h-60 w-full overflow-y-scroll border border-black">
  {passwordArray.length === 0 && (
    <div className="text-center text-xl mt-6">No Passwords to display</div>
  )}
  {passwordArray.length !== 0 && (
    <table className="table-auto w-full sm:w-2/3 m-6 mx-auto pl-4 seconddiv border border-black">
      <thead className="bg-purple-700 text-white">
        <tr>
          <th className="p-2">Site</th>
          <th className="p-2">Username</th>
          <th className="p-2">Passwords</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>

      <tbody className="text-center">
        {passwordArray.map((item) => {
          return (
            <tr key={item.id} className="border-b">
              {/* SITE */}
              <td className="px-4 py-2">
                <a
                  className="block truncate text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={item.site}
                >
                  {item.site}
                </a>
              </td>

              {/* USERNAME */}
              <td className="pr-2">
                <button className="flex gap-3 tooltip">
                  {item.username.length > 10 ? (
                    <>
                      {item.username.slice(0, 10)}...
                      <span className="tooltiptext">{item.username}</span>
                    </>
                  ) : (
                    item.username
                  )}
                  <img
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the button's event
                      copyToClipboard(item.username);
                    }}
                    className="w-4 hover:bg-purple-300"
                    src="public/icons/copy.svg"
                    
                  />
                </button>
              </td>

              {/* PASSWORD */}
              <td className="flex items-center justify-center gap-3 px-4 py-2">
                <span>
                  {isPasswordVisible
                    ? item.password
                    : "*".repeat(item.password?.length || 0)}
                </span>
                <img
                  ref={displayRef}
                  onClick={showPasswordDisplay}
                  className="w-4 hover:bg-purple-300 cursor-pointer"
                  src={
                    isPasswordVisible
                      ? "public/icons/hide.svg"
                      : "public/icons/show.svg"
                  }
                  
                />
              </td>

              {/* ACTIONS */}
              <td className="px-4 py-2">
                <div className="flex justify-center gap-2 sm:gap-4">
                  <span
                    onClick={() => editPassword(item.id)}
                    className="cursor-pointer"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/exymduqj.json"
                      trigger="hover"
                      colors="primary:#121331,secondary:#c7166f"
                      style={{ width: "24px", height: "24px" }} // Smaller size for smaller screens
                    ></lord-icon>
                  </span>
                  <span
                    onClick={() => deletePassword(item.id)}
                    className="cursor-pointer"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/hwjcdycb.json"
                      trigger="hover"
                      colors="primary:#121331,secondary:#c7166f"
                      style={{ width: "24px", height: "24px" }} // Smaller size for smaller screens
                    ></lord-icon>
                  </span>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )}
</div>


    </>
  );
};

export default Manager;
