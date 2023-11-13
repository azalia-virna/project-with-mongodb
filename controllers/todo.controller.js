const Todo = require('../models/todo');

module.exports = {
  getAllTodo: async (req, res) => {
    const user = req.user

    const todos = await Todo.find({userID: user.id}).populate("userID", ["_id", "name"])

    res.json({
      message: "berhasil mendapatkan data todo",
      data: todos
    })
  },

  createTodo: async (req, res) => {
    let data = req.body

    await Todo.create(data)

    res.json({
      message: "berhasil membuat data todo"
    })
  },

  getTodoById: async (req, res) => {
    const user = req.user;
    const todoId = req.params.id; // Ambil ID tugas dari parameter URL

    try {
      const todo = await Todo.findOne({ _id: todoId, userID: user.id }).populate("userID", ["_id", "name"]);

      if (!todo) {
        return res.status(404).json({ message: "Tugas tidak ditemukan" });
      }

      res.json({
        message: "Berhasil mendapatkan data tugas",
        data: todo
      });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan dalam mengambil data tugas" });
    }
  },

  editTodoById: (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const todoIndex = Todos.findIndex((todo) => todo.id == id);

    if (todoIndex !== -1) {
      Todos[todoIndex].value = data.value;

      res.json({
        message: "Berhasil mengedit todo by id",
        data: Todos[todoIndex],
      });
    } else {
      res.status(404).json({
        message: `Todo dengan ID ${id} tidak ditemukan`,
      });
    }
  },

  deleteTodoById: (req, res) => {
    const { id } = req.params;

    const todoIndex = Todos.findIndex((todo) => todo.id == id);

    if (todoIndex !== -1) {
      const deletedTodo = Todos.splice(todoIndex, 1);

      res.json({
        message: "Berhasil menghapus todo by id",
        data: deletedTodo[0],
      });
    } else {
      res.status(404).json({
        message: `Todo dengan ID ${id} tidak ditemukan`,
      });
    }
  },
}
