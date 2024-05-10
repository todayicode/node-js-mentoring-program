import mongoose, { Schema, Document } from 'mongoose';
export interface UserEntity {
  id: string;
}

const UserSchema: Schema = new Schema({
  id: { type: String, required: true },
});

export default mongoose.model<UserEntity>('User', UserSchema);
