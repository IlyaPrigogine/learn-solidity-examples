// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../token/oft/v2/OFTV2.sol";
contract ExampleOFTV204 is OFTV2 {
    constructor(address _layerZeroEndpoint, uint _initialSupply, uint8 _sharedDecimals) OFTV2("ExampleOFTV204", "ExampleOFTV204", _sharedDecimals, _layerZeroEndpoint) {
        _mint(_msgSender(), _initialSupply);
    }
}
