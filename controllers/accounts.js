/* eslint-disable no-console */
const db = require('../models');
const util = require('../utilities');

const returnNew = { new: true };

async function create(req, res) {
  try {
    if (!req.body.email) {
      util.Error.throwError(400);
    }
    const data = {
      email: req.body.email.toLowerCase().trim(),
    };
    const duplicate = await db.Account.findOne(data);
    if (duplicate) {
      util.Error.throwError(409);
    }
    const newAccount = await db.Account.create(data);
    res.status(201).json(newAccount);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function search(req, res) {
  try {
    const query = req.query.query || '';
    const options = req.query;
    delete options.query;
    // options.state = { $nin: ['new', 'inactive'] };
    const foundAccounts = await db.Account
      .fuzzySearch(query, options)
      .select('email name picUrl model');
    res.json(foundAccounts);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function show(req, res) {
  try {
    const accountId = req.params.id;
    util.Error.validateUUID(accountId);
    const showAccount = await db.Account
      .findById(accountId)
      .select('email name picUrl model');
    res.json(showAccount);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function update(req, res) {
  try {
    const updateAccount = await db.Account.findByIdAndUpdate(
      req.params.id,
      req.body,
      returnNew,
    );
    res.json(updateAccount);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function deactivate(req, res) {
  try {
    const deactivateAccount = await db.Account.findByIdAndUpdate(
      req.params.id,
      { active: false },
      returnNew,
    );
    res.json(deactivateAccount);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

module.exports = {
  create,
  search,
  show,
  update,
  deactivate,
};
