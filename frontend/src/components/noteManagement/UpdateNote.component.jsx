import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../form.css";

const UpdateNote = () => {
const { state } = useLocation();

  const [title, setTitle] = useState(state?.title);
  const [description, setDescription] = useState(state?.description);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /**
   * When the user clicks the update button, prevent the default action, then send a Put request to the
   * server with the note's updated data, and if successful, navigate to the home page.
   */
  const UpdateNote = async (e) => {
    e.preventDefault();
    try {
      /* Creating an object with the title and description. */
      const UpdateNoteData = {
        title,
        description,
      };

/* Setting the loading state to true. */
      setLoading(true);

      /* Sending a Put request to the server with the note's updated data. */
      const result = await axios.put(
        "http://localhost:8000/notes/update/" + state._id,
        UpdateNoteData
      );

      /* Checking if the status of the response is 201, if it is, it is setting the loading state to
      false, alerting the user with the message from the server, and navigating to the home page. */
      if (result?.status === 201) {
        setLoading(false);
        alert(result?.data?.Message);
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      console.error(err?.response?.data?.errorMessage);
      alert(err?.response?.data?.errorMessage);
    }
  };

  return (
    <div className="main-note">
      <div className="sub-main">
        <h1>Update Note</h1>
        <hr />
        <form onSubmit={UpdateNote}>
          <div>
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="form-control"
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              type="text"
              rows="10"
              required
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="form-control"
            />
          </div>
          <div>
            <button className="button" type="submit">
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-m"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Updating...</span>
                </>
              ) : (
                "Update Note"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateNote;
