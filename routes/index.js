const router = require('koa-router')();
const {getJson} = require('../lib/neo4j');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/getNeo4jData', async (ctx, next) => {
  await getJson().then((res) => {
    ctx.body = res;
  }).catch(next);
})

module.exports = router
