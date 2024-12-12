import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { history } from "../../store/config";
import formActions from "./../../store/actions/formActions";
import axios from "axios";
import "./FormResponse.css";

const FormResponse = () => {
  let { id } = useParams();

  const dispatch = useDispatch();
  const { data: form } = useSelector((state) => state.form);
  const { action } = useSelector((state) => state.form);
  const [response, setResponse] = useState({});
  const [isError, setIsError] = useState(false);
  const [categories, setCategories] = useState([]);
  let formData = useRef(null);
  useEffect(() => {
    dispatch(formActions.getForm(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (action === formActions.SAVE_RESPONSE_SUCCESS) {
      history.go(-1);
    }
  }, [action]);
  useEffect(() => {
    if (Object.keys(form).length > 0) {
      const initialCategories = form.formJson.body.categories.map(
        (category) => {
          return {
            name: category.name,
            items: [...category.items],
          };
        }
      );
      setCategories(initialCategories);
      formData.current = JSON.parse(JSON.stringify(form.formJson.body));
    }
  }, [form]);

  const saveResponse = async () => {
    try {
      const responseJson = {
        id: id,
        response: {
          categories: categories,
          clozeOptions: formData.current.clozeOptions.map(() => false),
          comprehensionOptions: formData.current.comprehensionQuestions.map(
            () => ""
          ),
        },
      };

      await axios.post("/saveResponse", responseJson);
      window.alert("Response saved successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const resetResponse = () => {
    setResponse({});
    setIsError(false);

    if (!!Object.keys(form).length > 0) {
      const initialCategories = formData.current?.categories.map((category) => {
        return {
          name: category.name,
          items: [...category.items],
        };
      });
      setCategories(initialCategories);
    }

    const clozeOptionInputs = document.querySelectorAll(".cloze-options input");
    clozeOptionInputs.forEach((input) => {
      input.checked = false;
    });

    const comprehensionOptionInputs = document.querySelectorAll(
      ".comprehension-options input"
    );
    comprehensionOptionInputs.forEach((input) => {
      input.checked = false;
    });
  };

  const handleCategoryItemDrop = (e, targetCatIndex) => {
    e.preventDefault();

    const itemId = e.dataTransfer.getData("itemId");
    const sourceCatIndex = categories.findIndex((cat) =>
      cat.items.includes(itemId)
    );

    if (sourceCatIndex !== -1) {
      const updatedCategories = [...categories];
      const itemIndex = updatedCategories[sourceCatIndex].items.indexOf(itemId);

      updatedCategories[sourceCatIndex].items.splice(itemIndex, 1);

      updatedCategories[targetCatIndex].items.push(itemId);

      setCategories(updatedCategories);
    }
  };

  const handleCategoryItemDragStart = (e, item, sourceCatIndex) => {
    console.log("Drag start:", item, sourceCatIndex);
    e.dataTransfer.setData("itemId", item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="form-container" onFocus={() => setIsError(false)}>
        {!!Object.keys(form).length > 0 && (
          <>
            <div className="form-header">
              <span className="response-form-title">
                {form?.formJson?.title}
              </span>
            </div>
            {categories?.length > 0 && (
              <>
                <h2>Question</h2>
                <h3>Put the items in the right categories.</h3>
                {categories?.map(
                  (category, catIndex) =>
                    category.items.length > 0 && (
                      <div key={catIndex} className="category-container">
                        <h2>{category?.name}</h2>
                        <div
                          key={catIndex}
                          className="category-items"
                          onDragOver={(e) => handleDragOver(e)}
                          onDrop={(e) => handleCategoryItemDrop(e, catIndex)}
                        >
                          {category?.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="category-item"
                              draggable={true}
                              onDragStart={(e) =>
                                handleCategoryItemDragStart(e, item)
                              }
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                )}
              </>
            )}
            {formData.current?.clozeQuestion && (
              <div className="cloze-question-wrapper">
                <div className="cloze-question-container">
                  <h2 className="cloze-title">Question</h2>
                  <h3>Fill in the blanks.</h3>
                  <p className="question">{`${formData.current?.clozeQuestion}`}</p>
                  <div className="cloze-options">
                    {formData.current?.clozeOptions?.map(
                      (option, optionIndex) => (
                        <label key={optionIndex} className="option-label">
                          <input type="checkbox" />
                          {option}
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
            {formData.current?.comprehensionQuestions?.length > 0 && (
              <div className="comprehension-question">
                <h2>Question</h2>
                <h3>
                  Read the following passage carefully and answer the questions.
                </h3>
                <p className="question">
                  {formData.current?.comprehensionParagraph}
                </p>
                {formData.current?.comprehensionQuestions?.map(
                  (question, questionIndex) => (
                    <div key={questionIndex} className="comprehension-item">
                      <p className="question">{`${questionIndex + 1}. ${
                        question.question
                      }`}</p>
                      <div className="comprehension-options">
                        {question?.options?.map((option, optionIndex) => (
                          <label key={optionIndex} className="option-label">
                            <input
                              type="radio"
                              name={`comprehension_${questionIndex}`}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </>
        )}
        <div className="form-footer">
          <div className="btn-container">
            <button className="save-response-btn btn" onClick={saveResponse}>
              Save Response
            </button>
            <button className="reset-response-btn btn" onClick={resetResponse}>
              Reset
            </button>
          </div>
        </div>
      </div>
      {isError && (
        <p className="error error-message">
          <span> Please enter response!!! </span>
        </p>
      )}
      {Object.keys(response).length > 0 && (
        <div className="response-data">
          <h2>Saved Response Data</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </>
  );
};

export default FormResponse;