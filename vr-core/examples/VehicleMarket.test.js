const { ethers } = require("ethers");
const VehicleMarket = artifacts.require("VehicleMarketplace");
const VehicleRegistration = artifacts.require("VehicleRegistrationToken");
const axios = require("axios");

contract("VehicleMarket", (accounts) => {
    let _MarketContract = null;
    let _VehicleRegistrationContract = null;
    const _nftPrice = ethers.utils.parseEther("1").toString();

    before(async() => {
        _VehicleRegistrationContract = await VehicleRegistration.deployed();
        _MarketContract = await VehicleMarket.deployed();
        await _VehicleRegistrationContract.setMarketplaceAddress(_MarketContract.address);
    });

    describe("Mint token", () => {
        const tokenURI = "https://tesi-uniud-2022.infura-ipfs.io/ipfs/QmYDJQoxhcF27draqj9qYWG1D2Qhyt8HQ4hH1y1NNv2vCA";
        before(async() => {
            await _VehicleRegistrationContract.mintToken(tokenURI, {
                from: accounts[0],
            });
        });

        it("owner of the first token should be address[0]", async() => {
            const response = await axios({
                url: "http://127.0.0.1:8000/subgraphs/name/example",
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                data: {
                    query: `{
                        tokens { 
                            id 
                            mintedBy 
                        }
                    }`,
                },
            });
            console.log(response.data.data.tokens[0]);
            //const owner = await _VehicleRegistrationContract.ownerOf(1);
            //assert.equal(owner, accounts[0], "Owner of token is not matching address[0]");
        });

        /*
        it("first token should point to the correct tokenURI", async() => {
            const actualTokenURI = await _VehicleRegistrationContract.tokenURI(1);
            assert.equal(actualTokenURI, tokenURI, "tokenURI is not correctly set");
        });

        it("should not be possible to create a NFT with used tokenURI", async() => {
            try {
                await _VehicleRegistrationContract.mintToken(tokenURI, {
                    from: accounts[0],
                });
            } catch (error) {
                assert(error, "NFT was minted with previously used tokenURI");
            }
        });

        it("should have one listed item", async() => {
            await _MarketContract.placeNftOnSale(1, ethers.utils.parseEther("1"));
            const isVehicleOnSale = await _MarketContract.isTokenOnSale(1);
            const listedItemCount = await _MarketContract.listedItemsCount();
            assert.equal(listedItemCount.toNumber(), 1, "Listed items count is not 1");
            assert.equal(isVehicleOnSale, true, "Item is not on sale");
        });

        it("should have create NFT item", async() => {
            const nftItem = await _VehicleRegistrationContract.getVehicleToken(1);
            assert.equal(nftItem.tokenId, 1, "Token id is not 1");
            assert.equal(nftItem.mintingAuthority, accounts[0], "Creator is not account[0]");
        });
        */
    });
    /*
    describe("Buy NFT", () => {
        before(async() => {
            await _MarketContract.buyNft(1, {
                from: accounts[1],
                value: _nftPrice.toString(),
            });
        });

        it("should unlist the item", async() => {
            const isVehicleOnSale = await _MarketContract.isTokenOnSale(1);
            assert.equal(isVehicleOnSale, false, "Item is still listed");
        });

        it("should decrease listed items count", async() => {
            const listedItemsCount = await _MarketContract.listedItemsCount();
            assert.equal(listedItemsCount.toNumber(), 0, "Count has not been decrement");
        });

        it("should change the owner", async() => {
            const currentOwner = await _VehicleRegistrationContract.ownerOf(1);
            assert.equal(currentOwner, accounts[1], "Item is still listed");
        });

        it("sale ticket must be out", async() => {
            try {
                await _MarketContract.getTokenSaleTicket(1);
            } catch (error) {
                assert(error, "NFT is still on sale");
            }
        });
    });
    /*
    describe("Token transfers", () => {
        const tokenURI = "https://tesi-uniud-2022.infura-ipfs.io/ipfs/QmPMm1iWryW2YxPc2XVkqpVzF9pHqYamGG6JqAc7MFvFeK";
        before(async() => {
            await _MarketContract.mintToken(tokenURI, {
                from: accounts[0],
            });
        });

        it("should have two NFTs created", async() => {
            const totalSupply = await _MarketContract.totalSupply();
            assert.equal(totalSupply.toNumber(), 2, "Total supply of token is not correct");
        });
        it("should be able to retreive nft by index", async() => {
            const nftId1 = await _MarketContract.tokenByIndex(0);
            const nftId2 = await _MarketContract.tokenByIndex(1);

            assert.equal(nftId1.toNumber(), 1, "Nft id is wrong");
            assert.equal(nftId2.toNumber(), 2, "Nft id is wrong");
        });

        it("should have one listed NFT", async() => {
            await _MarketContract.placeNftOnSale(2, _nftPrice);
            const allNfts = await _MarketContract.getAllNftsOnSale();
            assert.equal(allNfts[0].token.tokenId, 2, "Nft has a wrong id");
        });

        it("account[1] should have one owned NFT", async() => {
            const ownedNfts = await _MarketContract.getOwnedNfts({ from: accounts[1] });
            assert.equal(ownedNfts[0].tokenId, 1, "Nft has a wrong id");
        });

        it("account[0] should have one owned NFT", async() => {
            const ownedNfts = await _MarketContract.getOwnedNfts({ from: accounts[0] });
            assert.equal(ownedNfts[0].tokenId, 2, "Nft has a wrong id");
        });
    });

    describe("Token transfer to new owner", () => {
        before(async() => {
            await _MarketContract.transferFrom(accounts[0], accounts[1], 2);
        });

        it("accounts[0] should own 0 tokens", async() => {
            const ownedNfts = await _MarketContract.getOwnedNfts({ from: accounts[0] });
            assert.equal(ownedNfts.length, 0, "Invalid length of tokens");
        });

        it("accounts[1] should own 2 tokens", async() => {
            const ownedNfts = await _MarketContract.getOwnedNfts({ from: accounts[1] });
            assert.equal(ownedNfts.length, 2, "Invalid length of tokens");
        });
    });

    describe("List an Nft", () => {
        before(async() => {
            await _MarketContract.placeNftOnSale(1, _nftPrice, { from: accounts[1] });
        });

        it("should have two listed items", async() => {
            const listedNfts = await _MarketContract.getAllNftsOnSale();

            assert.equal(listedNfts.length, 2, "Invalid length of Nfts");
        });
    });
    */
});