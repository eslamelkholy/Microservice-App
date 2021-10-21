import mongoose from 'mongoose';

/**
 * An Interface that Describes the Properties
 * that are required to create new User
 */
interface UserAttrs {
  email: string;
  password: string;
}

/**
 * An Interface that Describes the Properties
 * that a User Model Has
 */
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

/**
 * An Interface that Describes the Properties
 * that a User Document Has
 */
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String, // This Type Related to Mongoose and Built in String Constructor not Typescript
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
