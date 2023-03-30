// Пример староннего скрипта (по сути не относящегося на прямую к логике остальных модулей)

export function analitic() {
  async function f() {
    return 1;
  }
  
  f().then(alert); 
};
