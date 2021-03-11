import { NextFunction } from 'express';
import { Model, Document } from 'mongoose';

export function createError(id: string) {
  return {
    statusCode: 400,
    message: `Record with ID: '${id}' not found`,
  };
}

export function catchError(fn: () => any, next: NextFunction) {
  fn().catch((error: Error) => {
    next({ code: 500, message: error.message });
  });
}

export async function getOneOrMany(model: Model<Document<any, {}>, {}>, populateKey?: string, _id?: string) {
  const filter = _id ? { _id } : {};
  const query = model.find(filter);
  const list = await (populateKey ? query.populate(populateKey) : query).exec();

  return list.map((g) => g.toJSON({ versionKey: false }));
}
