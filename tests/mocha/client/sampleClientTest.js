if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("a group of tedsts", function(){
      it("should respect equality", function(){
        chai.assert.equal(5,5);
      });
    });
  });
}
