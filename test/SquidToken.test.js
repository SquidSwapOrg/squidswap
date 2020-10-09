const { expectRevert } = require('@openzeppelin/test-helpers');
const SquidToken = artifacts.require('SquidToken');

contract('SquidToken', ([alice, bob, carol]) => {
    beforeEach(async () => {
        this.squid = await SquidToken.new({ from: alice });
    });

    it('should have correct name and symbol and decimal', async () => {
        const name = await this.squid.name();
        const symbol = await this.squid.symbol();
        const decimals = await this.squid.decimals();
        assert.equal(name.valueOf(), 'SquidToken');
        assert.equal(symbol.valueOf(), 'SQUID');
        assert.equal(decimals.valueOf(), '18');
    });

    it('should only allow owner to mint token', async () => {
        await this.squid.mint(alice, '100', { from: alice });
        await this.squid.mint(bob, '1000', { from: alice });
        await expectRevert(
            this.squid.mint(carol, '1000', { from: bob }),
            'Ownable: caller is not the owner',
        );
        const totalSupply = await this.squid.totalSupply();
        const aliceBal = await this.squid.balanceOf(alice);
        const bobBal = await this.squid.balanceOf(bob);
        const carolBal = await this.squid.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '100');
        assert.equal(bobBal.valueOf(), '1000');
        assert.equal(carolBal.valueOf(), '0');
    });

    it('should supply token transfers properly', async () => {
        await this.squid.mint(alice, '100', { from: alice });
        await this.squid.mint(bob, '1000', { from: alice });
        await this.squid.transfer(carol, '10', { from: alice });
        await this.squid.transfer(carol, '100', { from: bob });
        const totalSupply = await this.squid.totalSupply();
        const aliceBal = await this.squid.balanceOf(alice);
        const bobBal = await this.squid.balanceOf(bob);
        const carolBal = await this.squid.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '90');
        assert.equal(bobBal.valueOf(), '900');
        assert.equal(carolBal.valueOf(), '110');
    });

    it('should fail if you try to do bad transfers', async () => {
        await this.squid.mint(alice, '100', { from: alice });
        await expectRevert(
            this.squid.transfer(carol, '110', { from: alice }),
            'ERC20: transfer amount exceeds balance',
        );
        await expectRevert(
            this.squid.transfer(carol, '1', { from: bob }),
            'ERC20: transfer amount exceeds balance',
        );
    });
  });
