const MOCK_CREDENTIALS = {
  username: "test",
  password: "password123",
};

export interface LoginCredentials {
  username: string;
  password: string;
}

export const validateLogin = (
  credentials: LoginCredentials
): Promise<{
  success: boolean;
  error?: string;
  user?: { username: string };
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { username, password } = credentials;

      if (!username.trim() || !password.trim()) {
        resolve({
          success: false,
          error: "Username and password are required",
        });
        return;
      }

      if (
        username === MOCK_CREDENTIALS.username &&
        password === MOCK_CREDENTIALS.password
      ) {
        resolve({
          success: true,
          user: { username },
        });
      } else {
        resolve({
          success: false,
          error: "Invalid username or password",
        });
      }
    }, 1000);
  });
};
