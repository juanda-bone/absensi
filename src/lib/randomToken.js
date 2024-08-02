export default function randomToken() {
  const random = Math.random().toString(36).substring(2);
  const split = random.split("");
  const slice = split.slice(0, 3);
  return slice.join("");
}
