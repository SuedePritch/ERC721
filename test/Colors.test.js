
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var assert = chai.assert;
chai.should();


const Colors = artifacts.require("Colors")
require('chai')

contract('Colors', (accounts)=>{
    let contract
    before(async ()=>{
        contract = await Colors.deployed()
    })
    describe('contract deployment', async()=>{
        it('color contract deploys successfully', async()=>{
            const address = contract.address
            assert.notEqual(address, '')
            assert.notEqual(address, 0x0)
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
        it('has a name', async () =>{
            name = await contract.name()
            assert.equal(name, 'Colors')
        })
        it('has a symbol', async () =>{
            symbol = await contract.symbol()
            assert.equal(symbol, 'COLOR')
        })
        
})
describe('minting', async()=>{
    it('creates new token', async()=>{
        const result = await contract.mint('#333333')
        //plus one just so it starts at 1 instead of array[0]
        const totalSupply = await contract.colors.length +1;
        
        //SUCCESS
        // console.log(totalSupply)
        assert.equal(totalSupply, 1)
        // console.log(result);
        const event = result.logs[0].args
        // console.log(event);
        assert.equal(event.tokenId.toNumber(),1, 'id correct')
        assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from')
        assert.equal(event.to, accounts[0], 'to')

        //FAILURE
        await contract.mint('#333333').should.be.rejected;
        // await contract.mint('#333332').should.be.rejected; //it is accepted because it is a new color
    })
    
})
describe('indexing', async () => {
    it('lists colors', async () => {
      // Mint 3 more tokens
        await contract.mint('#5386E4')
        await contract.mint('#FFFFFF')
        await contract.mint('#000000')
        const totalSupply = await contract.totalSupply()

        let color
        let result = []

        for (var i = 1; i <= totalSupply; i++) {
        color = await contract.colors(i - 1)
        result.push(color)
        }

        let expected = ['#333333', '#5386E4', '#FFFFFF', '#000000']
        assert.equal(result.join(','), expected.join(','))
    })

})
})