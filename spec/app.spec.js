const {expect} = require ("chai")
const request = require('supertest')
const app = require('../app.js')


describe('/api',()=> {
  describe('GET',()=> {
    it('STATUS:200 responds with the API',()=>{
     return request(app).get('/api').expect(200).then((res)=> {
       console.log('testng!', res.body)

       expect(res.body).to.deep.equal({})
     })
  })
  // describe('GET',()=> {
  //   it('STATUS:200 responds with an array of topic objects',()=>{
  //     expect(apiRouter.get("/topics")).to.equal({ description: 'Code is love, code is life', slug: 'coding' },
  // { description: 'FOOTIE!', slug: 'football' },
  // { description: 'Hey good looking, what you got cooking?', slug: 'cooking' },)
  //   })
  // })
})
})