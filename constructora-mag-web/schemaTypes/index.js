import brandSettings from './singletons/brandSettings'
import analyticsSettings from './singletons/analyticsSettings'
import globalSEO from './singletons/globalSEO'
import companyInfo from './singletons/companyInfo'
import globalCTA from './singletons/globalCTA'
import headerConfig from './singletons/headerConfig'
import footerConfig from './singletons/footerConfig'
import homePage from './singletons/homePage'

import category from './collections/category'
import project from './collections/project'
import service from './collections/service'
import testimonial from './collections/testimonial'
import beforeAfter from './collections/beforeAfter'
import teamMember from './collections/team'
import faq from './collections/faq'

export const schemaTypes = [
  // Singletons
  brandSettings,
  analyticsSettings,
  globalSEO,
  companyInfo,
  globalCTA,
  headerConfig,
  footerConfig,
  homePage,

  // Collections
  category,
  project,
  service,
  testimonial,
  beforeAfter,
  teamMember,
  faq
]
