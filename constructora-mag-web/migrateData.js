import { getCliClient } from 'sanity/cli'
import { siteContent } from '../src/data/siteContent.js'

const client = getCliClient()

async function migrate() {
  console.log('Migrating data to Sanity...')

  try {
    // 1. Company Info
    await client.createOrReplace({
      _id: 'companyInfo',
      _type: 'companyInfo',
      name: siteContent.company.name,
      slogan: siteContent.company.slogan,
      about: siteContent.company.about,
      foundedYear: siteContent.company.founded,
      address: siteContent.company.location,
      contactEmail: siteContent.contact.email,
      whatsapp1: siteContent.contact.whatsapp1,
      whatsapp1Display: siteContent.contact.whatsappDisplay1,
      whatsapp2: siteContent.contact.whatsapp2,
      whatsapp2Display: siteContent.contact.whatsappDisplay2,
      instagramUrl: siteContent.contact.instagram,
      facebookUrl: siteContent.contact.facebook,
    })
    console.log('✅ Company Info migrated')

    // 2. Home Page
    await client.createOrReplace({
      _id: 'homePage',
      _type: 'homePage',
      heroEnabled: true,
      heroTitle: siteContent.hero.title,
      heroSubtitle: siteContent.hero.subtitle,
      heroVideoUrl: siteContent.hero.videoUrl, // Nota: el schema que creamos es 'file' (heroVideo), esto se manejará manualmente
      aboutEnabled: true,
      aboutTitle: 'Sobre Nosotros',
      aboutText: siteContent.company.about,
    })
    console.log('✅ Home Page migrated')

    // 3. Global CTA
    await client.createOrReplace({
      _id: 'globalCTA',
      _type: 'globalCTA',
      headline: '¿Listo para tu próximo proyecto?',
      subheadline: 'Contáctanos y hagamos realidad tu visión.',
      buttonText: siteContent.hero.cta,
      buttonLink: '#contacto',
    })
    console.log('✅ Global CTA migrated')

    // 4. Services (Collections)
    for (const service of siteContent.services) {
      const slug = service.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-')
      await client.create({
        _type: 'service',
        title: service.title,
        slug: { current: slug, _type: 'slug' },
        shortDescription: service.description,
      })
    }
    console.log('✅ Services migrated')

    // 5. Testimonials (Collections)
    for (const test of siteContent.testimonials) {
      await client.create({
        _type: 'testimonial',
        author: test.author,
        role: test.role,
        content: test.content,
        rating: test.rating,
      })
    }
    console.log('✅ Testimonials migrated')

    console.log('🎉 Migration completed successfully!')
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
  }
}

migrate()
