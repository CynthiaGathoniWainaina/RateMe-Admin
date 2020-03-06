export class UserModel {
    password: string;
    email: string;
    userType: string; // enum enum: ['customer', 'orgAdmin', 'systemAdmin']
    createdAt: Date;
    updatedAt: Date;
}
