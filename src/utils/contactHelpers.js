export const PRIMARY_WHATSAPP_NUMBER = '56982340752';
export const PRIMARY_PHONE_NUMBER = '+56982340752';

export const buildWhatsAppUrl = (number, message) => {
  const clean = number ? String(number).replace(/\D/g, '') : '';
  const finalNumber = (!clean || clean.length < 8) ? PRIMARY_WHATSAPP_NUMBER : clean;
  
  if (!message) {
    return `https://wa.me/${finalNumber}`;
  }
  
  return `https://wa.me/${finalNumber}?text=${encodeURIComponent(message)}`;
};

export const buildTelUrl = (number) => {
  if (!number) return `tel:${PRIMARY_PHONE_NUMBER}`;
  const clean = String(number).replace(/[\s-]/g, '');
  const digits = clean.replace(/\D/g, '');
  if (!digits || digits.length < 8) {
    return `tel:${PRIMARY_PHONE_NUMBER}`;
  }
  return `tel:${clean}`;
};
