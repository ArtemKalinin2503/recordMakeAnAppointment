export const useGetUser = () => {
  // @ts-ignore
  const user = localStorage.getItem("userId");
  return [user];
}
