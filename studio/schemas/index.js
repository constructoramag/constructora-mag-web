// Exporta todos los schemas de Sanity
import { project } from './project';
import { siteContent } from './siteContent';
import { brandSettings } from './brandSettings';
import serviceItem from './serviceItem';
import teamMember from './teamMember';
import testimonial from './testimonial';

export const schemaTypes = [project, siteContent, brandSettings, serviceItem, teamMember, testimonial];
