import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";

const Contacts = ({ contacts, url, reload, setreload, setId, handleModal }) => {
  const deleteContact = async (id) => {
    const api = await axios.delete(`${url}/home/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("deleted data = ", api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
    setreload(!reload);
  };
  return (
    <>
      <div className="container my-5" style={{ width: "50vw" }}>
        {contacts.map((data) => (
          <div
            key={data._id}
            className="bg-black p-3 my-4"
            style={{
              borderRadius: "10px",
              border: "2px solid yellow",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div>
              <h1>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "34px",
                    fontVariationSettings:
                      "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    verticalAlign: "middle",
                    marginLeft: "2px",
                    padding: "10px",
                  }}
                >
                  account_circle
                </span>
                {data.name}
              </h1>
              <h2>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "32px",
                    fontVariationSettings:
                      "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    verticalAlign: "middle",
                    marginLeft: "2px",
                    padding: "10px",
                  }}
                >
                  phone_in_talk
                </span>
                {data.gmail}
              </h2>
              <h3>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "32px",
                    fontVariationSettings:
                      "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    verticalAlign: "middle",
                    marginLeft: "2px",
                    padding: "10px",
                  }}
                >
                  mail
                </span>{" "}
                {data.phone}
              </h3>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <button
                className="btn btn-primary"
                onClick={() => {
                  setId(data._id), handleModal();
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteContact(data._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Contacts;
