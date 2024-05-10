import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    private userService = new UserService();

    getUser = async (req: Request, res: Response) => {
        const { userId } = req.params;
        try {
            const user = await this.userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ data: null, error: "No user with such id" });
            }
            return res.status(200).json({ data: user, error: null });
        } catch (error) {
            return res.status(500).json({ data: null, error: { message: "Internal Server error" } });
        }
    }

}
