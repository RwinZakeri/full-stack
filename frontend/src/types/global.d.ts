export enum AuthType {
  login = 1,
  register = 2,
}

type AuthFormProps = {
  setPosition: Dispatch<SetStateAction<AuthType>>; // Correctly typing setPosition
};
