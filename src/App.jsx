import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import BookView from "./features/book/BookView";
import BookForm from "./features/book/BookForm";

function App() {
  return (
    <>
      <Router>
        <header className="bg-light py-3 shadow-sm">
          <div className="container d-flex justify-content-between align-items-center">
          <h1 className="m-0">📚 Book List</h1>
            <nav>
              <ul className="nav">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className="nav-link text-dark"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? "bold" : "normal",
                    })}
                  >
                    Book List
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/addBook"
                    className="nav-link text-dark"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? "bold" : "normal",
                    })}
                  >
                    Add New Book
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<BookView />} />
            <Route path="/addBook" element={<BookForm />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
