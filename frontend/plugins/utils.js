export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const capitalizeFirst = (text) => {
  if (text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
};

export const capitalizeFirstWord = (words) => {
  if (words) {
    return words
      .split(" ")
      .map((word) => capitalizeFirst(word))
      .join(" ");
  }
};

export const statusClass = (status) => {
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