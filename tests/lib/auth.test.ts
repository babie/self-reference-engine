import { authenticateUser } from '../../lib/auth'

it('authenticateUser', async () => {
  const actual = await authenticateUser(process.env.TOKEN || '')

  expect(actual.login).toEqual('babie')
  expect(actual.token).toEqual(process.env.TOKEN)
  expect(actual.avatar_url).not.toBeNull()
})
