const saveUserData = (data) => localStorage.setItem('userData', JSON.stringify(data));

const removeUserData = () => localStorage.removeItem('userData');

const getUserData = () => {
  const item = localStorage.getItem('userData');
  if (item) return JSON.parse(localStorage.getItem('userData'));
  return null;
};

export {
  getUserData,
  saveUserData,
  removeUserData,
};
