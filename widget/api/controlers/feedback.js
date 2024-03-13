import Business from "../models/BusinessModel.js";
import Client from "../models/ClientModel.js";
import Feedback from "../models/feedback.js";
import { createError } from "../utils/error.js";

export const useraddFeedback = async (req, resp, next) => {
  const reqbody = req.body;
  try {
    // take userid from business and confirm if the business exist
    const businessData = await Business.findById(reqbody.businessid);

    if (!businessData) return next(createError(403, "invalid request"));

    //   request to add client to db
    const clientDetails = await Client.create({ email: reqbody.email });
    if (!clientDetails)
      return next(createError(401, "Client details not captured"));

    //   add the business to db
    const feedbackresp = await Feedback.create({
      title: reqbody.title,
      description: reqbody.description,
      user: businessData.userid,
      business: reqbody.businessid,
      client: clientDetails._id,
      uploads: reqbody.uploadUrl,
    });

    // update feedback details to clients model
    await Client.findByIdAndUpdate(clientDetails._id, {
      feedback: feedbackresp._id,
      business: feedbackresp.business,
    });

    return resp.json({ status: 200, feedbackresp });
  } catch (error) {
    return next(createError(401, `confirm your id`));
  }
};
