const express = require('express');

const server = express();

server.use(express.json());

const project = []; 

function checkProjeExists(req, res, next) {
  const { id } = req.params;
  const projects = project.find(p => p.id == id);

  if (!projects) {
    return res.status(400).json({ error: 'Project not Found'});
  }

  return next();
}

function logRequests(req, res, next) {
  
  console.count("número de requisições");

  return next();
}

server.use(logRequests);


server.get('/users', (req, res) =>{
  return res.json(project);
})

server.post('/users', (req, res) => {
  const { id, title } = req.body;

  const projects = {
    id,
    title,
    tasks: []
  };

  project.push(projects);

  return res.json(project);
}); 

server.get('/users/:index', (req, res) => {
  const { index } = req.params;

  return res.json(project[index]);
})

server.put('/users/:id', checkProjeExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projects = project.find(p => p.id == id);

  projects.title = title;

  return res.json(projects);
});

server.delete('/users/:id', checkProjeExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = project.findIndex(p => p.id == id);

  project.splice(projectIndex, 1);

  return res.send();
});

server.post('/users/:id/tasks', checkProjeExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projects = project.find(p => p.id == id);

  projects.tasks.push(title);

  return res.json(projects);
});

server.listen(3000);