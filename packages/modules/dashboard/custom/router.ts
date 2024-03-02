import { type ActivatorObjFunc, ResponseDone } from '@as/shared'

export const DashboardModuleRouter: ActivatorObjFunc[] = [
  {
    base: '/',
    func: () => {
      return ResponseDone({ status: 200, body: 'Dashboard' })
    },
  },
]
