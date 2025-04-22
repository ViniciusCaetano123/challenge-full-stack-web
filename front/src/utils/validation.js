export function validateRequired(value)  {
    return value !== null && value !== undefined && `${value}`.trim() !== '';           
}  
  
export function validateEmail (value)  {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}  

export function validateCPF(cpf) {    
    cpf = cpf.replace(/\D/g, '');  
    
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }    
    
    let sum = 0;
    let remainder;    

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.charAt(i-1)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;
    

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.charAt(i-1)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

export const maxLength = (value, max) => value.length <= max

export const minLength = (value, min) => value.length >= min
  
