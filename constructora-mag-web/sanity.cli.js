import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'bdqq6fie',
    dataset: 'production'
  },
  studioHost: 'constructora-mag-admin',
  deployment: {
    appId: 'rwwz7r7453dnlt1fhfgmnlei',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
