const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://mishraharsh9569:harsh%401234@lucky-cluster.lq2nwkh.mongodb.net/todolist?retryWrites=true&w=majority&appName=Lucky-Cluster', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true }
});
const Todo = mongoose.model('Todo', TodoSchema);

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching todos', error: err });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text
    });
    await newTodo.save();
    res.json(newTodo);
  } catch (err) {
    res.status(500).send({ message: 'Error adding todo', error: err });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).send({ message: 'Error deleting todo', error: err });
  }
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
