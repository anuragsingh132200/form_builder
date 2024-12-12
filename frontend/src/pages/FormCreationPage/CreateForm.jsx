import React, { useState } from "react";
import "./CreateForm.css";
import { useDispatch } from "react-redux";
import formActions from "./../../store/actions/formActions";
import axios from "axios";

const CreateForm = () => {
  const [formTitle, setFormTitle] = useState("New Form");
  const [categories, setCategories] = useState([
    { name: "Category 1", items: [], categoryItem: "" },
    { name: "Category 2", items: [], categoryItem: "" },
  ]);
  const [clozeQuestion, setClozeQuestion] = useState("");
  const [clozeOptions, setClozeOptions] = useState([]);
  const [comprehensionParagraph, setComprehensionParagraph] = useState("");
  const [comprehensionQuestions, setComprehensionQuestions] = useState([]);
  const [comprehensionQuestionText, setComprehensionQuestionText] =
    useState("");
  const [comprehensionQuestionOptions, setComprehensionQuestionOptions] =
    useState(Array.from({ length: 4 }).fill(""));
  const [selectedText, setSelectedText] = useState("");

  const dispatch = useDispatch();

  const handleSave = async () => {
    const formJson = {
      title: formTitle,
      body: {
        categories: categories,
        clozeQuestion: clozeQuestion,
        clozeOptions: clozeOptions,
        comprehensionParagraph: comprehensionParagraph,
        comprehensionQuestions: comprehensionQuestions,
      },
    };

    try {
      const response = await axios.post("/saveForm", formJson);
      dispatch(formActions.saveFormSuccess(response.data));
      window.alert("Form saved successfully!");
    } catch (error) {
      console.error(error);
      window.alert("Failed to save form.");
    }
  };

  const handleSelectText = () => {
    const input = document.getElementById("clozeQuestion");
    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (start !== end) {
      const selected = input.value.substring(start, end);
      setSelectedText(selected);
    }
  };

  const handleComprehensionSelectText = () => {
    const input = document.getElementById("comprehensionQuestionText");
    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (start !== end) {
      const selected = input.value.substring(start, end);
      setComprehensionQuestionText(selected);
    }
  };

  const handleClozeOptionChange = (e, index) => {
    const newOptions = [...clozeOptions];
    newOptions[index] = e.target.value;
    setClozeOptions(newOptions);
  };

  const handleComprehensionQuestionOptionChange = (e, index) => {
    const newOptions = [...comprehensionQuestionOptions];
    newOptions[index] = e.target.value;
    setComprehensionQuestionOptions(newOptions);
  };

  const handleComprehensionQuestionAdd = () => {
    if (comprehensionQuestionText.trim() !== "") {
      const newQuestion = {
        question: comprehensionQuestionText,
        options: [...comprehensionQuestionOptions],
      };

      setComprehensionQuestions((prevQuestions) => [
        ...prevQuestions,
        newQuestion,
      ]);

      setComprehensionQuestionText("");
      setComprehensionQuestionOptions(Array.from({ length: 4 }).fill(""));
    }
  };

  const handleUnderline = (start, end) => {
    const selectedText = clozeQuestion.slice(start, end);
    if (selectedText.trim() !== "" && clozeOptions.length < 4) {
      const newOptions = [...clozeOptions];
      newOptions.push(selectedText);
      setClozeOptions(newOptions);

      const newQuestion =
        clozeQuestion.substring(0, start) +
        "____" +
        clozeQuestion.substring(end);
      setClozeQuestion(newQuestion);
    }
  };

  const handleDragStart = (e, itemId) => {
    e.dataTransfer.setData("itemId", itemId);
  };

  const handleOptionDragStart = (e, optionIndex) => {
    e.dataTransfer.setData("optionIndex", optionIndex.toString());
  };

  const addCategory = () => {
    setCategories([
      ...categories,
      {
        name: `Category ${categories.length + 1}`,
        items: [],
        categoryItem: "",
      },
    ]);
  };

  const addItemToCategory = (catIndex) => {
    const categoryCopy = [...categories];
    if (categoryCopy[catIndex].categoryItem.trim() !== "") {
      categoryCopy[catIndex].items.push(categoryCopy[catIndex].categoryItem);
      categoryCopy[catIndex].categoryItem = "";
      setCategories(categoryCopy);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, catIndex) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("itemId");
    const categoryCopy = [...categories];
    const sourceCatIndex = categoryCopy.findIndex((cat) =>
      cat.items.includes(itemId)
    );
    if (sourceCatIndex !== -1) {
      const itemIndex = categoryCopy[sourceCatIndex].items.indexOf(itemId);
      categoryCopy[sourceCatIndex].items.splice(itemIndex, 1);
      categoryCopy[catIndex].items.push(itemId);
      setCategories(categoryCopy);
    }
  };

  const handleOptionDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData("optionIndex");
    if (sourceIndex !== "") {
      const newOptions = [...clozeOptions];
      const temp = newOptions[sourceIndex];
      newOptions[sourceIndex] = newOptions[targetIndex];
      newOptions[targetIndex] = temp;
      setClozeOptions(newOptions);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="top-row">
          <input
            type="text"
            placeholder="Form Title"
            className="form-title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
        <label htmlFor="categoryQuestion" className="question-label">
          Question
        </label>
        <p>Put the items in the right categories.</p>
        <div className="category-row">
          {categories.map((category, catIndex) => (
            <div
              key={catIndex}
              className="category-container"
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e, catIndex)}
            >
              <div className="category-header">
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => {
                    const updatedCategories = [...categories];
                    updatedCategories[catIndex].name = e.target.value;
                    setCategories(updatedCategories);
                  }}
                  className="category-input"
                />
                <input
                  type="text"
                  value={category.categoryItem}
                  onChange={(e) => {
                    const categoryCopy = [...categories];
                    categoryCopy[catIndex].categoryItem = e.target.value;
                    setCategories(categoryCopy);
                  }}
                  className="item-input"
                />
                <button
                  className="add-item-button"
                  onClick={() => addItemToCategory(catIndex)}
                >
                  Add Item
                </button>
              </div>
              <div className="category-items">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="category-item-container">
                    <p
                      className="category-item"
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, item)}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="add-category-button" onClick={addCategory}>
          Add Category
        </button>
        <div className="question-container">
          <label htmlFor="clozeQuestion" className="question-label">
            Question
          </label>
          <p>Fill in the blanks.</p>
          <input
            type="text"
            id="clozeQuestion"
            className="question-input"
            placeholder="Enter your cloze question..."
            value={clozeQuestion}
            onChange={(e) => setClozeQuestion(e.target.value)}
            onMouseUp={handleSelectText}
          />
          <div className="cloze-options">
            {Array.from({ length: 4 }).map((_, index) => (
              <input
                key={index}
                type="text"
                className="option-input"
                placeholder={`Option ${index + 1}`}
                value={clozeOptions[index] || ""}
                onChange={(e) => handleClozeOptionChange(e, index)}
                draggable
                onDragStart={(e) => handleOptionDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleOptionDrop(e, index)}
              />
            ))}
          </div>
          <button
            className="convert-option-button"
            onClick={() =>
              handleUnderline(
                clozeQuestion.indexOf(selectedText),
                clozeQuestion.indexOf(selectedText) + selectedText.length
              )
            }
          >
            Convert to Option
          </button>
        </div>
        <div className="comprehension-container">
          <label htmlFor="comprehensionParagraph" className="question-label">
            Question
          </label>
          <p>Read the following passage carefully and answer the questions.</p>
          <textarea
            id="comprehensionParagraph"
            className="comprehension-input"
            placeholder="Enter the comprehension paragraph..."
            value={comprehensionParagraph}
            onChange={(e) => setComprehensionParagraph(e.target.value)}
          />
          <div className="comprehension-question">
            <input
              type="text"
              id="comprehensionQuestionText"
              className="question-input"
              placeholder="Enter the comprehension question..."
              value={comprehensionQuestionText}
              onChange={(e) => setComprehensionQuestionText(e.target.value)}
              onMouseUp={handleComprehensionSelectText}
            />

            <div className="comprehension-options">
              {comprehensionQuestionOptions.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  className="option-input"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) =>
                    handleComprehensionQuestionOptionChange(e, index)
                  }
                  draggable
                  onDragStart={(e) => handleOptionDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => handleOptionDrop(e, index)}
                />
              ))}
            </div>
            <button
              className="convert-option-button"
              onClick={handleComprehensionQuestionAdd}
            >
              Add Question
            </button>
          </div>
        </div>
        {comprehensionQuestions?.map((que, i) => (
          <div className="comprehension-question-container" key={"que" + i}>
            <p className="comprehension-question-title">
              {" "}
              {i + 1}.
              <input
                type="text"
                className="comprehension-question"
                disabled
                value={que?.question}
              />
            </p>
            <div className="comprehension-options">
              {que.options?.map((option, j) => (
                <div
                  className="comprehension-option-container"
                  key={"opt" + i + j}
                >
                  <input
                    type="radio"
                    name={`comprehensionOption_${i}`}
                    className="option-radio"
                    value={option}
                    onChange={(e) =>
                      handleComprehensionQuestionOptionChange(
                        i,
                        j,
                        e.target.value
                      )
                    }
                  />
                  <span className="comprehension-option">{option}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateForm;