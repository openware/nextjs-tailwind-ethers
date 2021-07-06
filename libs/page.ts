import appConfig from '../configs/app'

export function appTitle(title?: string) {
  return [title, appConfig.appName].filter(Boolean).join(' - ')
}
