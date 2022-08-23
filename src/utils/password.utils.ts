const REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const MESSAGE =
  'Password must contain at least 8 characters with capital and small letters, numbers and special characters';

export const PASSWORD = {
  REGEX,
  MESSAGE,
};
