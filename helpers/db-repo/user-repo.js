import bcrypt from 'bcryptjs'

import { User } from '@/models'
import { auth, db } from '..'

const getAll = async ({ page, page_size }) => {
  await db.connect()
  const users = await User.find()
    .select('-password')
    .skip((page - 1) * page_size)
    .limit(page_size)
    .sort({
      createdAt: 'desc',
    })
  const usersLength = await User.countDocuments()
  await db.disconnect()
  return {
    users,
    usersLength,
    pagination: {
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: page_size * page < usersLength,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(usersLength / page_size),
    },
  }
}

const update = async (id, params) => {
  const user = await User.findById(id)

  if (!user) throw '用户不存在'

  Object.assign(user, params)

  await user.save()
}

const create = async params => {
  const { name, email, password } = params
  await db.connect()
  if (await User.findOne({ email })) {
    const userExistsError = new Error('email "' + email + '" 账户已存在')
    userExistsError.name = 'UserExistsError'
    throw userExistsError
  }
  const hashPassword = await bcrypt.hash(password, 12)
  const newUser = new User({ name, email, password: hashPassword })
  await newUser.save()
  await db.disconnect()
  const token = auth.createAccessToken({ id: newUser._id })

  return {
    user: {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      root: newUser.root,
    },
    token,
  }
}

const authenticate = async ({ email, password } = {}) => {
  console.log('🚀 ~ authenticate ~ email:', email)
  await db.connect()
  const users = await User.find()
  console.log('🚀 ~ authenticate ~ users:', users)
  const user = await User.findOne({ email })
  console.log('🚀 ~ authenticate ~ user:', user)
  await db.disconnect()

  if (!user) {
    throw '用户不存在'
  }
  // const isMatch = await bcrypt.compare(password, user.password)
  // if (!isMatch) {
  //   throw '电子邮件地址或密码不正确'
  // }
  const token = auth.createAccessToken({ id: user._id })
  return {
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      root: user.root,
    },
    token,
  }
}

const _delete = async id => {
  await db.connect()
  const user = await User.findById(id)
  if (!user) throw '用户不存在'
  await User.findByIdAndDelete(id)
  await db.disconnect()
}

const resetPassword = async (id, password) => {
  const hashPassword = await bcrypt.hash(password, 12)
  await db.connect()
  const user = await User.findById(id)
  if (!user) throw '用户不存在'
  await User.findByIdAndUpdate({ _id: id }, { password: hashPassword })
  await db.disconnect()
}

const getById = async id => {
  try {
    await db.connect()
    const user = await User.findById(id)
    await db.disconnect()
    return user
  } catch {
    throw 'User Not Found'
  }
}

const getOne = async filter => {
  try {
    await db.connect()
    const user = await User.findOne(filter).lean().exec()
    await db.disconnect()
    return user
  } catch {
    throw '无此数据'
  }
}

export const usersRepo = {
  create,
  getAll,
  getById,
  getOne,
  update,
  delete: _delete,
  resetPassword,
  authenticate,
}
