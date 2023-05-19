import { useState } from "react";

function MemberRow(props) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentMember, setCurrentMember] = useState(props.member);

  function handleEdit() {
    setSelectedMember(currentMember.id);
    setCurrentMember({
      ...currentMember,
    });
  }

  function handleSave() {
    const updatedMember = {
      ...currentMember,
    };

    props.save(updatedMember);
    setSelectedMember(null);
  }

  return (
    <tr>
      <>
        <td>{props.place}</td>
        {selectedMember === currentMember.id ? (
          <td>
            <input
              type="text"
              value={currentMember.name || ""}
              onChange={(e) => {
                setCurrentMember({ ...currentMember, name: e.target.value.trim() });
              }}
            />
          </td>
        ) : (
          <td>{currentMember.name}</td>
        )}
        {selectedMember === currentMember.id ? (
          <td>
            <input
              type="text"
              value={currentMember.lastName || ""}
              onChange={(e) => {
                setCurrentMember({ ...currentMember, lastName: e.target.value.trim() });
              }}
            />
          </td>
        ) : (
          <td>{currentMember.lastName}</td>
        )}
        {selectedMember === currentMember.id ? (
          <td>
            <input
              type="text"
              value={currentMember.complaints || ""}
              onChange={(e) => {
                setCurrentMember({ ...currentMember, complaints: e.target.value.trim() });
              }}
            />
          </td>
        ) : (
          <td>{currentMember.complaints}</td>
        )}

        <td>
          <button className="button dlt" onClick={() => props.delete(currentMember.id)}>
            delete
          </button>
        </td>
        <td>
          {selectedMember === currentMember.id ? (
            <button className="button edit" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="button edit" onClick={handleEdit}>
              Edit
            </button>
          )}
        </td>
      </>
    </tr>
  );
}

export default MemberRow;
