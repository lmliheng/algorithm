import DefaultTheme from 'vitepress/theme'
import ProblemExplorer from './ProblemExplorer.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: { component: (name: string, component: unknown) => void } }) {
    app.component('ProblemExplorer', ProblemExplorer)
  },
}
