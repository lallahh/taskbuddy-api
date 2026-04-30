const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../config/db");

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query("SELECT * FROM Tasks");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
      error
    });
  }
});

// CREATE task
router.post("/", async (req, res) => {
  const { title, description, type, status, assignedTo } = req.body;

  try {
    const pool = await poolPromise;

    await pool.request()
      .input("title", sql.VarChar, title)
      .input("description", sql.VarChar, description)
      .input("type", sql.VarChar, type)
      .input("status", sql.VarChar, status)
      .input("assignedTo", sql.VarChar, assignedTo)
      .query(`
        INSERT INTO Tasks (title, description, type, status, assignedTo)
        VALUES (@title, @description, @type, @status, @assignedTo)
      `);

    res.status(201).json({
      message: "Task added successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to add task",
      error
    });
  }
});

// UPDATE task
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, type, status, assignedTo } = req.body;

  try {
    const pool = await poolPromise;

    await pool.request()
      .input("id", sql.Int, id)
      .input("title", sql.VarChar, title)
      .input("description", sql.VarChar, description)
      .input("type", sql.VarChar, type)
      .input("status", sql.VarChar, status)
      .input("assignedTo", sql.VarChar, assignedTo)
      .query(`
        UPDATE Tasks
        SET title=@title, description=@description, type=@type, status=@status, assignedTo=@assignedTo
        WHERE id=@id
      `);

    res.json({
      message: "Task updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
      error
    });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;

    await pool.request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM Tasks WHERE id=@id
      `);

    res.json({
      message: "Task deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
      error
    });
  }
});

module.exports = router;