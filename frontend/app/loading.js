import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
  return (
    <div style={{ width: "100px", margin: "auto", display: "block" }}>
      <ClipLoader color="#52bf" size={100} />
    </div>
  );
}
