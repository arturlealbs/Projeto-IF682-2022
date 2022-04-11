export default function toLowerIdentifier(input) {
  if (input.email) {
    input.email = input.email.toLowerCase();
  }
  if (input.username) {
    input.username = input.username.toLowerCase();
  }
  return input;
}
