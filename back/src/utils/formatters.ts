export function formatCPF(cpf:string = '') {
    return cpf
      .replace(/\D/g, '') // remove tudo que não for número
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
export function formatDate(dateString:string = '', locale:string = 'pt-BR') {
    if(!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }