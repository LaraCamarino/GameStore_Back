import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authService from "../../src/services/authService";
import * as authRepository from "../../src/repositories/authRepository";
import * as userFactory from "../factories/userFactory";

describe("Test signUp function", () => {
  it("Should insert the new user into the database", async () => {
    const newUser = userFactory.createNewUser();
    delete newUser.confirmPassword;

    jest
      .spyOn(authRepository, "findUserByEmail")
      .mockImplementationOnce((): any => {});
    jest.spyOn(bcrypt, "hashSync").mockImplementationOnce(() => {
      return "fake_hash";
    });
    jest
      .spyOn(authRepository, "insertNewUser")
      .mockImplementationOnce((): any => {});

    await authService.signUp(newUser);

    expect(authRepository.findUserByEmail).toBeCalled();
    expect(bcrypt.hashSync).toBeCalled();
    expect(authRepository.insertNewUser).toBeCalled();
  });

  it("If the e-mail is already in use, shoul not insert the new user into the database", async () => {
    const newUser = userFactory.createNewUser();
    delete newUser.confirmPassword;

    jest
      .spyOn(authRepository, "findUserByEmail")
      .mockImplementationOnce((): any => {
        return newUser;
      });

    const result = authService.signUp(newUser);

    expect(authRepository.findUserByEmail).toBeCalled();
    expect(result).rejects.toEqual({
      type: "conflict",
      message: "This e-mail is alrealdy in use.",
    });
  });
});

describe("Test signIn function", () => {
  it("Should login the user", async () => {
    const user = userFactory.createNewUser();
    delete user.confirmPassword;
    delete user.username;

    jest
      .spyOn(authRepository, "findUserByEmail")
      .mockImplementationOnce((): any => {
        return user;
      });
    jest.spyOn(bcrypt, "compareSync").mockImplementationOnce((): any => {
      return true;
    });
    jest.spyOn(jwt, "sign").mockImplementationOnce((): any => {
      return "token";
    });
    jest.spyOn(authRepository, "signIn").mockImplementationOnce((): any => {});

    const result = await authService.signIn(user);

    expect(authRepository.findUserByEmail).toBeCalled();
    expect(bcrypt.compareSync).toBeCalled();
    expect(jwt.sign).toBeCalled();
    expect(authRepository.signIn).toBeCalled();
    expect(result).not.toBeNull();
  });

  it("If the e-mail is wrong, should not login the user", async () => {
    const user = userFactory.createNewUser();
    delete user.confirmPassword;
    delete user.username;

    jest
      .spyOn(authRepository, "findUserByEmail")
      .mockImplementationOnce((): any => {});

    const result = authService.signIn(user);

    expect(authRepository.findUserByEmail).toBeCalled();
    expect(result).rejects.toEqual({
      type: "unauthorized",
      message: "Incorrect e-mail or password.",
    });
  });

  it("If the password is wrong, should not login the user", async () => {
    const user = userFactory.createNewUser();
    delete user.confirmPassword;
    delete user.username;

    jest
      .spyOn(authRepository, "findUserByEmail")
      .mockImplementationOnce((): any => {
        return user;
      });
    jest.spyOn(bcrypt, "compareSync").mockImplementationOnce((): any => {
      return false;
    });

    const result = authService.signIn(user);

    expect(authRepository.findUserByEmail).toBeCalled();
    expect(bcrypt.compareSync).toBeCalled();
    expect(result).rejects.toEqual({
      type: "unauthorized",
      message: "Incorrect e-mail or password.",
    });
  });
});

describe("Test signOut function", () => {
  it("Should remove the session from the database", async () => {
    const sessionId = 1;

    jest.spyOn(authRepository, "signOut").mockImplementationOnce((): any => {});

    await authService.signOut(sessionId);

    expect(authRepository.signOut).toBeCalled();
  });
});
