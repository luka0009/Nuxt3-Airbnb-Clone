declare module 'nuxt/schema' {
    interface AppConfigInput {
      /** Theme configuration */
      theme?: {
        /** Primary app color */
        primaryColor?: string
      }
    }
  }
  
  // It is always important to ensure you import/export something when augmenting a type
  export {}