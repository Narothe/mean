// import { Request, Response, NextFunction } from 'express'; // Załóżmy, że używasz Express.js
//
// // Definicja middleware sprawdzającego wartość zmiennej :num
// function checkNumMiddleware(req: Request, res: Response, next: NextFunction) {
//     const num = parseInt(req.params.num); // Parsowanie wartości :num do liczby całkowitej
//     if (isNaN(num)) {
//         return res.status(400).json({ error: 'Invalid num parameter' });
//     }
//     // Tutaj możesz wykonać dodatkowe sprawdzenia lub modyfikacje, jeśli to konieczne
//     next();
// }
//
// // Kontroler obsługujący endpointy
// class PostController {
//     private path: string = "/yourpath"; // Ścieżka do endpointów
//
//     constructor(private router: any) { // Przyjmujemy router Express.js
//         this.initializeRoutes();
//     }
//
//     private initializeRoutes() {
//         // Dodanie middleware checkNumMiddleware do endpointa
//         this.router.post(`${this.path}/:num`, checkNumMiddleware, this.getPostByNum);
//     }
//
//     private getPostByNum(req: Request, res: Response) {
//         const num = parseInt(req.params.num);
//         // Tutaj możesz obsłużyć żądanie zgodnie z wartością zmiennej :num
//         res.json({ postNum: num });
//     }
// }
//
// export default PostController;
