import React from "react";

const ProfileInfo = ({ onLogout }) => {
  const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    words.forEach((word) => {
      initials += word[0];
    });

    return initials.toLocaleUpperCase();
  };

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 bg-slate-100 font-medium">
        {getInitials("John Doe")}
      </div>
      <div>
        <p className="text-sm font-medium">John Doe</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
