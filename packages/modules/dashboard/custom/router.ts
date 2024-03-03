import { type ActivatorObjFunc, ResponseDone, httpClient } from '@as/shared'

export const DashboardModuleRouter: ActivatorObjFunc[] = [
  {
    base: 'test',
    func: async () => {
      console.log('Test')
      const request = await httpClient.get({ url: 'https://baidu.com' })
      return ResponseDone({ body: {
        status: request.status,
        headers: request.headers,
        data: 'Test Success!',
      } })
    },
  },
  {
    base: '',
    func: () => {
      return ResponseDone({ status: 200, body: 'Dashboard' })
    },
  },
]
