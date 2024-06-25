import { React, useEffect, useState } from "react";
import Modal from "react-modal";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import axiosInstance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [openAddEditNote, setOpenAddEditNote] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    }
    catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto px-6 py-2">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Test Note"
            date="18th June 2024"
            content="This is a test note"
            tags="#Test"
            isPinned={true}
            onEdit={() => { }}
            onDelete={() => { }}
            onPinNote={() => { }}
          />
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() =>
          setOpenAddEditNote({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditNote.isShown}
        onReqClose={() => { }}
        style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.3)" } }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        <AddEditNote
          type={openAddEditNote.type}
          data={openAddEditNote.data}
          onClose={() =>
            setOpenAddEditNote({ isShown: false, type: "add", data: null })
          }
        />
      </Modal>
    </>
  );
};

export default Home;
