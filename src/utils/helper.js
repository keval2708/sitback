import moment from "moment";
import { decodeData } from "@/utils/jwt";

export const getDateRange = (month, type = "month") => {
  if (month === 0) {
    return {
      start_date: moment().startOf(type).format("DD/MM/YYYY"),
      end_date: moment().endOf(type).format("DD/MM/YYYY"),
    };
  } else if (month > 0) {
    return {
      start_date: moment().add(month, type).startOf(type).format("DD/MM/YYYY"),
      end_date: moment().add(month, type).endOf(type).format("DD/MM/YYYY"),
    };
  } else {
    return {
      start_date: moment()
        .subtract(month * -1, type)
        .startOf(type)
        .format("DD/MM/YYYY"),
      end_date: moment()
        .subtract(month * -1, type)
        .endOf(type)
        .format("DD/MM/YYYY"),
    };
  }
};

export const getLabelFromValue = (key, array) => {
  if (!key) return "";
  return array.find((item) => item.value === key).label;
};

export const convertToHoursAndMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const paddedHours = hours.toString().padStart(2, "0");

  const remainingMinutes = minutes % 60;
  const paddedMinutes = remainingMinutes.toString().padStart(2, "0");

  const hoursText = hours > 0 ? `${paddedHours} hr${hours > 1 ? "s" : ""}` : "";
  const minutesText =
    remainingMinutes > 0
      ? `${paddedMinutes} min${remainingMinutes > 1 ? "s" : ""}`
      : "";

  return `${hoursText} ${minutesText}`.trim();
};

export const setImageUpload = (e) => {
  let file;
  let fileObj;
  let fileName;

  if (e.target.files[0]) {
    file && URL.revokeObjectURL(file);
    file = URL?.createObjectURL(e.target.files[0]);

    fileObj = e.target.files[0];
    fileName = e.target.files[0].name;
    fileObj.extension = fileName.substring(fileName.lastIndexOf(".") + 1);

    let type = fileObj["type"].split("/");
    // fileObj.type=type
    fileObj.isImage = type[0] == "image" ? true : false;
  }

  return {
    file,
    fileObj,
    fileName,
  };
};

export const getDateTime = (date, dateFormat) => {
  return {
    date: moment(new Date(date).toISOString().split("T")[0]).format(dateFormat),
  };
};

export const checkLogin = async (token) => {
  let id;
  let isSubscribe;
  let spaType;
  let employeeType;

  if (token) {
    const data = await decodeData(token, process.env.SECRET_KEY);
    // console.log("checkLogin data", data);
    id = data.id;
    isSubscribe = data.isSubscribe;
    spaType = data.spa_type;
    employeeType = data.employeeType;
  }
  return {
    id,
    isSubscribe,
    spaType,
    employeeType,
  };
};

export const generateHourMinute = (hour = 24, minute = 60) => {
  let r_hour = [], r_minute = [];

  r_hour = Array.from(Array(hour).keys());
  r_minute = Array.from(Array(minute).keys());

  return {
    r_hour,
    r_minute
  }
};

// --- helper function ---
export const getSocketId = () => {
  try {
    return (
      window.io?.socket?.id ||
      window.io?.socket?._raw?.id ||
      window.io?._raw?.id ||
      window.socketId ||
      localStorage.getItem("socketId")
    );
  } catch {
    return null;
  }
};
