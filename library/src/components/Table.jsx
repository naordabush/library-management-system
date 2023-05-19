import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableRow from "./TableRow";
import AddBook from "./AddBook";
import axios from "axios";

function Table(props) {
  const navigate = useNavigate();

  const [bookList, setBookList] = useState([]);
  const [isAddBook, setIsAddBook] = useState(false);

  const [isError, setIsError] = useState("");
  const [isSuccess, setIsSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [searchCategory, setSearchCategory] = useState("Title"); //State for search category

  //const [editID, setEditID] = useState(null);
  /* 
  function startEdit(id) {
    setEditID(id);
  }
  function cancelEdit() {
    setEditID(null);
  } */

  const filteredBooks = bookList.filter((book) => {
    if (searchCategory === "Member ID") {
      if (searchTerm.toLowerCase() === "") {
        return !book.memberObject || !book.memberObject.id;
      } else {
        return book.memberObject && book.memberObject.id && book.memberObject.id.toString().includes(searchTerm.toLowerCase());
      }
    } else {
      return book[searchCategory.toLowerCase()].toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  // Filter the book list based on the search term

  const RenderTable = () => (
    <>
      {filteredBooks.map((book, index) => (
        <TableRow
          key={book.id}
          book={book}
          place={index + 1} // Calculate the place number
          delete={(id) => {
            deleteRow(id);
          }}
          modify={book.id}
          save={(currentBook) => saveRow(currentBook)}
        />
      ))}
    </>
  );

  function handleSearch(event) {
    setSearchTerm(event.target.value); // Update the search term state with the input value
  }

  function handleSearchCategory(event) {
    setSearchCategory(event.target.value); // Update the search category state with the selected option
  }

  async function addBook(data) {
    if (!data.title || !data.genre || !data.author || !data.isbn) {
      return;
    }

    try {
      const requestData = {
        title: data.title,
        genre: data.genre,
        author: data.author,
        isbn: data.isbn,
      };
      if (data.memberId) {
        requestData.memberObject = { id: data.memberId };
      }
      let response = await axios.post("http://localhost:8080/books/add", requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
        body: JSON.stringify(requestData),
      });

      // setBookList((prevBookList) => [...prevBookList, data]);
      setIsAddBook(false);
      fetchBookList();
      if (response.status === 200) {
        setIsError("");
        setIsSuccess("The book was added successfully");
      } else {
        setIsSuccess("");
        setIsError("The book is already exist! please add another one.");
      }
      setTimeout(() => {
        setIsSuccess("");
        setIsError("");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  async function saveRow(data) {
    try {
      const requestData = {
        id: data.id,
        title: data.title,
        genre: data.genre,
        author: data.author,
        isbn: data.isbn,
      };

      if (data.memberId) {
        requestData.memberObject = { id: data.memberId };
      }
      let response = await axios.put("http://localhost:8080/books/edit", requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
        body: JSON.stringify(requestData),
      });

      /*  setBookList((prevBookList) => {
        const updatedList = prevBookList.map((book) => {
          if (book.id === data.id) {
            return data;
          }
          return book;
        });
        return updatedList;
      }); */
      fetchBookList();
      if (response.status === 200) {
        setIsError("");
        setIsSuccess("The book was modified successfully");
      } else {
        setIsSuccess("");
        setIsError("couldn't update the book! please try again.");
      }
      setTimeout(() => {
        setIsSuccess("");
        setIsError("");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteRow(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) {
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:8080/books/remove/${id}`, {
        headers: { Authorization: sessionStorage.getItem("token") },
      });
      /*      setBookList((prevBookList) => {
        const updatedList = prevBookList.filter((book) => book.id !== id);
        return updatedList;
      }); */
      fetchBookList();
      if (response.status === 200) {
        setIsError("");
        setIsSuccess("The book was deleted successfully");
      } else {
        setIsSuccess("");
        setIsError("couldn't delete the book! please try again.");
      }
      setTimeout(() => {
        setIsSuccess("");
        setIsError("");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }
  function handleMemberTable() {
    navigate("/members");
  }

  async function fetchBookList() {
    axios
      .get("http://localhost:8080/books/all", { headers: { Authorization: sessionStorage.getItem("token") } })
      .then((response) => {
        setBookList([...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*   const RenderTable = () => (
    <>
      {bookList.map((book) => (
        <>
          <TableRow
            key={book.id}
            book={book}
            delete={(id) => {
              deleteRow(id);
            }}
            modify={book.id}
            save={(currentBook) => saveRow(currentBook)}
          />
        </>
      ))}
    </>
  ); */

  function handleAddBook() {
    setIsAddBook(true);
  }

  function handleCancelAddBook() {
    setIsAddBook(false);
  }

  useEffect(() => {
    fetchBookList();
  }, []);

  return (
    <div className="container">
      <h1>Book List</h1>

      <div className="search-container">
        <input type="text" placeholder="Search by..." value={searchTerm} onChange={handleSearch} />

        <select value={searchCategory} onChange={handleSearchCategory}>
          <option value="Title">Title</option>
          <option value="Genre">Genre</option>
          <option value="Author">Author</option>
          <option value="ISBN">ISBN</option>
          <option value="Member ID">Member ID</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Member ID</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <RenderTable />
          {isAddBook ? <AddBook onCancel={handleCancelAddBook} save={addBook} /> : null}
        </tbody>
      </table>
      <div className="button-container">
        <button className="button logout" onClick={handleLogout}>
          Logout
        </button>
        <button className="button add_book" onClick={handleAddBook}>
          Add Book
        </button>
        <button className="button memberList" onClick={handleMemberTable}>
          member list
        </button>
      </div>
      {isError ? <p className="error">{isError}</p> : null}
      {isSuccess ? <p className="success">{isSuccess}</p> : null}
    </div>
  );
}

export default Table;
