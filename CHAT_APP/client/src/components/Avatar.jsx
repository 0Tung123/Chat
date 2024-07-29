// src/components/Avatar.jsx

import React, { useMemo } from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { useSelector } from "react-redux";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  const onlineUser = useSelector(state => state?.user?.onlineUser)


  const avarName = useMemo(() => {
    if (name) {
      const splitName = name?.split(" ");
      if (splitName.length > 1) {
        return splitName[0][0] + splitName[1][0];
      } else {
        return splitName[0][0];
      }
    }
    return "";
  }, [name]);

  const bgColor = useMemo(() => {
    const colors = [
      "bg-slate-200",
      "bg-teal-200",
      "bg-red-200",
      "bg-green-200",
      "bg-yellow-200",
      "bg-gray-200",
      "bg-cyan-200",
      "bg-sky-200",
      "bg-blue-200",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  const styles = {
    width: `${width}px`,
    height: `${height}px`,
  };

  const isOnline = onlineUser.includes(userId)

  return (
    <div
      className={`text-slate-800 rounded-full font-bold relative ${bgColor} flex justify-center items-center`}
      style={styles}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
          className="overflow-hidden rounded-full"
        />
      ) : name ? (
        <div
          style={styles}
          className="flex justify-center items-center text-lg"
        >
          {avarName}
        </div>
      ) : (
        <LuUserCircle2 size={width} />
      )}
      {
        isOnline &&(
          <div className="bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full"></div>
        )
      }
      
    </div>
  );
};

export default Avatar;
