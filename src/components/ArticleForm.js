import { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";

import { createTodo } from "../graphql/mutations";

const ArticleForm = ({ formData }) => {
  const [inputs, setInputs] = useState({ ...formData });
  const { id, headline, date, category, article } = inputs;

  const [toastMsg, setToastMsg] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);

    if (headline && date && article && category) {
      if (id) return;
      addTodo({ headline, date, category, article });
    }
  }

  async function addTodo(data) {
    setSubmitting(true);
    try {
      await API.graphql(graphqlOperation(createTodo, { input: data }));
      setSubmitted(false);
      setInputs(formData);
      setSubmitting(false);
      setToastMsg(true);

      setTimeout(() => {
        setToastMsg(false);
      }, 2000);
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  return (
    <div className="container">
      <form
        className="p-3 d-flex mx-auto shadow-sm mt-4 justify-content-between flex-column gap-3"
        style={{ maxWidth: "600px" }}
        onSubmit={handleSubmit}
      >
        <h2>Add New Article</h2>

        {toastMsg && (
          <div
            className="alert alert-info alert-dismissible fade show m-0"
            role="alert"
          >
            <strong>Record Added Succesfully</strong>
          </div>
        )}

        <div className="form-group">
          <input
            onChange={handleChange}
            value={headline}
            name="headline"
            placeholder="Headline"
            className={
              "form-control" + (submitted && !headline ? " is-invalid" : "")
            }
          />
          {submitted && !headline && (
            <div className="invalid-feedback">Headline is required</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="date"
            onChange={handleChange}
            value={date}
            name="date"
            placeholder="Date"
            className={
              "form-control" + (submitted && !date ? " is-invalid" : "")
            }
          />
          {submitted && !date && (
            <div className="invalid-feedback">Date is required</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="category"
            onChange={handleChange}
            value={category}
            name="category"
            placeholder="Category"
            className={
              "form-control" + (submitted && !category ? " is-invalid" : "")
            }
          />
          {submitted && !category && (
            <div className="invalid-feedback">Category is required</div>
          )}
        </div>

        <div className="form-group">
          <textarea
            maxLength="100"
            rows="5"
            onChange={handleChange}
            value={article}
            name="article"
            placeholder="Article"
            className={
              "form-control" + (submitted && !article ? " is-invalid" : "")
            }
          ></textarea>
          {submitted && !article && (
            <div className="invalid-feedback">Article is required</div>
          )}
        </div>
        <div>
          <button className="btn btn-primary float-end" disabled={submitting}>
            {submitting && (
              <span className="spinner-border spinner-border-sm me-1"></span>
            )}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
