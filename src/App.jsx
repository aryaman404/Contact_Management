import axios from "axios";
import Contacts from "./Contacts";
import AddContact from "./AddContact";
import { useEffect, useState } from "react";
import "./App.css";

import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [showmodel, setShowmodel] = useState(false);
  const [reload, setreload] = useState(false);
  const [id, setid] = useState("");

  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const api = await axios.get(`${url}/home`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(api.data.contact);
      setContacts(api.data.contact);
    };
    fetchData();
  }, [reload]);
  console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

  const handleModal = () => {
    setShowmodel(!showmodel);
  };
  return (
    <>
      <ToastContainer />
      <AddContact
        handleModal={handleModal}
        showmodel={showmodel}
        url={url}
        reload={reload}
        setreload={setreload}
        id={id}
        setId={setid}
        contacts={contacts}
      />
      <Contacts
        contacts={contacts}
        url={url}
        reload={reload}
        setreload={setreload}
        setId={setid}
        handleModal={handleModal}
      />
    </>
  );
};

export default App;
