import { useState } from "react";
import MemberId from "./MemberId";

function AddBook(props) {
  const [newBook, setNewBook] = useState({
    title: "",
    genre: "",
    author: "",
    isbn: "",
    memberId: null,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  }

  function handleSave() {
    props.save(newBook);
  }

  return (
    //if i want to pass this option after to another page i will have to create a complete table + table head and table body.
    <tr>
      <td>
        <p>fetching ID from DB</p>
      </td>
      <td>
        <input type="text" name="title" value={newBook.title} onChange={handleChange} />
      </td>
      <td>
        <input type="text" name="genre" value={newBook.genre} onChange={handleChange} />
      </td>
      <td>
        <input type="text" name="author" value={newBook.author} onChange={handleChange} />
      </td>
      <td>
        <input type="text" name="isbn" value={newBook.isbn} onChange={handleChange} />
      </td>
      <td>
        <MemberId selectedMemberId={newBook.memberId} onMemberSelect={(memberId) => setNewBook({ ...newBook, memberId })} />
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

export default AddBook;
