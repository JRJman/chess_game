import bcrypt from "bcryptjs";

// Function to hash a password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Defines the encryption strength
  return await bcrypt.hash(password, saltRounds);
};

// Function to verify a password against the hash
export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
