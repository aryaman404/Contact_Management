import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";

const AddContact = ({
  handleModal,
  showmodel,
  url,
  reload,
  setreload,
  id,
  setId,
  contacts,
}) => {
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (id) {
      for (let i = 0; i < contacts.length; i++) {
        if (id === contacts[i]._id) {
          setName(contacts[i].name);
          setGmail(contacts[i].gmail);
          setPhone(contacts[i].phone);
        }
      }
    }
  }, [id]);

  const submithandler = async (e) => {
    e.preventDefault();
    // console.log(name, gmail, phone);

    if (id) {
      // send data to api
      const api = await axios.put(
        `${url}/home/${id}`,
        { name, gmail, phone },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
    } else {
      // send data to api
      const api = await axios.post(
        `${url}/home`,
        { name, gmail, phone },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
    }

    setName("");
    setGmail("");
    setPhone("");
    setreload(!reload);
    handleModal();
    setId("");
  };
  useEffect(() => {
    // Prevent Bootstrap from handling modal display (since we're controlling it with React state)
    document.body.classList.toggle("modal-open", showmodel);
  }, [showmodel]);

  return (
    <>
      <div className="container mt-5" style={{ width: "10vw" }}>
        <button className="btn btn-warning" onClick={handleModal}>
          Add Contact
          {/* Add Contact */}
        </button>

        {/* Bootstrap Modal */}
        {showmodel && (
          <div
            className="modal fade show"
            tabIndex="-1"
            role="dialog"
            style={{
              display: "block",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Background overlay
            }}
          >
            <div className="modal-dialog" role="document">
              <div
                className="modal-content bg-dark p-3"
                style={{ border: "2px solid yellow" }}
              >
                <div className="modal-title fs-5 text-center w-100">
                  <h1 className="modal-title fs-5">
                    {" "}
                    {id ? "Edit Contact" : "Add Contact"}
                  </h1>
                </div>
                <hr className="w-100 my-2" />
                <div className="modal-body">
                  <form onSubmit={submithandler}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        G-mail
                      </label>
                      <input
                        type="gmail"
                        className="form-control"
                        id="exampleInputPassword"
                        value={gmail}
                        onChange={(e) => setGmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="modal-title fs-5 text-center w-100">
                      {id ? (
                        <button
                          type="submit"
                          className="btn btn-primary mx-2 my-1"
                        >
                          Edit Contact
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-primary mx-2 my-1"
                        >
                          Add Contact
                        </button>
                      )}

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddContact;
