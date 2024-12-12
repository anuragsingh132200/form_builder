const { formService } = require("../sevices");

const saveForm = async (req, res) => {
  const formData = req.body;
  const result = await formService.saveFormData(formData);
  res.send(result);
};

const getForms = async (req, res) => {
  const result = await formService.getAllForms();
  res.send(result);
};

const getFormById = async (req, res) => {
  const result = await formService.getFormById(req.query.id);
  res.send(result);
};

const saveResponse = async (req, res) => {
  console.log(req.body);
  const result = await formService.saveResponse(req.body);
  res.send(result);
};

const getTotalResponseCount = async (req, res) => {
  const result = await formService.getTotalResponseCount();
  res.send(result);
};

module.exports = {
  saveForm,
  getForms,
  getFormById,
  saveResponse,
  getTotalResponseCount,
};