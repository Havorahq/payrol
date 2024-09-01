import moment, { MomentInput } from "moment";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const capitalizeFirst = (text: string) => {
  if (text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
};

export const capitalizeFirstWord = (words: string) => {
  if (words) {
    return words
      .split(" ")
      .map((word) => capitalizeFirst(word))
      .join(" ");
  }
};

// export const formatDate = (date: MomentInput, type?: string) => {
//   const dateObject = moment(date, "DD-MM-YYYY HH:mm:ss");
//   const formattedDate =
//     type === "date"
//       ? dateObject.format("MMMM D, YYYY")
//       : dateObject.format("MMMM D, YYYY h:mm A");
//   return formattedDate;
// };

export const formatDate = (date: string, type?: string) => {
  const dateObject = moment(date);
  const formattedDate =
    type === "date"
      ? dateObject.format("MMMM D, YYYY")
      : dateObject.format("MMMM D, YYYY h:mm A");
  return formattedDate;
};

export const getInitials = (name: string) => {
  const words = name.trim().split(" ");
  const initials = words.map((word) => word[0].toUpperCase()).join(".");
  return initials;
}


export const tokenOptions = [
  { value: "USDT", label: "USDT" },
  { value: "USDC", label: "USDC" },
  { value: "DAI", label: "DAI" },
];

export const statusClass = (status: string) => {
  switch (status?.toUpperCase()) {
    case "ACTIVE":
      return "tabactive";
      break;
    case "SUCCESSFUL":
      return "tabactive";
      break;
    case "PENDING":
      return "tabpending";
      break;
    case "FAILED":
      return "tabinactive";
      break;
    case "DECLINED":
      return "tabinactive";
      break;
    case "DISABLED":
      return "tabinactive";
      break;
    default:
      break;
  }
};
