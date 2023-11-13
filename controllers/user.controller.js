const Todo = require('../models/todo');
const User = require('../models/user');

module.exports = {
  getAllUser: async (req, res) => {
    const users = await User.find()

    res.json({
      message: "berhasil mendapatkan data user",
      data: users
    })
  },

  getUserById: async (req, res) => {
    const {id} = req.params
    const users = await User.findById(id)

    res.json(users)
  },

  getUserTodos: async (req, res) => {
    const {id} = req.params

    const todos = await Todo.find({userID: id})

    res.json(todos)
  },

  createUser: async (req, res) => {
    let data = req.body

    await User.create(data)

    res.json({
      message: "berhasil membuat data user"
    })
  },

  editUserById: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
      const user = await User.findByPk(id);

      if (user) {
        await user.update(data);

        res.json({
          message: 'Berhasil mengedit user by id',
          data: user,
        });
      } else {
        res.status(404).json({
          message: `User dengan ID ${id} tidak ditemukan`,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Gagal mengedit user by id',
      });
    }
  },

  deleteUserById: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (user) {
        await user.destroy();

        res.json({
          message: 'Berhasil menghapus user by id',
          data: user,
        });
      } else {
        res.status(404).json({
          message: `User dengan ID ${id} tidak ditemukan`,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Gagal menghapus user by id',
      });
    }
  },
}
