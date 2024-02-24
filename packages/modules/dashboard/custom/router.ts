import { type ActivatorObjFunc, buildResponse } from '@as/shared'

export const DashboardModuleRouter: ActivatorObjFunc[] = [
  {
    base: '/',
    func: () => {
      buildResponse({ status: 200, body: 'Dashboard' })
    },
  },
]
