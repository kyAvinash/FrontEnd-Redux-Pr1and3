import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "./booksSlice";
import BookList from "./BookList";

const BookView = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);
  useEffect(() => {
    dispatch(fetchBooks());
  }, []);
  //console.log(books);
  return (
    <>
      <h2 className="mt-4">Available Books</h2>
      <div>
        {status === "loading" && <p>Loading...</p>}
        {error && <p>Error:{error}</p>}
        {status === "success" && <BookList books={books} />}
      </div>
    </>
  );
};

export default BookView;
