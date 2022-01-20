import { Octokit } from 'octokit'
//import { kvsStorage } from '@kvs/storage'

export type User = {
  login: string
  token: string
  name: string | null
  avatar_url: string
}

export const authenticateUser = async (token: string): Promise<User> => {
  const octokit = new Octokit({ auth: token })
  const {
    data: { login, name, avatar_url },
  } = await octokit.rest.users.getAuthenticated()

  const [owner, repo] = (process.env.SELF_REPO || '/').split('/')
  const {
    data: { permission },
  } = await octokit.rest.repos.getCollaboratorPermissionLevel({
    owner,
    repo,
    username: login,
  })
  if (!['admin', 'write'].includes(permission)) {
    throw new Error(
      `Self needs 'admin' or 'write' permission. ${login}'s permission is '${permission}'.`
    )
  }

  return {
    login,
    token,
    name,
    avatar_url,
  }
}
