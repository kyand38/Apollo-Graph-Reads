import User, { UserDocument } from '../src/models/User.js'
import { GraphQLError } from 'graphql'
import { signToken, AuthenticationError } from '../src/services/auth.js';
import { BookDocument } from '../src/models/Book.js';

// Todo: getSingleUser, createUser, login, saveBook, deleteBook, 


interface UserArgs {
    userId: string;
}

interface CreateUserArgs {
    username: string;
    email: string;
    password: string;
    userId: string;
}

interface loginArgs {
    email: string;
    password: string;
}

interface addBookArgs {
    userId: string;
    book: BookDocument
}

interface deleteBookArgs {
    userId: string;
    book: BookDocument
}



const resolvers = {
    Query: {
        getSingleUser: async (_parent: unknown, { userId }: UserArgs) => {
            if (!userId) {
                throw new GraphQLError('User ID is required.');
            }
            return await User.findOne({ _id: userId }).populate('savedBooks');
        }
    },

    Mutation: {
        createUser: async (_parent: any, { username, email, password }: CreateUserArgs): Promise<{ token: string; user: UserDocument }> => {
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                throw new GraphQLError('Invalid email format.');
            }
            if (password.length < 8) {
                throw new GraphQLError('Password must be at least 8 characters.');
            }
            if (!username || !email || !password) {
                throw new GraphQLError('Username, email, and password required.');
            }

            const userExists = await User.findOne({ $or: [{ email }, { username }] });
            if (userExists) {
                throw new GraphQLError('Username or Email already exists.');

            }

            const newUser = await User.create({ username, email, password });
            const token = signToken(newUser.username, newUser.email, newUser._id);
            return { token, user: newUser, };
        },

        login: async (_parent: any, { email, password }: loginArgs): Promise<{ token: string; user: UserDocument }> => {
            const user = await User.findOne({ email: email.toLowerCase() });
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                throw new GraphQLError('Invalid email format.');
            }
            if (password.length < 8) {
                throw new GraphQLError('Password must be at least 8 characters.');
            }
            if (!user) {
                throw new AuthenticationError('User not found.');
            }
            const passCheck = await user.isCorrectPassword(password);
            if (!passCheck) {
                throw new AuthenticationError('Invalid password.')
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        saveBook: async (_parent: any, { userId, book }: addBookArgs) => {
            const user = await User.findById(userId);
            if (!user) {
                throw new GraphQLError('User not found');
            }

            const updatedUser = await User.findByIdAndUpdate(
                user.id,
                { $addToSet: { savedBooks: book } },
                { new: true, runValidators: true }
            );
            if (!updatedUser) {
                throw new GraphQLError('Book has NOT been saved to document.')
            }
            return updatedUser;
        },

        deleteBook: async (_parent: any, { userId, book }: deleteBookArgs) => {
            const user = await User.findById(userId);
            if (!user) {
                throw new GraphQLError('User not found')
            }
            const updatedUser = await User.findByIdAndUpdate(
                user.id,
                { $pull: { savedBooks: { bookId: book.bookId } } },
                { new: true, runValidators: true },
            );
            if (!updatedUser) {
                throw new GraphQLError('Book has NOT been removed from document')
            }
            return updatedUser;
        }
    },
};


export default resolvers;