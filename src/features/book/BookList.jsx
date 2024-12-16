import { useDispatch } from "react-redux";
import { deleteBookAsync } from "./booksSlice";
import { Link } from "react-router-dom";

const BookList = ({ books = [] }) => {
  const dispatch = useDispatch();
  //console.log(books);

  const handleDelete = async (id) => {
    //console.log(id);
    await dispatch(deleteBookAsync(id));
  };

  return (
    <>
      {books.length === 0 ? (
        <p className="text-muted mt-3">
          No books available. Please add a new book.
        </p>
      ) : (
        <ul className="list-group mt-3">
          {books.map((book) => (
            <li
              key={book._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{book.bookName}</strong> <br />
                <span className="text-muted">Author: {book.author}</span> <br />
                <span className="text-muted">Genre: {book.genre}</span>
                <br />
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>{" "}
                <Link
                  to="/addBook"
                  state ={{book}}
                  className="btn btn-warning btn-sm"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default BookList;
