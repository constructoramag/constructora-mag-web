export const buildWhatsAppUrl = (number, message) => {
  if (!number) return '#';
  // Elimina cualquier carácter que no sea dígito
  const cleanNumber = number.replace(/\D/g, '');
  
  if (!message) {
    return `https://wa.me/${cleanNumber}`;
  }
  
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
};

export const buildTelUrl = (number) => {
  if (!number) return '#';
  // Para el href tel: se permite el + al inicio, pero si queremos ser seguros, podemos remover espacios y guiones
  const cleanNumber = number.replace(/[\s-]/g, '');
  return `tel:${cleanNumber}`;
};
