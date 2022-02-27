import "./App.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

function App() {
  const [contact, setContact] = useState({
    name: "",
    descr: "",
    number: "",
  });
  const [contacts, setContacts] = useState([
    {
      name: "",
      number: "",
      descr: "",
      _id: "",
    },
  ]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateContact, setUpdateContact] = useState({
    name: "",
    number: "",
    descr: "",
    id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    // console.log(contact);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { name, descr, number } = contact;
    const newContact = {
      name,
      descr,
      number,
    };
    axios.post("/newContact", newContact);
    toast.success("Contact student was added succesfully");
    setContact({
      name: "",
      descr: "",
      number: "",
    });
  };

  const deleteContact = (id) => {
    axios.delete("/delete/" + id);
    toast.error("Contact was deleted succesfully");
  };

  useEffect(() => {
    fetch("/contacts")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((result) => setContacts(result))
      .catch((err) => {
        console.log(err);
      });
  }, [contacts]);
  const updateHandler = (id) => {
    setIsUpdate(true);
    setUpdateContact((prev) => {
      return {
        ...prev,
        id: id,
      };
    });
  };
  const updateContactHandler = (id) => {
    axios.put("/put/" + id, updateContact);
    toast.update("Contact was updated succesfully");
  };
  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateContact((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      <ToastContainer />
      <Navbar />
      {!isUpdate ? (
        <form className="w-50 m-auto">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Enter Your Name
            </label>
            <input
              onChange={handleChange}
              name="name"
              value={contact.name}
              type="text"
              className="form-control"
              id="name"
              autoComplete="off"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Enter Your Number
            </label>
            <input
              onChange={handleChange}
              name="number"
              value={contact.number}
              type="number"
              className="form-control"
              id="number"
              autoComplete="off"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descr" className="form-label">
              Description
            </label>
            <textarea
              onChange={handleChange}
              name="descr"
              value={contact.descr}
              className="form-control"
              id="descr"
            ></textarea>
          </div>
          <button onClick={submitHandler} className="btn btn-primary">
            Submit
          </button>
        </form>
      ) : (
        <form className="w-50 m-auto">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Enter Your Name
            </label>
            <input
              onChange={handleUpdate}
              name="name"
              value={updateContact.name}
              type="text"
              className="form-control"
              id="name"
              autoComplete="off"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Enter Your Number
            </label>
            <input
              onChange={handleUpdate}
              name="number"
              value={updateContact.number}
              type="number"
              className="form-control"
              id="number"
              autoComplete="off"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descr" className="form-label">
              Description
            </label>
            <textarea
              onChange={handleUpdate}
              name="descr"
              value={updateContact.descr}
              className="form-control"
              id="descr"
            ></textarea>
          </div>
          <button
            onClick={() => updateContactHandler(updateContact.id)}
            className="btn btn-primary"
          >
            Change
          </button>
        </form>
      )}

      {!isUpdate ? (
        <table className=" container table table-dark table-hover table-striped mt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Number</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((item, index) => {
              return (
                <tr key={item._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.number}</td>
                  <td>{item.descr}</td>
                  <td>
                    <button
                      onClick={() => deleteContact(item._id)}
                      className="btn btn-outline-danger mx-1"
                    >
                      DELETE
                    </button>
                    <button
                      onClick={() => updateHandler(item._id)}
                      className="btn btn-success"
                    >
                      UPDATE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </>
  );
}

export default App;
