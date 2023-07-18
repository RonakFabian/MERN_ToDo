/* eslint-disable react/prop-types */
function Task({ user, fetchUserData }) {
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
  return (
    <>
      <li key={String(user._id)}>
        <h2> {user.name}</h2>
        <div> {user.quantity}</div>
        <div> {user.price}</div>
        <br />
        <button onClick={() => deleteTodo(String(user._id))}>Delete</button>
        {/* <button
          onClick={() => {
            modal.current.showModal();
            setSelectedUser(user);
          }}
        >
          Edit
        </button> */}
      </li>
    </>
  );
}

export default Task;
