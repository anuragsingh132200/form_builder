const { v4: uuidv4 } = require("uuid");
const { Form } = require("../models/formModel");
const { Response } = require("../models/responseModel");
const mongoose = require("mongoose");
const variables = require("../../config/variables");

// Connect to MongoDB
const connectDB = mongoose.connect(
  variables.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () {
  console.log("DB connected...");
});

const saveFormData = async (formJson) => {
  const url = uuidv4();
  const date = new Date();
  const form = new Form({ url, formJson, date });
  return form.save();
};

const getAllForms = async () => {
  try {
    return await Form.find();
  } catch (e) {
    console.error(e);
  }
};

const getFormById = async (id) => {
  try {
    return await Form.findOne({ url: id });
  } catch (error) {
    console.error(error);
  }
};

const saveResponse = async (responseJson) => {
  try {
    const { id, response } = responseJson;
    const form = await Form.findOne({ url: id });
    if (form) {
      const existingResponse = await Response.findOne({ id });
      if (existingResponse) {
        existingResponse.response.push(response);
        await existingResponse.save();
      } else {
        const newResponse = new Response({ id, response: [response] });
        await newResponse.save();
      }
    } else {
      console.error(`Form with url ${id} not found.`);
    }
  } catch (error) {
    console.error(error);
  }
};

const getTotalResponseCount = async () => {
  try {
    const responseCounts = {};
    const responses = await Response.find();
    responses.forEach((response) => {
      responseCounts[response.id] = response.response.length;
    });
    return responseCounts;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  connectDB,
  saveFormData,
  getAllForms,
  getFormById,
  saveResponse,
  getTotalResponseCount,
};