// Null significa dado não confirmado; nunca substitua por dados de exemplo.
export const site = {
 name: 'Vivace Pilates', city: 'Igarapé', state: 'MG',
 source: 'Briefing do usuário, 14/10/2026',
 editorialApproved: false, logo: {src: '/assets/vivace-logo-original.png', width: 150, height: 150, source: 'PNG original fornecido pelo usuário; recuperado do anexo temporário'}, favicon: '/assets/vivace-logo-original.png', domain: null,
 contact: {whatsapp: null, instagram: null, address: null, hours: null},
 differentials: [], services: [], team: [], testimonials: [], faq: [], trialClass: null,
 copy: {status: 'proposta editorial',
 heroTitle: 'Pilates em Igarapé.', heroLines: ['Pilates em', 'Igarapé.'],
 heroDescription: 'Conheça a Vivace Pilates.',
 aboutTitle: 'A Vivace.',
 aboutDescription: 'A Vivace Pilates está em Igarapé, Minas Gerais.',
 contactTitle: 'Contato.'},
 photography: {status: 'ilustrativa, somente para preview', src: '/assets/pilates-studio-1400.webp',
 small: '/assets/pilates-studio-700.webp', large: '/assets/pilates-studio-2200.webp', width: 1400, height: 2100,
 alt: 'Fotografia ilustrativa de um ambiente claro com aparelhos de Pilates; não representa o espaço da Vivace.',
 credit: 'Ahmet Kurt / Pexels',
 source: 'https://www.pexels.com/photo/pilates-reformers-in-bright-room-25596894/',
 license: 'https://www.pexels.com/license/'}
};
export function whatsappLink(number) {
 if (number === null) return null;
 if (!/^[1-9]\d{7,14}$/.test(number)) throw new Error('WhatsApp deve ser um número internacional confirmado, apenas com dígitos.');
 return 'https://wa.me/'+number+'?text='+encodeURIComponent('Olá! Conheci a Vivace pelo site e gostaria de saber mais sobre as aulas de Pilates e os horários disponíveis.');
}
export function productionIssues(data = site) {
 return [
 !data.editorialApproved && 'Aprovação editorial pendente',
 !data.logo && 'Logo oficial ausente', !data.favicon && 'Favicon da marca ausente',
 !data.domain && 'Domínio de produção não confirmado',
 !data.contact.whatsapp && !data.contact.instagram && 'Canal de contato oficial ausente',
 data.photography.status !== 'autorizada' && 'Fotografia definitiva não autorizada'
 ].filter(Boolean);
}



