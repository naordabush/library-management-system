import "../App.css";
import MemberId from "./MemberId";
import { useState } from "react";

function TableRow(props) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentBook, setCurrentBook] = useState(props.book);

  function handleEdit() {
    // props.onStartEdit(currentBook.id);
    setSelectedBook(currentBook.id);
    setCurrentBook({
      ...currentBook,
      memberId: currentBook.memberObject ? currentBook.memberObject.id : null,
    });
  }

  function handleSave() {
    //here!!!!!!!!!!!
    const updatedBook = {
      ...currentBook,
      memberId: currentBook.memberId === "Available" ? (currentBook.memberId = null) : currentBook.memberId,
    };

    props.save(updatedBook);
    setSelectedBook(null);
  }

  function handleMemberSelect(memberId) {
    setCurrentBook({ ...currentBook, memberId: memberId });
  }

  return (
    <tr class>
      <>
        <td>{props.place}</td>
        {
          /* props.editID === currentBook.id && */ selectedBook === currentBook.id ? (
            <td>
              <input
                type="text"
                value={currentBook.title || ""}
                onChange={(e) => {
                  setCurrentBook({ ...currentBook, title: e.target.value.trim() });
                }}
              />
            </td>
          ) : (
            <td>{currentBook.title}</td>
          )
        }
        {selectedBook === currentBook.id ? (
          <td>
            <input
              type="text"
              value={currentBook.genre || ""}
              onChange={(e) => {
                setCurrentBook({ ...currentBook, genre: e.target.value.trim() });
              }}
            />
          </td>
        ) : (
          <td>{currentBook.genre}</td>
        )}
        {selectedBook === currentBook.id ? (
          <td>
            <input
              type="text"
              value={currentBook.author || ""}
              onChange={(e) => {
                setCurrentBook({ ...currentBook, author: e.target.value.trim() });
              }}
            />
          </td>
        ) : (
          <td>{currentBook.author}</td>
        )}
        {selectedBook === currentBook.id ? (
          <td>
            <input
              type="text"
              value={currentBook.isbn || ""}
              onChange={(e) => {
                setCurrentBook({ ...currentBook, isbn: e.target.value.trim() });
              }}
            />
          </td>
        ) : (
          <td>{currentBook.isbn}</td>
        )}
        {selectedBook === currentBook.id ? (
          <td>
            <MemberId selectedMemberId={currentBook.memberId} onMemberSelect={handleMemberSelect} />
          </td>
        ) : (
          <td>{currentBook.memberObject ? currentBook.memberObject.id : "Available"}</td>
        )}
        <td>
          <button className="button dlt" onClick={() => props.delete(currentBook.id)}>
            delete
          </button>
        </td>
        <td>
          {selectedBook === currentBook.id ? (
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

export default TableRow;
