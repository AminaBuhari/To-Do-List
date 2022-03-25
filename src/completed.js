import { clearDoneList } from './function.js';

const clear = document.getElementById('clear');
const clearAll = () => {
  clear.addEventListener('click', () => {
    clearDoneList();
  });
};

export default clearAll;
