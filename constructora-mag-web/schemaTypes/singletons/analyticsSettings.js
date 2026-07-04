export default {
  name: 'analyticsSettings',
  title: '📊 Analytics y Scripts',
  type: 'document',
  fields: [
    {
      name: 'googleAnalyticsId',
      title: 'Google Analytics 4 ID (G-XXXXXXX)',
      type: 'string',
    },
    {
      name: 'googleTagManagerId',
      title: 'Google Tag Manager ID (GTM-XXXXXXX)',
      type: 'string',
    },
    {
      name: 'metaPixelId',
      title: 'Meta Pixel ID',
      type: 'string',
    }
  ]
}
