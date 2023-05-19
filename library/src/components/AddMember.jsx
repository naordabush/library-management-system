import { useState } from "react";

function AddMember(props) {
  const [newMember, setNewMember] = useState({
    id: "",
    name: "",
    lastName: "",
    complaints: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  }

  function handleSave() {
    props.save(newMember);
  }

  return (
    <tr>
      <td>
        <p>ID</p>
      </td>
      <td>
        <input type="text" name="name" value={newMember.name} onChange={handleChange} />
      </td>
      <td>
        <input type="text" name="lastName" value={newMember.lastName} onChange={handleChange} />
      </td>
      <td>
        <input type="text" name="complaints" value={newMember.complaints} onChange={handleChange} />
      </td>
      <td>
        <button className="button dlt" onClick={props.onCancel}>
          Cancel
        </button>
      </td>
      <td>
        <button className="button edit" onClick={handleSave}>
          Save
        </button>
      </td>
    </tr>
  );
}

export default AddMember;
