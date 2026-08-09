import Session from "../../models/Session.js";
import { clearSessionCookies } from "../../services/auth.js";

export const logoutUser = async (req, res, next) => {
  try {
    const { sessionId } = req.cookies;
    if (sessionId) {
      await Session.deleteOne({ _id: sessionId });
    }

    clearSessionCookies(res);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
