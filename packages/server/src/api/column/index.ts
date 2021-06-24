import { createTaskSchema } from '@tidify/common';
import { Request, Response, Router } from 'express';
import { InferType } from 'yup';
import Task from '../../db/models/Task';

export const router = Router();

/**
 * Get all tasks
 * @route {GET} /api/v1/columns/:columnId/tasks/
 */
router.get("/:columnId/tasks", async (req: Request, res: Response) => {
    const columnId = req.params.columnId;

    const tasks = await Task.findAll({ where: { colId: columnId } });

    return res.status(200).json({ data: tasks, message: 'Successfully found all tasks!', success: true });
});

/**
 * Create a new task
 * @route {POST} /api/v1/columns/:columnId/tasks
 */
router.post("/:columnId/tasks", async (req: Request, res: Response) => {
    const columnId = req.params.columnId;
    const userId = req.session.user!.userId;

    let validatedEvent: InferType<typeof createTaskSchema>;
    try {
        validatedEvent = await createTaskSchema.validate(req.body);
    } catch (e) {
        console.error(e);
        return res.status(400).json({ message: e.errors[0], success: false });
    }

    const createdTask = await Task.create({ ...validatedEvent, colId: parseInt(columnId), userId});

    return res.status(200).json({ data: createdTask, message: 'Successfully created task!', success: true });
});

/**
 * Update a column
 * @route {PUT} /api/v1/columns/:columnId/columns/:columnId
 */
router.put("/columns/:columnId/columns/:columnId", async (req: Request, res: Response) => {});

/**
 * Create a new column
 * @route {DELETE} /api/v1/columns/:columnId/columns/:columnId
 */
router.delete("/columns/h:columnId/columns/:columnId", async (req: Request, res: Response) => {});