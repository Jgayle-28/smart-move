export function getAxiosConfig(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return config
}
