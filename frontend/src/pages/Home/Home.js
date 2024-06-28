import { React, useEffect, useState } from "react";
import Modal from "react-modal";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import axiosInstance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import EmptyCard from "../../components/EmptyCard";
import EmptyNoteImage from "../../assets/doc-add.svg";
import EmptySearchImage from "../../assets/no-data.svg";

const Home = () => {
  const [openAddEditNote, setOpenAddEditNote] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

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

  const getNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-notes");
      if (response.data && response.data.notes) {
        setNotes(response.data.notes);
      }
    }
    catch (error) {
      console.error("An error occurred while fetching notes: ", error);
    }
  };

  const handleEditNote = (noteDetail) => {
    setOpenAddEditNote({ isShown: true, type: "edit", data: noteDetail });
  }

  const handleDeleteNote = async (noteDetail) => {
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteDetail._id);
      if (response.data && response.data.message) {
        getNotes();
      }
    }
    catch (error) {
      console.error("An error occurred while deleting note: ", error);
    }
  }

  const handlePinNote = async (noteDetail) => {
    try {
      const response = await axiosInstance.put("/pin-note/" + noteDetail._id, {
        isPinned: !noteDetail.isPinned
      });
      if (response.data && response.data.note) {
        getNotes();
      }
    }
    catch (error) {
      console.error("An error occurred while pinning note: ", error);
    }
  }

  const handleSearchNotes = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query }
      });

      if (response.data && response.data.notes) {
        setNotes(response.data.notes);
        setIsSearch(true);
      }
    }
    catch (error) {
      console.error("An error occurred while searching notes: ", error);
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getNotes();
  }

  useEffect(() => {
    getUserInfo();
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearch={handleSearchNotes} onClearSearch={handleClearSearch} />

      <div className="container mx-auto px-6 py-2">
        {notes.length > 0 ?
          <div className="grid grid-cols-3 gap-4 mt-8">
            {notes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.date}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => { handleEditNote(item) }}
                onDelete={() => { handleDeleteNote(item) }}
                onPinNote={() => { handlePinNote(item) }}
              />
            ))}
          </div>
          : <EmptyCard imgSrc={isSearch ? EmptySearchImage : EmptyNoteImage} message={isSearch ? "No notes found matching your search." : "Start creating your first note! Click on the '+' button below to add a new note."} />
        }
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
          getNotes={getNotes}
        />
      </Modal>
    </>
  );
};

export default Home;
