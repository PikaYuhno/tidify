import { Request, Response, Router } from 'express';

export const router = Router();


/**
 * Get all columns
 * @route {GET} /api/v1/boards/:boardId/columns/
 */
router.get("/:boardId/columns", async (req: Request, res: Response) => {

});

/**
 * Create a new column
 * @route {POST} /api/v1/boards/:boardId/columns
 */
router.post("/:boardId/columns", async (req: Request, res: Response) => {

});

/**
 * Update a column
 * @route {POST} /api/v1/boards/:boardId/columns/:columnId
 */
router.post("/boards/:boardId/columns/:columnId", async (req: Request, res: Response) => {
    
});

/**
 * Create a new column
 * @route {DELETE} /api/v1/boards/:boardId/columns/:columnId
 */
router.post("/boards/h:boardId/columns/:columnId", async (req: Request, res: Response) => {
    
});