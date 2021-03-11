import mongoose from 'mongoose';

const { Schema } = mongoose;

export const GatewaySchema = new Schema({
  serial: {
    type: String,
    unique: true
  },
  name: String,
  address: {
    type: String,
    validate: {
      validator: (v: string) => /^([0-255]\.){3}([0-255])$/g.test(v),
      message: ({ value }: { value: string }) => `${value} is not a valid IPV4 address`,
    },
  },
  devices: [{ type: Schema.Types.ObjectId, ref: 'Device' }]
});

export const Gateway = mongoose.model('Gateway', GatewaySchema);

export const DeviceSchema = new Schema({
  uid: Number,
  vendor: String,
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['online', 'offline']
  }
});

export const Device = mongoose.model('Device', DeviceSchema);
