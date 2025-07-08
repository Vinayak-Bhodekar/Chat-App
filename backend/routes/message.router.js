import Router from 'express';

import {
    sendMessage,
    getMessagesForRoom,
    deleteMessage,
    editMessage,
    getMessageById,
    markMessagesAsRead,
    getUnreadCount,
    reactToMessage,
    uploadMediaMessage,
    pinMessage
} from "../controllers/message.controller.js";

import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.route("/send").post(verifyToken, sendMessage);
router.route("/room/:roomId").get(verifyToken, getMessagesForRoom);
router.route("/delete/:messageId").delete(verifyToken, deleteMessage);
router.route("/edit/:messageId").put(verifyToken, editMessage);
router.route("/:messageId").get(verifyToken, getMessageById);
router.route("/markAsRead/:roomId").put(verifyToken, markMessagesAsRead);
router.route("/unreadCount/:roomId").get(verifyToken, getUnreadCount);
router.route("/react/:messageId").put(verifyToken, reactToMessage);
router.route("/uploadMedia").post(verifyToken, uploadMediaMessage);
router.route("/pin/:messageId").put(verifyToken, pinMessage);

export default router;