import mongoose from "mongoose";
import { Types } from "mongoose";
export interface qpay_billDoc extends mongoose.Document {
  wallet_id: Types.ObjectId;
  amount: number;
  order_type: string;
  description: string;
  date: string;
  invoice_id: string;
  transaction_id: string;
  invoice_transaction_id: string;
  callback: string;
  pay: boolean;
}

const Schema = new mongoose.Schema<qpay_billDoc>(
  {
    wallet_id: Types.ObjectId,
    amount: Number,
    order_type: String,
    description: String,
    date: String,
    invoice_id: {
      type: String,
      required: true,
      trim: false,
      unique: true,
    },
    invoice_transaction_id: {
      type: String,
      required: true,
      trim: false,
      unique: true,
    },
    transaction_id: String,
    callback: String,
    pay: Boolean,
  },
  { timestamps: true }
);

const items = mongoose.model<qpay_billDoc>("payment_golomt", Schema);
export default items;
