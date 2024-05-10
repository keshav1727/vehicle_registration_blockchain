// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VehicleRegistrationToken is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    address _marketplaceAddress;

    constructor() ERC721("Vehicle Registration Token", "VRT") {}

    struct VehicleToken {
        uint256 tokenId;
        address mintingAuthority;
    }

    struct VehicleCertification {
        uint256 id;
        uint256 code;
        address authority;
        string uri;
    }

    event VehicleTokenCreated(
        uint256 indexed tokenId,
        address creator,
        string uri
    );

    event VehicleCertificationCreated(
        uint256 indexed id,
        uint256 code,
        uint256 vehicleId,
        address authority,
        string uri
    );

    event VehicleCertificationCanceled(
        uint256 indexed id,
        uint256 vehicleId,
        address authority
    );

    Counters.Counter private _tokenIds;
    Counters.Counter private _certificationIds;

    mapping(string => bool) private _usedURIs;
    mapping(uint256 => VehicleToken) private _idToVehicleToken;

    mapping(uint256 => VehicleCertification) private _idToVehicleCertification;
    mapping(uint256 => uint256) private _certificationIdToVehicleTokenId;

    function setMarketplaceAddress(address marketplaceAddress) public {
        _marketplaceAddress = marketplaceAddress;
    }

    function getVehicleToken(uint256 tokenId)
        public
        view
        returns (VehicleToken memory)
    {
        return _idToVehicleToken[tokenId];
    }

    function isURIUsed(string memory tokenURI) public view returns (bool) {
        return _usedURIs[tokenURI] == true;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function mintToken(string memory tokenURI) public returns (uint256) {
        require(!isURIUsed(tokenURI), "Token URI already exists");

        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        emit VehicleTokenCreated(newTokenId, msg.sender, tokenURI);
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _idToVehicleToken[newTokenId] = VehicleToken(newTokenId, msg.sender);
        _usedURIs[tokenURI] = true;
        return newTokenId;
    }

    function isApprovedForAll(address owner, address operator)
        public
        view
        override
        returns (bool)
    {
        if (operator == _marketplaceAddress) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }

    function tokenExists(uint256 key) public view returns (bool) {
        // check if non-zero value in struct is zero
        // if it is zero then you know that myMapping[key] doesn't yet exist
        if (_idToVehicleToken[key].tokenId != 0) {
            return true;
        }
        return false;
    }

    function certificationExists(uint256 key) public view returns (bool) {
        // check if non-zero value in struct is zero
        // if it is zero then you know that myMapping[key] doesn't yet exist
        if (_idToVehicleCertification[key].id != 0) {
            return true;
        }
        return false;
    }

    function addCertification(
        uint256 vehicleId,
        uint256 code,
        string memory certificationURI
    ) public returns (uint256) {
        require(!isURIUsed(certificationURI), "Token URI already exists");
        require(tokenExists(vehicleId), "Token does not exists");
        _certificationIds.increment();
        uint256 newCertificationId = _certificationIds.current();
        _certificationIdToVehicleTokenId[newCertificationId] = vehicleId;
        _idToVehicleCertification[newCertificationId] = VehicleCertification(
            newCertificationId,
            code,
            msg.sender,
            certificationURI
        );
        _usedURIs[certificationURI] = true;
        emit VehicleCertificationCreated(
            newCertificationId,
            code,
            vehicleId,
            msg.sender,
            certificationURI
        );
        return newCertificationId;
    }

    function deleteCertification(uint256 certificationId) public {
        require(certificationExists(certificationId), "Token does not exists");
        VehicleCertification
            memory vehicleCertification = _idToVehicleCertification[
                certificationId
            ];
        _usedURIs[vehicleCertification.uri] = false;
        uint256 vehicleId = _certificationIdToVehicleTokenId[certificationId];
        delete _idToVehicleCertification[certificationId];
        delete _certificationIdToVehicleTokenId[certificationId];
        emit VehicleCertificationCanceled(
            certificationId,
            vehicleId,
            vehicleCertification.authority
        );
    }
}
