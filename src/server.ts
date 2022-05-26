import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

const categories: any = [];

app.get('/', (request: Request, response: Response) => {
  return response.json({ status: 'success', version: '1.0.0' }).status(200);
});

//GET ALL CATEGORIES
app.get('/categories', (request: Request, response: Response) => {
  return response.json(categories).status(200);
});

app.post('/categories', (request: Request, response: Response) => {
  const data = request.body;
  
  const category = {
    id: (categories.length + 1),
    name: data.name,
    created_at: new Date(),
    updated_at: new Date()
  }

  categories.push(category);
  return response.json().status(200);
});

app.get('/categories/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  const category = categories.find((item: any) => item.id == id)

  return response.json(category).status(200);
});

app.listen(3000, () => {
  console.log('Server in running');
});
