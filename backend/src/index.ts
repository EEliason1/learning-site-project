import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();

app.use(express.json());

// Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Middleware executed');
    next();
});

// Route Handler
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
