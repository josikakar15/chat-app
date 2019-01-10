const expect=require('expect');

const {isRealString}=require('./validation.js');

describe('isRealString', ()=>{
	it('should reject non-string values', ()=>{
		var res=isRealString(98);
		expect(res).toBe(false);
	});
	it('should reject string with only spaces', ()=>{
		var res=isRealString('   ');
		expect(res).toBe(false);
	});
	it('should accept strings with non-spaces', ()=>{
		var res=isRealString('  bfdkbf  ');
		expect(res).toBe(true);
	});
});