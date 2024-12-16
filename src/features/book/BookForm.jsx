import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addBookAsync, updateBookAsync } from "./booksSlice";
import { useLocation } from "react-router-dom";

const BookForm = () => {
  const dispatch = useDispatch();
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const location = useLocation();
  const { book } = location.state || {};

  //console.log({book});

  useEffect(() => {
    if (book) {
      setIsEditing(true);
      setBookName(book.bookName);
      setAuthor(book.author);
      setGenre(book.genre);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { bookName, author, genre };

    if (book) {
      dispatch(updateBookAsync({ id: book._id, updatedBook: newBook }));
      setSuccess("Book updated successfully!");
    } else {
      dispatch(addBookAsync(newBook));
      setSuccess("Book added successfully!");
    }

    setBookName("");
    setAuthor("");
    setGenre("");

    setTimeout(() => setSuccess(null), 5000);
  };

  return (
    <>
      <h2>{isEditing ? "Update Book Data" : "Add Book Data"}</h2>
      {/* Success Message */}
      {success && (
        <div className="alert alert-success mt-3" role="alert">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label" htmlFor="bookName">
            Book Name
          </label>
          <input
            type="text"
            className="form-control"
            value={bookName}
            id="bookName"
            onChange={(e) => setBookName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="author">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            value={author}
            id="author"
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="genre">
            Genre
          </label>
          <input
            type="text"
            className="form-control"
            value={genre}
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update Book" : "Add Book"}
        </button>
      </form>
    </>
  );
};

export default BookForm;
