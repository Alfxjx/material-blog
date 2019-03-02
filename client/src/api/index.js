import {get} from './helper'

const getList = get('/blog')
const getCategory = get('/blog-category')
const getTag = get('/blog-tags')
// const getContent = get('/blog/:id')
export {
  getList,
  getCategory,
  getTag,
  get
}
