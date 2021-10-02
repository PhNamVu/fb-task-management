import * as functions from "firebase-functions";

export const adminSetup = functions.https.onRequest(async (req, res) => {
  await (await import("./fn/services/auth/admin-setup")).default(req, res);
});

export const userSetup = functions.https.onRequest(async (req, res) => {
  await (await import("./fn/services/auth/user-setup")).default(req, res);
});

export const submitDoneTask = functions.https.onRequest(async (req, res) => {
  await (await import("./fn/services/mail/submit-done-task")).default(req, res);
})

