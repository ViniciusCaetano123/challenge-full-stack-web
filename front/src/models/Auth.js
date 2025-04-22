
import { validateEmail, validateRequired, minLength } from '@/utils/validation'

export default class Auth {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  validate() {
    const errors = [];
    
    if (!validateRequired(this.email)) {
      errors.push('E-mail é obrigatório.');
    } else if (!validateEmail(this.email)) {
      errors.push('E-mail inválido');
    }
    
    if (!validateRequired(this.password)) {
      errors.push('Senha é obrigatório');
    } else if (!minLength(this.password, 6)) {
      errors.push('Senha must be at least 6 characters.');
    }
    
    return {
      success: errors.length === 0,
      errors
    };
  }
}