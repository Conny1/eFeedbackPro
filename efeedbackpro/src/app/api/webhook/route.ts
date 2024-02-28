// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import getRawBody from "raw-body";
// import { connectToDb } from "@/dbconfig/dbconfig";
// import User from "@/models/UserModel";
// import { plans } from "@/state/types";
// import Subscriptions from "@/models/Subscription";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2023-10-16",
// });

// const endpointSecret = process.env.WEBHOOK_SECRET as string;
// connectToDb();

// export async function POST(req: NextRequest) {
//   try {
//     const sig: any = req.headers.get("stripe-signature");
//     const rawBody = await req.text();

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
//     } catch (err: any) {
//       return NextResponse.json({
//         status: 400,
//         message: `Webhook Error: ${err.message}`,
//       });
//     }

//     console.log("event.type", JSON.stringify(event.type));

//     if (event.type === "checkout.session.completed") {
//       const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
//         (event.data.object as any).id,
//         {
//           expand: ["line_items"],
//         }
//       );
//       const lineItems = sessionWithLineItems.line_items;

//       if (!lineItems)
//         return NextResponse.json({
//           status: 500,
//           message: "Internal server error",
//         });

//       try {
//         // Save the data, change customer account info, etc
//         console.log("Fullfill the order with custom logic");
//         // console.log("data", lineItems.data);
//         // console.log(
//         //   "customer email",
//         //   (event.data.object as any).customer_details.email
//         // );
//         // console.log("created", (event.data.object as any).created);
//         // console.log("subid", event.data.object.subscription);
//         // update user subscription in DB
//         await User.findOneAndUpdate(
//           { email: (event.data.object as any).customer_details.email },
//           { plan: plans.basic },
//           { new: true }
//         );

//         // add subs to DB
//         await Subscriptions.create({
//           useremail: (event.data.object as any).customer_details.email,
//           subid: (event.data.object as any).subscription,
//           stripeid: lineItems.data[0].id,
//           amount: lineItems.data[0].price?.unit_amount_decimal,
//         });
//         // console.log(subs);
//       } catch (error) {
//         console.log(error);
//         console.log("Handling when you're unable to save an order");
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ status: 500, message: `internal server error` });
//   }
//   return NextResponse.json({ received: true });
// }
