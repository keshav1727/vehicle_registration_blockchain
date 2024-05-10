// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./VehicleRegistrationToken.sol";

contract VehicleMarketplace {
    using Counters for Counters.Counter;

    Counters.Counter private _saleTicketIds;
    Counters.Counter private _listedItemsCount;

    VehicleRegistrationToken vrt;

    mapping(uint256 => bool) _isVehicleOnSale;
    mapping(uint256 => SaleTicket) _idToSaleTicket;
    mapping(uint256 => uint256) _vehicleIdToSaleTicketId;

    constructor(address VRTAddress) {
        vrt = VehicleRegistrationToken(VRTAddress);
    }

    enum SaleTicketStatus {
        PENDING,
        COMPLETED,
        CANCELLED
    }

    struct SaleTicket {
        address seller;
        IERC721 tokenContract;
        uint256 vehicleId;
        uint256 price;
        SaleTicketStatus status;
    }

    event OnSale(
        uint256 indexed ticketId,
        address seller,
        address tokenContract,
        uint256 vehicleId,
        uint256 price
    );

    event Sold(
        uint256 indexed ticketId,
        address buyer,
        address tokenContract,
        uint256 vehicleId,
        uint256 price
    );

    event Cancel(uint256 indexed ticketId, address seller, uint256 vehicleId);

    function listedItemsCount() public view returns (uint256) {
        return _listedItemsCount.current();
    }

    function isVehicleOnSale(uint256 vehicleId) public view returns (bool) {
        return _isVehicleOnSale[vehicleId];
    }

    function putVehicleOnSale(uint256 vehicleId, uint256 price) public payable {
        require(
            vrt.ownerOf(vehicleId) == msg.sender,
            "You are not owner of this vehicle"
        );
        require(!_isVehicleOnSale[vehicleId], "Vehicle is already on sale");
        _saleTicketIds.increment();
        uint256 _ticketId = _saleTicketIds.current();
        _listedItemsCount.increment();
        _isVehicleOnSale[vehicleId] = true;
        _vehicleIdToSaleTicketId[vehicleId] = _ticketId;
        _idToSaleTicket[_ticketId] = SaleTicket(
            msg.sender,
            vrt,
            vehicleId,
            price,
            SaleTicketStatus.PENDING
        );

        emit OnSale(_ticketId, msg.sender, address(vrt), vehicleId, price);
    }

    function getVehicleSaleTicket(uint256 vehicleId)
        public
        view
        returns (SaleTicket memory)
    {
        require(_isVehicleOnSale[vehicleId], "This vehicle is not on sale");
        uint256 _ticketId = _vehicleIdToSaleTicketId[vehicleId];
        return _idToSaleTicket[_ticketId];
    }

    function buyVehicle(uint256 vehicleId) public payable {
        require(_isVehicleOnSale[vehicleId], "This vehicle is not on sale");
        uint256 _ticketId = _vehicleIdToSaleTicketId[vehicleId];
        SaleTicket storage saleTicket = _idToSaleTicket[_ticketId];
        uint256 price = saleTicket.price;
        address owner = vrt.ownerOf(vehicleId);

        require(msg.sender != owner, "You already own this vehicle");
        require(msg.value == price, "Please submit the asking price");

        vrt.transferFrom(owner, msg.sender, vehicleId);
        _isVehicleOnSale[vehicleId] = false;
        _listedItemsCount.decrement();
        saleTicket.status = SaleTicketStatus.COMPLETED;
        delete _vehicleIdToSaleTicketId[vehicleId];

        payable(owner).transfer(msg.value);

        emit Sold(_ticketId, msg.sender, address(vrt), vehicleId, price);
    }

    function cancelSale(uint256 vehicleId) public {
        require(
            vrt.ownerOf(vehicleId) == msg.sender,
            "You are not owner of this vehicle"
        );
        require(_isVehicleOnSale[vehicleId], "Vehicle is not on sale");
        uint256 _ticketId = _vehicleIdToSaleTicketId[vehicleId];
        SaleTicket storage saleTicket = _idToSaleTicket[_ticketId];
        _isVehicleOnSale[vehicleId] = false;
        saleTicket.status = SaleTicketStatus.CANCELLED;
        delete _vehicleIdToSaleTicketId[vehicleId];
        emit Cancel(_ticketId, msg.sender, vehicleId);
    }
}
