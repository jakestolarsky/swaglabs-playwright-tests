type UserCredentials = {
    username: string;
    password: string;
};

type Users = {
    standardUser: UserCredentials;
    lockedUser: UserCredentials;
};

export const users: Users = {
    standardUser: {
        username: 'standard_user',
        password: 'secret_sauce',
    },
    lockedUser: {
        username: 'locked_out_user',
        password: 'secret_sauce',
    },
};