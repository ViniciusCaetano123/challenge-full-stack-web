import { validateCPF, validateEmail, validateRequired } from '@/utils/validation'

export default class Student {
  constructor(ra = '', nome = '', cpf = '', email = '') {
    this.ra = ra
    this.nome = nome
    this.cpf = cpf
    this.email = email  
  }

  validate() {
    const errors = []    
   
    if (!validateRequired(this.ra)) {
      errors.push({ field: 'ra', message: 'Registro acadêmico é obrigatório' })
    }
    
    if (!validateRequired(this.nome)) {
      errors.push({ field: 'nome', message: 'Nome é obrigatório' })
    }    
    
    if (!validateRequired(this.cpf)) {
      errors.push({ field: 'cpf', message: 'CPF é obrigatório' })
    } else if (!validateCPF(this.cpf)) {
      errors.push({ field: 'cpf', message: 'CPF inválido' })
    }    
   
    if (!validateRequired(this.email)) {
      errors.push({ field: 'email', message: 'E-mail é obrigatório' })
    } else if (!validateEmail(this.email)) {
      errors.push({ field: 'email', message: 'E-mail inválido' })
    }
    
    return {
      success: errors.length === 0,
      errors
    }
  }

  toJSON() {
    return {
      ra: this.ra,
      nome: this.nome,
      cpf: this.cpf,
      email: this.email     
    }
  }
}