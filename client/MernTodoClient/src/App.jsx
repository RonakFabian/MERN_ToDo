import { useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const modal = useRef(null);
  const [users, setUsers] = useState([{}]);

  const [selectedUser, setSelectedUser] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  const [payload, setPayload] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const [updatePayload, setUpdatedPayload] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    fetch("http://localhost:3000/product", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    console.log(payload);

    try {
      const response = await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("Form submission successful:", data);
      fetchUserData();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/product/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log("Form submission successful:", data);
      fetchUserData();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleUpdateSend = async (e) => {
    e.preventDefault();
    console.log(updatePayload);

    try {
      const response = await fetch(
        `http://localhost:3000/product/${selectedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatePayload),
        }
      );
      const data = await response.json();
      console.log("Form submission successful:", data);
      fetchUserData();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleUpdateChangeInput = (e) => {
    const { name, value } = e.target;
    setUpdatedPayload({ [name]: value });
  };

  return (
    <>
      <h1>ToDo</h1>
      <form method="post" onSubmit={(e) => handleSend(e)}>
        <div>
          Usename:
          <input
            type="text"
            name="name"
            value={payload.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={payload.quantity}
            onChange={handleInputChange}
          />
        </div>
        <div>
          Price:
          <input
            type="number"
            name="price"
            value={payload.price}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <button type="submit">Send</button>
      </form>
      <div>
        {users.length > 0 && (
          <ul>
            {users.map((user) => (
              <li key={String(user._id)}>
                <h2> {user.name}</h2>
                <div> {user.quantity}</div>
                <div> {user.price}</div>
                <br />
                <button onClick={() => deleteTodo(String(user._id))}>
                  Delete
                </button>
                <button
                  onClick={() => {
                    modal.current.showModal();
                    setSelectedUser(user);
                  }}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <dialog ref={modal}>
        <div>Update</div>
        <form method="put" onSubmit={handleUpdateSend}>
          <div>
            Usename:
            <input
              type="text"
              name="name"
              defaultValue={selectedUser.name}
              onChange={handleUpdateChangeInput}
            />
          </div>
          <div>
            Quantity:
            <input
              type="number"
              name="quantity"
              defaultValue={selectedUser.quantity}
              onChange={handleUpdateChangeInput}
            />
          </div>
          <div>
            Price:
            <input
              type="number"
              name="price"
              defaultValue={selectedUser.price}
              onChange={handleUpdateChangeInput}
            />
          </div>
          <br />
          <button type="button" onClick={() => modal.current.close()}>
            Cancel
          </button>
          <button type="submit" onClick={() => modal.current.close()}>
            Edit
          </button>
        </form>
      </dialog>
    </>
  );
}

export default App;
