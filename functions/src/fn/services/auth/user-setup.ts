// eslint-disable-next-line no-unused-vars
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {userCustomClaims} from "../../helpers/auth/user/user-claims";
import {createUser} from "../../helpers/auth/user/create-user";


admin.initializeApp();


export default async (
    req: functions.https.Request,
    res: functions.Response,
): Promise<any> => {
  console.log("/userSetup start");
  try {
    const {
      input: {token, firstName, lastName, role},
    } = req.body.input;
    // decode user from token
    const user = await admin.auth().verifyIdToken(token);
    const userId = user.uid;
    const email = user.email as string;

    await createUser({
      object: {
        id: userId,
        email,
        firstName,
        lastName,
        role,
      },
    });

    const customClaims = userCustomClaims(userId);
    await admin.auth().setCustomUserClaims(userId, customClaims);
    return res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Ok",
    });
  } catch (error) {
    console.log("/userSetup end with error");
    console.error(error);
    return res
        .status(400)
        .json({status: "fail", statusCode: 400, message: error});
  }
};
